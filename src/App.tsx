import { useEffect, useMemo, useState } from 'react';
import { addCartLine, createCart, formatMoney, getCart, getEdition01, removeCartLine, type Cart, type Product } from './lib/shopify';
import { previewProducts } from './previewCatalog';

const CART_KEY = 'everne.shopify.cart-id';

const faqs = [
  ['When will Edition 01 ship?', 'The launch window is confirmed only after final supplier samples, materials and delivery terms are approved.'],
  ['Where do you deliver?', 'Edition 01 is being prepared for an initial Germany and EU release. Final delivery markets will be confirmed before checkout opens.'],
  ['Are the tools suitable for every fabric?', 'No universal care tool is appropriate for every fabric. Always test an inconspicuous area first and follow the garment care label.'],
  ['What is the returns window?', 'Final returns terms will be published before Edition 01 becomes available for purchase.'],
];

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commerceError, setCommerceError] = useState<string | null>(null);
  const [busySku, setBusySku] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [catalog, restored] = await Promise.all([
          getEdition01(),
          (async () => {
            const id = localStorage.getItem(CART_KEY);
            if (!id) return null;
            try {
              return await getCart(id);
            } catch {
              localStorage.removeItem(CART_KEY);
              return null;
            }
          })(),
        ]);
        if (cancelled) return;
        setProducts(catalog);
        setCart(restored);
        if (!catalog.length) setCommerceError('Edition 01 is not currently available from the Shopify Storefront API.');
      } catch (error) {
        if (cancelled) return;
        setCommerceError(error instanceof Error ? error.message : 'Storefront connection unavailable.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const liveBySku = useMemo(() => {
    const map = new Map<string, { product: Product; variant: Product['variants']['nodes'][number] }>();
    products.forEach((product) => product.variants.nodes.forEach((variant) => {
      if (variant.sku) map.set(variant.sku, { product, variant });
    }));
    return map;
  }, [products]);

  const catalogConnected = previewProducts.every((item) => liveBySku.has(item.sku));
  const commerceReady = previewProducts.every((item) => {
    const live = liveBySku.get(item.sku);
    return Boolean(live?.product.availableForSale && live?.variant.availableForSale);
  });

  async function addToBag(sku: string) {
    const live = liveBySku.get(sku);
    if (!live || !live.product.availableForSale || !live.variant.availableForSale) return;
    setBusySku(sku);
    setCommerceError(null);
    try {
      const next = cart ? await addCartLine(cart.id, live.variant.id) : await createCart(live.variant.id);
      setCart(next);
      localStorage.setItem(CART_KEY, next.id);
      setBagOpen(true);
    } catch (error) {
      setCommerceError(error instanceof Error ? error.message : 'Could not update bag.');
    } finally {
      setBusySku(null);
    }
  }

  async function removeLine(lineId: string) {
    if (!cart) return;
    try {
      const next = await removeCartLine(cart.id, lineId);
      setCart(next);
      if (!next.totalQuantity) localStorage.removeItem(CART_KEY);
    } catch (error) {
      setCommerceError(error instanceof Error ? error.message : 'Could not update bag.');
    }
  }

  return (
    <div className="site-shell" id="top">
      <a className="skip-link" href="#collection">Skip to collection</a>

      <div className={`preview-strip ${commerceReady ? 'live' : catalogConnected ? 'connected' : ''}`}>
        <span>
          {loading
            ? 'CHECKING EDITION 01'
            : commerceReady
              ? 'EDITION 01 · AVAILABLE'
              : catalogConnected
                ? 'SHOPIFY CONNECTED · EDITION 01 PRE-LAUNCH'
                : 'PRIVATE PREVIEW · EDITION 01 IN PREPARATION'}
        </span>
      </div>

      <header className="topbar">
        <a className="brand" href="#top" aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#ritual">Care ritual</a>
          <a href="#notes">Field notes</a>
        </nav>
        <button className="bag-button" onClick={() => setBagOpen(true)} aria-label={`Open preview bag with ${cart?.totalQuantity || 0} items`}>
          Preview bag <span>{String(cart?.totalQuantity || 0).padStart(2, '0')}</span>
        </button>
      </header>

      <main>
        <section className="hero old-hero">
          <div className="hero-copy-wrap">
            <span className="eyebrow">GARMENT CARE · MADE CONSIDERED</span>
            <h1>Wear it longer.</h1>
            <p>Quiet, enduring tools for the garments you chose carefully.</p>
            <a className="arrow-link" href="#collection">Discover the collection <span>↘</span></a>
          </div>
          <div className="hero-visual" aria-label="Garment-care objects beside a wool coat">
            <div className="hero-object hero-brush"><span>EVERNE</span></div>
            <div className="hero-object hero-comb" />
            <div className="hero-fabric" />
          </div>
          <a className="hero-bottom-link" href="#collection">Discover the collection <span>↘</span></a>
        </section>

        <section className="premise">
          <div className="premise-kicker"><span>EDITION 01 / 2026</span><span>OUR PREMISE</span></div>
          <div className="premise-grid">
            <h2>Care is the alternative to replacement.</h2>
            <p>EVERNE makes tactile wardrobe tools designed to clean, restore and protect what you already own. Fewer disposables. Fewer forgotten garments. More years of wear.</p>
          </div>
          <div className="premise-actions"><span>Brush lightly</span><span>Air naturally</span><span>Store thoughtfully</span></div>
        </section>

        <section className="collection" id="collection">
          <div className="collection-head">
            <div><span className="eyebrow">EDITION 01</span><h2>The care collection</h2></div>
            <p>Four objects.<br />One considered wardrobe.</p>
          </div>

          {commerceError && <div className="commerce-note">{commerceError}</div>}

          <div className="product-grid original-grid">
            {previewProducts.map((preview) => {
              const live = liveBySku.get(preview.sku);
              const purchasable = Boolean(live?.product.availableForSale && live?.variant.availableForSale);
              const price = live ? formatMoney(live.variant.price) : preview.price;
              return (
                <article className="product-card original-card" key={preview.sku}>
                  <div className="product-visual">
                    {live?.product.featuredImage?.url ? (
                      <img src={live.product.featuredImage.url} alt={live.product.featuredImage.altText || preview.title} />
                    ) : (
                      <div className={`product-study study-${preview.number}`}><span>{preview.title}</span></div>
                    )}
                    <a href={`#${preview.sku}`} className="view-label">View {preview.title}</a>
                    <span className="product-index">0 {preview.number}</span>
                    <button className="floating-add" disabled={!purchasable || busySku === preview.sku} onClick={() => addToBag(preview.sku)}>
                      {purchasable ? (busySku === preview.sku ? 'ADDING…' : 'ADD +') : catalogConnected ? 'COMING SOON' : 'PREVIEW'}
                    </button>
                  </div>
                  <div className="product-info" id={preview.sku}>
                    <span className="sku">{preview.sku}</span>
                    <h3>{preview.title}</h3>
                    <p>{preview.description}</p>
                    <strong>{price}</strong>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="principles">
            <article><span>01</span><h3>Material-led</h3><p>Wood, metal and cedar selected through physical sampling.</p></article>
            <article><span>02</span><h3>Made for repetition</h3><p>Simple tools for a calm, regular care practice.</p></article>
            <article><span>03</span><h3>Details before launch</h3><p>Materials, delivery and terms confirmed before orders open.</p></article>
          </div>
        </section>

        <section className="object-study">
          <div className="study-visual"><div className="study-brush"><span>EVERNE</span></div><span className="study-caption">EVERNE garment brush in dark wood</span></div>
          <div className="study-copy">
            <span className="eyebrow">OBJECT STUDY / 01</span>
            <span className="sub-eyebrow">DESIGNED FOR REPETITION</span>
            <h2>Keep the ritual.<br />Not the waste.</h2>
            <p>A useful care object should feel intuitive enough to reach for, restrained enough to leave out and durable enough to become familiar.</p>
          </div>
        </section>

        <section className="ritual" id="ritual">
          <div className="ritual-intro"><span className="eyebrow">THE METHOD</span><h2>Three minutes<br />after wear.</h2><p>A small ritual prevents most unnecessary washing and premature wear.</p></div>
          <div className="ritual-steps">
            <article><span>01</span><div><h3>Brush</h3><p>Use long strokes with light pressure. Test an inconspicuous area first and follow the garment label.</p></div></article>
            <article><span>02</span><div><h3>Rest</h3><p>Air the garment and give natural fibres time to recover their shape.</p></div></article>
            <article><span>03</span><div><h3>Store</h3><p>Store only clean, dry garments. Keep cedar dry and away from direct contact with delicate cloth.</p></div></article>
          </div>
        </section>

        <section className="notes" id="notes">
          <div className="notes-head"><span className="eyebrow">PRACTICAL FIELD NOTES</span><h2>Care, without excess.</h2><p>Two useful principles for a wardrobe that is worn often and washed thoughtfully.</p></div>
          <div className="notes-grid original-notes">
            <article>
              <div className="note-visual note-wool"><span>EVERNE garment-care objects arranged on natural fabric</span></div>
              <div className="note-copy"><span>NATURAL FIBRES · NOTE 01</span><h3>Wool often needs air and rest—not another wash.</h3><p>Let the garment recover between wears. Brush only when needed and treat the care label as the final authority.</p></div>
            </article>
            <article>
              <div className="note-visual note-cedar"><span>Untreated aromatic red-cedar wardrobe blocks</span></div>
              <div className="note-copy"><span>STORAGE · NOTE 02</span><h3>Cedar works best in a clean, dry wardrobe.</h3><p>Avoid direct contact with delicate fabrics. When the aroma softens, renew the surface with a light pass of fine sandpaper.</p></div>
            </article>
          </div>
        </section>

        <section className="faq">
          <div><span className="eyebrow">GOOD TO KNOW</span><h2>Before Edition 01.</h2><p>Clear answers for the first supplier-backed release.</p></div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <article className={openFaq === index ? 'open' : ''} key={question}>
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><span>{openFaq === index ? '−' : '+'}</span></button>
                {openFaq === index && <p>{answer}</p>}
              </article>
            ))}
          </div>
        </section>

        <section className="private-release">
          <div><span className="eyebrow">PRIVATE FIRST RELEASE</span><h2>Edition 01<br />arrives soon.</h2></div>
          <div className="release-copy">
            <p>Join the private list for a quieter, earlier way into the first supplier-backed release.</p>
            <ol><li><span>01</span>Confirmed launch window</li><li><span>02</span>Final materials and product details</li><li><span>03</span>Edition 01 availability notice</li></ol>
            <div className="email-preview"><span>Email address</span><button disabled>Request access ↗</button></div>
            <small>Preview mode · no message is sent yet.</small>
          </div>
        </section>
      </main>

      <footer className="original-footer">
        <div className="footer-brand"><strong>EVERNE</strong><p>Care for what you keep.</p></div>
        <div><span>EXPLORE</span><a href="#collection">Collection</a><a href="#ritual">The method</a><a href="#notes">Journal</a></div>
        <div><span>INFORMATION</span><a href="#collection">Launch information</a><a href="#ritual">Care guide</a><a href="#top">Private release</a></div>
        <div><span>STUDIO</span><p>Hamburg, Germany</p><p>Edition 01 / 2026</p></div>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>GERMANY / EUR</span></div>
      </footer>

      <div className={`bag-backdrop ${bagOpen ? 'open' : ''}`} onClick={() => setBagOpen(false)} />
      <aside className={`bag ${bagOpen ? 'open' : ''}`} aria-hidden={!bagOpen} aria-label="Preview bag">
        <div className="bag-head"><strong>Preview bag</strong><button onClick={() => setBagOpen(false)}>Close</button></div>
        {!cart?.lines.nodes.length ? (
          <div className="empty-bag"><p>Your preview bag is empty.</p><span>{catalogConnected ? 'Shopify is connected. Edition 01 checkout remains closed until inventory is available.' : 'Edition 01 remains in private preview while the Shopify catalog connection is unavailable.'}</span></div>
        ) : (
          <>
            <div className="bag-lines">{cart.lines.nodes.map((line) => <div className="bag-line" key={line.id}><div><strong>{line.merchandise.product.title}</strong><span>Qty {line.quantity}</span></div><div><span>{formatMoney(line.merchandise.price)}</span><button onClick={() => removeLine(line.id)}>Remove</button></div></div>)}</div>
            <div className="bag-total"><span>Subtotal</span><strong>{formatMoney(cart.cost.subtotalAmount)}</strong></div>
            <a className="checkout" href={cart.checkoutUrl}>Continue to secure checkout</a>
          </>
        )}
      </aside>
    </div>
  );
}
