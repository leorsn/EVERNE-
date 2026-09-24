import { useParams } from 'react-router-dom';
import { previewProducts, type PreviewProduct } from './previewCatalog';
import './product-detail.css';

const PURCHASES_ENABLED = false;

function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
}

function ProductMiniCard({ product }: { product: PreviewProduct }) {
  return (
    <a className="related-product" href={withBase(`products/${product.handle}`)}>
      <div className="related-product-image"><img src={product.images[0]} alt={product.alt[0]} loading="lazy" /></div>
      <div className="related-product-copy">
        <span>{product.number}</span>
        <strong>{product.title}</strong>
        <em>{product.price}</em>
      </div>
    </a>
  );
}

export default function ProductDetailPage() {
  const { handle } = useParams();
  const product = previewProducts.find((item) => item.handle === handle);

  if (!product) {
    return (
      <div className="product-page-shell">
        <header className="topbar product-topbar">
          <a className="brand" href={withBase('')} aria-label="EVERNE home">EVERNE</a>
          <nav aria-label="Primary navigation"><a href={withBase('#steam-brush')}>Steam Brush</a><a href={withBase('#system-comparison')}>System</a><a href={withBase('#collection')}>Collection</a></nav>
          <span className="product-topbar-state">Unavailable</span>
        </header>
        <main className="product-not-found"><span className="eyebrow">EVERNE · Edition 01</span><h1>Product not found.</h1><a className="text-link" href={withBase('#collection')}>Back to collection <span>→</span></a></main>
      </div>
    );
  }

  const isSystem = product.sku === 'EV-RS-01';
  const system = previewProducts.find((item) => item.sku === 'EV-RS-01')!;
  const related = previewProducts.filter((item) => item.sku !== product.sku && item.sku !== 'EV-RS-01').slice(0, 3);

  return (
    <div className="product-page-shell" id="top">
      <div className="status-bar product-status"><span>Edition 01 · Preview</span><span>Germany / EUR</span></div>
      <header className="topbar product-topbar">
        <a className="brand" href={withBase('')} aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation"><a href={withBase('#steam-brush')}>Steam Brush</a><a href={withBase('#system-comparison')}>System</a><a href={withBase('#collection')}>Collection</a></nav>
        <span className="product-topbar-state">Unavailable</span>
      </header>

      <main>
        <div className="product-breadcrumb"><a href={withBase('')}>Home</a><span>/</span><a href={withBase('#collection')}>Edition 01</a><span>/</span><strong>{product.title}</strong></div>

        <section className="product-detail-hero">
          <div className="product-detail-gallery">
            <figure className="product-detail-main-image"><img src={product.images[0]} alt={product.alt[0]} /></figure>
            <div className="product-detail-secondary-images">
              <figure><img src={product.images[1]} alt={product.alt[1]} loading="lazy" /></figure>
              <figure><img src={product.images[2]} alt={product.alt[2]} loading="lazy" /></figure>
            </div>
          </div>

          <div className="product-detail-intro">
            <span className="eyebrow">Edition 01 · {product.number}</span>
            <h1>{product.title}</h1>
            <p className="product-detail-tagline">{product.tagline ?? product.ritual}</p>
            <p className="product-detail-description">{product.description}</p>

            <div className="product-detail-facts" aria-label={`${product.title} key facts`}>
              {product.facts?.map((fact) => <span key={fact}>{fact}</span>)}
            </div>

            <div className="product-detail-buyrow">
              <strong>{product.price}</strong>
              <button disabled={!PURCHASES_ENABLED}>{PURCHASES_ENABLED ? 'Add to bag' : 'Currently unavailable'}</button>
            </div>
            <p className="product-detail-note">Orders remain closed while final product and fulfillment checks are completed.</p>
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
            <span className="eyebrow">Garment care</span>
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

        {isSystem ? (
          <section className="product-system-included">
            <div className="product-detail-section-heading"><span className="eyebrow">Inside the system</span><h2>Four tools. One routine.</h2></div>
            <div className="system-included-grid">
              {previewProducts.filter((item) => ['EV-GB-01', 'EV-WH-01', 'EV-CC-01', 'EV-FS-01'].includes(item.sku)).map((item) => <ProductMiniCard key={item.sku} product={item} />)}
            </div>
          </section>
        ) : (
          <section className="product-system-upsell">
            <div className="product-system-upsell-copy">
              <span className="eyebrow">The EVERNE System</span>
              <h2>Build the full routine.</h2>
              <p>Steam Brush, Electronic Lint Remover, Cashmere Comb and Fabric Care Brush together in one considered wardrobe-care system.</p>
              <div className="system-price-line"><span>Individual value €220</span><strong>€149</strong><em>Save €71</em></div>
              <a className="text-link" href={withBase(`products/${system.handle}`)}>View the system <span>→</span></a>
            </div>
            <div className="product-system-upsell-images">
              {system.images.map((image, index) => <figure key={image}><img src={image} alt={system.alt[index]} loading="lazy" /></figure>)}
            </div>
          </section>
        )}

        <section className="related-products-section">
          <div className="product-detail-section-heading"><span className="eyebrow">Continue exploring</span><h2>Edition 01.</h2></div>
          <div className="related-products-grid">{related.map((item) => <ProductMiniCard key={item.sku} product={item} />)}</div>
        </section>
      </main>

      <footer className="product-footer">
        <div className="footer-lead"><a className="brand" href={withBase('')}>EVERNE</a><p>Care for what you keep.</p></div>
        <div><span>Explore</span><a href={withBase('products/steam-brush')}>Steam Brush</a><a href={withBase('products/the-everne-system')}>The System</a><a href={withBase('#collection')}>Collection</a></div>
        <div><span>Service</span><span>Orders currently closed</span><a href={withBase('#faq')}>Care & delivery</a></div>
        <div><span>Legal</span><a href={withBase('rechtliches.html#impressum')}>Impressum</a><a href={withBase('rechtliches.html#datenschutz')}>Datenschutz</a><a href={withBase('rechtliches.html#widerruf')}>Widerruf</a></div>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>Hamburg, Germany · EUR</span><span>Commerce by Shopify</span></div>
      </footer>
    </div>
  );
}
