import './product-detail.css';

const PURCHASES_ENABLED = false;

function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
}

const images = [
  'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-soft-care-brush-studio.png?v=1790347933',
  'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-soft-care-brush-lifestyle.png?v=1790347949',
  'https://cdn.shopify.com/s/files/1/0957/2325/8237/files/everne-soft-care-brush-detail.png?v=1790347959',
] as const;

export default function SoftCareBrushPage() {
  return (
    <div className="product-page-shell" id="top">
      <div className="status-bar product-status"><span>Edition 01 · Preview</span><span>Germany / EUR</span></div>
      <header className="topbar product-topbar">
        <a className="brand" href={withBase('')} aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation"><a href={withBase('#steam-brush')}>Steam Brush</a><a href={withBase('#product-comparison')}>Compare</a><a href={withBase('#collection')}>Collection</a></nav>
        <span className="product-topbar-state">Unavailable</span>
      </header>

      <main>
        <div className="product-breadcrumb"><a href={withBase('')}>Home</a><span>/</span><a href={withBase('#collection')}>Edition 01</a><span>/</span><strong>Soft Care Brush</strong></div>

        <section className="product-detail-hero">
          <div className="product-detail-gallery">
            <figure className="product-detail-main-image"><img src={images[0]} alt="EVERNE Soft Care Brush in beech wood with soft natural bristles" /></figure>
            <div className="product-detail-secondary-images">
              <figure><img src={images[1]} alt="EVERNE Soft Care Brush styled on natural linen" loading="lazy" /></figure>
              <figure><img src={images[2]} alt="Detail of the EVERNE Soft Care Brush on natural stone" loading="lazy" /></figure>
            </div>
          </div>

          <div className="product-detail-intro">
            <span className="eyebrow">Edition 01 · 05</span>
            <h1>Soft Care Brush</h1>
            <p className="product-detail-tagline">Gentle care, naturally.</p>
            <p className="product-detail-description">A considered manual care tool made with a smooth beech-wood body and soft goat-wool bristles. Designed for light, controlled dry brushing on suitable textiles, accessories and everyday objects.</p>

            <div className="product-detail-facts" aria-label="Soft Care Brush key facts">
              <span>Beech wood</span><span>Soft goat-wool bristles</span><span>18 × 5 × 3 cm</span>
            </div>

            <div className="product-detail-buyrow">
              <strong>€29</strong>
              <button disabled={!PURCHASES_ENABLED}>{PURCHASES_ENABLED ? 'Add to bag' : 'Currently unavailable'}</button>
            </div>
            <p className="product-detail-note">Orders remain closed while final product and fulfillment checks are completed.</p>
          </div>
        </section>

        <section className="product-detail-benefits">
          <div className="product-detail-section-heading">
            <span className="eyebrow">What it does</span>
            <h2>Quiet care for everyday surfaces.</h2>
          </div>
          <div className="product-benefit-grid">
            <article><span>01</span><h3>Soft surface care</h3><p>Natural goat-wool bristles provide a gentle brushing surface for suitable dry materials and objects.</p></article>
            <article><span>02</span><h3>Natural construction</h3><p>A smooth beech-wood body gives the brush a warm, understated object quality that fits naturally into a considered care routine.</p></article>
            <article><span>03</span><h3>Controlled by hand</h3><p>No charging, motor or disposable parts. Pressure and movement stay entirely in your control.</p></article>
          </div>
        </section>

        <section className="product-detail-information">
          <article>
            <span className="eyebrow">How to use</span>
            <h2>A light touch.</h2>
            <p>Use with light, controlled strokes on a clean, dry surface. Work gradually and avoid excessive pressure. Remove loosened dust or fibres as you go.</p>
          </article>
          <article>
            <span className="eyebrow">Care note</span>
            <h2>Use with attention.</h2>
            <p>Always test on an inconspicuous area first. Do not use on surfaces that may scratch, snag or react to natural fibres or wood. Keep the brush dry and allow it to air after use.</p>
          </article>
        </section>

        <section className="product-specifications">
          <div><span className="eyebrow">Product details</span><h2>The essentials.</h2></div>
          <ul>
            <li><span>Body · Beech wood</span><span>—</span></li>
            <li><span>Bristles · Soft goat wool</span><span>—</span></li>
            <li><span>Approx. dimensions · 18 × 5 × 3 cm</span><span>—</span></li>
            <li><span>Format · Manual, non-electric</span><span>—</span></li>
          </ul>
        </section>
      </main>

      <footer className="product-footer">
        <div className="footer-lead"><a className="brand" href={withBase('')}>EVERNE</a><p>Care for what you keep.</p></div>
        <div><span>Explore</span><a href={withBase('products/everne-fabric-reviver')}>Fabric Reviver</a><a href={withBase('products/electronic-lint-remover')}>Fabric Reviver Pro</a><a href={withBase('products/steam-brush')}>Steam Brush</a></div>
        <div><span>Service</span><span>Orders currently closed</span><a href={withBase('#faq')}>Care & delivery</a></div>
        <div><span>Legal</span><a href={withBase('rechtliches.html#impressum')}>Impressum</a><a href={withBase('rechtliches.html#datenschutz')}>Datenschutz</a><a href={withBase('rechtliches.html#widerruf')}>Widerruf</a></div>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>Hamburg, Germany · EUR</span><span>Commerce by Shopify</span></div>
      </footer>
    </div>
  );
}
