import assert from 'node:assert/strict';
import fs from 'node:fs';
import test from 'node:test';
import { validateTrendFirstDrop } from './validate-trend-first-drop.mjs';

const liveIntake = JSON.parse(fs.readFileSync('sourcing/trend-first-drop.json', 'utf8'));
const copy = (value) => structuredClone(value);
const syntheticPhotoFixture = { photoExists: () => true };

// Synthetic fixtures test validation logic only; they are not actual supplier
// evidence and must never be committed into the real intake or published.
function syntheticComplete() {
  const fixture = copy(liveIntake);
  fixture.supplier = { name: 'Fictional supplier fixture', sku: 'TEST-001', productUrl: 'https://example.org/test-only' };
  fixture.product = { materialsAndDimensions: 'Synthetic specification', variants: ['Black'], approvedProductPhotoPaths: ['/products/fixture.jpg'] };
  fixture.economics = {
    currency: 'EUR', salePriceEur: 39, landedUnitCostEur: 10.15,
    paymentAndPlatformFeesEur: 2.6, returnsReserveEur: 3,
    additionalRecurringAutomationCostEur: 0,
  };
  for (const key of Object.keys(fixture.evidence)) {
    fixture.evidence[key] = { verified: true, reference: 'synthetic-fixture-only', reviewedAt: '2026-11-03' };
  }
  fixture.targetChannel = 'tiktok_shop';
  return fixture;
}

test('real jewellery-bag intake remains NO_GO with no supplier or product facts invented', () => {
  const state = validateTrendFirstDrop(liveIntake);
  assert.equal(state.status, 'NO_GO');
  assert.ok(state.missing.includes('evidence.automaticSupplierPayment'));
  assert.ok(state.missing.includes('supplier.productUrl (HTTPS)'));
  assert.ok(state.missing.includes('product.approvedProductPhotoPaths'));
  assert.equal(liveIntake.founderRelease.approved, false);
});

test('synthetic completion still requires separate founder release', () => {
  const state = validateTrendFirstDrop(syntheticComplete(), syntheticPhotoFixture);
  assert.equal(state.status, 'FOUNDER_RELEASE_REQUIRED');
  assert.ok(state.projectedMargin > .3);
});

test('approval handoff never publishes: validator returns data only', () => {
  const fixture = syntheticComplete();
  fixture.founderRelease = { approved: true, reference: 'synthetic-signoff', reviewedAt: '2026-11-03' };
  assert.equal(validateTrendFirstDrop(fixture, syntheticPhotoFixture).status, 'READY_FOR_MANUAL_HANDOFF');
});

test('fake zero-cost automation without supporting evidence is blocked', () => {
  const fixture = syntheticComplete();
  fixture.evidence.zeroExtraRecurringCost.reference = null;
  assert.ok(validateTrendFirstDrop(fixture, syntheticPhotoFixture).missing.includes('evidence.zeroExtraRecurringCost'));
  fixture.evidence.zeroExtraRecurringCost.reference = 'synthetic-fixture-only';
  fixture.economics.additionalRecurringAutomationCostEur = 9;
  assert.ok(validateTrendFirstDrop(fixture, syntheticPhotoFixture).missing.some((entry) => entry.includes('additional budget')));
});

test('weak unit contribution is blocked before founder signoff', () => {
  const fixture = syntheticComplete();
  fixture.economics.landedUnitCostEur = 30;
  assert.ok(validateTrendFirstDrop(fixture, syntheticPhotoFixture).missing.includes('economics.minimum30PercentContributionBeforeFixedOverhead'));
});

test('unapproved channel and sale price formats are blocked', () => {
  const fixture = syntheticComplete();
  fixture.targetChannel = 'unapproved';
  fixture.economics.salePriceEur = 39.99;
  const state = validateTrendFirstDrop(fixture, syntheticPhotoFixture);
  assert.ok(state.missing.includes('targetChannel'));
  assert.ok(state.missing.some((entry) => entry.includes('ending in 4 or 9')));
});

test('product photos must exist before a handoff can be claimed', () => {
  const fixture = syntheticComplete();
  const state = validateTrendFirstDrop(fixture);
  assert.ok(state.missing.includes('product.approvedProductPhotoFiles'));
});
