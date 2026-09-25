export type PreviewVariant = {
  name: string;
  sku: string;
  images: [string, string, string];
  alt: [string, string, string];
};

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
  variants?: PreviewVariant[];
  facts?: string[];
  tagline?: string;
  benefits?: Array<{ title: string; copy: string }>;
  howToUse?: string;
  care?: string;
  details?: string[];
};

export const previewProducts: PreviewProduct[] = [
  {
    number: '01',
    title: 'Fabric Reviver',
    handle: 'everne-fabric-reviver',
    sku: 'EV-FR-01',
    price: '€39',
    description: 'A compact handheld tool for removing visible lint and light surface pilling from suitable garments and textiles. Designed for quick everyday fabric renewal between wears.',
    ritual: 'Quick fabric renewal for everyday wear.',
    tagline: 'A cleaner surface, in a few controlled passes.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-hero-premium.png?v=1790336388',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-lifestyle-premium.png?v=1790336398',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-detail-premium.png?v=1790336408',
    ],
    alt: [
      'Fabric Reviver premium studio product image',
      'Fabric Reviver in use on premium knitwear',
      'Fabric Reviver detail image on neutral knitwear',
    ],
    facts: ['Compact handheld format', 'Visible lint + light pilling', 'Everyday garment care'],
    benefits: [
      { title: 'Everyday renewal', copy: 'Made for quick garment-care sessions when visible lint or light surface pilling makes a piece look tired.' },
      { title: 'Compact format', copy: 'Easy to keep close to the wardrobe and simple to use as part of a regular care routine.' },
      { title: 'Controlled care', copy: 'Work slowly with light pressure and choose the least intensive intervention that restores the surface.' },
    ],
    howToUse: 'Lay the garment on a flat, stable surface. Work slowly with light pressure over the affected area and avoid seams, buttons, zips and loose threads.',
    care: 'Always follow the garment care label and test delicate or unfamiliar fabrics on an inconspicuous area first.',
    details: ['Compact handheld garment-care tool', 'Designed for visible lint and light surface pilling', 'Suitable for everyday garment-care routines'],
  },
  {
    number: '02',
    title: 'Fabric Reviver Pro',
    handle: 'electronic-lint-remover',
    sku: 'EV-WH-01',
    price: '€65',
    description: 'A larger handheld fabric-care tool for visible pilling and loose surface fibres on suitable garments and textiles. The integrated display provides clear operating feedback while you work.',
    ritual: 'More intensive surface care.',
    tagline: 'Restore the surface. Keep the garment.',
    images: [
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-cream-studio.png?v=1790337911',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-cream-lifestyle.png?v=1790337923',
      'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-cream-detail.png?v=1790337936',
    ],
    alt: [
      'Fabric Reviver Pro Cream studio view',
      'Fabric Reviver Pro Cream lifestyle view',
      'Fabric Reviver Pro Cream detail view',
    ],
    variants: [
      {
        name: 'Cream',
        sku: 'EV-WH-01',
        images: [
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-cream-studio.png?v=1790337911',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-cream-lifestyle.png?v=1790337923',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-cream-detail.png?v=1790337936',
        ],
        alt: ['Fabric Reviver Pro Cream studio view', 'Fabric Reviver Pro Cream lifestyle view', 'Fabric Reviver Pro Cream detail view'],
      },
      {
        name: 'White',
        sku: 'EV-WH-02',
        images: [
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-white-studio.jpg?v=1790337944',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-white-lifestyle.jpg?v=1790337953',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-white-detail.jpg?v=1790337964',
        ],
        alt: ['Fabric Reviver Pro White studio view', 'Fabric Reviver Pro White lifestyle view', 'Fabric Reviver Pro White detail view'],
      },
      {
        name: 'Green',
        sku: 'EV-WH-03',
        images: [
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-green-studio.jpg?v=1790337973',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-green-lifestyle.jpg?v=1790337982',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-green-detail.jpg?v=1790337989',
        ],
        alt: ['Fabric Reviver Pro Green studio view', 'Fabric Reviver Pro Green lifestyle view', 'Fabric Reviver Pro Green detail view'],
      },
      {
        name: 'Grey',
        sku: 'EV-WH-04',
        images: [
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-grey-studio.jpg?v=1790337997',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-grey-lifestyle.jpg?v=1790338004',
          'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-fabric-reviver-pro-grey-detail.jpg?v=1790338014',
        ],
        alt: ['Fabric Reviver Pro Grey studio view', 'Fabric Reviver Pro Grey lifestyle view', 'Fabric Reviver Pro Grey detail view'],
      },
    ],
    facts: ['Larger handheld format', 'Integrated display', '4 colour variants'],
    benefits: [
      { title: 'More intensive care', copy: 'Designed for visible pilling and loose surface fibres when a garment needs more than a quick surface reset.' },
      { title: 'Broader working area', copy: 'The larger handheld format is suited to broader fabric areas and regular wardrobe maintenance.' },
      { title: 'Clear feedback', copy: 'The integrated display keeps operating feedback visible during use.' },
    ],
    howToUse: 'Lay the garment on a flat, stable surface. Work slowly with light pressure over the affected area and avoid seams, buttons, zips and loose threads.',
    care: 'Always follow the garment care label and test delicate or unfamiliar fabrics on an inconspicuous area first. Do not use excessive pressure.',
    details: ['Larger handheld garment-care format', 'Integrated operating display', 'Designed for visible pilling and loose surface fibres', 'Available in Cream, White, Green and Grey'],
  },
  {
    number: '03',
    title: 'Steam Brush',
    handle: 'steam-brush',
    sku: 'EV-GB-01',
    price: '€95',
    description: 'A foldable 1000W handheld garment steamer for smoothing light creasing and refreshing clothing between wears. Supplied with a brush attachment and measuring cup for compact at-home garment care.',
    ritual: 'Steam. Refresh. Wear again.',
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
    ],
    howToUse: 'Fill as directed, allow the steamer to heat, then work slowly over suitable fabric while keeping the garment positioned safely. Use the included attachment where appropriate.',
    care: 'Always follow the garment care label. Test delicate or unfamiliar fabrics on an inconspicuous area first. Do not use on materials that should not be exposed to steam or heat.',
    details: ['1000W handheld garment steamer', 'Foldable format', 'Brush attachment included', 'Measuring cup included'],
  },
];

export function productImages(product: PreviewProduct): [string, string, string] {
  return product.images;
}
