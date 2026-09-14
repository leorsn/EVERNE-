export type PreviewProduct = {
  number: string;
  title: string;
  sku: string;
  price: string;
  description: string;
  ritual: string;
  imageDirectory: string;
  alt: [string, string, string];
};

export const previewProducts: PreviewProduct[] = [
  {
    number: '01',
    title: 'The Renewal Set',
    sku: 'EV-RS-01',
    price: '€118',
    description: 'A complete wardrobe-care ritual: brush, comb and aromatic cedar for the pieces you intend to keep.',
    ritual: 'Brush. Restore. Store.',
    imageDirectory: 'renewal-set',
    alt: [
      'EVERNE Renewal Set with garment brush, cashmere comb and cedar pieces',
      'Close detail of the EVERNE Renewal Set in dark wood and cedar',
      'EVERNE Renewal Set arranged beside a considered wardrobe',
    ],
  },
  {
    number: '02',
    title: 'Garment Brush',
    sku: 'EV-GB-01',
    price: '€42',
    description: 'A dark-wood wardrobe brush designed to lift surface dust and restore the hand of woven garments.',
    ritual: 'For coats, tailoring and woven cloth.',
    imageDirectory: 'garment-brush',
    alt: [
      'EVERNE dark-wood garment brush with natural ivory bristles',
      'Close detail of the wood grain and bristles of the EVERNE Garment Brush',
      'EVERNE Garment Brush being used on a charcoal wool coat',
    ],
  },
  {
    number: '03',
    title: 'Cashmere Comb',
    sku: 'EV-CC-01',
    price: '€24',
    description: 'A compact half-moon comb for carefully removing surface pilling from cashmere and fine knitwear.',
    ritual: 'For cashmere and fine knits.',
    imageDirectory: 'cashmere-comb',
    alt: [
      'EVERNE dark-wood Cashmere Comb with silver mesh edge',
      'Close detail of the EVERNE Cashmere Comb on oatmeal knitwear',
      'EVERNE Cashmere Comb being used on a light cashmere garment',
    ],
  },
  {
    number: '04',
    title: 'Cedar Wardrobe Set',
    sku: 'EV-CW-06',
    price: '€29',
    description: 'Six aromatic cedar pieces for a clean, dry wardrobe and the garments resting between seasons.',
    ritual: 'For drawers, shelves and wardrobes.',
    imageDirectory: 'cedar-wardrobe-set',
    alt: [
      'Six EVERNE aromatic cedar wardrobe pieces',
      'Close detail of aromatic cedar blocks on natural linen',
      'EVERNE Cedar Wardrobe Set arranged inside a wardrobe drawer',
    ],
  },
];

export function productImages(product: PreviewProduct): [string, string, string] {
  const root = `${import.meta.env.BASE_URL}products/${product.imageDirectory}`;
  return [`${root}/catalog.webp`, `${root}/detail.webp`, `${root}/lifestyle.webp`];
}
