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

const CART_KEY = 'everne.shopify.cart-id';
const PURCHASES_ENABLED = false;

const faqs = [
  ['Where do you deliver?', 'Available delivery methods, timing and final shipping cost are shown at Shopify checkout for your address.'],
  ['Are the tools suitable for every fabric?', 'No universal care tool is right for every fabric. Always test an inconspicuous area first and follow the garment care label.'],
  ['How should I use the cedar pieces?', 'Place them in a clean, dry wardrobe without direct contact with delicate fabric. Refresh the aroma with a very light pass of fine sandpaper when needed.'],
  ['Is payment secure?', 'Yes. Your order and payment are completed through Shopify’s encrypted checkout; payment details are never handled by this storefront.'],
];

function imageForSku(sku: string | null | undefined, index = 0) {
  const preview = previewProducts.find((item) => item.sku === sku);
  return preview ? productImages(preview)[index] : productImages(previewProducts[0])[0];
}

type ProductFeatureProps = {
  preview: PreviewProduct;
  live?: { product: Product; variant: Product['variants']['nodes'][number] };
  busy: boolean;
  catalogConnected: boolean;
  onAdd: (sku: string) => void;
};

function ProductFeature({ preview, live, busy, catalogConnected, onAdd }: ProductFeatureProps) {
  const images = productImages(preview);
  const purchasable = PURCHASES_ENABLED && Boolean(live?.product.availableForSale && live?.variant.availableForSale);
  const price = live ? formatMoney(live.variant.price) : preview.price;

  return (
    <article className="product-feature" id={preview.sku}>
      <div className="product-gallery">
        <figure className="product-main-image">
          <img src={images[0]} alt={preview.alt[0]} loading={preview.number === '01' ? 'eager' : 'lazy'} />
          <figcaption>{preview.ritual}</figcaption>
        </figure>
        <figure><img src={images[1]} alt={preview.alt[1]} loading="lazy" /></figure>
        <figure><img src={images[2]} alt={preview.alt[2]} loading="lazy" /></figure>
      </div>
      <div className="product-copy">
        <div className="product-meta"><span>0{preview.number}</span><span>{preview.sku}</span></div>
        <h3>{preview.title}</h3>
        <p>{preview.description}</p>
        <div className="product-purchase">
          <span>{price}</span>
          <button disabled={!purchasable || busy} onClick={() => onAdd(preview.sku)}>
            {busy ? 'Adding…' : purchasable ? 'Add to bag' : catalogConnected ? 'Currently unavailable' : 'Connecting…'}
          </button>
        </div>
        <small>{PURCHASES_ENABLED ? 'Live availability · Secure checkout by Shopify' : 'Storefront connected · Orders currently closed'}</small>
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
  const [loading, setLoading] = useState(true);
  const [commerceError, setCommerceError] = useState<string | null>(null);
  const [busySku, setBusySku] = useState<string | null>(null);
  const [busyLine, setBusyLine] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  async function loadCommerce() {
    setLoading(true);
    setCommerceError(null);
    try {
      const [catalog, restored] = await Promise.all([
        getEdition01(),
        (async () => {
          if (!PURCHASES_ENABLED) {
            localStorage.removeItem(CART_KEY);
            return null;
          }
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

  const heroImages = productImages(previewProducts[0]);

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#collection">Skip to collection</a>
      <div className={`status-bar ${commerceReady ? 'is-live' : ''}`} role="status">
        <span>{loading ? 'Connecting to Edition 01' : commerceReady ? 'Edition 01 · Available now' : catalogConnected ? 'Edition 01 · Currently unavailable' : 'Edition 01 · Store update'}</span>
        <span>Germany / EUR</span>
      </div>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation"><a href="#collection">Collection</a><a href="#method">Method</a><a href="#journal">Journal</a></nav>
        <button className="bag-button" disabled={!PURCHASES_ENABLED} onClick={() => setBagOpen(true)} aria-label="Edition 01 is currently unavailable">Unavailable</button>
      </header>

      <main>
        <section className="hero">
          <img className="hero-image" src={heroImages[2]} alt={previewProducts[0].alt[2]} />
          <div className="hero-shade" />
          <div className="hero-copy"><span className="eyebrow">Garment care · Edition 01</span><h1>Care for<br />what you keep.</h1><p>Considered tools for a wardrobe that is worn, restored and kept in motion.</p><a className="text-link light" href="#collection">Explore Edition 01 <span>↓</span></a></div>
          <div className="hero-index"><span>EVERNE / 2026</span><span>Four enduring objects</span></div>
        </section>

        <section className="manifesto">
          <div className="section-label"><span>01</span><span>Our premise</span></div>
          <h2>Replacement is easy.<br /><em>Care is intentional.</em></h2>
          <div className="manifesto-copy"><p>EVERNE makes tactile wardrobe tools for the garments you chose carefully. Objects that invite a quieter rhythm: brush lightly, air naturally, store thoughtfully.</p><a className="text-link" href="#method">Read the method <span>↘</span></a></div>
        </section>

        <section className="collection" id="collection">
          <div className="collection-heading"><div className="section-label"><span>02</span><span>The collection</span></div><h2>Edition 01</h2><p>Four considered objects. One complete wardrobe ritual.</p></div>
          {commerceError && <div className="commerce-note" role="alert"><span>{commerceError}</span><button onClick={() => void loadCommerce()}>Try again</button></div>}
          <div className="product-list">
            {previewProducts.map((preview) => <ProductFeature key={preview.sku} preview={preview} live={liveBySku.get(preview.sku)} busy={busySku === preview.sku} catalogConnected={catalogConnected} onAdd={addToBag} />)}
          </div>
        </section>

        <section className="object-story" id="method">
          <div className="object-image"><img src={productImages(previewProducts[1])[1]} alt={previewProducts[1].alt[1]} loading="lazy" /></div>
          <div className="object-copy">
            <div className="section-label"><span>03</span><span>The method</span></div><span className="eyebrow">Three minutes after wear</span><h2>Keep the ritual.<br /><em>Not the waste.</em></h2>
            <div className="method-list">
              <article><span>01</span><div><h3>Brush</h3><p>Long, light strokes lift surface dust. Test discreetly first and always follow the care label.</p></div></article>
              <article><span>02</span><div><h3>Rest</h3><p>Air the garment and let natural fibres recover their shape between wears.</p></div></article>
              <article><span>03</span><div><h3>Store</h3><p>Put away only clean, dry pieces. Use cedar around—not directly on—delicate cloth.</p></div></article>
            </div>
          </div>
        </section>

        <section className="journal" id="journal">
          <div className="journal-heading"><div className="section-label"><span>04</span><span>Field notes</span></div><h2>Care, without excess.</h2></div>
          <div className="journal-grid">
            <article><img src={productImages(previewProducts[2])[2]} alt={previewProducts[2].alt[2]} loading="lazy" /><span>Natural fibres · Note 01</span><h3>Wool often needs air and rest—not another wash.</h3></article>
            <article><img src={productImages(previewProducts[3])[1]} alt={previewProducts[3].alt[1]} loading="lazy" /><span>Storage · Note 02</span><h3>Cedar belongs in a clean, dry wardrobe.</h3></article>
          </div>
        </section>

        <section className="faq" id="faq">
          <div><div className="section-label"><span>05</span><span>Good to know</span></div><h2>The details,<br /><em>considered.</em></h2></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => <article key={question}><button aria-expanded={openFaq === index} onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span>{openFaq === index ? '−' : '+'}</span></button><div className={openFaq === index ? 'faq-answer open' : 'faq-answer'}><p>{answer}</p></div></article>)}
          </div>
        </section>

        <section className="closing"><img src={productImages(previewProducts[3])[2]} alt={previewProducts[3].alt[2]} loading="lazy" /><div><span className="eyebrow">Edition 01</span><h2>Fewer replacements.<br />More years of wear.</h2><a className="text-link light" href="#collection">Explore the collection <span>↑</span></a></div></section>
      </main>

      <footer>
        <div className="footer-lead"><a className="brand" href="#top">EVERNE</a><p>Care for what you keep.</p></div>
        <div><span>Explore</span><a href="#collection">Collection</a><a href="#method">The method</a><a href="#journal">Field notes</a></div>
        <div><span>Service</span><button disabled={!PURCHASES_ENABLED} onClick={() => setBagOpen(true)}>Orders currently closed</button><a href="#faq">Care & delivery</a></div>
        <div><span>Legal</span><a href="/rechtliches.html#impressum">Impressum</a><a href="/rechtliches.html#datenschutz">Datenschutz</a><a href="/rechtliches.html#widerruf">Widerruf</a><a href="/rechtliches.html#agb">AGB</a><a href="/rechtliches.html#versand">Versand & Retouren</a></div>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>Hamburg, Germany · EUR</span><span>Commerce by Shopify</span></div>
      </footer>

      <button className={`bag-backdrop ${bagOpen ? 'open' : ''}`} onClick={() => setBagOpen(false)} aria-label="Close shopping bag" tabIndex={bagOpen ? 0 : -1} />
      <aside className={`bag ${bagOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-hidden={!bagOpen} aria-label="Shopping bag">
        <div className="bag-head"><div><span>EVERNE</span><strong>Your bag</strong></div><button onClick={() => setBagOpen(false)} aria-label="Close bag">Close</button></div>
        {!PURCHASES_ENABLED || !cart?.lines.nodes.length ? <div className="empty-bag"><span>Edition 01</span><p>Currently<br />unavailable.</p><small>Orders will open after our products and supplier have been confirmed.</small><button onClick={() => setBagOpen(false)}>Continue exploring</button></div> : <><div className="bag-lines">{cart.lines.nodes.map((line) => <BagLine key={line.id} line={line} busy={busyLine === line.id} onQuantity={changeQuantity} onRemove={removeLine} />)}</div><div className="bag-summary"><div><span>Subtotal</span><strong>{formatMoney(cart.cost.subtotalAmount)}</strong></div><p>Shipping and taxes are calculated at checkout.</p><a className="checkout" href={cart.checkoutUrl}>Continue to secure checkout <span>↗</span></a><small>Secure checkout powered by Shopify</small></div></>}
      </aside>
    </div>
  );
}
