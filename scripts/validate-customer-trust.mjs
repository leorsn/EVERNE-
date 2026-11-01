import assert from 'node:assert/strict';
import fs from 'node:fs';

// Enforce the distinction between a persuasive editorial preview and a
// verified merchant offer. A future production launch requires explicit
// replacement of these assertions with evidence-backed release checks.
const read = (file) => fs.readFileSync(file, 'utf8');
const ready = JSON.parse(read('sourcing/first-drop-readiness.json'));
const home = read('src/WomenswearApp.tsx');
const detail = read('src/ConceptDetailPage.tsx');
const standards = read('src/StandardsPage.tsx');
const legal = read('public/legal.html');
const routes = read('src/main.tsx');
const vercel = JSON.parse(read('vercel.json'));

assert.equal(ready.status, 'NO_GO', 'Do not claim launch-readiness from supplier research');
assert.equal(ready.approvedForSale, false, 'No supplier garment has been approved for retail sale');
assert.equal(ready.storefrontPublicationAuthorized, false, 'An unapproved commerce launch must stay blocked');
assert.ok(ready.items.every((item) => item.approvedForSale === false),
  'An item-level sale approval requires its own reviewed source evidence');

assert.match(home, /No checkout until actual garments are verified/,
  'Visitors must understand why products are unavailable');
assert.match(home, /Each card is a design direction, not a stocked garment/,
  'A concept card must never imply actual inventory');
assert.match(detail, /No inventory confirmed/,
  'Product detail pages must not invent stock');
assert.match(detail, /Terms not yet confirmed/,
  'Product detail pages must not invent delivery or returns terms');
assert.match(standards, /external suppliers/,
  'The standards page must identify the curation rather than manufacture model');
assert.match(standards, /What is not yet verified/,
  'The standards page must separate unverified claims from confirmed facts');
assert.match(standards, /No garments are available to order/,
  'The trust page must not be mistaken for a public shop');

assert.match(legal, /still placeholders/,
  'Before legal information is verified, it must remain clearly marked as a draft');
assert.match(legal, /\[Insert verified business street address\]/,
  'Do not silently pass an incomplete merchant address as completed');
assert.match(legal, /\[Insert contact email address\]/,
  'Do not silently pass an incomplete merchant contact as completed');

assert.match(routes, /path="\/standards"/,
  'The customer-facing standards route must remain accessible');
assert.ok(vercel.rewrites.some((route) => route.source === '/standards' && route.destination === '/'),
  'Direct access to standards must work on Vercel');
assert.match(read('docs/everne-human-usability-test.md'), /NOT RUN — NO PARTICIPANTS OR RESULT DATA/,
  'A prepared test script must not be reported as a completed real-user study');

console.log(`EVERNE trust gate passed: ${ready.items.length} research leads unapproved, legal placeholders disclosed, customer clarity routes present, real-user study not claimed.`);
