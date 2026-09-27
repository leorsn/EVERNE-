import { useEffect, useMemo, useState } from 'react';
import {
  formatMoney,
  getCart,
  getEdition01,
  removeCartLine,
  updateCartLine,
  type Cart,
  type CartLine,
  type Product,
} from './lib/shopify';
import { previewProducts, productImages, type PreviewProduct } from './previewCatalog';
import { PRODUCT_ORDER, PURCHASES_ENABLED, validateCatalog } from './storefrontConfig';
import './hero-premium.css';

const CART_KEY = 'everne.shopify.cart-id';

const faqs = [
  ['Where do you deliver?', 'Available delivery methods, timing and final shipping cost are shown at Shopify checkout for your address.'],
  ['Are the tools suitable for every fabric?', 'No universal care tool is right for every fabric. Always test an inconspicuous area first and follow the garment care label.'],
  ['What is included in the EVERNE Care Set?', 'The Care Set combines the Cashmere Comb, Fabric Shaver, Soft Care Brush and Double-Sided Lint Brush in one manual care routine.'],
  ['Is payment secure?', 'Yes. Your order and payment are completed through Shopify’s encrypted checkout; payment details are never handled by this storefront.'],
];

function productHref(handle: string) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}products/${handle}`;
}

function previewBySku(sku: string) {
  return previewProducts.find((item) => item.sku === sku) ?? previewProducts[0];
}

function imageForSku(sku: string | null | undefined, index = 0) {
  const preview = previewProducts.find((item) => item.sku === sku || item.variants?.some((variant) => variant.sku === sku));
  if (!preview) return productImages(previewProducts[0])[0];
  const variant = preview.variants?.find((item) => item.sku === sku);
  return variant ? variant.images[index] : productImages(preview)[index];
}

type ProductFeatureProps = {
  preview: PreviewProduct;
  displayNumber: string;
  live?: { product: Product; variant: Product['variants']['nodes'][number] };
};

function ProductFeature({ preview, displayNumber, live }: ProductFeatureProps) {
  const image = productImages(preview)[0];
  const price = live ? formatMoney(live.variant.price) : preview.price;

  return (
    <article className="product-card" id={preview.sku}>
      <div className="product-card-visual">
        <a className="product-card-visual-link" href={productHref(preview.handle)} aria-label={`View ${preview.title} details`}>
          <img src={image} alt={preview.alt[0]} loading="lazy" />
        </a>
      </div>
      <div className="product-card-copy">
        <div className="product-meta"><span>{displayNumber}</span><span>{preview.ritual}</span></div>
        <h3>{preview.title}</h3>
        <p>{preview.description}</p>
        {preview.facts?.length ? <ul className="product-facts" aria-label={`${preview.title} details`}>{preview.facts.map((fact) => <li key={fact}>{fact}</li>)}</ul> : null}
        <div className="product-purchase"><span>{price}</span><a className="product-detail-link" href={productHref(preview.handle)}>View details <span>→</span></a></div>
      </div>
    </article>
  );
}

type BagLineProps = {
  line: CartLine;
  busy: boolean;
  onQuantity: (line: CartLine, quantity: number) => void;
  onRemove: (lineId: string) => void;
};

function BagLine({ line, busy, onQuantity, onRemove }: BagLineProps) {
  return (
    <article className="bag-line">
      <img src={imageForSku(line.merchandise.sku)} alt="" />
      <div className="bag-line-copy">
        <strong>{line.merchandise.product.title}</strong>
        <span>{formatMoney(line.merchandise.price)}</span>
        <div className="quantity" aria-label={`Quantity for ${line.merchandise.product.title}`}>
          <button disabled={busy} onClick={() => onQuantity(line, line.quantity - 1)} aria-label="Decrease quantity">−</button>
          <span>{line.quantity}</span>
          <button disabled={busy} onClick={() => onQuantity(line, line.quantity + 1)} aria-label="Increase quantity">+</button>
        </div>
      </div>
      <button className="remove-line" disabled={busy} onClick={() => onRemove(line.id)}>Remove</button>
    </article>
  );
}

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [commerceError, setCommerceError] = useState<string | null>(null);
  const [busyLine, setBusyLine] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function loadCommerce() {
    setCommerceError(null);
    if (!PURCHASES_ENABLED) {
      localStorage.removeItem(CART_KEY);
      setProducts([]);
      setCart(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const [catalog, restored] = await Promise.all([
        getEdition01(),
        (async () => {
          const id = localStorage.getItem(CART_KEY);
          if (!id) return null;
          try {
            const existing = await getCart(id);
            if (!existing) localStorage.removeItem(CART_KEY);
            return existing;
          } catch {
            localStorage.removeItem(CART_KEY);
            return null;
          }
        })(),
      ]);
      setProducts(catalog);
      setCart(restored);

      const integrity = validateCatalog(catalog);
      if (!integrity.valid) {
        const details = [
          integrity.missingSkus.length ? `missing: ${integrity.missingSkus.join(', ')}` : '',
          integrity.duplicateSkus.length ? `duplicate: ${integrity.duplicateSkus.join(', ')}` : '',
          integrity.unavailableSkus.length ? `unavailable: ${integrity.unavailableSkus.join(', ')}` : '',
        ].filter(Boolean).join(' · ');
        setCommerceError(`Edition 01 is not launch-ready${details ? ` (${details})` : ''}.`);
      }
    } catch (error) {
      setCommerceError(error instanceof Error ? error.message : 'Storefront connection unavailable.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void loadCommerce(); }, []);

  useEffect(() => {
    if (!bagOpen) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setBagOpen(false); };
    document.body.classList.add('bag-is-open');
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.classList.remove('bag-is-open');
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [bagOpen]);

  const liveBySku = useMemo(() => {
    const map = new Map<string, { product: Product; variant: Product['variants']['nodes'][number] }>();
    products.forEach((product) => product.variants.nodes.forEach((variant) => {
      if (variant.sku) map.set(variant.sku, { product, variant });
    }));
    return map;
  }, [products]);

  const orderedProducts = useMemo(() => {
    const rank = new Map(PRODUCT_ORDER.map((sku, index) => [sku, index]));
    return [...previewProducts].sort((a, b) => (rank.get(a.sku) ?? 99) - (rank.get(b.sku) ?? 99));
  }, []);

  const catalogIntegrity = useMemo(() => validateCatalog(products), [products]);
  const catalogConnected = catalogIntegrity.missingSkus.length === 0 && catalogIntegrity.duplicateSkus.length === 0;
  const commerceReady = PURCHASES_ENABLED && catalogIntegrity.valid;

  async function changeQuantity(line: CartLine, quantity: number) {
    if (!cart) return;
    if (quantity < 1) return removeLine(line.id);
    setBusyLine(line.id);
    try {
      setCart(await updateCartLine(cart.id, line.id, quantity));
    } catch (error) {
      setCommerceError(error instanceof Error ? error.message : 'Could not update quantity.');
    } finally {
      setBusyLine(null);
    }
  }

  async function removeLine(lineId: string) {
    if (!cart) return;
    setBusyLine(lineId);
    try {
      const next = await removeCartLine(cart.id, lineId);
      if (!next.totalQuantity) {
        localStorage.removeItem(CART_KEY);
        setCart(null);
      } else setCart(next);
    } catch (error) {
      setCommerceError(error instanceof Error ? error.message : 'Could not update bag.');
    } finally {
      setBusyLine(null);
    }
  }

  const careSet = previewBySku('EV-CS-BL');
  const cashmereComb = previewBySku('EV-CC-01');
  const fabricShaver = previewBySku('EV-FS-01');
  const softCareBrush = previewBySku('EV-SCB-01');
  const lintBrush = previewBySku('EV-DLB-01');

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#collection">Skip to collection</a>
      <div className={`status-bar ${commerceReady ? 'is-live' : ''}`} role="status">
        <span>{!PURCHASES_ENABLED ? 'Edition 01 · Preview' : loading ? 'Connecting to Edition 01' : commerceReady ? 'Edition 01 · Available now' : catalogConnected ? 'Edition 01 · Currently unavailable' : 'Edition 01 · Store update'}</span>
        <span>Germany / EUR</span>
      </div>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation"><a href={productHref(careSet.handle)}>Care Set</a><a href="#method">Our method</a><a href="#collection">Collection</a></nav>
        <button className="bag-button" disabled={!PURCHASES_ENABLED || !commerceReady} onClick={() => setBagOpen(true)} aria-label={commerceReady ? 'Open shopping bag' : 'Edition 01 is currently unavailable'}>{commerceReady ? `Bag${cart?.totalQuantity ? ` · ${cart.totalQuantity}` : ''}` : 'Unavailable'}</button>
      </header>

      <main>
        <section className="hero hero-editorial">
          <div className="hero-copy">
            <span className="eyebrow">Manual garment care · Edition 01</span>
            <h1>Care for<br />what you keep.</h1>
            <p>Considered manual tools for cashmere, knitwear and everyday textiles — designed for repeat use and deliberate care.</p>
            <a className="text-link" href={productHref(careSet.handle)}>Discover the Care Set <span>→</span></a>
            <div className="hero-principles" aria-label="EVERNE principles"><span>Use longer</span><span>Care deliberately</span><span>Replace less</span></div>
          </div>

          <div className="hero-architecture" aria-hidden="true">
            <div className="arch-backdrop" /><div className="arch-curve" /><div className="arch-panel" /><div className="arch-dark-block" /><div className="arch-plinth" />
            <div className="arch-branch"><span className="stem" /><span className="leaf" /><span className="leaf" /><span className="leaf" /><span className="leaf" /><span className="leaf" /><span className="leaf" /><span className="leaf" /></div>
          </div>

          <div className="hero-index"><span>EVERNE / 2026</span><span>A more considered care routine</span></div>
        </section>

        <section className="manifesto">
          <div className="section-label"><span>01</span><span>Our premise</span></div>
          <h2>Simple tools.<br /><em>Better care.</em></h2>
          <div className="manifesto-copy"><p>EVERNE is built around a simple idea: textile care should be controlled, reusable and easy to understand. Start with the least intensive tool, work deliberately and keep the pieces worth owning in better condition.</p><a className="text-link" href={productHref(careSet.handle)}>Meet the Care Set <span>↘</span></a></div>
        </section>

        <section className="object-story" id="method">
          <div className="object-image"><img src={productImages(careSet)[0]} alt={careSet.alt[0]} /></div>
          <div className="object-copy">
            <div className="section-label"><span>02</span><span>The care system</span></div>
            <span className="eyebrow">Four tools · One routine</span>
            <h2>Choose the tool<br /><em>the surface needs.</em></h2>
            <div className="method-list">
              <article><span>01</span><div><h3>Cashmere Comb</h3><p>Target visible surface pilling on suitable cashmere and fine knitwear with controlled passes.</p></div></article>
              <article><span>02</span><div><h3>Fabric Shaver</h3><p>Lift visible lint, loose fibres and light surface debris without batteries or charging.</p></div></article>
              <article><span>03</span><div><h3>Soft Care Brush</h3><p>Use soft natural bristles for light dry surface care across suitable textiles.</p></div></article>
              <article><span>04</span><div><h3>Double-Sided Lint Brush</h3><p>Reset everyday surfaces by lifting loose lint, hair and dust with a reusable brush.</p></div></article>
            </div>
          </div>
        </section>

        <section className="collection" id="collection">
          <div className="collection-heading"><div className="section-label"><span>03</span><span>The collection</span></div><h2>The full Edition 01.</h2><p>Nine products across manual and powered care, with the Care Set and four core manual tools leading the collection.</p></div>
          {PURCHASES_ENABLED && commerceError && <div className="commerce-note" role="alert"><span>{commerceError}</span><button onClick={() => void loadCommerce()}>Try again</button></div>}
          <div className="product-grid">{orderedProducts.map((preview, index) => <ProductFeature key={preview.sku} preview={preview} displayNumber={String(index + 1).padStart(2, '0')} live={liveBySku.get(preview.sku)} />)}</div>
        </section>

        <section className="journal" id="journal">
          <div className="journal-heading"><div className="section-label"><span>04</span><span>Field notes</span></div><h2>Care, without excess.</h2></div>
          <div className="journal-grid">
            <article><img src={productImages(cashmereComb)[2]} alt={cashmereComb.alt[2]} loading="lazy" /><span>Knitwear care · Note 01</span><h3>Fine knitwear benefits from slow, targeted surface care rather than aggressive treatment.</h3></article>
            <article><img src={productImages(softCareBrush)[1]} alt={softCareBrush.alt[1]} loading="lazy" /><span>Surface care · Note 02</span><h3>For light dust and loose fibres, start with the gentlest tool that can do the job.</h3></article>
          </div>
        </section>

        <section className="faq" id="faq">
          <div><div className="section-label"><span>05</span><span>Good to know</span></div><h2>The details,<br /><em>considered.</em></h2></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <article key={question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span>{openFaq === index ? '−' : '+'}</span></button><div className={openFaq === index ? 'faq-answer open' : 'faq-answer'}><p>{answer}</p></div></article>)}</div>
        </section>

        <section className="closing closing-light">
          <div className="closing-copy"><span className="eyebrow">The EVERNE Care Set</span><h2>Four tools.<br />One considered routine.</h2><p>€99 · individual total €118</p><a className="text-link" href={productHref(careSet.handle)}>Explore the Care Set <span>→</span></a></div>
          <div className="object-image"><img src={productImages(careSet)[1]} alt={careSet.alt[1]} loading="lazy" /></div>
        </section>
      </main>

      <footer>
        <div className="footer-lead"><a className="brand" href="#top">EVERNE</a><p>Care for what you keep.</p></div>
        <div><span>Core care</span><a href={productHref(careSet.handle)}>The Care Set</a><a href={productHref(cashmereComb.handle)}>Cashmere Comb</a><a href={productHref(fabricShaver.handle)}>Fabric Shaver</a><a href={productHref(softCareBrush.handle)}>Soft Care Brush</a><a href={productHref(lintBrush.handle)}>Lint Brush</a></div>
        <div><span>Service</span><button disabled={!commerceReady} onClick={() => setBagOpen(true)}>{commerceReady ? 'Shopping bag' : 'Orders currently closed'}</button><a href="#faq">Care & delivery</a></div>
        <div><span>Legal</span><a href="/rechtliches.html#impressum">Impressum</a><a href="/rechtliches.html#datenschutz">Datenschutz</a><a href="/rechtliches.html#widerruf">Widerruf</a><a href="/rechtliches.html#agb">AGB</a><a href="/rechtliches.html#versand">Versand & Retouren</a></div>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>Hamburg, Germany · EUR</span><span>Commerce by Shopify</span></div>
      </footer>

      <button className={`bag-backdrop ${bagOpen ? 'open' : ''}`} onClick={() => setBagOpen(false)} aria-label="Close shopping bag" tabIndex={bagOpen ? 0 : -1} />
      <aside className={`bag ${bagOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!bagOpen} aria-label="Shopping bag">
        <div className="bag-head"><div><span>EVERNE</span><strong>Your bag</strong></div><button onClick={() => setBagOpen(false)} aria-label="Close bag">Close</button></div>
        {!commerceReady || !cart?.lines.nodes.length ? <div className="empty-bag"><span>Edition 01</span><p>Currently<br />unavailable.</p><small>Orders will open after final product and fulfillment checks are complete.</small><button onClick={() => setBagOpen(false)}>Continue exploring</button></div> : <><div className="bag-lines">{cart.lines.nodes.map((line) => <BagLine key={line.id} line={line} busy={busyLine === line.id} onQuantity={changeQuantity} onRemove={removeLine} />)}</div><div className="bag-summary"><div><span>Subtotal</span><strong>{formatMoney(cart.cost.subtotalAmount)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><a className="checkout" href={cart.checkoutUrl}>Continue to secure checkout <span>↗</span></a><small>Secure checkout powered by Shopify</small></div></>}
      </aside>
    </div>
  );
}
