import assert from 'node:assert/strict';
import fs from 'node:fs';

// Enforce the distinction between a persuasive editorial preview and a
// verified merchant offer. A future production launch requires explicit
// replacement of these assertions with evidence-backed release checks.
const read = (file) => fs.readFileSync(file, 'utf8');
const ready = JSON.parse(read('sourcing/first-drop-readiness.json'));
const home = read('src/EvernePreview.tsx');
const legal = read('public/legal.html');
const legalDe = read('public/rechtliches.html');
const routes = read('src/main.tsx');
const vercel = JSON.parse(read('vercel.json'));

assert.equal(ready.status, 'NO_GO', 'Do not claim launch-readiness from supplier research');
assert.equal(ready.approvedForSale, false, 'No supplier garment has been approved for retail sale');
assert.equal(ready.storefrontPublicationAuthorized, false, 'An unapproved commerce launch must stay blocked');
assert.ok(ready.items.every((item) => item.approvedForSale === false),
  'An item-level sale approval requires its own reviewed source evidence');

assert.match(home, /NOT AN EVERNE GARMENT/,
  'Editorial reference images must be distinguished from product photos');
assert.match(home, /not (?:yet )?available to order/i,
  'Visitors must understand why products are unavailable');
assert.doesNotMatch(home, /<picture\b|<form\b|<input\b/i,
  'Do not expose commerce controls before approval');
assert.match(home, /Clothing pictured is not an EVERNE product/,
  'A non-product-photo disclosure must remain visible');
assert.match(home, /external suppliers/,
  'The standards page must identify the curation rather than manufacture model');
assert.match(home, /WHAT IS NOT YET VERIFIED/,
  'The standards page must separate unverified claims from confirmed facts');
assert.match(home, /No garments are available to order/,
  'The trust page must not be mistaken for a public shop');

assert.match(legal, /still placeholders/,
  'Before legal information is verified, it must remain clearly marked as a draft');
assert.match(legal, /\[Insert verified business street address\]/,
  'Do not silently pass an incomplete merchant address as completed');
assert.match(legal, /\[Insert contact email address\]/,
  'Do not silently pass an incomplete merchant contact as completed');
assert.match(legal, /editorial styling photographs are independent third-party references/i,
  'English legal status must distinguish styling references from actual product photos');
assert.match(legalDe, /redaktionellen Modefotos stammen von unabhängigen Dritten/,
  'German legal status must distinguish styling references from actual product photos');
assert.doesNotMatch(legal, /The 20 featured fashion pieces|Displayed prices are non-binding targets/,
  'Do not present private research concepts or target prices as displayed merchandise');
assert.doesNotMatch(legalDe, /Die Website ist technisch mit Shopify verbunden|ein vorhandener Warenkorb-Schlüssel beim Laden entfernt/,
  'The active preview does not run the dormant Shopify or basket storage modules');
for (const anchor of ['imprint', 'privacy', 'shipping']) {
  assert.match(legal, new RegExp(`id="${anchor}"`), `Footer legal anchor missing: ${anchor}`);
}

assert.match(routes, /path="\/standards"/,
  'The customer-facing standards route must remain accessible');
assert.ok(vercel.rewrites.some((route) => route.source === '/standards' && route.destination === '/'),
  'Direct access to standards must work on Vercel');
assert.match(read('docs/everne-human-usability-test.md'), /NOT RUN — NO PARTICIPANTS OR RESULT DATA/,
  'A prepared test script must not be reported as a completed real-user study');

console.log(`EVERNE trust gate passed: ${ready.items.length} research leads unapproved, legal placeholders disclosed, customer clarity routes present, real-user study not claimed.`);
