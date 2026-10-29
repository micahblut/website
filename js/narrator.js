const LANG = { expectedInputs: [{ type: "text", languages: ["en"] }], expectedOutputs: [{ type: "text", languages: ["en"] }] };
const SYSTEM = `You are the narrator of an endless, exitless labyrinth in a minimalist text adventure.
Write in second person, present tense, eerie and literary but concise.
Never invent doors, exits, items or characters beyond the facts you are given.
Never suggest there is a way out. Plain text only, no markdown, no lists, no headings.`;
function api() {
  return typeof globalThis !== "undefined" ? globalThis.LanguageModel : undefined;
}
export async function narratorStatus() {
  const lm = api();
  if (!lm)
    return "unsupported";
  try {
    return await lm.availability(LANG);
  } catch {
    return "unavailable";
  }
}
let base = null;
export function wakeNarrator(onProgress) {
  const lm = api();
  if (!lm)
    return Promise.reject(new Error("unsupported"));
  if (!base) {
    base = lm.create({
      ...LANG,
      initialPrompts: [{ role: "system", content: SYSTEM }],
      monitor(m) {
        m.addEventListener("downloadprogress", (e) => onProgress?.(e.loaded));
      }
    });
    base.catch(() => {
      base = null;
    });
  }
  return base;
}
async function stream(session, prompt, onText, signal) {
  let text = "";
  const reader = session.promptStreaming(prompt).getReader();
  while (true) {
    if (signal?.aborted) {
      await reader.cancel();
      break;
    }
    const { done, value } = await reader.read();
    if (done)
      break;
    text = value.startsWith(text) && text.length > 0 ? value : text + value;
    onText(text);
  }
  return text.trim();
}
export async function narrate(prompt, onText, signal) {
  const session = await (await wakeNarrator()).clone();
  try {
    return await stream(session, prompt, onText, signal);
  } finally {
    session.destroy();
  }
}
// A conversation with one character. The session remembers everything said
// so far; call end() when the wanderer leaves.
export async function startConversation(characterInstructions) {
  await wakeNarrator();
  const session = await api().create({
    ...LANG,
    initialPrompts: [{ role: "system", content: `${SYSTEM}\n\n${characterInstructions}` }]
  });
  return {
    say: (prompt, onText, signal) => stream(session, prompt, onText, signal),
    end: () => session.destroy()
  };
}
