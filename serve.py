"""Development-only static server, using only Python's standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit


class Handler(SimpleHTTPRequestHandler):
    def do_GET(self):
        path = urlsplit(self.path).path
        if path == '/labyrinth' or path.startswith('/labyrinth/'):
            self.path = '/labyrinth/index.html'
        super().do_GET()


if __name__ == '__main__':
    server = ThreadingHTTPServer(('127.0.0.1', 8090), partial(Handler, directory=str(Path(__file__).parent)))
    print('Static website: http://localhost:8090', flush=True)
    server.serve_forever()