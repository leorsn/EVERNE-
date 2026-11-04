import { useState } from 'react';
import { Link } from 'react-router-dom';
import ProductPhotoGallery, { type ProductPhoto } from './ProductPhotoGallery';
import './supplier-bag-preview.css';

// A supplier-linked candidate, deliberately separate from the 20 unverified
// garment design studies. These images are temporarily provided by CJ via
// our Shopify draft, and must pass rights/sample review before publication.
export const supplierBagHandle = 'structured-crossbody-bag';

const colourOptions = [
  { name: 'Black', swatch: '#191919', linked: true },
  { name: 'Pearl Blue', swatch: '#b7cbd3', linked: false },
  { name: 'Gray', swatch: '#9a9c9a', linked: false },
  { name: 'Golden Brown', swatch: '#947557', linked: false },
  { name: 'White', swatch: '#f4f2ed', linked: false },
] as const;

const bagPhotos: readonly ProductPhoto[] = [
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/3873c082-baa7-41a1-8f60-a72371e9f7a6.png?v=1793809223', altText: 'CJ supplier photograph 1 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/458c4658-0841-40c1-b3a6-79b29c3a479c.png?v=1793809223', altText: 'CJ supplier photograph 2 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/6ed86682-aafe-49d4-8737-40fa85df7ab0.png?v=1793809223', altText: 'CJ supplier photograph 3 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/c5a227d8-751f-40cf-90a1-6fc89932cfd1.png?v=1793809223', altText: 'CJ supplier photograph 4 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/d55b116e-1378-4fc3-8f0e-dd7d04a3404f.png?v=1793809223', altText: 'CJ supplier photograph 5 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/96a7b28b-e63b-488b-b8ed-c5b7780a0034.png?v=1793809223', altText: 'CJ supplier photograph 6 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/04b83e52-14bf-468f-9a95-f58256c30bec.png?v=1793809223', altText: 'CJ supplier photograph 7 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/94dad37b-34cd-48e8-9d7b-cd0a7ee62bfd.png?v=1793809223', altText: 'CJ supplier photograph 8 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/ce4ecd2b-bbac-4ce7-914d-e10e3e3d1fc8.png?v=1793809223', altText: 'CJ supplier photograph 9 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/6ebcc9a3-8636-4b42-94cf-4a06f1f65334.png?v=1793809223', altText: 'CJ supplier photograph 10 of the structured crossbody bag; colour shown may differ from the selected variant.' },
  { publicPath: 'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/abda4ba6-a1b7-47d3-a6a1-cce52d410814.png?v=1793809223', altText: 'CJ supplier photograph 11 of the structured crossbody bag; colour shown may differ from the selected variant.' },
];

export function SupplierBagCard() {
  return <section className="e-supplier-feature" aria-labelledby="e-supplier-card-title">
    <Link to={'/products/' + supplierBagHandle} className="e-supplier-feature-link">
      <img src={bagPhotos[0].publicPath} alt="Original CJ supplier image of the structured crossbody bag; colour may vary." loading="lazy" decoding="async" />
      <div className="e-supplier-feature-copy">
        <span className="e-supplier-overline">ACCESSORIES / SUPPLIER PREVIEW</span>
        <h2 id="e-supplier-card-title">Structured Crossbody Bag</h2>
        <p>Explore original supplier photographs, five listed colours and one available size.</p>
        <span className="e-supplier-price">€109 · PROPOSED PRICE</span>
        <span className="e-supplier-feature-action">EXPLORE THE PRODUCT <span aria-hidden="true">↗</span></span>
        <small>Private preview only. Supplier and fulfilment review in progress; no checkout.</small>
      </div>
    </Link>
  </section>;
}

