import fs from 'node:fs/promises';
import express from 'express';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT || 5173;

function normalizeBase(b) {
  if (!b) return '/';
  if (!b.startsWith('/')) b = '/' + b;
  if (!b.endsWith('/')) b = b + '/';
  return b;
}
const base = normalizeBase(process.env.BASE || '/');

const SSR_ROUTES = new Set(['/', '/pricing', '/contact-us']);

let prodHTML = '';
let ssrManifest = undefined;
prodHTML = await fs.readFile(resolve(__dirname, 'dist', 'client', 'index.html'), 'utf-8');
ssrManifest = JSON.parse(await fs.readFile(resolve(__dirname, 'dist', 'server', '.vite', 'ssr-manifest.json'), 'utf-8'));

const app = express();
let vite;

const compression = (await import('compression')).default;
app.use(compression());

app.use(base, (await import('express')).static(resolve(__dirname, 'dist'), { index: false }));

function getRenderUrl(originalUrl) {
  if (base === '/') return originalUrl;
  if (originalUrl.startsWith(base)) {
    return originalUrl.slice(base.length - 1) || '/';
  }
  return originalUrl;
}

app.use((req, res, next) => {
  if (req.url === '/index.php') {
    req.url = '/';
    req.originalUrl = '/';
  }
  next();
});

app.get(Array.from(SSR_ROUTES), async (req, res) => {
  console.log('inside ssr')
  try {
    const originalUrl = req.originalUrl || req.url;
    const urlForRender = getRenderUrl(originalUrl);
    console.log('Original URL:', req.originalUrl, 'URL for render:', urlForRender);

    let template;
    let render;

    template = prodHTML;
    const entryServerPath = pathToFileURL(resolve(__dirname, 'dist/server/entry-server.js')).href;
    render = (await import(entryServerPath)).render;

    const rendered = await render(urlForRender, ssrManifest);

    const rootReplaceRegex = /<div\s+id=(?:"|')root(?:"|')[\s\S]*?<\/div>/i;
    let html;
    if (rootReplaceRegex.test(template)) {
      html = template.replace(rootReplaceRegex, `<div id="root">${rendered.html || ''}</div>`);
    } else {
      html = template.replace('<!--app-html-->', rendered.html || '');
    }

    res.status(200).set({ 'Content-Type': 'text/html' }).send(html);
  } catch (err) {
    vite?.ssrFixStacktrace?.(err);
    console.error(err.stack || err);
    res.status(500).send(err.stack || String(err));
  }
});

app.get('*', async (req, res) => {

  const originalUrl = req.originalUrl || req.url;
  const urlForRender = getRenderUrl(originalUrl);
  console.log('Original URL:', req.originalUrl, 'URL for render:', urlForRender);

  try {
    return res.status(200).set({ 'Content-Type': 'text/html' }).send(prodHTML);
  } catch (err) {
    console.error(err);
    res.status(500).send(err.stack || String(err));
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port} (base=${base})`);
});
