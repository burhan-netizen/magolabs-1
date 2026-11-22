/**
 * Makes a 1600x900 cover image for an Insights post, in the same style as the
 * existing covers (cream background, big black Poppins headline with one
 * highlighted line, small mono labels, a one-line subtitle).
 *
 * Usage:
 *   node scripts/make-insight-cover.mjs <slug> "<LABEL>" "<line 1>" "<highlighted line 2>" "<line 3>" "<subtitle>"
 *
 * Example:
 *   node scripts/make-insight-cover.mjs add-whatsapp-button-to-website "Enquiries" \
 *     "Add WhatsApp" "to your" "website." "Free, in minutes, no plugin needed."
 *
 * Writes public/images/insights/<slug>.webp. Needs Playwright (global install) with Chromium,
 * and Python with Pillow for the webp conversion.
 */
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

// Playwright is not a project dependency; it is resolved from the machine's global install.
const { chromium } = createRequire(import.meta.url)('playwright');

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const [slug, label, l1, l2, l3, sub] = process.argv.slice(2);
if (!slug || !label || !l1 || !l2 || !l3 || !sub || !/^[a-z0-9-]+$/.test(slug)) {
	console.error('Usage: node scripts/make-insight-cover.mjs <slug> "<LABEL>" "<line 1>" "<highlighted line 2>" "<line 3>" "<subtitle>"');
	process.exit(1);
}

const font = (pkg, file) => 'data:font/woff2;base64,' + fs.readFileSync(path.join(root, 'node_modules', '@fontsource', pkg, 'files', file)).toString('base64');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const html = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:P;font-weight:900;src:url(${font('poppins', 'poppins-latin-900-normal.woff2')})}
@font-face{font-family:P;font-weight:400;src:url(${font('poppins', 'poppins-latin-400-normal.woff2')})}
@font-face{font-family:M;font-weight:500;src:url(${font('jetbrains-mono', 'jetbrains-mono-latin-500-normal.woff2')})}
*{margin:0;padding:0;box-sizing:border-box}
body{width:1600px;height:900px;background:#faf9f6;position:relative;overflow:hidden;font-family:P}
.glow{position:absolute;right:-160px;top:-220px;width:760px;height:760px;border-radius:50%;background:radial-gradient(circle,rgba(255,200,60,.32) 0%,rgba(255,200,60,.12) 40%,rgba(255,200,60,0) 70%)}
.top{position:absolute;left:112px;right:112px;top:96px;display:flex;justify-content:space-between;align-items:center;font-family:M;font-weight:500;font-size:22px;letter-spacing:.2em;text-transform:uppercase;color:#77756f;padding-bottom:28px;border-bottom:2px solid #e4e2dc}
.lab{display:flex;align-items:center;gap:16px;color:#555}
.sq{width:18px;height:18px;background:#ffc53d}
h1{position:absolute;left:112px;top:212px;font-weight:900;font-size:124px;line-height:1.0;letter-spacing:-.035em;color:#0b0b0b}
h1 span{display:block}
h1 .hl{display:inline-block;background:#ffc53d;padding:0 20px;margin:0 -20px}
.sub{position:absolute;left:112px;bottom:96px;border-left:6px solid #ffc53d;padding-left:24px;font-size:36px;color:#333}
</style></head><body><div class="glow"></div>
<div class="top"><div class="lab"><div class="sq"></div>${esc(label)}</div><div>Mago Labs Insights</div></div>
<h1><span>${esc(l1)}</span><span><span class="hl">${esc(l2)}</span></span><span>${esc(l3)}</span></h1>
<div class="sub">${esc(sub)}</div></body></html>`;

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'cover-'));
const png = path.join(tmp, 'cover.png');
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 } });
await page.setContent(html);
await page.evaluate(() => document.fonts.ready);
await page.screenshot({ path: png });
await browser.close();

const out = path.join(root, 'public', 'images', 'insights', `${slug}.webp`);
execFileSync('python3', ['-c', 'import sys;from PIL import Image;Image.open(sys.argv[1]).convert("RGB").save(sys.argv[2],"WEBP",quality=86)', png, out]);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`Cover written to ${path.relative(root, out)}`);
