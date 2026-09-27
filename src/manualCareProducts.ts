import { previewProducts, type PreviewProduct } from './previewCatalog';

const manualCareProducts = [
  {
    number: '08',
    title: 'Cashmere Comb',
    handle: 'cashmere-comb',
    sku: 'EV-CC-01',
    price: '€28',
    description: 'A compact manual care tool for lifting visible surface pilling from cashmere and fine knitwear. Designed for controlled, deliberate passes when a favourite knit needs a cleaner finish.',
    ritual: 'Slow care for fine knitwear.',
    tagline: 'Controlled care for cashmere and fine knits.',
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
    facts: ['Manual care', 'Compact wooden body', 'Cashmere + fine knitwear'],
    benefits: [
      { title: 'Precise surface care', copy: 'Designed to lift visible pilling from suitable cashmere and fine knitwear with controlled manual passes.' },
      { title: 'Simple by design', copy: 'No charging, cables or disposable parts — just a compact tool for deliberate garment maintenance.' },
      { title: 'Made for repeat use', copy: 'A small wardrobe-care object intended to stay close at hand for regular knitwear upkeep.' },
    ],
    howToUse: 'Place the garment on a flat surface and gently draw the comb across affected areas in controlled passes. Remove collected fibres as you work.',
    care: 'Use gently. Always follow the garment care label and test delicate or unfamiliar fabrics on an inconspicuous area first.',
    details: ['Manual garment-care tool', 'Compact wooden body', 'Designed for cashmere and suitable fine knitwear', 'No charging, cables or disposable parts'],
  },
  {
    number: '09',
    title: 'Fabric Shaver',
    handle: 'fabric-care-brush',
    sku: 'EV-FS-01',
    price: '€32',
    description: 'A lightweight manual garment-care tool designed to lift visible lint, loose fibres and light surface debris from suitable fabrics. Intended for quick everyday upkeep when a garment does not need powered pilling removal.',
    ritual: 'Quick surface care, without power.',
    tagline: 'A simple manual reset for everyday fabrics.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-final-beige.png?v=1790178388',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-detail-beige.png?v=1790186089',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-lifestyle-beige.png?v=1790186101',
    ],
    alt: [
      'Coral manual fabric shaver on a warm beige studio background',
      'Coral manual fabric shaver detail on a warm beige studio background',
      'Coral manual fabric shaver in use on beige wool fabric',
    ],
    facts: ['Manual care', 'No batteries or cable', 'Everyday fabric upkeep'],
    benefits: [
      { title: 'Quick upkeep', copy: 'Made for visible lint, loose fibres and light surface debris on suitable garments and textiles.' },
      { title: 'No power required', copy: 'A lightweight manual format with no charging, batteries or cable required.' },
      { title: 'Controlled use', copy: 'Light, deliberate strokes keep the intervention focused on the areas that need attention.' },
    ],
    howToUse: 'Lay the garment on a flat surface and work gently with light, controlled strokes. Avoid loose threads, embellishments, seams and delicate areas.',
    care: 'Always follow the garment care label and test delicate or unfamiliar fabrics on an inconspicuous area first.',
    details: ['Manual garment-care tool', 'Lightweight format', 'For visible lint, loose fibres and light surface debris', 'No charging, batteries or cable required'],
  },
] as unknown as PreviewProduct[];

for (const product of manualCareProducts) {
  if (!previewProducts.some((item) => item.handle === product.handle)) previewProducts.push(product);
}
