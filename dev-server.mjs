import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 5173);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

function resolveRequestPath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const requested = cleanPath === '/' ? '/index.html' : cleanPath;
  const absolutePath = path.resolve(root, `.${requested}`);
  const relativePath = path.relative(root, absolutePath);

  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) return null;
  return absolutePath;
}

const server = http.createServer(async (request, response) => {
  try {
    const filePath = resolveRequestPath(request.url || '/');
    if (!filePath) {
      response.writeHead(403);
      response.end('Forbidden');
      return;
    }

    const fileStat = await stat(filePath);
    if (!fileStat.isFile()) throw new Error('Not a file');

    const body = await readFile(filePath);
    const extension = path.extname(filePath).toLowerCase();

    response.writeHead(200, {
      'Content-Type': mimeTypes[extension] || 'application/octet-stream',
      'Cache-Control': 'no-store',
    });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end('404 Not Found');
  }
});

server.listen(port, () => {
  console.log(`BISAM dev server: http://localhost:${port}`);
  console.log('Tekan Ctrl+C untuk menghentikan server.');
});
