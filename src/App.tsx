import { useEffect, useMemo, useState } from 'react';
import { addCartLine, createCart, formatMoney, getCart, getEdition01, removeCartLine, type Cart, type Product } from './lib/shopify';
import { previewProducts } from './previewCatalog';

const CART_KEY = 'everne.shopify.cart-id';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<Cart | null>(null);
  const [bagOpen, setBagOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [commerceError, setCommerceError] = useState<string | null>(null);
  const [busySku, setBusySku] = useState<string | null>(null);

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
        if (!catalog.length) {
          setCommerceError('Edition 01 is in private preview and is not yet published for purchase.');
        }
      } catch (error) {
        if (cancelled) return;
        setCommerceError(error instanceof Error ? error.message : 'Storefront connection unavailable.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const liveBySku = useMemo(() => {
    const map = new Map<string, { product: Product; variant: Product['variants']['nodes'][number] }>();
    products.forEach((product) =>
      product.variants.nodes.forEach((variant) => {
        if (variant.sku) map.set(variant.sku, { product, variant });
      }),
    );
    return map;
  }, [products]);

  const liveCommerce = previewProducts.every((item) => {
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
    <div className="site-shell">
      <header className="topbar">
        <a className="brand" href="#top">EVERNE</a>
        <nav aria-label="Primary navigation">
          <a href="#collection">Collection</a>
          <a href="#ritual">Care Ritual</a>
          <a href="#notes">Field Notes</a>
        </nav>
        <button className="bag-button" onClick={() => setBagOpen(true)} aria-label={`Open bag${cart?.totalQuantity ? ` with ${cart.totalQuantity} items` : ''}`}>
          Bag {cart?.totalQuantity ? `(${cart.totalQuantity})` : ''}
        </button>
      </header>

      <main id="top">
        <section className="hero">
          <div className="eyebrow">GARMENT CARE · MADE CONSIDERED</div>
          <h1>Wear it longer.</h1>
          <p className="hero-copy">Quiet, enduring tools for the garments you chose carefully.</p>
          <a className="text-link" href="#collection">Discover Edition 01 →</a>
        </section>

        <section className={`release-status ${liveCommerce ? 'live' : 'preview'}`} aria-live="polite">
          <span>{loading ? 'Checking release status' : liveCommerce ? 'Edition 01 · Available' : 'Private preview · Edition 01'}</span>
          <p>
            {loading
              ? 'Connecting to the EVERNE storefront…'
              : liveCommerce
                ? 'Edition 01 is connected to Shopify. Availability, bag and checkout reflect the live storefront.'
                : 'The first collection is being prepared. Product availability and checkout stay disabled until the Edition 01 objects are published to the EVERNE Headless storefront.'}
          </p>
        </section>

        <section className="statement">
          <p>Care is the alternative to replacement.</p>
        </section>

        <section className="collection" id="collection">
          <div className="section-heading">
            <div>
              <span>EDITION 01 · 2026</span>
              <h2>Four objects.<br />One considered wardrobe.</h2>
            </div>
            <p>A first release built around the small rituals that keep good garments in use.</p>
          </div>

          {commerceError && <div className="commerce-note">{commerceError}</div>}

          <div className="product-grid">
            {previewProducts.map((preview) => {
              const live = liveBySku.get(preview.sku);
              const purchasable = Boolean(live?.product.availableForSale && live?.variant.availableForSale);
              const price = live ? formatMoney(live.variant.price) : preview.price;
              return (
                <article className="product-card" key={preview.sku}>
                  <div className="product-number">{preview.number}</div>
                  <div className="product-image-frame">
                    {live?.product.featuredImage?.url ? (
                      <img src={live.product.featuredImage.url} alt={live.product.featuredImage.altText || preview.title} />
                    ) : (
                      <div className="material-study"><span>{preview.title}</span></div>
                    )}
                  </div>
                  <div className="product-meta">
                    <div>
                      <h3>{preview.title}</h3>
                      <p>{preview.description}</p>
                    </div>
                    <div className="product-action">
                      <span>{price}</span>
                      <button disabled={!purchasable || busySku === preview.sku} onClick={() => addToBag(preview.sku)}>
                        {purchasable ? (busySku === preview.sku ? 'Adding…' : 'Add +') : 'Private preview'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        <section className="ritual" id="ritual">
          <div className="eyebrow">THE CARE RITUAL</div>
          <div className="ritual-grid">
            <h2>Maintain before<br />you replace.</h2>
            <ol>
              <li><span>01</span><div><strong>Brush</strong><p>Remove surface dust after wear and let fibres settle before storage.</p></div></li>
              <li><span>02</span><div><strong>Restore</strong><p>Address pilling and small signs of use with restraint rather than aggressive treatment.</p></div></li>
              <li><span>03</span><div><strong>Store</strong><p>Give garments space, air and materials that support a longer life.</p></div></li>
            </ol>
          </div>
        </section>

        <section className="notes" id="notes">
          <div className="eyebrow">FIELD NOTES</div>
          <div className="notes-grid">
            <article><span>01</span><h3>Why care changes the value of what you own.</h3><p>The object matters less when maintenance is treated as an afterthought.</p></article>
            <article><span>02</span><h3>A wardrobe should age, not expire.</h3><p>Patina and continued use are different from neglect. The distinction is care.</p></article>
            <article><span>03</span><h3>Fewer tools. Better rituals.</h3><p>Edition 01 begins with only what earns a permanent place in the wardrobe.</p></article>
          </div>
        </section>

        <section className="private-release">
          <span>PRIVATE FIRST RELEASE</span>
          <h2>Edition 01 begins quietly.</h2>
          <div>
            <p>Release access is not yet automated. The public signup form will only go live once subscriber storage and consent handling are connected.</p>
            <button className="release-disabled" type="button" disabled>Private list opening soon</button>
          </div>
        </section>
      </main>

      <footer>
        <div><strong>EVERNE</strong><p>Care for what you keep.</p></div>
        <div><span>Hamburg, Germany</span><span>Edition 01 / 2026</span></div>
      </footer>

      <div className={`bag-backdrop ${bagOpen ? 'open' : ''}`} onClick={() => setBagOpen(false)} />
      <aside className={`bag ${bagOpen ? 'open' : ''}`} aria-hidden={!bagOpen} aria-label="Shopping bag">
        <div className="bag-head"><strong>Bag</strong><button onClick={() => setBagOpen(false)}>Close</button></div>
        {!cart?.lines.nodes.length ? (
          <div className="empty-bag"><p>Your bag is empty.</p><span>Edition 01 remains in private preview until Shopify availability is published.</span></div>
        ) : (
          <>
            <div className="bag-lines">
              {cart.lines.nodes.map((line) => (
                <div className="bag-line" key={line.id}>
                  <div><strong>{line.merchandise.product.title}</strong><span>Qty {line.quantity}</span></div>
                  <div><span>{formatMoney(line.merchandise.price)}</span><button onClick={() => removeLine(line.id)}>Remove</button></div>
                </div>
              ))}
            </div>
            <div className="bag-total"><span>Subtotal</span><strong>{formatMoney(cart.cost.subtotalAmount)}</strong></div>
            <a className="checkout" href={cart.checkoutUrl}>Continue to secure checkout</a>
          </>
        )}
      </aside>
    </div>
  );
}
