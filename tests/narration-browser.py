"""Optional browser regression: run with Python and Playwright installed."""
import asyncio
from functools import partial
from http.server import HTTPServer, SimpleHTTPRequestHandler
from pathlib import Path
from threading import Thread
from playwright.async_api import async_playwright

ROOT = Path(__file__).resolve().parents[1]
class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

async def check(browser, origin, mode):
    context = await browser.new_context(viewport={"width": 1280, "height": 1800})
    if mode != "asleep":
        await context.add_init_script("""window.LanguageModel = {
          availability: async () => 'available',
          create: async () => ({clone: async () => ({destroy(){}, promptStreaming() {
            return new ReadableStream({start(c) {
              window.narrationStarted = true;
              window.finishNarration = (mode) => {
                if (mode === 'failure') c.error(new Error('controlled failure'));
                else { if (mode !== 'empty') c.enqueue('Controlled narrator response.'); c.close(); }
              };
            }});
          }})})
        };""")
    page = await context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    await page.goto(origin + "/labyrinth/index.html?chamber=3f1c2a9e-1b2c-4d3e-8f00-123456789abc")
    entry = page.locator(".lab-entry.narration")
    await entry.wait_for(state="attached")
    fallback = await page.evaluate("""async () => {
      const {generateRoom, describeRoom} = await import('/js/world.js');
      return describeRoom(generateRoom(location.pathname.split('/')[2]));
    }""")
    if mode != "asleep":
        await page.wait_for_function("window.narrationStarted === true")
        assert await entry.inner_text() == "", "Fallback appeared while awake narration was pending"
        await page.evaluate("mode => window.finishNarration(mode)", mode)
        await page.wait_for_function("!document.querySelector('.lab-entry.narration').classList.contains('lab-cursor')")
    expected = "Controlled narrator response." if mode == "success" else fallback
    assert await entry.inner_text() == expected, mode
    assert not errors, errors
    print(mode + ": passed")
    await context.close()

async def main():
    server = HTTPServer(("127.0.0.1", 0), partial(QuietHandler, directory=str(ROOT)))
    Thread(target=server.serve_forever, daemon=True).start()
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            for mode in ("success", "failure", "empty", "asleep"):
                await check(browser, f"http://127.0.0.1:{server.server_port}", mode)
            await browser.close()
    finally:
        server.shutdown()

if __name__ == "__main__":
    asyncio.run(main())
