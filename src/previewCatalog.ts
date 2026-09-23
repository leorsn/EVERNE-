export type PreviewProduct = {
  number: string;
  title: string;
  sku: string;
  price: string;
  description: string;
  ritual: string;
  images: [string, string, string];
  alt: [string, string, string];
  facts?: string[];
  tagline?: string;
  benefits?: Array<{ title: string; copy: string }>;
  howToUse?: string;
  details?: string[];
};

export const previewProducts: PreviewProduct[] = [
  {
    number: '01',
    title: 'Cashmere Comb',
    sku: 'EV-CC-01',
    price: '€18',
    description: 'A compact wooden comb for lifting visible surface pilling from cashmere and fine knitwear. Designed for slow, controlled passes when a favourite knit needs a cleaner finish.',
    ritual: 'For cashmere and fine knits.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-cashmere-comb-final-beige.png?v=1790178347',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-cashmere-comb-detail-beige.png?v=1790186008',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-cashmere-comb-lifestyle-beige.png?v=1790186020',
    ],
    alt: [
      'Wooden cashmere comb on a warm beige studio background',
      'Close-up of the wooden cashmere comb on a warm beige studio background',
      'Wooden cashmere comb in use on soft beige knitwear',
    ],
    facts: ['Manual care tool', 'Wooden body', 'Cashmere & fine knitwear'],
  },
  {
    number: '02',
    title: 'Electronic Lint Remover',
    sku: 'EV-WH-01',
    price: '€48',
    description: 'A corded lint remover for visible pilling and loose fibres on suitable garments and textiles. The transparent chamber keeps collected fibres contained while you work.',
    ritual: 'A focused reset for worn surfaces.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-electronic-lint-remover-final-beige.png?v=1790178374',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-electronic-lint-remover-detail-beige.png?v=1790186057',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-electronic-lint-remover-lifestyle-beige.png?v=1790186076',
    ],
    alt: [
      'White and blue corded electronic lint remover on a warm beige studio background',
      'White and blue corded electronic lint remover with transparent lint chamber',
      'White and blue corded electronic lint remover in use on beige knitwear',
    ],
    facts: ['Corded', 'Transparent lint chamber', 'For suitable fabrics'],
  },
  {
    number: '03',
    title: 'Fabric Shaver',
    sku: 'EV-FS-01',
    price: '€32',
    description: 'A lightweight manual fabric-care tool with a double-sided head for lifting visible lint, loose fibres and surface debris from suitable fabrics. Simple, cable-free and easy to keep close at hand.',
    ritual: 'Simple care. No charging required.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-final-beige.png?v=1790178388',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-detail-beige.png?v=1790186089',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-lifestyle-beige.png?v=1790186101',
    ],
    alt: [
      'Coral manual fabric shaver on a warm beige studio background',
      'Coral manual fabric shaver on a warm beige studio background',
      'Coral manual fabric shaver in use on beige wool fabric',
    ],
    facts: ['Manual', 'Double-sided head', 'Lightweight format'],
  },
  {
    number: '04',
    title: 'Steam Brush',
    sku: 'EV-GB-01',
    price: '€95',
    description: 'A foldable 1000W handheld garment steamer for smoothing light creasing and refreshing clothing between wears. Supplied with a brush attachment and measuring cup for a compact at-home care ritual.',
    ritual: 'Steam. Smooth. Refresh.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-steam-brush-final-beige.png?v=1790178361',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-steam-brush-detail-beige.png?v=1790186034',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-steam-brush-lifestyle-beige.png?v=1790186046',
    ],
    alt: [
      'White and rose-gold handheld garment steamer on a warm beige studio background',
      'White and rose-gold handheld garment steamer with brush attachment and measuring cup',
      'White and rose-gold handheld garment steamer in use on a white shirt',
    ],
    facts: ['1000W', 'Foldable format', 'Brush attachment + cup'],
    tagline: 'A faster reset between wears.',
    benefits: [
      {
        title: 'Refresh between washes',
        copy: 'Steam helps relax light creasing and bring suitable garments back into shape between washes.',
      },
      {
        title: 'Compact by design',
        copy: 'The foldable handheld format is easy to store and practical for short trips.',
      },
      {
        title: 'Focused garment care',
        copy: 'Use controlled passes on suitable fabrics rather than defaulting to another full wash cycle.',
      },
      {
        title: 'Supplied with accessories',
        copy: 'The current CJ product includes a brush attachment and measuring cup.',
      },
    ],
    howToUse: 'Fill the reservoir as directed, allow the unit to heat, then work in controlled passes on suitable garments. Always follow the garment care label and test delicate or unfamiliar materials first.',
    details: [
      '1000W handheld garment steamer',
      'Foldable format',
      'Brush attachment included',
      'Measuring cup included',
      'Unbranded supplier product',
    ],
  },
  {
    number: '05',
    title: 'The Renewal Set',
    sku: 'EV-RS-01',
    price: '€122',
    description: 'A focused wardrobe-renewal set built from the tools you will reach for most: two Cashmere Combs, one Electronic Lint Remover and one Fabric Shaver.',
    ritual: 'Four pieces. Three care steps.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-renewal-set-final-beige.png?v=1790178401',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-renewal-set-detail-beige.png?v=1790186115',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-renewal-set-lifestyle-beige.png?v=1790186128',
    ],
    alt: [
      'Renewal Set with two wooden cashmere combs, one corded electronic lint remover and one coral manual fabric shaver on a warm beige background',
      'Renewal Set arranged on warm beige stone blocks with two wooden cashmere combs, electronic lint remover and manual fabric shaver',
      'Renewal Set styled with warm neutral knitwear: two wooden cashmere combs, electronic lint remover and manual fabric shaver',
    ],
    facts: ['2× Cashmere Comb', '1× Electronic Lint Remover', '1× Fabric Shaver'],
  },
];

export function productImages(product: PreviewProduct): [string, string, string] {
  return product.images;
}
