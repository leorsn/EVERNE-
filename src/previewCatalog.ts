export type PreviewProduct = {
  number: string;
  title: string;
  handle: string;
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
  care?: string;
  details?: string[];
  included?: string[];
};

export const previewProducts: PreviewProduct[] = [
  {
    number: '01',
    title: 'Cashmere Comb',
    handle: 'cashmere-comb',
    sku: 'EV-CC-01',
    price: '€28',
    description: 'A compact wooden comb for lifting visible surface pilling from cashmere and fine knitwear. Designed for slow, controlled passes when a favourite knit needs a cleaner finish.',
    ritual: 'For cashmere and fine knits.',
    tagline: 'Slow care for fine knitwear.',
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
    benefits: [
      { title: 'Controlled by hand', copy: 'Manual care gives you direct control over pressure and placement while working on fine knitwear.' },
      { title: 'Focused surface care', copy: 'Designed to lift visible surface pilling when a favourite knit needs a cleaner finish.' },
      { title: 'Simple format', copy: 'Compact, cable-free and easy to keep close to the garments that need occasional attention.' },
    ],
    howToUse: 'Place the garment on a flat surface and gently draw the comb across affected areas in controlled passes. Remove collected fibres as you work.',
    care: 'Use gently. Always follow the garment care label and test delicate or unfamiliar fabrics on an inconspicuous area first.',
    details: ['Manual care with precise control', 'Compact wooden body', 'Designed for cashmere and suitable fine knitwear', 'No charging or cable required'],
  },
  {
    number: '02',
    title: 'Electronic Lint Remover',
    handle: 'electronic-lint-remover',
    sku: 'EV-WH-01',
    price: '€65',
    description: 'A corded lint remover for visible pilling and loose fibres on suitable garments and textiles. The transparent chamber keeps collected fibres contained while you work.',
    ritual: 'A focused reset for worn surfaces.',
    tagline: 'Restore the surface. Keep the garment.',
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
    benefits: [
      { title: 'Visible renewal', copy: 'Targets visible pilling and loose surface fibres on suitable garments and everyday textiles.' },
      { title: 'Consistent use', copy: 'The corded format is designed for straightforward use without relying on battery charge.' },
      { title: 'Contained collection', copy: 'A transparent chamber keeps removed fibres contained while you work.' },
    ],
    howToUse: 'Lay the garment on a flat, stable surface. Work slowly with light pressure over the affected area and avoid seams, buttons, zips and loose threads.',
    care: 'Always follow the garment care label and test delicate or unfamiliar fabrics on an inconspicuous area first. Do not use excessive pressure.',
    details: ['Corded format', 'Transparent lint chamber', 'Targets visible pilling and loose fibres', 'For suitable knitwear and everyday textiles'],
  },
  {
    number: '03',
    title: 'Fabric Shaver',
    handle: 'fabric-shaver',
    sku: 'EV-FS-01',
    price: '€32',
    description: 'A lightweight manual garment-care tool designed to lift visible lint, loose fibres and light surface debris from suitable fabrics. Intended for quick everyday upkeep when powered pilling removal is not needed.',
    ritual: 'Simple care. No charging required.',
    tagline: 'Quick surface care, without power.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-final-beige.png?v=1790178388',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-detail-beige.png?v=1790186089',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-lifestyle-beige.png?v=1790186101',
    ],
    alt: [
      'Manual fabric shaver on a warm beige studio background',
      'Close-up of the manual fabric shaver on a warm beige studio background',
      'Manual fabric shaver in use on beige wool fabric',
    ],
    facts: ['Manual', 'No power required', 'Lightweight format'],
    benefits: [
      { title: 'Everyday upkeep', copy: 'Made for quick passes over visible lint, loose fibres and light surface debris on suitable fabrics.' },
      { title: 'No power required', copy: 'The manual format works without charging, batteries or a cable.' },
      { title: 'A lighter intervention', copy: 'Useful when a surface only needs quick care rather than powered pilling removal.' },
    ],
    howToUse: 'Lay the garment on a flat surface and work gently with light, controlled strokes. Avoid loose threads, embellishments, seams and delicate areas.',
    care: 'Always follow the garment care label and test delicate or unfamiliar fabrics on an inconspicuous area first.',
    details: ['Manual fabric-care tool', 'No charging, batteries or cable required', 'Lightweight format', 'For visible lint, loose fibres and light surface debris on suitable fabrics'],
  },
  {
    number: '04',
    title: 'Steam Brush',
    handle: 'steam-brush',
    sku: 'EV-GB-01',
    price: '€95',
    description: 'A foldable 1000W handheld garment steamer for smoothing light creasing and refreshing clothing between wears. Supplied with a brush attachment and measuring cup for a compact at-home care ritual.',
    ritual: 'Steam. Smooth. Refresh.',
    tagline: 'A faster reset between wears.',
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
    benefits: [
      { title: 'Refresh between washes', copy: 'Steam helps relax light creasing and bring suitable garments back into shape between washes.' },
      { title: 'Compact by design', copy: 'The foldable handheld format is easy to store and practical for short trips.' },
      { title: 'Focused garment care', copy: 'Use controlled passes on suitable fabrics rather than defaulting to another full wash cycle.' },
      { title: 'Supplied with accessories', copy: 'A brush attachment and measuring cup are included with the current product.' },
    ],
    howToUse: 'Fill as directed, allow the steamer to heat, then work slowly over suitable fabric while keeping the garment positioned safely. For more structured areas, use the included attachment where appropriate.',
    care: 'Always follow the garment care label. Test delicate or unfamiliar fabrics on an inconspicuous area first. Do not use on materials that should not be exposed to steam or heat.',
    details: ['1000W handheld garment steamer', 'Foldable format', 'Brush attachment included', 'Measuring cup included', 'Unbranded supplier product'],
  },
  {
    number: '05',
    title: 'The EVERNE System',
    handle: 'the-everne-system',
    sku: 'EV-RS-01',
    price: '€149',
    description: 'A complete four-tool wardrobe-care routine for refreshing, restoring and maintaining the garments you keep: Steam Brush, Electronic Lint Remover, Cashmere Comb and Fabric Shaver.',
    ritual: 'Four tools. One wardrobe-care system.',
    tagline: 'The complete wardrobe-care routine.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-steam-brush-final-beige.png?v=1790178361',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-electronic-lint-remover-final-beige.png?v=1790178374',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-cashmere-comb-final-beige.png?v=1790178347',
    ],
    alt: ['Steam Brush included in The EVERNE System', 'Electronic Lint Remover included in The EVERNE System', 'Cashmere Comb included in The EVERNE System'],
    facts: ['Steam Brush', 'Electronic Lint Remover', 'Cashmere Comb', 'Fabric Shaver'],
    included: ['Steam Brush', 'Electronic Lint Remover', 'Cashmere Comb', 'Fabric Shaver'],
    benefits: [
      { title: 'Refresh', copy: 'Use the Steam Brush for suitable garments when light creasing needs a quick reset.' },
      { title: 'Restore', copy: 'Use the Electronic Lint Remover for visible pilling and loose surface fibres on suitable textiles.' },
      { title: 'Maintain', copy: 'Use the Cashmere Comb for controlled manual care on cashmere and suitable fine knitwear.' },
      { title: 'Finish', copy: 'Use the Fabric Shaver for quick manual surface upkeep when a lighter intervention is enough.' },
    ],
    howToUse: 'Use each tool according to its individual instructions and choose the lightest intervention suited to the garment and the surface you want to address.',
    care: 'Always follow garment care labels and the individual product instructions. Test delicate or unfamiliar fabrics on an inconspicuous area first.',
    details: ['Four complementary wardrobe-care tools', 'Individual value €220', 'System price €149', 'Save €71 compared with buying the four tools individually'],
  },
];

export function productImages(product: PreviewProduct): [string, string, string] {
  return product.images;
}
