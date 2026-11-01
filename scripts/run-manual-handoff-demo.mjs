import fs from 'node:fs';
import { reviewSyntheticOrder } from '../ops/manual-handoff.mjs';

// An explicitly fictitious two-item example. No Shopify API, no customer data,
// no real order identifiers, no labels, payments or supplier connections.
const read = (path) => JSON.parse(fs.readFileSync(path, 'utf8'));
const readiness = read('sourcing/first-drop-readiness.json');
const economics = read('sourcing/capsule-order-economics.json');
const essentials = read('sourcing/essential-basics-alternatives.json');
const capsule = read('sourcing/capsule-hero-alternatives.json');

const mock = {
  scenarioId: 'MOCK-EVERNE-RIB-PANT-01',
  currency: 'EUR',
  paymentStatus: 'PAID',
  fulfillmentStatus: 'UNFULFILLED',
  lines: [
    {
      supplierProductCode: 'RV-TP-A1363.01P',
      variantEan: '5906694124754',
      quantity: 1,
      unitPriceGrossEur: 34,
    },
    {
      supplierProductCode: 'IT-SP-FL7371.61',
      variantEan: '5906694077388',
      quantity: 1,
      unitPriceGrossEur: 59,
    },
  ],
};
const output = reviewSyntheticOrder(mock, {
  readiness,
  economics,
  sourcing: {
    essentialCandidates: essentials.candidates,
    capsuleCandidates: capsule.candidates,
  },
});
if (output.status !== 'HOLD_NO_GO' ||
    output.supplierOrderCreated ||
    output.shopifyMutationPerformed ||
    output.labelPurchasedOrCreated ||
    output.customerMessageSent) {
  throw new Error('Offline demonstration may never activate fulfillment');
}
console.log(JSON.stringify(output, null, 2));
