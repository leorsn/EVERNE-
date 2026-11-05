import type { ProductPhoto } from './ProductPhotoGallery';

// Supplier-linked Shopify drafts. The visuals below are AI-generated styling
// studies based on supplier imagery, not photographs of inspected samples.
// Do not promote these to a live offer without product/fulfillment approval.
export type SelectedProduct = {
  slug: string;
  title: string;
  category: 'Trousers' | 'Knitwear' | 'Jackets';
  shopifyProductId: string;
  variantNote: string;
  description: string;
  photos: readonly ProductPhoto[];
};

const photos = (slug: string, descriptions: string[]): ProductPhoto[] => descriptions.map((altText, index) => ({
  publicPath: `${import.meta.env.BASE_URL}product-editorial/${slug}-${String(index + 1).padStart(2, '0')}.webp`,
  altText: `AI-generated styling preview — ${altText}. Not a verified photograph of the supplier garment.`,
}));

export const selectedProducts: SelectedProduct[] = [
  {
    slug: 'lace-detail-straight-leg-trousers', title: 'Lace-Detail Straight-Leg Trousers', category: 'Trousers',
    shopifyProductId: 'gid://shopify/Product/16096460079485', variantNote: 'Black · S–XL (supplier listing)',
    description: 'Straight-leg black trousers with lace accents and an elongated line.',
    photos: photos('lace-detail-straight-leg-trousers', ['front styling', 'side styling', 'rear styling', 'lace detail', 'product-only study']),
  },
  {
    slug: 'split-hem-flared-trousers', title: 'Split-Hem Flared Trousers', category: 'Trousers',
    shopifyProductId: 'gid://shopify/Product/16096460276093', variantNote: 'Multiple colours and sizes in supplier listing',
    description: 'A flared trouser silhouette featuring an open split at the hem.',
    photos: photos('split-hem-flared-trousers', ['front styling', 'side styling', 'rear styling', 'split-hem detail', 'colour comparison study']),
  },
  {
    slug: 'ribbed-hem-v-neck-cardigan', title: 'Ribbed-Hem V-Neck Cardigan', category: 'Knitwear',
    shopifyProductId: 'gid://shopify/Product/16096462340477', variantNote: 'Black · S–L (supplier listing)',
    description: 'A fitted V-neck cardigan with small buttons and gently flared ribbed hem.',
    photos: photos('ribbed-hem-v-neck-cardigan', ['front styling', 'three-quarter styling', 'rear styling', 'button and rib detail', 'product-only study']),
  },
  {
    slug: 'cropped-double-breasted-trench-jacket', title: 'Cropped Double-Breasted Trench Jacket', category: 'Jackets',
    shopifyProductId: 'gid://shopify/Product/16096462766461', variantNote: 'Black, khaki, off-white · XS–L (supplier listing)',
    description: 'A cropped trench-inspired jacket with a tall collar, double-breasted front and soft hem.',
    photos: photos('cropped-double-breasted-trench-jacket', ['black front styling', 'black side styling', 'black rear styling', 'black button detail', 'khaki product-only study']),
  },
  {
    slug: 'structured-double-breasted-short-jacket', title: 'Structured Double-Breasted Short Jacket', category: 'Jackets',
    shopifyProductId: 'gid://shopify/Product/16096463159677', variantNote: 'Black · S–L (supplier listing)',
    description: 'A tailored short jacket with strong shoulders, silver buttons and flap pockets.',
    photos: photos('structured-double-breasted-short-jacket', ['front styling', 'side styling', 'rear styling with waist tab', 'silver-button detail', 'product-only study']),
  },
];

export const findSelectedProduct = (slug: string | undefined) => selectedProducts.find((product) => product.slug === slug);
