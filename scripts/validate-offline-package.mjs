import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

// Checks the actual on-disk Safari review ZIP after npm run build:offline.
// Do not use this file to publish, deploy, enable checkout or upload artifacts.
const root = path.resolve('offline-review');
const name = 'everne-woman-safari-preview';
const folder = path.join(root, name);
const archive = path.join(root, name + '.zip');
const files = [
  'index.html',
  'START-HERE.txt',
  'legal.html',
  'rechtliches.html',
  'editorial/CREDITS.md',
  'editorial/knit.webp',
  'editorial/tailored.webp',
  'editorial/trench.webp',
];

assert.ok(fs.statSync(folder).isDirectory(), 'Offline review folder is missing');
assert.ok(fs.statSync(archive).size > 10_000, 'Offline ZIP is missing or implausibly small');

function listFiles(folderPath, prefix = '') {
  return fs.readdirSync(folderPath, { withFileTypes: true }).flatMap((entry) => {
    const relative = prefix ? prefix + '/' + entry.name : entry.name;
    if (entry.isDirectory()) return listFiles(path.join(folderPath, entry.name), relative);
    assert.ok(entry.isFile(), 'Symlinks and non-file entries must not enter the offline archive: ' + relative);
    return [relative];
  });
}
assert.deepEqual(listFiles(folder).sort(), [...files].sort(),
  'Portable Safari folder contains missing or unexpected files');

const html = fs.readFileSync(path.join(folder, 'index.html'), 'utf8');
const builtHtml = fs.readFileSync('dist-offline/index.html', 'utf8');
assert.match(html, /<html lang="en">/, 'Offline document language must be English');
assert.match(html, /<meta name="robots" content="noindex,nofollow"/,
  'Review must remain non-indexed');
assert.match(html, /<script type="module">/,
  'Offline JavaScript must be embedded directly into the HTML');
assert.match(html, /<style>/, 'Offline CSS must be embedded directly into the HTML');
assert.doesNotMatch(html, /<script[^>]*\bsrc\s*=/i,
  'Offline HTML must not load an external JavaScript bundle');
assert.doesNotMatch(html, /<link[^>]*rel="stylesheet"/i,
  'Offline HTML must not load a separate stylesheet');
assert.doesNotMatch(html, /<script[^>]*\bsrc=["']https?:|<link[^>]*\bhref=["']https?:/i,
  'Offline HTML must not load remote scripts, stylesheets or assets');
assert.doesNotMatch(html, /X-Shopify-Storefront-Access-Token|\/api\/\d{4}-\d{2}\/graphql\.json/,
  'The editorial preview must not embed Shopify commerce API clients');
assert.doesNotMatch(html, /<script[^>]*\bsrc=["']\//i,
  'The file preview must not refer to a root-only app script');

const scriptEntry = builtHtml.match(/<script type="module" crossorigin src="\.\/assets\/([^"/]+\.js)"><\/script>/);
const styleEntry = builtHtml.match(/<link rel="stylesheet" crossorigin href="\.\/assets\/([^"/]+\.css)">/);
assert.ok(scriptEntry && styleEntry, 'Vite must emit a relative script and stylesheet in the offline build');
const js = fs.readFileSync(path.join('dist-offline/assets', scriptEntry[1]), 'utf8');
const css = fs.readFileSync(path.join('dist-offline/assets', styleEntry[1]), 'utf8');
assert.ok(html.includes(js.replace(/<\/script/gi, '<\\/script')),
  'Inlined JavaScript does not match the actual current offline build');
assert.ok(html.includes(css.replace(/<\/style/gi, '<\\/style')),
  'Inlined CSS does not match the actual current offline build');

for (const pageName of ['legal.html', 'rechtliches.html']) {
  const legal = fs.readFileSync(path.join(folder, pageName), 'utf8');
  assert.match(legal, /noindex,nofollow/, 'Prelaunch legal page must be non-indexed');
  assert.match(legal, /href="\.\/index\.html"/, 'Legal page must return to the local preview');
  assert.doesNotMatch(legal, /href=["']\/(?!\/)/,
    'Offline legal links must not point to the website root');
}
const readme = fs.readFileSync(path.join(folder, 'START-HERE.txt'), 'utf8');
for (const phrase of ['Safari', 'index.html', 'No checkout']) {
  assert.ok(readme.includes(phrase), 'Owner instructions missing: ' + phrase);
}

for (const picture of ['knit', 'tailored', 'trench']) {
  const relative = 'editorial/' + picture + '.webp';
  const packed = fs.readFileSync(path.join(folder, relative));
  const original = fs.readFileSync(path.join('public', relative));
  assert.ok(packed.equals(original), 'Packaged picture is stale or different: ' + relative);
  assert.equal(packed.subarray(0, 4).toString('ascii'), 'RIFF');
  assert.equal(packed.subarray(8, 12).toString('ascii'), 'WEBP');
}
assert.ok(fs.readFileSync(path.join(folder, 'editorial/CREDITS.md'), 'utf8').length > 40,
  'Photo credits must accompany the editorial pictures');

const archivePaths = execFileSync('unzip', ['-Z', '-1', archive], {
  encoding: 'utf8', maxBuffer: 1024 * 1024,
}).trim().split(/\r?\n/).filter(Boolean);
const entries = archivePaths.filter((entry) => !entry.endsWith('/'));
const expectedEntries = files.map((file) => name + '/' + file);
assert.deepEqual(entries.sort(), expectedEntries.sort(),
  'ZIP archive must contain exactly the reviewed files; never include stale assets');
execFileSync('unzip', ['-tqq', archive], { stdio: 'pipe', maxBuffer: 1024 * 1024 });

for (const file of files) {
  const archived = execFileSync('unzip', ['-p', archive, name + '/' + file], {
    maxBuffer: 25 * 1024 * 1024,
  });
  const staged = fs.readFileSync(path.join(folder, file));
  assert.ok(archived.equals(staged), 'ZIP content differs from the validated staged file: ' + file);
}
console.log('EVERNE Safari ZIP acceptance passed: 8 exact files, independent inlined assets, three local WebP images, legal links, noindex and byte-for-byte archive integrity. Real Safari display review remains outstanding.');
