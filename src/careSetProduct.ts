import { previewProducts, type PreviewProduct } from './previewCatalog';

export const careSetProduct = {
  number: '07',
  title: 'The EVERNE Care Set',
  handle: 'the-everne-care-set',
  sku: 'EV-CS-BL',
  price: '€99',
  description: 'A complete manual care routine for the textiles you keep. Four complementary tools for considered everyday garment and textile care, brought together as one set.',
  ritual: 'Four tools. One considered care routine.',
  tagline: 'The essentials for keeping garments and textiles in better condition.',
  images: [
    'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-blue-hero.png?v=1790528490',
    'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-pink-hero.png?v=1790528504',
    'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-blue-flatlay.png?v=1790528516',
    'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-pink-lifestyle.png?v=1790528527',
  ],
  alt: [
    'The EVERNE Care Set in Blue',
    'The EVERNE Care Set in Pink',
    'The EVERNE Care Set in Blue, flat lay',
    'The EVERNE Care Set in Pink, lifestyle view',
  ],
  variants: [
    {
      name: 'Blue',
      sku: 'EV-CS-BL',
      images: [
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-blue-hero.png?v=1790528490',
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-blue-flatlay.png?v=1790528516',
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-pink-hero.png?v=1790528504',
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-pink-lifestyle.png?v=1790528527',
      ],
      alt: [
        'The EVERNE Care Set in Blue',
        'The EVERNE Care Set in Blue, flat lay',
        'The EVERNE Care Set in Pink',
        'The EVERNE Care Set in Pink, lifestyle view',
      ],
    },
    {
      name: 'Pink',
      sku: 'EV-CS-PK',
      images: [
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-pink-hero.png?v=1790528504',
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-pink-lifestyle.png?v=1790528527',
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-blue-hero.png?v=1790528490',
        'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-care-set-blue-flatlay.png?v=1790528516',
      ],
      alt: [
        'The EVERNE Care Set in Pink',
        'The EVERNE Care Set in Pink, lifestyle view',
        'The EVERNE Care Set in Blue',
        'The EVERNE Care Set in Blue, flat lay',
      ],
    },
  ],
  facts: ['4-piece care set', 'Manual + reusable tools', 'Blue or Pink lint brush'],
  benefits: [
    { title: 'Complete routine', copy: 'Four complementary tools cover pilling, loose fibres, lint, hair and light surface dust across suitable garments and household textiles.' },
    { title: 'Made to be reused', copy: 'A considered set built around repeat-use care tools rather than disposable sheets or single-use accessories.' },
    { title: 'Better value together', copy: 'The complete set is €99 compared with €118 when the four products are purchased individually.' },
  ],
  howToUse: 'Choose the least intensive tool suited to the surface. Work slowly with light pressure on clean, dry textiles and use the more targeted tools only where needed.',
  care: 'Always follow the garment or textile care label and test delicate or unfamiliar materials on an inconspicuous area first. Avoid excessive pressure and discontinue use if the surface snags or reacts.',
  details: ['Cashmere Comb', 'Fabric Shaver', 'Soft Care Brush', 'Double-Sided Lint Brush', 'Lint Brush available in Blue or Pink', 'Set price €99 · individual total €118'],
} as unknown as PreviewProduct;

if (!previewProducts.some((product) => product.handle === careSetProduct.handle)) {
  previewProducts.push(careSetProduct);
}
