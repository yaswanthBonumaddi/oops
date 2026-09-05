// Markdown -> PDF with correct Telugu shaping.
// Renders markdown to HTML (code highlighted at build time), then prints via the
// installed Google Chrome driven by puppeteer-core over DevTools Protocol.
// No Chromium download, clean browser exit, no temp files.
//
// Usage: node build.mjs [--style editorial] <file1.md> <file2.md> ...
//
// Two stylesheets:
//   style.css      (default)   GitHub-like flowing technical doc.
//   editorial.css  (--style editorial)  Design-report look: dark cover,
//                              cream paper, orange rules, inline SVG diagrams,
//                              running footer with page numbers.
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import MarkdownIt from 'markdown-it';
import hljs from 'markdown-it-highlightjs';
import anchor from 'markdown-it-anchor';
import puppeteer from 'puppeteer-core';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

// ---- args -----------------------------------------------------------------
const argv = process.argv.slice(2);
let style = 'default';
const files = [];
for (let i = 0; i < argv.length; i++) {
  if (argv[i] === '--style') { style = argv[++i]; continue; }
  if (argv[i].startsWith('--style=')) { style = argv[i].slice(8); continue; }
  files.push(argv[i]);
}
if (files.length === 0) {
  console.error('usage: node build.mjs [--style editorial] <file.md> ...');
  process.exit(1);
}

const read = (n) => fs.readFileSync(fileURLToPath(new URL(n, import.meta.url)), 'utf8');
const CSS = { default: read('./style.css'), editorial: read('./editorial.css') };

// Page geometry per style. Editorial takes its margins from the stylesheet's
// @page rules (preferCSSPageSize) so `@page :first { margin: 0 }` can let the
// cover bleed to the paper edge.
const PAGE = {
  default:   { margin: { top: '16mm', right: '14mm', bottom: '18mm', left: '14mm' }, footer: false },
  editorial: { preferCSSPageSize: true, footer: true },
};

const md = new MarkdownIt({ html: true, linkify: true, typographer: false })
  .use(hljs, { inline: true, auto: true, ignoreIllegals: true })
  .use(anchor, { permalink: false });

const OUT_DIR = 'pdfs';                 // all PDFs live here (keeps repo root clean)
fs.mkdirSync(OUT_DIR, { recursive: true });

const footerTemplate = (label) => `
<div style="width:100%;font-family:'Avenir Next',Helvetica,Arial,sans-serif;
            font-size:7pt;color:#9aa4b8;padding:0 26mm;
            display:flex;justify-content:space-between;">
  <span>${label}</span>
  <span><span class="pageNumber"></span> / <span class="totalPages"></span></span>
</div>`;

const browser = await puppeteer.launch({
  executablePath: CHROME,
  headless: true,
  args: ['--no-sandbox', '--disable-gpu', '--font-render-hinting=none'],
});

try {
  for (const f of files) {
    if (!fs.existsSync(f)) { console.error(`  skip (missing): ${f}`); continue; }
    const base = f.replace(/.*\//, '').replace(/\.md$/, '');
    const out = `${OUT_DIR}/${base}.pdf`;
    const src = fs.readFileSync(f, 'utf8');

    // A doc can opt into the editorial look itself with `<!-- style: editorial -->`,
    // so `./make-pdfs.sh all` renders each file in the style it was written for.
    const st = /<!--\s*style:\s*editorial\s*-->/.test(src) ? 'editorial' : style;
    const page_ = PAGE[st] ?? PAGE.default;

    // Footer label: first `<!-- footer: ... -->` comment, else the filename.
    const label = (src.match(/<!--\s*footer:\s*(.+?)\s*-->/) || [, base.replace(/_/g, ' ')])[1];

    const html = `<!doctype html><html lang="te"><head><meta charset="utf-8">`
      + `<style>${CSS[st] ?? CSS.default}</style></head><body class="markdown-body">`
      + md.render(src)
      + `</body></html>`;

    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'load', timeout: 180000 });
    await page.evaluateHandle('document.fonts.ready'); // ensure Telugu glyphs shaped
    await page.pdf({
      path: out,
      format: 'A4',
      printBackground: true,
      ...(page_.preferCSSPageSize ? { preferCSSPageSize: true } : { margin: page_.margin }),
      displayHeaderFooter: page_.footer,
      headerTemplate: '<div></div>',
      footerTemplate: page_.footer ? footerTemplate(label) : '<div></div>',
      timeout: 180000,
    });
    await page.close();
    const mb = (fs.statSync(out).size / 1024 / 1024).toFixed(1);
    console.log(`  ✓ ${out}  (${mb} MB)`);
  }
} finally {
  await browser.close();
}
