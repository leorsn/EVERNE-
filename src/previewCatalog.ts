export type PreviewProduct = {
  number: string;
  title: string;
  sku: string;
  price: string;
  description: string;
};

export const previewProducts: PreviewProduct[] = [
  {
    number: '01',
    title: 'The Renewal Set',
    sku: 'EV-RS-01',
    price: '€118',
    description: 'A considered set of tools for brushing, refreshing and preserving the garments you keep in rotation.',
  },
  {
    number: '02',
    title: 'Garment Brush',
    sku: 'EV-GB-01',
    price: '€42',
    description: 'A restrained daily-care tool designed to lift surface dust and restore the hand of woven garments.',
  },
  {
    number: '03',
    title: 'Cashmere Comb',
    sku: 'EV-CC-01',
    price: '€24',
    description: 'A compact comb for removing surface pilling from knitwear without turning care into over-treatment.',
  },
  {
    number: '04',
    title: 'Cedar Wardrobe Set',
    sku: 'EV-CW-06',
    price: '€29',
    description: 'A quiet wardrobe essential using aromatic cedar to support long-term garment storage.',
  },
];
