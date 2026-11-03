// Copy-only concepts for the protected EVERNE design preview.
// These are not confirmed garments, prices, variants, materials or offers.
// Keep supplier research, target prices and SKU data out of this client module.

export type DraftCategory = 'tops' | 'knitwear' | 'trousers' | 'dresses' | 'skirts';

export type ProductDraft = {
  slug: string;
  name: string;
  category: DraftCategory;
  description: string;
  designDirection: string;
  stylingNote: string;
  fitDirection: string;
};

export const draftCategories: { id: DraftCategory; label: string }[] = [
  { id: 'tops', label: 'Tops & Bodysuits' },
  { id: 'knitwear', label: 'Knitwear' },
  { id: 'trousers', label: 'Trousers & Denim' },
  { id: 'dresses', label: 'Dresses' },
  { id: 'skirts', label: 'Skirts' },
];

export const productDrafts: ProductDraft[] = [
  {
    slug: 'essential-rib-top', name: 'Essential Rib Top', category: 'tops',
    description: 'An everyday foundation conceived with a neat, close line and an intentionally understated character. The kind of starting point that lets the rest of a look speak.',
    designDirection: 'A rib-inspired surface and a clean neckline are part of the design brief. The final fabric, cut and finish remain subject to sample review.',
    stylingNote: 'Pair the proposed silhouette with relaxed denim, a tailored trouser or a jacket worn open.',
    fitDirection: 'Close-fitting visual direction; measurements and stretch have not been verified.',
  },
  {
    slug: 'second-skin-body', name: 'Second Skin Body', category: 'tops',
    description: 'A streamlined base-layer concept intended to create a continuous line beneath tailoring. Restrained in appearance, with versatility at its centre.',
    designDirection: 'The intended effect is smooth and minimal, with the final neckline, closure construction and coverage still to be assessed.',
    stylingNote: 'Envisioned beneath a blazer or with wide-leg trousers for a simple, balanced silhouette.',
    fitDirection: 'Body-skimming design goal; torso length, fastening and fit must be tested.',
  },
  {
    slug: 'soft-line-longsleeve', name: 'Soft Line Longsleeve', category: 'tops',
    description: 'A long-sleeved wardrobe concept built around an uncomplicated outline. Designed on paper to feel equally at home on its own or beneath another layer.',
    designDirection: 'A quiet neckline and softly defined shape lead the visual direction. Fabric handfeel and sleeve proportions are not yet confirmed.',
    stylingNote: 'Consider a tonal outfit with straight-leg denim or a clean skirt.',
    fitDirection: 'An easy, lightly shaped line is intended; the actual fit is pending review.',
  },
  {
    slug: 'everyday-tank', name: 'Everyday Tank', category: 'tops',
    description: 'A pared-back sleeveless concept with the simplicity of a piece you reach for repeatedly. Nothing decorative; the interest comes from proportion.',
    designDirection: 'Armhole shape, neckline depth and length are the key decisions for the final sample.',
    stylingNote: 'Wear the idea with denim in warmer months or as a base beneath knitwear and tailoring.',
    fitDirection: 'A clean, close-to-body silhouette is proposed; no size or opacity claims are confirmed.',
  },
  {
    slug: 'fine-knit-top', name: 'Fine Knit Top', category: 'tops',
    description: 'An elevated alternative to a simple top, considered for days that call for a slightly more polished base layer.',
    designDirection: 'A fine-knit appearance and subtle shaping guide the concept. Yarn, composition and actual texture still require verification.',
    stylingNote: 'A natural partner for tailored separates, a midi skirt or dark denim.',
    fitDirection: 'A gently defined fit is the intention; gauge and measurements are pending.',
  },
  {
    slug: 'relaxed-crew-knit', name: 'Relaxed Crew Knit', category: 'knitwear',
    description: 'A quietly relaxed knitwear idea built around a familiar crew neckline and an easy everyday shape.',
    designDirection: 'The brief favours generous but controlled proportions, with attention to the hem and shoulder line. No fibre or weight is confirmed.',
    stylingNote: 'Balance its intended volume with a narrow skirt or wear with a loose trouser for a softer look.',
    fitDirection: 'Relaxed fit direction; finished length, shoulder and drape remain to be tested.',
  },
  {
    slug: 'wrap-knit-cardigan', name: 'Wrap Knit Cardigan', category: 'knitwear',
    description: 'A layer with a more considered line, imagined around the gesture of wrapping and the ease of everyday knitwear.',
    designDirection: 'The proposed overlap and waist definition are central to the silhouette. Fastening and construction need sample approval.',
    stylingNote: 'Style the proposed wrap with tailored trousers or over a simple dress.',
    fitDirection: 'Adjustable-looking waist is a design intention, not a confirmed fit feature.',
  },
  {
    slug: 'ribbed-turtleneck', name: 'Ribbed Turtleneck', category: 'knitwear',
    description: 'A high-neck essential concept with a clean, uninterrupted shape for colder-day layering.',
    designDirection: 'The design focuses on the balance between neck height, body shape and a ribbed visual texture. Actual comfort and composition are unverified.',
    stylingNote: 'A considered base for a tailored jacket, wide-leg trouser or midi skirt.',
    fitDirection: 'Fitted silhouette envisaged; neck stretch and sizing require physical assessment.',
  },
  {
    slug: 'soft-v-neck', name: 'Soft V-Neck', category: 'knitwear',
    description: 'An understated V-neck knit concept that introduces openness without losing the calm character of the collection.',
    designDirection: 'The shape of the neckline and the fall of the shoulder are the details to resolve before a final selection.',
    stylingNote: 'Layer the idea over a simple tank, or wear with clean denim and minimal accessories.',
    fitDirection: 'An easy straight fit is proposed; the finished silhouette is not yet confirmed.',
  },
  {
    slug: 'off-shoulder-knit', name: 'Off-Shoulder Knit', category: 'knitwear',
    description: 'A knitwear concept with an expressive neckline, tempered by a restrained overall silhouette.',
    designDirection: 'An off-shoulder line is the defining idea. Neckline stability, coverage and wearability still need to be checked.',
    stylingNote: 'Pair the intended neckline with simple trousers or a longer skirt, keeping accessories discreet.',
    fitDirection: 'Softly shaped body direction; how the neckline sits in motion is unverified.',
  },
  {
    slug: 'wide-leg-trouser', name: 'Wide Leg Trouser', category: 'trousers',
    description: 'A wide-leg trouser concept intended to bring ease and precision into the same silhouette.',
    designDirection: 'A longer vertical line and considered waistband placement define the brief. The actual rise, drape and hem are not approved.',
    stylingNote: 'Balance the intended volume with a close-fitting top or a fine knit.',
    fitDirection: 'Wide through the leg in concept; rise, inseam and grading require fitting.',
  },
  {
    slug: 'straight-leg-denim', name: 'Straight Leg Denim', category: 'trousers',
    description: 'Denim reduced to a clean, familiar line. A concept for the everyday wardrobe, centred on shape rather than decoration.',
    designDirection: 'Straight-leg proportion, wash direction and pocket placement will be evaluated on an actual sample.',
    stylingNote: 'Imagine it with a refined tank, the Essential Rib Top or a relaxed crew knit.',
    fitDirection: 'Straight-leg design target; denim composition and true measurements remain unverified.',
  },
  {
    slug: 'tailored-everyday-pant', name: 'Tailored Everyday Pant', category: 'trousers',
    description: 'A trouser concept that takes a tailored attitude into everyday dressing, with an emphasis on an uncluttered outline.',
    designDirection: 'The intended balance is clean at the waist and easy through the leg. Pleat, closure and construction details are under review.',
    stylingNote: 'Style the proposed silhouette with a fine knit or simple top and restrained footwear.',
    fitDirection: 'Tailored visual direction; exact rise, width and construction must be verified.',
  },
  {
    slug: 'relaxed-denim', name: 'Relaxed Denim', category: 'trousers',
    description: 'An easy denim concept with more room in the silhouette, conceived as a counterpart to the cleaner straight-leg option.',
    designDirection: 'The project is exploring a relaxed line without excessive volume. Wash, fibre composition and finish are not yet confirmed.',
    stylingNote: 'A natural match in concept for a fitted body, long-sleeve top or structured outer layer.',
    fitDirection: 'Relaxed-leg intention; waist, hip and length need an approved fit test.',
  },
  {
    slug: 'the-black-mini', name: 'The Black Mini', category: 'dresses',
    description: 'An uncomplicated little-black-dress concept, imagined with a decisive proportion and very little ornament.',
    designDirection: 'The brief is about a clear neckline and mini length. Coverage, lining, finish and final silhouette must be confirmed.',
    stylingNote: 'The intended simplicity lends itself to a jacket and minimal accessories, by day or evening.',
    fitDirection: 'A shaped mini silhouette is proposed; actual length and fit are not approved.',
  },
  {
    slug: 'soft-midi-dress', name: 'Soft Midi Dress', category: 'dresses',
    description: 'A midi-length dress concept with a gentle line and a quiet everyday sensibility.',
    designDirection: 'The design study considers movement, waist placement and how a midi hem changes the overall proportion.',
    stylingNote: 'Consider the proposed shape with pared-back shoes and a light layer.',
    fitDirection: 'A fluid-looking midi fit is the goal; drape, opacity and size measurements remain pending.',
  },
  {
    slug: 'easy-slip-dress', name: 'Easy Slip Dress', category: 'dresses',
    description: 'An unfussy slip-dress idea defined by simplicity, proportion and the possibility of easy layering.',
    designDirection: 'Strap geometry and a clean fall of fabric are under consideration. No claim about silk, satin or other fibres is made.',
    stylingNote: 'Imagine it alone with minimal accessories or layered beneath a knit.',
    fitDirection: 'Straight, softly falling line intended; coverage and finished length need testing.',
  },
  {
    slug: 'fluid-midi-skirt', name: 'Fluid Midi Skirt', category: 'skirts',
    description: 'A midi-skirt concept that brings movement to a restrained wardrobe without relying on decoration.',
    designDirection: 'A smooth waist and softly moving hem define the proposal. Fabric behaviour and transparency remain unverified.',
    stylingNote: 'Pair the proposed silhouette with a fine-knit top or a close-fitting long sleeve.',
    fitDirection: 'Fluid visual intention; waistband, length and drape need sample confirmation.',
  },
  {
    slug: 'tailored-mini-skirt', name: 'Tailored Mini Skirt', category: 'skirts',
    description: 'A short skirt concept with a tailored attitude: composed, simple and deliberate in its proportion.',
    designDirection: 'The brief considers a crisp outline and restrained detailing. Construction, lining and length must be reviewed.',
    stylingNote: 'Balance its intended structure with a relaxed knit or simple top.',
    fitDirection: 'Structured mini direction; wearability and finished measurements are unverified.',
  },
  {
    slug: 'denim-midi-skirt', name: 'Denim Midi Skirt', category: 'skirts',
    description: 'A denim skirt concept with an elongated line, offering a different expression of the everyday wardrobe.',
    designDirection: 'The design study focuses on midi length, walking ease and a simple front. Wash and construction are still open.',
    stylingNote: 'Imagine it with a tank, ribbed top or knitwear for tonal everyday styling.',
    fitDirection: 'Midi-line proposal; movement, opening and dimensions must be tested.',
  },
];

export function findProductDraft(handle: string | undefined): ProductDraft | undefined {
  return productDrafts.find((item) => item.slug === handle);
}
