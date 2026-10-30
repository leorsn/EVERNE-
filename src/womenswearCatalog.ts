export type FashionCategory = 'tops' | 'knitwear' | 'trousers' | 'dresses' | 'skirts';

export type ConceptPiece = {
  name: string;
  category: FashionCategory;
  targetPrice: number;
  tone: 'oat' | 'ink' | 'stone' | 'wine' | 'cocoa' | 'chalk';
};

export function conceptSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

export const fashionCategories: Array<{
  id: FashionCategory;
  title: string;
  count: number;
  priceRange: string;
  description: string;
}> = [
  { id: 'tops', title: 'Tops & Bodysuits', count: 5, priceRange: '€34–€39', description: 'The first layer. Never just a basic.' },
  { id: 'knitwear', title: 'Knitwear', count: 5, priceRange: '€44–€59', description: 'Soft silhouettes for every day.' },
  { id: 'trousers', title: 'Trousers & Denim', count: 4, priceRange: '€54–€59', description: 'Clean lines. Room to move.' },
  { id: 'dresses', title: 'Dresses', count: 3, priceRange: '€44–€59', description: 'For ordinary days and extraordinary moments.' },
  { id: 'skirts', title: 'Skirts', count: 3, priceRange: '€39–€54', description: 'Ease with an edge.' },
];

// Concepts only: these are not Shopify inventory, confirmed supplier products,
// legally binding offers, or photographs of merchandise.
export const conceptPieces: ConceptPiece[] = [
  { name: 'Essential Rib Top', category: 'tops', targetPrice: 34, tone: 'chalk' },
  { name: 'Second Skin Body', category: 'tops', targetPrice: 39, tone: 'ink' },
  { name: 'Soft Line Longsleeve', category: 'tops', targetPrice: 39, tone: 'stone' },
  { name: 'Everyday Tank', category: 'tops', targetPrice: 34, tone: 'oat' },
  { name: 'Fine Knit Top', category: 'tops', targetPrice: 39, tone: 'wine' },
  { name: 'Relaxed Crew Knit', category: 'knitwear', targetPrice: 49, tone: 'oat' },
  { name: 'Wrap Knit Cardigan', category: 'knitwear', targetPrice: 54, tone: 'cocoa' },
  { name: 'Ribbed Turtleneck', category: 'knitwear', targetPrice: 44, tone: 'ink' },
  { name: 'Soft V-Neck', category: 'knitwear', targetPrice: 49, tone: 'chalk' },
  { name: 'Off-Shoulder Knit', category: 'knitwear', targetPrice: 59, tone: 'wine' },
  { name: 'Wide Leg Trouser', category: 'trousers', targetPrice: 54, tone: 'stone' },
  { name: 'Straight Leg Denim', category: 'trousers', targetPrice: 59, tone: 'ink' },
  { name: 'Tailored Everyday Pant', category: 'trousers', targetPrice: 59, tone: 'cocoa' },
  { name: 'Relaxed Denim', category: 'trousers', targetPrice: 54, tone: 'oat' },
  { name: 'The Black Mini', category: 'dresses', targetPrice: 49, tone: 'ink' },
  { name: 'Soft Midi Dress', category: 'dresses', targetPrice: 59, tone: 'stone' },
  { name: 'Easy Slip Dress', category: 'dresses', targetPrice: 44, tone: 'wine' },
  { name: 'Fluid Midi Skirt', category: 'skirts', targetPrice: 44, tone: 'cocoa' },
  { name: 'Tailored Mini Skirt', category: 'skirts', targetPrice: 39, tone: 'chalk' },
  { name: 'Denim Midi Skirt', category: 'skirts', targetPrice: 54, tone: 'oat' },
];

export function formatTargetPrice(value: number): string {
  return new Intl.NumberFormat('en-IE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
