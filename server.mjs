import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, resolve } from 'node:path';

const root = resolve('.');
const types = { '.css': 'text/css; charset=utf-8', '.html': 'text/html; charset=utf-8', '.js': 'application/javascript; charset=utf-8' };

createServer(async (request, response) => {
  const requestPath = decodeURIComponent(request.url.split('?')[0]);
  const target = resolve(root, `.${requestPath === '/' ? '/index.html' : requestPath}`);
  if (!target.startsWith(root)) { response.writeHead(403); response.end(); return; }
  try {
    response.writeHead(200, { 'Content-Type': types[extname(target)] ?? 'application/octet-stream' });
    response.end(await readFile(target));
  } catch { response.writeHead(404); response.end('Not found'); }
}).listen(4173, '127.0.0.1', () => console.log('Preview: http://127.0.0.1:4173'));
