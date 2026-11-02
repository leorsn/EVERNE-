import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';

// Verify the editorial-study Safari ZIP. This validates packaging, not a
// physical iPhone or Mac Safari session and never authorizes publication.
const root = path.resolve('offline-review');
const name = 'everne-woman-safari-preview';
const folder = path.join(root, name);
const archive = path.join(root, name + '.zip');
const manifest = JSON.parse(fs.readFileSync('approvals/visual-assets.json', 'utf8'));
assert.equal(manifest.previewMode, 'EDITORIAL_STUDY');
const imageFiles = manifest.studyAssets.map((asset) => asset.publicPath.replace(/^public\//, ''));
const files = ['index.html', 'START-HERE.txt', 'SAFARI-ACCEPTANCE.md', 'legal.html', 'rechtliches.html', ...imageFiles];

function listFiles(directory, prefix = '') {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) return listFiles(path.join(directory, entry.name), relative);
    assert.ok(entry.isFile(), 'Symlinks and non-file entries are prohibited: ' + relative);
    return [relative];
  });
}

assert.deepEqual(listFiles(folder).sort(), files.slice().sort(),
  'The Safari review must contain no stale unapproved images or other files');
assert.ok(fs.statSync(archive).size > 10_000, 'Offline ZIP is missing or implausibly small');

const html = fs.readFileSync(path.join(folder, 'index.html'), 'utf8');
const builtHtml = fs.readFileSync('dist-offline/index.html', 'utf8');
assert.match(html, /<html lang="en">/);
assert.match(html, /<meta name="robots" content="noindex,nofollow"/);
assert.match(html, /<script type="module">/);
assert.match(html, /<style>/);
assert.doesNotMatch(html, /<script[^>]*\bsrc\s*=|<link[^>]*rel="stylesheet"/i);
assert.doesNotMatch(html, /<script[^>]*\bsrc=["']https?:|<link[^>]*\bhref=["']https?:/i);
assert.doesNotMatch(html, /X-Shopify-Storefront-Access-Token|\/api\/\d{4}-\d{2}\/graphql\.json/);
assert.doesNotMatch(html, /\/products\/[^"'\s]+\.(?:webp|jpg|png)/i);

const scriptEntry = builtHtml.match(/<script type="module" crossorigin src="\.\/assets\/([^"/]+\.js)"><\/script>/);
const styleEntry = builtHtml.match(/<link rel="stylesheet" crossorigin href="\.\/assets\/([^"/]+\.css)">/);
assert.ok(scriptEntry && styleEntry);
const js = fs.readFileSync(path.join('dist-offline/assets', scriptEntry[1]), 'utf8');
const css = fs.readFileSync(path.join('dist-offline/assets', styleEntry[1]), 'utf8');
assert.ok(html.includes(js.replace(/<\/script/gi, '<\\/script')), 'JavaScript must match the checked build');
assert.ok(html.includes(css.replace(/<\/style/gi, '<\\/style')), 'CSS must match the checked build');

for (const page of ['legal.html', 'rechtliches.html']) {
  const contents = fs.readFileSync(path.join(folder, page), 'utf8');
  assert.match(contents, /noindex,nofollow/);
  assert.match(contents, /href="\.\/index\.html"/);
  assert.doesNotMatch(contents, /href=["']\/(?!\/)/,
    'Portable legal links must point into the local package');
}

const readme = fs.readFileSync(path.join(folder, 'START-HERE.txt'), 'utf8');
for (const phrase of ['Safari', 'index.html', 'No checkout', 'SAFARI-ACCEPTANCE.md', 'MAC-PRIVATE-IP']) {
  assert.ok(readme.includes(phrase), 'Missing owner instruction: ' + phrase);
}
const checklist = fs.readFileSync(path.join(folder, 'SAFARI-ACCEPTANCE.md'), 'utf8');
assert.equal(checklist, fs.readFileSync('SAFARI-ACCEPTANCE.md', 'utf8'));
assert.equal((checklist.match(/\| S\d{2} \|/g) ?? []).length, 20);
assert.match(checklist, /UNGETESTET/);
assert.match(checklist, /NO-GO/);

const entries = execFileSync('unzip', ['-Z', '-1', archive], { encoding: 'utf8' })
  .trim().split(/\r?\n/).filter((entry) => entry && !entry.endsWith('/'));
assert.deepEqual(entries.sort(), files.map((file) => name + '/' + file).sort(),
  'ZIP contents must match the documented editorial-study assets exactly');
execFileSync('unzip', ['-tqq', archive], { stdio: 'pipe' });
for (const file of files) {
  const archived = execFileSync('unzip', ['-p', archive, name + '/' + file]);
  const staged = fs.readFileSync(path.join(folder, file));
  assert.ok(archived.equals(staged), 'ZIP differs from staged file: ' + file);
}

for (const asset of manifest.studyAssets) {
  const relative = asset.publicPath.replace(/^public\//, '');
  const sha256 = createHash('sha256').update(fs.readFileSync(path.join(folder, relative))).digest('hex');
  assert.equal(sha256, asset.sha256, 'Offline photograph does not match the licensed source register');
}

console.log(`EVERNE editorial-study Safari ZIP passed: ${files.length} verified files, ${manifest.studyAssets.length} licensed reference photographs, inlined JS/CSS, legal pages and NO-GO safeguards. Real Safari review remains pending.`);
