import assert from 'node:assert/strict';
import fs from 'node:fs';
import { conceptPieces, conceptSlug, fashionCategories, formatTargetPrice } from '../src/womenswearCatalog.ts';

assert.equal(conceptPieces.length, 20, 'The first fashion edit must have 20 planning concepts');
assert.equal(fashionCategories.length, 5, 'The fashion edit must have five categories');

const slugs = new Set();
for (const piece of conceptPieces) {
  const slug = conceptSlug(piece.name);
  assert.ok(slug && !slugs.has(slug), `Invalid or duplicate concept route: ${slug}`);
  assert.ok(piece.targetPrice >= 34 && piece.targetPrice <= 59, `Price target outside 34–59 EUR: ${piece.name}`);
  assert.ok(Number.isInteger(piece.targetPrice), `Price target must be a whole euro: ${piece.name}`);
  assert.ok([4, 9].includes(piece.targetPrice % 10), `Price target must end in 4 or 9: ${piece.name}`);
  assert.equal(formatTargetPrice(piece.targetPrice), `€${piece.targetPrice}`, `Price formatting must omit cents: ${piece.name}`);
  assert.ok(fashionCategories.some((category) => category.id === piece.category), `Unknown category: ${piece.name}`);
  slugs.add(slug);
}

for (const category of fashionCategories) {
  const count = conceptPieces.filter((piece) => piece.category === category.id).length;
  assert.equal(category.count, count, `Incorrect category count for ${category.id}`);
  const categoryPrices = conceptPieces.filter((piece) => piece.category === category.id).map((piece) => piece.targetPrice);
  assert.equal(category.priceRange, `€${Math.min(...categoryPrices)}–€${Math.max(...categoryPrices)}`, `Incorrect price range for ${category.id}`);
}

const entry = fs.readFileSync('src/main.tsx', 'utf8');
const indexHtml = fs.readFileSync('index.html', 'utf8');
assert.ok(entry.includes('path="/edit/:slug"'), 'A route to the concept detail page is required');
assert.ok(entry.includes('WomenswearApp'), 'The entry must render the women’s fashion preview');
assert.ok(!entry.includes("import App from './App'"), 'The old store must not be loaded as the active app');
assert.ok(indexHtml.includes('noindex,nofollow'), 'The fashion preview must stay out of search indexes');
assert.ok(indexHtml.includes('<html lang="en">'), 'The fashion preview must explicitly use English');
assert.ok(indexHtml.includes('€34–€59'), 'Static page metadata must show the updated whole-euro planned price range');

const englishLegal = fs.readFileSync('public/legal.html', 'utf8');
assert.ok(englishLegal.includes('<html lang="en">'), 'An English legal information page is required');
assert.ok(englishLegal.includes('noindex,nofollow'), 'English prelaunch legal information must remain unindexed');
for (const anchor of ['imprint', 'privacy', 'returns', 'shipping']) {
  assert.ok(englishLegal.includes(`id="${anchor}"`), `Missing legal footer target: ${anchor}`);
}

const homepage = fs.readFileSync('src/WomenswearApp.tsx', 'utf8');
assert.ok(homepage.includes('legal.html#imprint'), 'The English footer must link to the English legal notice');
assert.ok(homepage.includes('Shopping not yet available'), 'The preview status must remain clear in English');
assert.ok(homepage.includes('Our size range is not confirmed yet.'), 'Size FAQ must clearly state sizes are not confirmed');
assert.ok(homepage.includes('exact garment measurements and fit guidance'), 'Size FAQ must promise product-specific measurements before launch');
assert.ok(!homepage.includes('mostly XS–XL'), 'Do not imply unverified XS–XL availability');
assert.ok(homepage.includes('aria-pressed={activeStyle === index}'), 'Style Notes must expose the selected mood to assistive technology');
assert.ok(homepage.includes('Styling inspiration only.'), 'The styling section must not imply confirmed products');
assert.ok(homepage.includes('€34–€59'), 'Homepage must show the updated whole-euro planned price range');
assert.ok(englishLegal.includes('€34 and €59'), 'Legal prelaunch notice must show the updated planned price range');

console.log(`EVERNE WOMAN validation passed: ${conceptPieces.length} concepts, ${fashionCategories.length} category counts, distinct routes, whole-euro 4/9 targets (€34–€59), English pages, noindex and active app guard.`);
