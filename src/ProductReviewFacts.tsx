// Display components only. These values may be supplied solely after the
// independent supplier, sample, legal and founder publication gates pass.
// The active preview intentionally passes no reviewed facts.
export type ReviewedProductFacts = Readonly<{
  retailGrossEur: number;
  sizeLabels: readonly string[];
  colours: readonly string[];
  fitNote: string;
  composition: string;
  careInstructions: string;
  deliveryTerms: string;
  returnsTerms: string;
}>;

export function ProductSizeInformation({ facts }: { facts?: ReviewedProductFacts }) {
  if (!facts) return <>
    <div className="e-product-size-status" aria-label="Size selection unavailable pending fit review">
      <span>SIZE SELECTION</span><span>AWAITING FIT APPROVAL</span>
    </div>
    <p className="e-product-fit-note">Size information will appear only after garment measurements and fit have been checked.</p>
  </>;

  return <>
    <p className="e-product-reviewed-price" aria-label={`Reviewed price: ${facts.retailGrossEur} euros`}>€{facts.retailGrossEur}</p>
    <div className="e-product-size-status" aria-label="Verified size labels; ordering is not active in this preview">
      <span>VERIFIED SIZES</span><span>NOT OPEN FOR ORDERING</span>
    </div>
    <ul className="e-product-reviewed-sizes" aria-label="Measured size options">
      {facts.sizeLabels.map((size) => <li key={size}>{size}</li>)}
    </ul>
    <p className="e-product-fit-note">{facts.fitNote}</p>
  </>;
}

export function ProductFactsAccordion({ facts }: { facts?: ReviewedProductFacts }) {
  if (!facts) return <details className="e-product-accordion">
    <summary>Details under review</summary>
    <dl>
      <div><dt>Composition &amp; care</dt><dd>Pending fabric, care-label and physical-sample review.</dd></div>
      <div><dt>Sizes &amp; colours</dt><dd>Not verified or offered at this stage.</dd></div>
      <div><dt>Price &amp; delivery</dt><dd>Not published. No orders or reservations can be placed.</dd></div>
    </dl>
  </details>;

  return <>
    <details className="e-product-accordion">
      <summary>Material &amp; care</summary>
      <dl>
        <div><dt>Composition</dt><dd>{facts.composition}</dd></div>
        <div><dt>Care instructions</dt><dd>{facts.careInstructions}</dd></div>
        <div><dt>Colours</dt><dd>{facts.colours.join(', ')}</dd></div>
      </dl>
    </details>
    <details className="e-product-accordion">
      <summary>Delivery &amp; returns</summary>
      <dl>
        <div><dt>Delivery</dt><dd>{facts.deliveryTerms}</dd></div>
        <div><dt>Returns</dt><dd>{facts.returnsTerms}</dd></div>
      </dl>
    </details>
  </>;
}
