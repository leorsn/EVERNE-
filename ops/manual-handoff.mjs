// EVERNE WOMAN: local-only manual fulfillment preview.
// Never connect this module to a webhook, live order, customer record or carrier.
const ORDER_KEYS = ['scenarioId', 'currency', 'paymentStatus', 'fulfillmentStatus', 'lines'];
const LINE_KEYS = ['supplierProductCode', 'variantEan', 'quantity', 'unitPriceGrossEur'];
const ACCEPTED_PAYMENT = new Set(['PAID', 'PENDING', 'REFUNDED', 'VOIDED']);
const ACCEPTED_FULFILLMENT = new Set(['UNFULFILLED', 'FULFILLED', 'PARTIALLY_FULFILLED']);

function strictKeys(value, keys, field) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new TypeError(field + ' must be an object');
  }
  for (const key of Object.keys(value)) {
    if (!keys.includes(key)) {
      throw new Error(field + ' includes forbidden or personal field: ' + key);
    }
  }
  for (const key of keys) {
    if (!Object.hasOwn(value, key)) {
      throw new Error(field + ' is missing ' + key);
    }
  }
}

function approvedReferenceVariants(sourcing, productCode) {
  const matches = [
    ...sourcing.essentialCandidates,
    ...sourcing.capsuleCandidates,
  ].filter((candidate) => candidate.supplierProductCode === productCode
    && candidate.approvedForSale === false);
  if (matches.length !== 1) return new Set();
  const candidate = matches[0];
  return new Set(candidate.visibleSizesForSampleColor
    .map((size) => candidate.variantIdentifiersBySize[size]));
}

export function reviewSyntheticOrder(order, context) {
  strictKeys(order, ORDER_KEYS, 'Synthetic order');
  if (typeof order.scenarioId !== 'string' ||
    !/^MOCK-[A-Z0-9-]{3,40}$/.test(order.scenarioId)) {
    throw new Error('Only explicitly synthetic MOCK- identifiers are accepted');
  }
  if (!Array.isArray(order.lines) || order.lines.length < 1 || order.lines.length > 3) {
    throw new Error('One to three synthetic order lines are required');
  }
  if (!ACCEPTED_PAYMENT.has(order.paymentStatus) ||
      !ACCEPTED_FULFILLMENT.has(order.fulfillmentStatus) ||
      order.currency !== 'EUR') {
    throw new Error('Unexpected payment, fulfillment or currency field');
  }
  if (!context || !context.readiness || !context.economics || !context.sourcing) {
    throw new Error('Missing locally reviewed source data');
  }
  const { readiness, economics, sourcing } = context;
  if (readiness.status !== 'NO_GO' || readiness.approvedForSale !== false ||
      readiness.storefrontPublicationAuthorized !== false ||
      economics.approvedForSale !== false) {
    throw new Error('This manual simulator may not run against an authorized live launch');
  }

  const blockers = new Set([
    'PRODUCTS_NOT_APPROVED_FOR_SALE',
    'NO_SIGNED_FULFILLMENT_AND_RETURNS',
    'COURIER_LABEL_NOT_AUTHORIZED',
    'NO_SHOPIFY_FULFILLMENT_PERMISSION',
  ]);
  if (order.paymentStatus !== 'PAID') blockers.add('PAYMENT_NOT_PAID');
  if (order.fulfillmentStatus !== 'UNFULFILLED') blockers.add('ALREADY_OR_PARTIALLY_FULFILLED');

  const seenVariants = new Set();
  const lines = order.lines.map((line, index) => {
    strictKeys(line, LINE_KEYS, 'Synthetic line ' + (index + 1));
    if (typeof line.supplierProductCode !== 'string' ||
        !/^[A-Z0-9.-]{3,40}$/.test(line.supplierProductCode) ||
        typeof line.variantEan !== 'string' ||
        !/^\d{13}$/.test(line.variantEan) ||
        !Number.isInteger(line.quantity) || line.quantity < 1 || line.quantity > 2 ||
        !Number.isInteger(line.unitPriceGrossEur)) {
      throw new Error('Invalid synthetic SKU, variant, quantity or gross price');
    }
    const key = line.supplierProductCode + '/' + line.variantEan;
    if (seenVariants.has(key)) blockers.add('DUPLICATE_VARIANT_LINE');
    seenVariants.add(key);

    const product = economics.items.find((item) =>
      item.supplierProductCode === line.supplierProductCode);
    const readinessItem = readiness.items.find((item) =>
      item.supplierProductCode === line.supplierProductCode);
    if (!product || !readinessItem) {
      blockers.add('UNKNOWN_SUPPLIER_PRODUCT');
      return { supplierProductCode: line.supplierProductCode,
        quantity: line.quantity, mapping: 'UNRECOGNIZED', simulatedOnly: true };
    }
    if (readinessItem.reviewStage === 'HOLD') blockers.add('CONCEPT_ON_HOLD');
    if (readinessItem.reviewStage !== 'SAMPLE_RESEARCH_PRIORITY') {
      blockers.add('NOT_A_PRIORITY_SAMPLE_CANDIDATE');
    }
    if (line.unitPriceGrossEur !== product.retailGrossEur ||
        ![4, 9].includes(line.unitPriceGrossEur % 10)) {
      blockers.add('RETAIL_PRICE_NOT_MATCHED');
    }
    if (!approvedReferenceVariants(sourcing, line.supplierProductCode)
        .has(line.variantEan)) {
      blockers.add('VARIANT_EAN_NOT_VERIFIED_FROM_RESEARCH');
    }
    return {
      supplierProductCode: line.supplierProductCode,
      conceptName: product.conceptName,
      variantEan: line.variantEan,
      quantity: line.quantity,
      grossUnitTargetEur: product.retailGrossEur,
      mapping: 'RESEARCH_REFERENCE_ONLY',
      simulatedOnly: true,
    };
  });

  const parcelCountsForResearchOnly = order.lines.length === 1
    ? [1] : [1, order.lines.length];
  if (order.lines.length > 1) blockers.add('MULTI_SKU_PACKING_UNCONFIRMED');
  if (readiness.globalGates.dropshipMerchantReturnContract.status !== 'VERIFIED') {
    blockers.add('DROPSHIP_RETURNS_UNVERIFIED');
  }
  if (readiness.globalGates.ownLabelGermanyCourierQuote.status !== 'VERIFIED') {
    blockers.add('GERMANY_CARRIER_LABEL_UNQUOTED');
  }

  return {
    scenarioId: order.scenarioId,
    status: 'HOLD_NO_GO',
    workflowMode: 'OFFLINE_MOCK_ONLY',
    supplierOrderCreated: false,
    labelPurchasedOrCreated: false,
    shopifyMutationPerformed: false,
    customerMessageSent: false,
    noCustomerPersonalDataAccepted: true,
    lines,
    parcelCountsForResearchOnly,
    blockers: [...blockers].sort(),
    operatorStep: 'Do not submit to a supplier, buy a label, mark fulfilled, or contact a customer. Await written terms, fit checks and an independent owner release.',
  };
}
