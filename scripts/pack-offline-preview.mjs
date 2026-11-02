import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

// Build a portable, no-network editorial review for the owner's Safari.
// This is deliberately separate from dist/ and never enables commerce.
const source = path.resolve('dist-offline');
const outputRoot = path.resolve('offline-review');
const folderName = 'everne-woman-safari-preview';
const output = path.join(outputRoot, folderName);

let html = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
const scriptMatch = html.match(/<script type="module" crossorigin src="\.\/assets\/([^"/]+\.js)"><\/script>/);
const styleMatch = html.match(/<link rel="stylesheet" crossorigin href="\.\/assets\/([^"/]+\.css)">/);
assert.ok(scriptMatch && styleMatch, 'Expected one Vite entry script and stylesheet for offline review');

const js = fs.readFileSync(path.join(source, 'assets', scriptMatch[1]), 'utf8');
const css = fs.readFileSync(path.join(source, 'assets', styleMatch[1]), 'utf8');
assert.ok(!/(?:^|\n)\s*import\s*(?:\(|[^('"`])/.test(js), 'Offline preview cannot depend on separate JS module files');

// Replacement callbacks preserve literal "$&" and similar sequences in
// minified bundles instead of treating them as String.replace placeholders.
html = html.replace(scriptMatch[0], () => `<script type="module">\n${js.replace(/<\/script/gi, '<\\/script')}\n</script>`);
html = html.replace(styleMatch[0], () => `<style>\n${css.replace(/<\/style/gi, '<\\/style')}\n</style>`);
assert.ok(!html.includes(scriptMatch[0]) && !html.includes(styleMatch[0]), 'Portable HTML must inline JS and CSS');
assert.ok(html.includes('noindex,nofollow'), 'Offline review must remain explicitly non-indexable');

// Remove remnants from a previous review before staging an exact new archive.
// The generated output folder is disposable; never touch source/public assets.
fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
fs.writeFileSync(path.join(output, 'index.html'), html);

fs.copyFileSync(path.resolve('SAFARI-ACCEPTANCE.md'), path.join(output, 'SAFARI-ACCEPTANCE.md'));

for (const legalPage of ['legal.html', 'rechtliches.html']) {
  const content = fs.readFileSync(path.join(source, legalPage), 'utf8')
    .replaceAll('href="/"', 'href="./index.html"')
    .replaceAll('href="/rechtliches.html"', 'href="./rechtliches.html"');
  fs.writeFileSync(path.join(output, legalPage), content);
}

fs.writeFileSync(path.join(output, 'START-HERE.txt'), `EVERNE — Private Image-Free Safari Review\n\n1. Unzip the archive.\n2. Open index.html in Safari on your Mac.\n3. Review the mobile typography, five planned categories, CARE, THE STANDARD and legal information. No product images should appear.\n4. Use SAFARI-ACCEPTANCE.md for the twenty current real-device checks.\n5. iPhone Safari: do NOT rely on opening HTML via AirDrop/Files. On trusted private Wi-Fi, run python3 -m http.server 4173 --bind 0.0.0.0 inside the extracted folder; open http://MAC-PRIVATE-IP:4173/ on iPhone Safari. Stop the unauthenticated local server with Ctrl+C afterward. Never expose it on public Wi-Fi or the internet.\n\nIf Safari restricts local file access, open Terminal in this extracted folder and run:\n  python3 -m http.server 4173\nThen visit http://127.0.0.1:4173 in Safari.\n\nAll merchandise is unapproved. No checkout, payments, supplier orders, connected backend, images or active sales. No network connection is needed for this image-free editorial preview. Do not use this package as a public deployment.\n`);

// Include only registered local editorial reference photos in the offline ZIP.
const manifest = JSON.parse(fs.readFileSync('approvals/visual-assets.json', 'utf8'));
assert.equal(manifest.previewMode, 'EDITORIAL_STUDY');
for (const asset of manifest.studyAssets) {
  const relative = asset.publicPath.replace(/^public\//, '');
  const destination = path.join(output, relative);
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.copyFileSync(path.join(source, relative), destination);
}
const instructions = path.join(output, 'START-HERE.txt');
fs.writeFileSync(instructions, fs.readFileSync(instructions, 'utf8')
  .replace('Image-Free Safari Review', 'Editorial Safari Review')
  .replace('No product images should appear.', 'Four licensed editorial references appear; no EVERNE product images appear.')
  .replace('connected backend, images or active sales', 'connected backend or active sales')
  .replace('image-free editorial preview', 'editorial reference study'));

console.log(`Offline Safari review staged: ${output}`);
