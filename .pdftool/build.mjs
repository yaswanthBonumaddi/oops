// Markdown -> PDF with correct Telugu shaping.
// Renders markdown to HTML (code highlighted at build time), then prints via the
// installed Google Chrome driven by puppeteer-core over DevTools Protocol.
// No Chromium download, clean browser exit, no temp files.
//
// Usage: node build.mjs <file1.md> <file2.md> ...
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import hljs from 'markdown-it-highlightjs';
import anchor from 'markdown-it-anchor';
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const css = fs.readFileSync(fileURLToPath(new URL('./style.css', import.meta.url)), 'utf8');

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error('usage: node build.mjs <file.md> ...');
  process.exit(1);
}

const md = new MarkdownIt({ html: true, linkify: true, typographer: false })
  .use(hljs, { inline: true, auto: true, ignoreIllegals: true })
  .use(anchor, { permalink: false });

const OUT_DIR = 'pdfs';                 // all PDFs live here (keeps repo root clean)
fs.mkdirSync(OUT_DIR, { recursive: true });

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'],
});

try {
  for (const f of files) {
    if (!fs.existsSync(f)) { console.error(`  skip (missing): ${f}`); continue; }
    const out = `${OUT_DIR}/${f.replace(/.*\//, '').replace(/\.md$/, '')}.pdf`;
    const html = `<!doctype html><html lang="te"><head><meta charset="utf-8">`
      + `<style>${css}</style></head><body class="markdown-body">`
      + md.render(fs.readFileSync(f, 'utf8'))
      + `</body></html>`;

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load', timeout: 180000 });
    await page.evaluateHandle('document.fonts.ready'); // ensure Telugu glyphs shaped
    await page.pdf({
      path: out,
      format: 'A4',
      printBackground: true,
      margin: { top: '16mm', right: '14mm', bottom: '18mm', left: '14mm' },
      timeout: 180000,
    });
    await page.close();
    const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
    console.log(`  ✓ ${out}  (${mb} MB)`);
  }
} finally {
  await browser.close();
}
