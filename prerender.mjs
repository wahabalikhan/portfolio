import { execSync } from 'child_process';
import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, join, extname } from 'path';
import puppeteer from 'puppeteer';

const DIST = resolve('dist');
const PORT = 4173;

const ROUTES = [
  '/',
  '/experience',
  '/ai-workflow',
  '/git-diff',
  '/schemas',
  '/design-system',
  '/designers-code',
  '/building-portfolio',
  '/design-systems',
];

const MIME = {
  '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml', '.json': 'application/json', '.ico': 'image/x-icon',
  '.woff': 'font/woff', '.woff2': 'font/woff2', '.pdf': 'application/pdf',
};

const server = createServer((req, res) => {
  let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);
  if (!existsSync(filePath) || !extname(filePath)) filePath = join(DIST, 'index.html');
  try {
    const data = readFileSync(filePath);
    res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  } catch {
    res.writeHead(404);
    res.end('Not found');
  }
});

async function prerender() {
  console.log('Starting static file server...');
  await new Promise(r => server.listen(PORT, r));

  console.log('Launching browser...');
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'] });

  for (const route of ROUTES) {
    console.log(`Pre-rendering ${route}...`);
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}${route}`, { waitUntil: 'networkidle0', timeout: 30000 });
    try {
      await page.waitForSelector('#root > *', { timeout: 15000 });
    } catch {
      console.log(`  ⚠ React did not mount for ${route}, using page as-is`);
    }
    await new Promise(r => setTimeout(r, 1000));

    let html = await page.content();
    // Remove the pre-JS skeleton shell
    html = html.replace(/<div role="application"[^>]*>[\s\S]*?<\/div>\s*(?=<div id="root">)/i, '');
    // Remove the MutationObserver script
    html = html.replace(/<script>\s*document\.addEventListener\('DOMContentLoaded'[\s\S]*?<\/script>/i, '');
    // Strip dynamic comment/cursor elements — React re-renders these from Supabase on mount
    html = html.replace(/<div class="cc-card-wrapper"[^>]*>[\s\S]*?<\/div><\/div>/g, '');
    html = html.replace(/<div class="floating-annotation"[^>]*>[\s\S]*?<\/div>/g, '');
    // Remove the portal overlay div (comment system renders via portal to body)
    html = html.replace(/<div style="position: fixed; top: 0px; left: 0px; width: 100%; height: 0px; overflow: visible; pointer-events: none;">[\s\S]*?(?=<\/body>)/i, '');
    // Strip FadeUp animation/opacity so pre-rendered content is immediately visible
    html = html.replace(/animation:\s*[^;"]*fadeInSlideUp[^;"]*;\s*/g, '');
    html = html.replace(/opacity:\s*0;?\s*/g, (match, offset) => {
      const before = html.substring(Math.max(0, offset - 100), offset);
      return before.includes('style="') ? '' : match;
    });
    const dir = route === '/' ? DIST : join(DIST, route);
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(join(dir, 'index.html'), html);
    await page.close();
    console.log(`  ✓ ${route} → ${join(dir, 'index.html')}`);
  }

  await browser.close();
  server.close();
  console.log(`\nPre-rendered ${ROUTES.length} routes.`);
}

prerender().catch(err => { console.error(err); process.exit(1); });
