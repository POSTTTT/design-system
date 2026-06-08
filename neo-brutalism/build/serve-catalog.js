import http from 'node:http';
import { readFile } from 'node:fs/promises';
import { extname, normalize, join } from 'node:path';

const ROOT = process.cwd();
const PORT = 4321;
const TYPES = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.json': 'application/json', '.ts': 'text/plain',
};

const server = http.createServer(async (req, res) => {
  let urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (urlPath === '/') urlPath = '/catalog/index.html';
  else if (urlPath.endsWith('/')) urlPath += 'index.html'; // e.g. /prototype/
  // Confine to ROOT — reject path traversal.
  const filePath = normalize(join(ROOT, urlPath));
  if (!filePath.startsWith(ROOT)) { res.writeHead(403).end('Forbidden'); return; }
  try {
    const body = await readFile(filePath);
    res.writeHead(200, { 'Content-Type': TYPES[extname(filePath)] ?? 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(
    `\n  Catalog   → http://localhost:${PORT}/` +
    `\n  Prototype → http://localhost:${PORT}/prototype/` +
    `\n  Ctrl+C to stop.\n`
  );
});
