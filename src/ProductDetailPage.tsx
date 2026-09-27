import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { previewProducts, type PreviewProduct } from './previewCatalog';
import { PRODUCT_ORDER, PURCHASES_ENABLED } from './storefrontConfig';
import './product-detail.css';
import './product-variants.css';

function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
}

function orderedProducts() {
  const rank = new Map(PRODUCT_ORDER.map((sku, index) => [sku, index]));
  return [...previewProducts].sort((a, b) => (rank.get(a.sku) ?? 99) - (rank.get(b.sku) ?? 99));
}

function displayNumber(product: PreviewProduct) {
  const index = orderedProducts().findIndex((item) => item.handle === product.handle);
  return String(index + 1).padStart(2, '0');
}

function ProductMiniCard({ product }: { product: PreviewProduct }) {
  return (
    <a className="related-product" href={withBase(`products/${product.handle}`)}>
      <div className="related-product-image"><img src={product.images[0]} alt={product.alt[0]} loading="lazy" /></div>
      <div className="related-product-copy">
        <span>{displayNumber(product)}</span>
        <strong>{product.title}</strong>
        <em>{product.price}</em>
      </div>
    </a>
  );
}

export default function ProductDetailPage() {
  const { handle } = useParams();
  const products = orderedProducts();
  const product = products.find((item) => item.handle === handle);
  const [variantIndex, setVariantIndex] = useState(0);

  if (!product) {
    return (
      <div className="product-page-shell">
        <header className="topbar product-topbar">
          <a className="brand" href={withBase('')} aria-label="EVERNE home">EVERNE</a>
          <nav aria-label="Primary navigation">
            <a href={withBase('products/the-everne-care-set')}>Care Set</a>
            <a href={withBase('#collection')}>Collection</a>
            <a href={withBase('#faq')}>Care & delivery</a>
          </nav>
          <span className="product-topbar-state">Unavailable</span>
        </header>
        <main className="product-not-found">
          <span className="eyebrow">EVERNE · Edition 01</span>
          <h1>Product not found.</h1>
          <a className="text-link" href={withBase('#collection')}>Back to collection <span>→</span></a>
        </main>
      </div>
    );
  }

  const selectedVariant = product.variants?.[variantIndex];
  const activeImages = selectedVariant?.images ?? product.images;
  const activeAlt = selectedVariant?.alt ?? product.alt;
  const related = products.filter((item) => item.handle !== product.handle);
  const number = displayNumber(product);

  return (
    <div className="product-page-shell" id="top">
      <div className="status-bar product-status"><span>Edition 01 · Preview</span><span>Germany / EUR</span></div>
      <header className="topbar product-topbar">
        <a className="brand" href={withBase('')} aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation">
          <a href={withBase('products/the-everne-care-set')}>Care Set</a>
          <a href={withBase('#collection')}>Collection</a>
          <a href={withBase('#faq')}>Care & delivery</a>
        </nav>
        <span className="product-topbar-state">{PURCHASES_ENABLED ? 'Available' : 'Unavailable'}</span>
      </header>

      <main>
        <div className="product-breadcrumb">
          <a href={withBase('')}>Home</a><span>/</span><a href={withBase('#collection')}>Edition 01</a><span>/</span><strong>{product.title}</strong>
        </div>

        <section className="product-detail-hero">
          <div className="product-detail-gallery">
            <figure className="product-detail-main-image"><img src={activeImages[0]} alt={activeAlt[0]} /></figure>
            <div className="product-detail-secondary-images">
              {activeImages.slice(1).map((image, index) => (
                <figure key={`${image}-${index}`}><img src={image} alt={activeAlt[index + 1] ?? product.title} loading="lazy" /></figure>
              ))}
            </div>
          </div>

          <div className="product-detail-intro">
            <span className="eyebrow">Edition 01 · {number}</span>
            <h1>{product.title}</h1>
            <p className="product-detail-tagline">{product.tagline ?? product.ritual}</p>
            <p className="product-detail-description">{product.description}</p>

            {product.variants?.length ? (
              <div className="product-variant-block">
                <span className="product-variant-label">Colour · {selectedVariant?.name}</span>
                <div className="product-variant-options" role="group" aria-label="Choose colour">
                  {product.variants.map((variant, index) => (
                    <button
                      key={variant.sku}
                      className={index === variantIndex ? 'is-active' : ''}
                      onClick={() => setVariantIndex(index)}
                      type="button"
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <div className="product-detail-facts" aria-label={`${product.title} key facts`}>
              {product.facts?.map((fact) => <span key={fact}>{fact}</span>)}
            </div>

            <div className="product-detail-buyrow">
              <strong>{product.price}</strong>
              <button disabled={!PURCHASES_ENABLED}>{PURCHASES_ENABLED ? 'Add to bag' : 'Currently unavailable'}</button>
            </div>
            <p className="product-detail-note">{PURCHASES_ENABLED ? 'Final shipping costs are shown at checkout.' : 'Orders remain closed while final product and fulfillment checks are completed.'}</p>
          </div>
        </section>

        <section className="product-detail-benefits">
          <div className="product-detail-section-heading">
            <span className="eyebrow">What it does</span>
            <h2>{product.ritual}</h2>
          </div>
          <div className="product-benefit-grid">
            {product.benefits?.map((benefit, index) => (
              <article key={benefit.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="product-detail-information">
          <article>
            <span className="eyebrow">How to use</span>
            <h2>A considered routine.</h2>
            <p>{product.howToUse}</p>
          </article>
          <article>
            <span className="eyebrow">Care note</span>
            <h2>Use with attention.</h2>
            <p>{product.care}</p>
          </article>
        </section>

        <section className="product-specifications">
          <div><span className="eyebrow">Product details</span><h2>The essentials.</h2></div>
          <ul>
            {product.details?.map((detail) => <li key={detail}><span>{detail}</span><span>—</span></li>)}
          </ul>
        </section>

        <section className="related-products-section">
          <div className="product-detail-section-heading"><span className="eyebrow">Continue exploring</span><h2>Edition 01.</h2></div>
          <div className="related-products-grid">{related.map((item) => <ProductMiniCard key={item.handle} product={item} />)}</div>
        </section>
      </main>

      <footer className="product-footer">
        <div className="footer-lead"><a className="brand" href={withBase('')}>EVERNE</a><p>Care for what you keep.</p></div>
        <div>
          <span>Core care</span>
          <a href={withBase('products/the-everne-care-set')}>The Care Set</a>
          <a href={withBase('products/cashmere-comb')}>Cashmere Comb</a>
          <a href={withBase('products/fabric-care-brush')}>Fabric Shaver</a>
          <a href={withBase('products/everne-soft-care-brush')}>Soft Care Brush</a>
          <a href={withBase('products/everne-double-sided-lint-brush')}>Lint Brush</a>
        </div>
        <div><span>Service</span><span>{PURCHASES_ENABLED ? 'Orders open' : 'Orders currently closed'}</span><a href={withBase('#faq')}>Care & delivery</a></div>
        <div>
          <span>Legal</span>
          <a href={withBase('rechtliches.html#impressum')}>Impressum</a>
          <a href={withBase('rechtliches.html#datenschutz')}>Datenschutz</a>
          <a href={withBase('rechtliches.html#widerruf')}>Widerruf</a>
          <a href={withBase('rechtliches.html#agb')}>AGB</a>
          <a href={withBase('rechtliches.html#versand')}>Versand & Retouren</a>
        </div>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>Hamburg, Germany · EUR</span><span>Commerce by Shopify</span></div>
      </footer>
    </div>
  );
}
