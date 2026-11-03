// Private product research concepts, never retail listings. A selected working
// idea is not evidence of any particular supplier, product specification,
// consumer price, fulfilment agreement, or launch authorization.
export type TrendCandidate = {
  slug: string;
  workingTitle: string;
  category: string;
  summary: string;
  reviewChecks: readonly string[];
};

export const trendCandidates: readonly TrendCandidate[] = [
  {
    slug: 'jewellery-bag',
    workingTitle: 'Jewellery bag',
    category: 'Accessories',
    summary: 'A jewellery-storage bag is the first concept selected for sourcing review. The exact model, supplier and product details remain unconfirmed.',
    reviewChecks: [
      'Identify and independently verify the exact supplier listing',
      'Confirm materials, measurements, variants and product safety information',
      'Obtain rights-cleared photographs of the actual item',
      'Validate shipping, returns and fully automatic supplier payment',
      'Calculate the real landed cost and approve the retail price',
    ],
  },
];