export default function SupplierBagPreview() {
  const [selectedColour, setSelectedColour] = useState<string>('Black');
  const selected = colourOptions.find((option) => option.name === selectedColour) ?? colourOptions[0];

  return <div className="e-shop-shell e-shop-shell-product e-supplier-shell">
    <aside className="e-shop-sidebar" aria-label="Collection navigation">
      <div className="e-sidebar-desktop">
        <span className="e-sidebar-title">THE EDIT</span>
        <nav className="e-sidebar-categories" aria-label="Browse the edit">
          <Link to="/collections/all"><span>All pieces</span></Link>
          <Link to="/care" className="e-sidebar-selected" aria-current="location"><span>Accessories</span></Link>
        </nav>
      </div>
      <details className="e-sidebar-mobile">
        <summary>Browse collection <span>Accessories</span></summary>
        <div className="e-sidebar-mobile-content">
          <Link to="/collections/all">All pieces</Link>
          <Link to="/care">Accessories</Link>
        </div>
      </details>
    </aside>
    <div className="e-shop-content">
      <nav className="e-product-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">EVERNE</Link><span aria-hidden="true">/</span>
        <Link to="/collections/all">THE EDIT</Link><span aria-hidden="true">/</span>
        <span aria-current="page">Structured Crossbody Bag</span>
      </nav>
      <article className="e-product-page" aria-labelledby="supplier-bag-title">
        <div className="e-product-heading">
          <p className="e-product-category"><span>ACCESSORIES / SUPPLIER CANDIDATE</span><span>01 / 01</span></p>
          <div className="e-product-title-row">
            <h1 id="supplier-bag-title" tabIndex={-1}>Structured Crossbody Bag</h1>
            <span className="e-supplier-product-price">€109</span>
          </div>
          <p className="e-product-intro">A structured shoulder and crossbody silhouette. Original supplier photography is shown while we verify each colour and the fulfilment terms.</p>
          <p className="e-product-review-state">SOURCE IMAGES / NOT YET APPROVED FOR PUBLIC SALES</p>
        </div>
        <ProductPhotoGallery photos={bagPhotos} />
        <div className="e-product-information">
          <div className="e-product-colour-panel e-supplier-colour-panel">
            <div><strong>COLOUR</strong><span>{selectedColour.toUpperCase()}</span></div>
            <div className="e-supplier-colour-grid" role="group" aria-label="Select a supplier-listed colour">
              {colourOptions.map((option) => <button
                key={option.name}
                type="button"
                className={'e-supplier-colour-choice' + (selectedColour === option.name ? ' e-supplier-colour-selected' : '')}
                aria-pressed={selectedColour === option.name}
                aria-label={option.name + (option.linked ? ', CJ mapping recorded' : ', supplier connection pending')}
                onClick={() => setSelectedColour(option.name)}
              ><span className="e-supplier-swatch" style={{ backgroundColor: option.swatch }} aria-hidden="true" /><span>{option.name}</span></button>)}
            </div>
            <p className="e-supplier-variant-help">{selected.linked
              ? 'Black has an existing CJ mapping. Stock, image rights and shipment terms still require final release checks.'
              : 'This colour is supplier-listed but not yet mapped to a verified CJ variant. Not available to order.'}</p>
            <p className="e-supplier-variant-help">The gallery contains general supplier photographs. Selecting a colour does not yet switch to a colour-verified photograph.</p>
          </div>
          <div className="e-supplier-size-panel">
            <div className="e-supplier-size-heading"><strong>SIZE</strong><span>ONE SIZE ONLY</span></div>
            <div className="e-supplier-size-choice" aria-label="Only supplier-listed size">30 × 13 × 22 cm</div>
            <p>One size is listed by CJ. No additional sizes have been confirmed.</p>
          </div>
          <button type="button" className="e-product-disabled-cta" disabled>NOT AVAILABLE TO ORDER</button>
          <div className="e-product-service-notes">
            <p><span>PRICE</span><strong>€109 proposed · not a live offer</strong></p>
            <p><span>SHIPPING</span><strong>Costs and service under review</strong></p>
            <p><span>FULFILMENT</span><strong>Automated supplier payment not verified</strong></p>
          </div>
          <div className="e-product-accordions">
            <details className="e-product-accordion"><summary>Product details</summary>
              <p>One size: 30 × 13 × 22 cm. Black, Pearl Blue, Gray, Golden Brown and White are listed by the supplier. Materials, quality and measurements must be checked against a physical sample.</p>
            </details>
            <details className="e-product-accordion"><summary>Delivery &amp; returns</summary>
              <p>Final shipping method, actual landed cost and return arrangements are being evaluated. Orders cannot be placed at this stage.</p>
            </details>
          </div>
          <p className="e-product-disclaimer">Private preview · Temporary CJ supplier photography · Product claims and usage rights pending review.</p>
          <Link className="e-text-link" to="/collections/all">BACK TO THE EDIT <span aria-hidden="true">↗</span></Link>
        </div>
      </article>
    </div>
  </div>;
}
