import { useEffect, useMemo, useState } from 'react';
import {
  addCartLine,
  createCart,
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
import SteamBrushExperience from './SteamBrushExperience';
import './hero-premium.css';

const CART_KEY = 'everne.shopify.cart-id';
const PURCHASES_ENABLED = false;

const faqs = [
  ['Where do you deliver?', 'Available delivery methods, timing and final shipping cost are shown at Shopify checkout for your address.'],
  ['Are the tools suitable for every fabric?', 'No universal care tool is right for every fabric. Always test an inconspicuous area first and follow the garment care label.'],
  ['What is the difference between Fabric Reviver and Fabric Reviver Pro?', 'The Fabric Reviver is the compact everyday option for visible lint and light surface pilling. The Pro is designed for more intensive surface care, has a larger format and an integrated display.'],
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
  live?: { product: Product; variant: Product['variants']['nodes'][number] };
};

function ProductFeature({ preview, live }: ProductFeatureProps) {
  const image = productImages(preview)[0];
  const price = live ? formatMoney(live.variant.price) : preview.price;

  return (
    <article className="product-card" id={preview.sku}>
      <div className="product-card-visual">
        <a className="product-card-visual-link" href={productHref(preview.handle)} aria-label={`View ${preview.title} details`}>
          <img src={image} alt={preview.alt[0]} loading={preview.number === '01' ? 'eager' : 'lazy'} />
        </a>
      </div>
      <div className="product-card-copy">
        <div className="product-meta"><span>{preview.number}</span><span>{preview.ritual}</span></div>
        <h3>{preview.title}</h3>
        <p>{preview.description}</p>
        {preview.facts?.length ? (
          <ul className="product-facts" aria-label={`${preview.title} details`}>
            {preview.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
        ) : null}
        <div className="product-purchase">
          <span>{price}</span>
          <a className="product-detail-link" href={productHref(preview.handle)}>View details <span>→</span></a>
        </div>
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
  const [busySku, setBusySku] = useState<string | null>(null);
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
      if (!catalog.length) setCommerceError('Edition 01 is temporarily unavailable. Please try again.');
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

  const catalogConnected = previewProducts.every((item) => liveBySku.has(item.sku));
  const commerceReady = PURCHASES_ENABLED && previewProducts.every((item) => {
    const live = liveBySku.get(item.sku);
    return Boolean(live?.product.availableForSale && live.variant.availableForSale);
  });

  async function addToBag(sku: string) {
    if (!PURCHASES_ENABLED) return;
    const live = liveBySku.get(sku);
    if (!live?.product.availableForSale || !live.variant.availableForSale) return;
    setBusySku(sku);
    setCommerceError(null);
    try {
      let next: Cart;
      if (cart) {
        try { next = await addCartLine(cart.id, live.variant.id); }
        catch {
          localStorage.removeItem(CART_KEY);
          next = await createCart(live.variant.id);
        }
      } else {
        next = await createCart(live.variant.id);
      }
      setCart(next);
      localStorage.setItem(CART_KEY, next.id);
      setBagOpen(true);
    } catch (error) {
      setCommerceError(error instanceof Error ? error.message : 'Could not update bag.');
    } finally {
      setBusySku(null);
    }
  }

  async function changeQuantity(line: CartLine, quantity: number) {
    if (!cart) return;
    if (quantity < 1) return removeLine(line.id);
    setBusyLine(line.id);
    try {
      const next = await updateCartLine(cart.id, line.id, quantity);
      setCart(next);
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

  const fabricReviver = previewBySku('EV-FR-01');
  const fabricReviverPro = previewBySku('EV-WH-01');
  const steamBrush = previewBySku('EV-GB-01');
  const steamLive = liveBySku.get('EV-GB-01');
  const proLive = liveBySku.get('EV-WH-01');
  const steamPrice = steamLive ? formatMoney(steamLive.variant.price) : steamBrush.price;
  const proPrice = proLive ? formatMoney(proLive.variant.price) : fabricReviverPro.price;

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#steam-brush">Skip to Steam Brush</a>
      <div className={`status-bar ${commerceReady ? 'is-live' : ''}`} role="status">
        <span>{!PURCHASES_ENABLED ? 'Edition 01 · Preview' : loading ? 'Connecting to Edition 01' : commerceReady ? 'Edition 01 · Available now' : catalogConnected ? 'Edition 01 · Currently unavailable' : 'Edition 01 · Store update'}</span>
        <span>Germany / EUR</span>
      </div>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation"><a href="#steam-brush">Steam Brush</a><a href="#product-comparison">Compare</a><a href="#collection">Collection</a></nav>
        <button className="bag-button" disabled={!PURCHASES_ENABLED} onClick={() => setBagOpen(true)} aria-label="Edition 01 is currently unavailable">Unavailable</button>
      </header>

      <main>
        <section className="hero hero-editorial">
          <div className="hero-copy">
            <span className="eyebrow">Garment care · Edition 01</span>
            <h1>Care for<br />what you keep.</h1>
            <p>Considered tools for restoring the surface, shape and feel of the garments already in your wardrobe.</p>
            <a className="text-link" href="#steam-brush">Discover the Steam Brush <span>→</span></a>
            <div className="hero-principles" aria-label="EVERNE principles">
              <span>Wear longer</span><span>Care deliberately</span><span>Replace less</span>
            </div>
          </div>

          <div className="hero-architecture" aria-hidden="true">
            <div className="arch-backdrop" />
            <div className="arch-curve" />
            <div className="arch-panel" />
            <div className="arch-dark-block" />
            <div className="arch-plinth" />
            <div className="arch-branch">
              <span className="stem" />
              <span className="leaf" />
              <span className="leaf" />
              <span className="leaf" />
              <span className="leaf" />
              <span className="leaf" />
              <span className="leaf" />
              <span className="leaf" />
            </div>
          </div>

          <div className="hero-index"><span>EVERNE / 2026</span><span>A more considered wardrobe</span></div>
        </section>

        <section className="manifesto">
          <div className="section-label"><span>01</span><span>Our premise</span></div>
          <h2>Good garments deserve<br /><em>more than one season.</em></h2>
          <div className="manifesto-copy"><p>EVERNE is built around a simple idea: wardrobe care should feel considered, not disposable. Remove what does not belong, restore what time has changed, and keep the pieces worth wearing in motion.</p><a className="text-link" href="#steam-brush">Meet the hero product <span>↘</span></a></div>
        </section>

        <SteamBrushExperience steamBrush={steamBrush} pro={fabricReviverPro} steamPrice={steamPrice} proPrice={proPrice} />

        <section className="collection" id="collection">
          <div className="collection-heading"><div className="section-label"><span>06</span><span>The collection</span></div><h2>Our essentials</h2><p>Three focused garment-care tools for refreshing shape, restoring surfaces and maintaining the pieces you keep.</p></div>
          {PURCHASES_ENABLED && commerceError && <div className="commerce-note" role="alert"><span>{commerceError}</span><button onClick={() => void loadCommerce()}>Try again</button></div>}
          <div className="product-grid">
            {previewProducts.map((preview) => <ProductFeature key={preview.sku} preview={preview} live={liveBySku.get(preview.sku)} />)}
          </div>
        </section>

        <section className="object-story" id="method">
          <div className="object-image"><img src={productImages(steamBrush)[0]} alt={steamBrush.alt[0]} loading="lazy" /></div>
          <div className="object-copy">
            <div className="section-label"><span>07</span><span>The method</span></div>
            <span className="eyebrow">{steamBrush.tagline}</span>
            <h2>Refresh<br /><em>between wears.</em></h2>
            <div className="method-list">
              {steamBrush.benefits?.map((benefit, index) => (
                <article key={benefit.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{benefit.title}</h3><p>{benefit.copy}</p></div>
                </article>
              ))}
              <article><span>04</span><div><h3>How to use</h3><p>{steamBrush.howToUse}</p></div></article>
            </div>
          </div>
        </section>

        <section className="journal" id="journal">
          <div className="journal-heading"><div className="section-label"><span>08</span><span>Field notes</span></div><h2>Care, without excess.</h2></div>
          <div className="journal-grid">
            <article><img src={productImages(fabricReviver)[0]} alt={fabricReviver.alt[0]} loading="lazy" /><span>Surface care · Note 01</span><h3>Light pilling does not always need an intensive intervention.</h3></article>
            <article><img src={productImages(fabricReviverPro)[0]} alt={fabricReviverPro.alt[0]} loading="lazy" /><span>Surface care · Note 02</span><h3>For more visible wear, work slowly and let the tool do the surface work.</h3></article>
          </div>
        </section>

        <section className="faq" id="faq">
          <div><div className="section-label"><span>09</span><span>Good to know</span></div><h2>The details,<br /><em>considered.</em></h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <article key={question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span>{openFaq === index ? '−' : '+'}</span></button><div className={openFaq === index ? 'faq-answer open' : 'faq-answer'}><p>{answer}</p></div></article>)}
          </div>
        </section>

        <section className="closing closing-light">
          <div className="closing-copy"><span className="eyebrow">Fabric Reviver Pro</span><h2>More intensive care.<br />Same considered approach.</h2><p>Cream · White · Green · Grey</p><a className="text-link" href={productHref(fabricReviverPro.handle)}>Explore the Pro <span>→</span></a></div>
          <div className="object-image"><img src={productImages(fabricReviverPro)[0]} alt={fabricReviverPro.alt[0]} loading="lazy" /></div>
        </section>
      </main>

      <footer>
        <div className="footer-lead"><a className="brand" href="#top">EVERNE</a><p>Care for what you keep.</p></div>
        <div><span>Explore</span><a href={productHref(fabricReviver.handle)}>Fabric Reviver</a><a href={productHref(fabricReviverPro.handle)}>Fabric Reviver Pro</a><a href={productHref(steamBrush.handle)}>Steam Brush</a></div>
        <div><span>Service</span><button disabled={!PURCHASES_ENABLED} onClick={() => setBagOpen(true)}>Orders currently closed</button><a href="#faq">Care & delivery</a></div>
        <div><span>Legal</span><a href="/rechtliches.html#impressum">Impressum</a><a href="/rechtliches.html#datenschutz">Datenschutz</a><a href="/rechtliches.html#widerruf">Widerruf</a><a href="/rechtliches.html#agb">AGB</a><a href="/rechtliches.html#versand">Versand & Retouren</a></div>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>Hamburg, Germany · EUR</span><span>Commerce by Shopify</span></div>
      </footer>

      <button className={`bag-backdrop ${bagOpen ? 'open' : ''}`} onClick={() => setBagOpen(false)} aria-label="Close shopping bag" tabIndex={bagOpen ? 0 : -1} />
      <aside className={`bag ${bagOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!bagOpen} aria-label="Shopping bag">
        <div className="bag-head"><div><span>EVERNE</span><strong>Your bag</strong></div><button onClick={() => setBagOpen(false)} aria-label="Close bag">Close</button></div>
        {!PURCHASES_ENABLED || !cart?.lines.nodes.length ? <div className="empty-bag"><span>Edition 01</span><p>Currently<br />unavailable.</p><small>Orders will open after final product and fulfillment checks are complete.</small><button onClick={() => setBagOpen(false)}>Continue exploring</button></div> : <><div className="bag-lines">{cart.lines.nodes.map((line) => <BagLine key={line.id} line={line} busy={busyLine === line.id} onQuantity={changeQuantity} onRemove={removeLine} />)}</div><div className="bag-summary"><div><span>Subtotal</span><strong>{formatMoney(cart.cost.subtotalAmount)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><a className="checkout" href={cart.checkoutUrl}>Continue to secure checkout <span>↗</span></a><small>Secure checkout powered by Shopify</small></div></>}
      </aside>
    </div>
  );
}
