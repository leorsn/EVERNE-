export type PreviewProduct = {
  number: string;
  title: string;
  sku: string;
  price: string;
  description: string;
  ritual: string;
  images: [string, string, string];
  alt: [string, string, string];
  tagline?: string;
  benefits?: Array<{ title: string; copy: string }>;
  howToUse?: string;
  details?: string[];
};

export const previewProducts: PreviewProduct[] = [
  {
    number: '01',
    title: 'The Renewal Set',
    sku: 'EV-RS-01',
    price: '€122',
    description: 'The complete EVERNE renewal ritual: two Cashmere Combs, one Electronic Lint Remover and one Fabric Shaver for considered wardrobe care.',
    ritual: 'Restore. Refresh. Repeat.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-renewal-set-catalog.webp?v=1790168125',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-renewal-set-detail.webp?v=1790168139',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-renewal-set-lifestyle.webp?v=1790168148',
    ],
    alt: [
      'EVERNE The Renewal Set with two Cashmere Combs, Electronic Lint Remover and Fabric Shaver',
      'Detail view of the EVERNE Renewal Set care tools',
      'EVERNE Renewal Set presented as a complete wardrobe-care collection',
    ],
  },
  {
    number: '02',
    title: 'Steam Brush',
    sku: 'EV-GB-01',
    price: '€95',
    description: 'A compact handheld garment steamer designed to smooth, refresh and revive clothing between wears.',
    ritual: 'Steam. Smooth. Refresh.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-steam-brush-catalog.webp?v=1790168156',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-steam-brush-detail.webp?v=1790168166',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-steam-brush-lifestyle.webp?v=1790168175',
    ],
    alt: [
      'EVERNE Steam Brush studio product view',
      'EVERNE Steam Brush in use on a garment',
      'EVERNE Steam Brush with wardrobe-care accessories',
    ],
    tagline: 'A faster reset between wears.',
    benefits: [
      {
        title: 'Refresh between washes',
        copy: 'Use steam to relax light creasing and bring garments back into shape without defaulting to another wash.',
      },
      {
        title: 'Made for daily rotation',
        copy: 'A compact handheld format designed for quick wardrobe care before wearing or after travel.',
      },
      {
        title: 'Foldable by design',
        copy: 'The folding format keeps the tool easy to store and practical to take with you.',
      },
      {
        title: '1000W steam performance',
        copy: 'Built around a 1000W handheld format for a focused garment-refresh routine.',
      },
    ],
    howToUse: 'Fill the reservoir as directed, allow the unit to heat, then steam suitable garments with controlled passes while keeping the fabric comfortably tensioned. Always follow the garment care label and test delicate materials first.',
    details: [
      'Handheld garment steamer',
      '1000W format',
      'Foldable design',
      'Designed for wardrobe care and travel',
      'Part of EVERNE Edition 01',
    ],
  },
  {
    number: '03',
    title: 'Cashmere Comb',
    sku: 'EV-CC-01',
    price: '€18',
    description: 'A compact half-moon comb for carefully removing surface pilling from cashmere and fine knitwear.',
    ritual: 'For cashmere and fine knits.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-cashmere-comb-catalog.webp?v=1790168185',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-cashmere-comb-detail.webp?v=1790168195',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-cashmere-comb-lifestyle.webp?v=1790168204',
    ],
    alt: [
      'EVERNE Cashmere Comb studio product view',
      'EVERNE Cashmere Comb used on knitwear',
      'EVERNE Cashmere Comb with storage pouch',
    ],
  },
  {
    number: '04',
    title: 'Electronic Lint Remover',
    sku: 'EV-WH-01',
    price: '€48',
    description: 'A compact electronic lint remover designed to lift surface lint and pilling from suitable garments and knitwear.',
    ritual: 'A clean reset for worn surfaces.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-electronic-lint-remover-catalog.webp?v=1790168230',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-electronic-lint-remover-detail.webp?v=1790168240',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-electronic-lint-remover-lifestyle.webp?v=1790168250',
    ],
    alt: [
      'EVERNE Electronic Lint Remover studio product view',
      'EVERNE Electronic Lint Remover used on knitwear',
      'EVERNE Electronic Lint Remover with charging cable and cleaning brush',
    ],
  },
  {
    number: '05',
    title: 'Fabric Shaver',
    sku: 'EV-FS-01',
    price: '€32',
    description: 'A rechargeable fabric shaver with three power levels, LED display and USB-C charging for removing lint and pilling from suitable fabrics.',
    ritual: 'Renew texture. Keep the garment.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-catalog.webp?v=1790168261',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-detail.webp?v=1790168271',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-shaver-lifestyle.webp?v=1790168284',
    ],
    alt: [
      'EVERNE Fabric Shaver studio product view',
      'EVERNE Fabric Shaver used on textured knitwear',
      'EVERNE Fabric Shaver with charging cable, brush and packaging',
    ],
  },
];

export function productImages(product: PreviewProduct): [string, string, string] {
  return product.images;
}
