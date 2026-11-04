import { useState } from 'react';
import type { ProductPhoto } from './ProductPhotoGallery';

// Temporary internal comparisons only. EPROLO is NOT an approved fulfilment
// supplier, and these photos do not certify that any EVERNE design matches an
// actual product. No SKUs, inventory numbers or cart links are exposed.
export type SupplierCandidate = Readonly<{
  conceptSlug: string;
  supplierTitle: string;
  supplier: 'EPROLO';
  photos: readonly ProductPhoto[];
  colours: readonly string[];
  sizes: readonly string[];
  listedCombinations: readonly Readonly<{ colour: string; size: string }>[];
}>;

const candidates: readonly SupplierCandidate[] = [
  {
    conceptSlug: 'everyday-tank',
    supplierTitle: 'Ribbed Scoop-Neck Tank',
    supplier: 'EPROLO',
    photos: [
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/E540C40744DE19813B01A902CF86E549.jpg?v=1793739744', altText: 'Temporary EPROLO source photograph 1 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/99273374B8E1D6FA69CDD68D68DC7E4A.jpg?v=1793739747', altText: 'Temporary EPROLO source photograph 2 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/C88E2FA20B791DB08D847C522DCC9BEF.jpg?v=1793739750', altText: 'Temporary EPROLO source photograph 3 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/81473ADAC1AE75548D9121394E403775.jpg?v=1793739753', altText: 'Temporary EPROLO source photograph 4 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/26DD360A6E517D7B0E69519CB3FE0004.jpg?v=1793739757', altText: 'Temporary EPROLO source photograph 5 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/8834C7417598AD06FC4750CF65DA2EC4.jpg?v=1793739760', altText: 'Temporary EPROLO source photograph 6 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/F7EB32170D8A56470084979608B80054.jpg?v=1793739763', altText: 'Temporary EPROLO source photograph 7 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/C073640613DDAB057B38C2E5B06274B4.jpg?v=1793739766', altText: 'Temporary EPROLO source photograph 8 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/1746F7206F1B244AF3EF7E3E1D86B0FE.jpg?v=1793739770', altText: 'Temporary EPROLO source photograph 9 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/4523D1F1C60AE30A58A2D3B5CAF51141.jpg?v=1793739773', altText: 'Temporary EPROLO source photograph 10 of Ribbed Scoop-Neck Tank. Not an approved EVERNE product.' },
    ],
    colours: ["Black","Advanced Gray","White"],
    sizes: ["S","M","L"],
    listedCombinations: [{"colour":"Advanced Gray","size":"S"},{"colour":"Advanced Gray","size":"M"},{"colour":"Advanced Gray","size":"L"},{"colour":"White","size":"S"},{"colour":"White","size":"M"},{"colour":"White","size":"L"},{"colour":"Black","size":"S"},{"colour":"Black","size":"M"},{"colour":"Black","size":"L"}],
  },
  {
    conceptSlug: 'soft-line-longsleeve',
    supplierTitle: 'Fitted Crew-Neck Long-Sleeve Top',
    supplier: 'EPROLO',
    photos: [
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/EC9722AEEE00E11F6145006CC1DCCF29.jpg?v=1793739834', altText: 'Temporary EPROLO source photograph 1 of Fitted Crew-Neck Long-Sleeve Top. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/97ABB91CABA21C1EEEC184243F7AD851.jpg?v=1793739837', altText: 'Temporary EPROLO source photograph 2 of Fitted Crew-Neck Long-Sleeve Top. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/2B22357CCFDEB9203A3C8A3112709F01.jpg?v=1793739841', altText: 'Temporary EPROLO source photograph 3 of Fitted Crew-Neck Long-Sleeve Top. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/177FA79ACF2C0985E6E88AE6D204A943.jpg?v=1793739844', altText: 'Temporary EPROLO source photograph 4 of Fitted Crew-Neck Long-Sleeve Top. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/E47E762A01AC1A254CEA3C48660976CC.jpg?v=1793739847', altText: 'Temporary EPROLO source photograph 5 of Fitted Crew-Neck Long-Sleeve Top. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/E9D6A851E89E2CAC1ADB9F9302D1003C.jpg?v=1793739851', altText: 'Temporary EPROLO source photograph 6 of Fitted Crew-Neck Long-Sleeve Top. Not an approved EVERNE product.' },
    ],
    colours: ["Black","Gray","White"],
    sizes: ["S","M","L","XL"],
    listedCombinations: [{"colour":"Black","size":"S"},{"colour":"Black","size":"M"},{"colour":"Black","size":"L"},{"colour":"Black","size":"XL"},{"colour":"White","size":"S"},{"colour":"White","size":"M"},{"colour":"White","size":"L"},{"colour":"White","size":"XL"},{"colour":"Gray","size":"S"},{"colour":"Gray","size":"M"},{"colour":"Gray","size":"L"},{"colour":"Gray","size":"XL"}],
  },
  {
    conceptSlug: 'fluid-midi-skirt',
    supplierTitle: 'Satin-Effect Mermaid Midi Skirt',
    supplier: 'EPROLO',
    photos: [
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/0A79D3B745799482A888D1ED0F67AD92.jpg?v=1793739777', altText: 'Temporary EPROLO source photograph 1 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/337E6E285D08A9F4E7EFDB7FBAC8A702.jpg?v=1793739780', altText: 'Temporary EPROLO source photograph 2 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/FF0E90B741CBFC34B791D965E335EE58.jpg?v=1793739783', altText: 'Temporary EPROLO source photograph 3 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/D23FE6BDB12EF1564AB60C36174A39AC.jpg?v=1793739786', altText: 'Temporary EPROLO source photograph 4 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/7948F720CFC8F62B8BEEC5E3A14994F8.jpg?v=1793739790', altText: 'Temporary EPROLO source photograph 5 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/716C30116C9F07821B603F255A847B07.jpg?v=1793739793', altText: 'Temporary EPROLO source photograph 6 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/8B02D6F845EDC354267558ECBEF10571.jpg?v=1793739796', altText: 'Temporary EPROLO source photograph 7 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/D944F4E20C14C116F4899AAB82DBBB41.jpg?v=1793739799', altText: 'Temporary EPROLO source photograph 8 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/F5B70374012FCD6D1FE6D985D192B3A2.jpg?v=1793739802', altText: 'Temporary EPROLO source photograph 9 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/EEF8C20D67F8F1F9EAAAC08C2D4FC36F.jpg?v=1793739805', altText: 'Temporary EPROLO source photograph 10 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/AAF877F1A24D01D4936E5D2C68E665A6.jpg?v=1793739807', altText: 'Temporary EPROLO source photograph 11 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/BDDC7DCE1E2C49322A7FBD366BAAF22D.jpg?v=1793739810', altText: 'Temporary EPROLO source photograph 12 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/DB9762079FAA7A1B5EA964854051AABD.jpg?v=1793739813', altText: 'Temporary EPROLO source photograph 13 of Satin-Effect Mermaid Midi Skirt. Not an approved EVERNE product.' },
    ],
    colours: ["Black","Silver Gray","White","Wine Red"],
    sizes: ["M","L","XL"],
    listedCombinations: [{"colour":"Wine Red","size":"M"},{"colour":"Wine Red","size":"L"},{"colour":"Wine Red","size":"XL"},{"colour":"Silver Gray","size":"M"},{"colour":"Silver Gray","size":"L"},{"colour":"Silver Gray","size":"XL"},{"colour":"White","size":"M"},{"colour":"White","size":"L"},{"colour":"White","size":"XL"},{"colour":"Black","size":"M"},{"colour":"Black","size":"L"},{"colour":"Black","size":"XL"}],
  },
  {
    conceptSlug: 'tailored-everyday-pant',
    supplierTitle: 'High-Waisted Slim Trousers',
    supplier: 'EPROLO',
    photos: [
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/0E5BD6D5E49C0A6E00B5917C8C9F1791.jpg?v=1793739732', altText: 'Temporary EPROLO source photograph 1 of High-Waisted Slim Trousers. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/E01674196F1F8DDE6F241424552EA397.jpg?v=1793739735', altText: 'Temporary EPROLO source photograph 2 of High-Waisted Slim Trousers. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/1F05B19C7C5C0466E9465DB980B98D06.jpg?v=1793739737', altText: 'Temporary EPROLO source photograph 3 of High-Waisted Slim Trousers. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/9E2C05EC0CB8FBD5A8A6F631D65A228B.jpg?v=1793739739', altText: 'Temporary EPROLO source photograph 4 of High-Waisted Slim Trousers. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/4F2F210C3DF44D6E102E8E344032A5E3.jpg?v=1793739742', altText: 'Temporary EPROLO source photograph 5 of High-Waisted Slim Trousers. Not an approved EVERNE product.' },
      { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/E2F02B1223B8415255CE938042C02655.jpg?v=1793739744', altText: 'Temporary EPROLO source photograph 6 of High-Waisted Slim Trousers. Not an approved EVERNE product.' },
    ],
    colours: ["Black"],
    sizes: ["S","M","L","XL"],
    listedCombinations: [{"colour":"Black","size":"S"},{"colour":"Black","size":"M"},{"colour":"Black","size":"L"},{"colour":"Black","size":"XL"}],
  },
];

export function findSupplierCandidate(handle: string | undefined): SupplierCandidate | undefined {
  return candidates.find((candidate) => candidate.conceptSlug === handle);
}

const colourSwatches: Readonly<Record<string, string>> = {
  Black: '#191919',
  White: '#f3f2ec',
  Gray: '#8b8d8e',
  'Advanced Gray': '#737578',
  'Silver Gray': '#b1b4b7',
  'Wine Red': '#5d2034',
};

export function SupplierCandidateOptions({ candidate }: { candidate: SupplierCandidate }) {
  const [colour, setColour] = useState<string>(
    candidate.colours.includes('Black') ? 'Black' : candidate.colours[0],
  );
  const availableSizes = candidate.sizes.filter((size) =>
    candidate.listedCombinations.some((option) => option.colour === colour && option.size === size),
  );
  const [size, setSize] = useState<string>(
    candidate.listedCombinations.find((option) => option.colour === (candidate.colours.includes('Black') ? 'Black' : candidate.colours[0]))?.size ?? candidate.sizes[0],
  );
  const activeSize = availableSizes.includes(size) ? size : availableSizes[0];

  return <>
    <div className="e-product-colour-panel e-supplier-colour-panel">
      <div><strong>SUPPLIER COLOUR</strong><span>{colour.toUpperCase()}</span></div>
      <div className="e-supplier-colour-grid" role="group" aria-label="Explore unverified supplier colour options">
        {candidate.colours.map((option) => <button
          key={option}
          type="button"
          className={'e-supplier-colour-choice' + (colour === option ? ' e-supplier-colour-selected' : '')}
          aria-pressed={colour === option}
          onClick={() => {
            setColour(option);
            if (!candidate.listedCombinations.some((variant) => variant.colour === option && variant.size === size)) {
              setSize(candidate.listedCombinations.find((variant) => variant.colour === option)?.size ?? candidate.sizes[0]);
            }
          }}
        ><span className="e-supplier-swatch" style={{ backgroundColor: colourSwatches[option] ?? '#d6d6d6' }} aria-hidden="true" /><span>{option}</span></button>)}
      </div>
    </div>
    <div className="e-supplier-size-panel">
      <div className="e-supplier-size-heading"><strong>SUPPLIER SIZE</strong><span>{activeSize}</span></div>
      <div className="e-supplier-colour-grid" role="group" aria-label="Explore unverified supplier sizes">
        {availableSizes.map((option) => <button
          key={option}
          type="button"
          className={'e-supplier-colour-choice' + (activeSize === option ? ' e-supplier-colour-selected' : '')}
          aria-pressed={activeSize === option}
          onClick={() => setSize(option)}
        >{option}</button>)}
      </div>
      <p>Supplier-listed combination: {colour} / {activeSize}. Fit and stock are not verified.</p>
    </div>
    <p className="e-product-disclaimer">Temporary EPROLO supplier comparison: {candidate.supplierTitle}. The images and variant names are not an approval of the EVERNE design. EPROLO is not an approved fulfilment partner. The gallery does not switch to colour-specific photos yet.</p>
  </>;
}
