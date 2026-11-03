// A future cross-category catalog can be filled only after product-specific
// safety, sourcing, photo rights, delivery and owner publication approval.
// The zero-product preview is deliberate. No research lead is a listing.
export type ReviewedTrendProduct = Readonly<{
  slug: string;
  title: string;
  category: string;
  description: string;
  primaryImage: Readonly<{ publicPath: string; altText: string }>;
  retailGrossEur: number;
}>;

export const reviewedTrendProducts: readonly ReviewedTrendProduct[] = [];
