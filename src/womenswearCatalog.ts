export type FashionCategory = 'tops' | 'knitwear' | 'trousers' | 'dresses' | 'skirts';

export type ConceptPiece = {
  name: string;
  category: FashionCategory;
  targetPrice: number;
  tone: 'oat' | 'ink' | 'stone' | 'wine' | 'cocoa' | 'chalk';
};

export const fashionCategories: Array<{
  id: FashionCategory;
  title: string;
  count: number;
  priceRange: string;
  description: string;
}> = [
  { id: 'tops', title: 'Tops & Bodys', count: 5, priceRange: '34,90–39,90 €', description: 'Die erste Schicht. Nie nur ein Basic.' },
  { id: 'knitwear', title: 'Strick', count: 5, priceRange: '44,90–59,90 €', description: 'Weiche Silhouetten für jeden Tag.' },
  { id: 'trousers', title: 'Hosen & Denim', count: 4, priceRange: '49,90–59,90 €', description: 'Klare Linien. Bewegungsfreiheit.' },
  { id: 'dresses', title: 'Kleider', count: 3, priceRange: '44,90–59,90 €', description: 'Von spontan bis besonders.' },
  { id: 'skirts', title: 'Röcke', count: 3, priceRange: '39,90–54,90 €', description: 'Leichtigkeit mit Haltung.' },
];

// Concepts only: these are not Shopify inventory, confirmed supplier products,
// legally binding offers, or photographs of merchandise.
export const conceptPieces: ConceptPiece[] = [
  { name: 'Essential Rib Top', category: 'tops', targetPrice: 34.9, tone: 'chalk' },
  { name: 'Second Skin Body', category: 'tops', targetPrice: 39.9, tone: 'ink' },
  { name: 'Soft Line Longsleeve', category: 'tops', targetPrice: 39.9, tone: 'stone' },
  { name: 'Everyday Tank', category: 'tops', targetPrice: 34.9, tone: 'oat' },
  { name: 'Fine Knit Top', category: 'tops', targetPrice: 39.9, tone: 'wine' },
  { name: 'Relaxed Crew Knit', category: 'knitwear', targetPrice: 49.9, tone: 'oat' },
  { name: 'Wrap Knit Cardigan', category: 'knitwear', targetPrice: 54.9, tone: 'cocoa' },
  { name: 'Ribbed Turtleneck', category: 'knitwear', targetPrice: 44.9, tone: 'ink' },
  { name: 'Soft V-Neck', category: 'knitwear', targetPrice: 49.9, tone: 'chalk' },
  { name: 'Off-Shoulder Knit', category: 'knitwear', targetPrice: 59.9, tone: 'wine' },
  { name: 'Wide Leg Trouser', category: 'trousers', targetPrice: 54.9, tone: 'stone' },
  { name: 'Straight Leg Denim', category: 'trousers', targetPrice: 59.9, tone: 'ink' },
  { name: 'Tailored Everyday Pant', category: 'trousers', targetPrice: 59.9, tone: 'cocoa' },
  { name: 'Relaxed Denim', category: 'trousers', targetPrice: 54.9, tone: 'oat' },
  { name: 'The Black Mini', category: 'dresses', targetPrice: 49.9, tone: 'ink' },
  { name: 'Soft Midi Dress', category: 'dresses', targetPrice: 59.9, tone: 'stone' },
  { name: 'Easy Slip Dress', category: 'dresses', targetPrice: 44.9, tone: 'wine' },
  { name: 'Fluid Midi Skirt', category: 'skirts', targetPrice: 44.9, tone: 'cocoa' },
  { name: 'Tailored Mini Skirt', category: 'skirts', targetPrice: 39.9, tone: 'chalk' },
  { name: 'Denim Midi Skirt', category: 'skirts', targetPrice: 54.9, tone: 'oat' },
];

export function formatTargetPrice(value: number): string {
  return new Intl.NumberFormat('de-DE', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
  }).format(value);
}
