import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from './seo';
import { draftCategories, findProductDraft, productDrafts } from './productDrafts';

type Page = 'home' | 'care' | 'standards' | 'product' | 'collection';
type SortOrder = 'edit' | 'name';
const sortPreferenceKey = 'everne-preview-sort';

function getSavedSortOrder(): SortOrder {
  try {
    return window.sessionStorage.getItem(sortPreferenceKey) === 'name' ? 'name' : 'edit';
  } catch {
    // File-based Safari previews can restrict sessionStorage.
    return 'edit';
  }
}
const categories = [
  { id: 'tops', name: 'Tops & Bodysuits', image: '06-bodysuit.jpg', alt: 'Fashion model in a black top against a warm brown studio background.' },
  { id: 'knitwear', name: 'Knitwear', image: '07-knitwear.jpg', alt: 'Fashion model in a sculptural white knit sweater against a dark studio backdrop.' },
  { id: 'trousers', name: 'Trousers & Denim', image: '08-denim.jpg', alt: 'Fashion model seated in tailored beige trousers and a black top.' },
  { id: 'dresses', name: 'Dresses', image: '09-dress.jpg', alt: 'Fashion model wearing a sleeveless black dress in a softly lit studio.' },
  { id: 'skirts', name: 'Skirts', image: '10-skirt.jpg', alt: 'Fashion model seated in a long black skirt and matching cropped top.' },
];
const standards = [
  { title: 'The garment', text: 'A physical sample, its construction and fabric information must be reviewed first.' },
  { title: 'The fit', text: 'Sizing and fit notes must come from confirmed measurements, not supplier assumptions.' },
  { title: 'The terms', text: 'Prices, delivery windows, shipping charges and returns must be clear before orders open.' },
  { title: 'The image', text: 'A product photograph must show the actual reviewed garment before it can be used for sale.' },
];

// Licensed third-party visual references, not EVERNE garments or product claims.
const editorial = (file: string) => import.meta.env.BASE_URL + 'editorial-study/' + file;

function Header({ page }: { page: Page }) {
  return <>
    <a className="e-skip" href="#main">Skip to content</a>
    <header className="e-header">
      <nav className="e-nav-left" aria-label="Collection navigation">
        <Link className={page === 'home' ? 'e-active' : ''} aria-current={page === 'home' ? 'page' : undefined} to="/">WOMAN</Link>
      </nav>
      <Link to="/" className="e-wordmark" aria-label="EVERNE — home">EVERNE</Link>
      <nav className="e-nav-right" aria-label="Other sections">
        <Link className={page === 'care' ? 'e-active' : ''} aria-current={page === 'care' ? 'page' : undefined} to="/care">CARE</Link>
        <Link className={page === 'standards' ? 'e-active' : ''} aria-current={page === 'standards' ? 'page' : undefined} to="/standards">OUR STANDARD</Link>
      </nav>
    </header>
    {page !== 'collection' && page !== 'product' && <nav className="e-shop-nav" aria-label="Shop by category">
      <div className="e-shop-nav-links">
        <Link to="/collections/all">ALL PIECES</Link>
        {draftCategories.map((category) => <Link key={category.id} to={`/collections/${category.id}`}>{category.label.toUpperCase()}</Link>)}
      </div>
    </nav>}
  </>;
}

function SidebarLinks({ categoryId, productHandle }: { categoryId?: string; productHandle?: string }) {
  return <>
    <nav className="e-sidebar-categories" aria-label="Womenswear categories">
      <Link to="/collections/all" className={categoryId === 'all' ? 'e-sidebar-selected' : ''} aria-current={categoryId === 'all' ? 'page' : undefined}><span>All pieces</span><small>{productDrafts.length}</small></Link>
      {draftCategories.map((category) => <Link key={category.id} to={`/collections/${category.id}`} className={categoryId === category.id ? 'e-sidebar-selected' : ''} aria-current={categoryId === category.id ? (productHandle ? 'location' : 'page') : undefined}><span>{category.label}</span><small>{productDrafts.filter((item) => item.category === category.id).length}</small></Link>)}
    </nav>
    {productHandle && <nav className="e-sidebar-products" aria-label="Products in this category">
      {productDrafts.filter((item) => item.category === categoryId).map((item) => <Link key={item.slug} to={`/products/${item.slug}`} className={item.slug === productHandle ? 'e-sidebar-selected' : ''} aria-current={item.slug === productHandle ? 'page' : undefined}>{item.name}</Link>)}
    </nav>}
  </>;
}

function ShopSidebar({ categoryId, productHandle }: { categoryId?: string; productHandle?: string }) {
  const label = draftCategories.find((item) => item.id === categoryId)?.label ?? 'All pieces';
  return <aside className="e-shop-sidebar" aria-label="Collection navigation">
    <div className="e-sidebar-desktop"><span className="e-sidebar-title">WOMAN</span><SidebarLinks categoryId={categoryId} productHandle={productHandle} /></div>
    <details className="e-sidebar-mobile" key={`${categoryId ?? 'all'}-${productHandle ?? 'collection'}`}>
      <summary>Browse collection <span>{label}</span></summary>
      <div className="e-sidebar-mobile-content"><SidebarLinks categoryId={categoryId} productHandle={productHandle} /></div>
    </details>
  </aside>;
}

function Footer() {
  return <footer className="e-footer">
    <div className="e-footer-main">
      <Link to="/" className="e-footer-wordmark">EVERNE</Link>
      <p>Hamburg, Germany.</p>
    </div>
    <div className="e-footer-bottom">
      <span>© EVERNE 2026 · Private design preview · No active sales</span>
      <nav aria-label="Footer navigation">
        <Link to="/standards">Our standard</Link><Link to="/care">Care</Link>
        <a href="/legal.html#imprint">Imprint</a><a href="/legal.html#privacy">Privacy</a>
        <a href="/legal.html#shipping">Delivery & returns</a>
      </nav>
    </div>
    <p className="e-reference-note">Clothing pictured is not an EVERNE product.</p>
  </footer>;
}

function CollectionPage({ categoryId }: { categoryId?: string }) {
  const [sortOrder, setSortOrder] = useState<SortOrder>(getSavedSortOrder);
  useEffect(() => {
    try {
      window.sessionStorage.setItem(sortPreferenceKey, sortOrder);
    } catch {
      // Browsing and sorting must continue if storage is unavailable.
    }
  }, [sortOrder]);
  const category = draftCategories.find((entry) => entry.id === categoryId);
  const all = categoryId === 'all';
  if (!all && !category) return <section className="e-product-missing">
    <span className="e-kicker">EVERNE / WOMAN</span>
    <h1 tabIndex={-1}>Collection not found.</h1>
    <p>Explore the current design edit. No garments are available to order.</p>
    <Link className="e-text-link" to="/collections/all">VIEW ALL PIECES <span aria-hidden="true">↗</span></Link>
  </section>;
  const categoryItems = all ? productDrafts : productDrafts.filter((item) => item.category === categoryId);
  const items = sortOrder === 'name' ? [...categoryItems].sort((first, second) => first.name.localeCompare(second.name, 'en')) : categoryItems;

  return <div className="e-shop-shell">
    <ShopSidebar categoryId={categoryId} />
    <section className="e-collection-page" aria-labelledby="collection-page-title">
    <div className="e-collection-heading">
      <h1 id="collection-page-title" tabIndex={-1}>{all ? 'All pieces' : category?.label}</h1>
      <div className="e-collection-tools">
        <span className="e-collection-count">{items.length} pieces</span>
        <label className="e-sort-label" htmlFor="everne-sort">Sort by</label>
        <select id="everne-sort" className="e-sort-select" value={sortOrder} onChange={(event) => setSortOrder(event.target.value as SortOrder)}>
          <option value="edit">The edit</option>
          <option value="name">Name A–Z</option>
        </select>
      </div>
    </div>
    <div className="e-collection-grid" role="list" aria-label={`${all ? 'All' : category?.label} design concepts`}>
      {items.map((item) => <article className="e-collection-card" role="listitem" key={item.slug}>
        <Link to={`/products/${item.slug}`} aria-label={`View ${item.name} design preview`}>
          <div className="e-collection-card-image" aria-hidden="true">
            <span className="e-collection-image-pending">IMAGE PENDING</span>
          </div>
          <div className="e-collection-card-caption">
            <h2>{item.name}</h2>
            {all && <span className="e-collection-card-category">{draftCategories.find((entry) => entry.id === item.category)?.label}</span>}
          </div>
        </Link>
      </article>)}
    </div>
    <p className="e-collection-disclosure">Design preview only. Photography and specifications are pending. No garments are available to order.</p>
    </section>
  </div>;
}

function Home() {
  return <>
    <section className="e-hero" aria-labelledby="hero-title">
      <div className="e-hero-visual">
        <img src={editorial('05-tailoring.jpg')} alt="Independent styling reference: fashion model wearing an oversized black blazer and boots against a neutral studio backdrop. This outfit is not an EVERNE product." fetchPriority="high" />
        <span className="e-visual-credit">EDITORIAL REFERENCE / NOT AN EVERNE GARMENT</span>
      </div>
      <div className="e-hero-copy">
        <span className="e-kicker">EVERNE / WOMAN</span>
        <div className="e-hero-content">
          <h1 id="hero-title" tabIndex={-1}>The first edit.</h1>
          <p>A considered edit of modern womenswear.</p>
          <Link className="e-text-link" to="/collections/all">VIEW COLLECTION <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>

    <section className="e-wardrobe" id="collection" aria-labelledby="collection-title">
      <div className="e-wardrobe-heading">
        <h2 id="collection-title" tabIndex={-1}>Shop by category.</h2>
      </div>
      <div className="e-wardrobe-grid" role="list" aria-label="Planned womenswear categories with reference photographs">
        {categories.map(({ id, name, image, alt }, index) => <article className="e-category" role="listitem" key={name}>
          <Link to={`/collections/${id}`} aria-label={`Explore ${name} design concepts`}>
            <div className="e-category-image">
              <img src={editorial(image)} loading={index < 3 ? 'eager' : 'lazy'} alt={alt + ' Independent reference photo, not an EVERNE garment.'} />
            </div>
            <div className="e-category-caption">
              <h3>{name}</h3>
            </div>
          </Link>
        </article>)}
      </div>
      <p className="e-wardrobe-disclosure">Photographic styling references only. The clothing shown is not from EVERNE. No garments are available to order.</p>
    </section>
  </>;
}

function ProductPage({ handle }: { handle?: string }) {
  const item = findProductDraft(handle);
  if (!item) return <section className="e-product-missing">
    <span className="e-kicker">EVERNE / WOMAN</span>
    <h1 tabIndex={-1}>Page not found.</h1>
    <p>This item is not part of the current design review. No garments are available to order.</p>
    <Link className="e-text-link" to="/collections/all">RETURN TO THE EDIT <span aria-hidden="true">↗</span></Link>
  </section>;

  const category = draftCategories.find((entry) => entry.id === item.category);
  const categoryItems = productDrafts.filter((entry) => entry.category === item.category);
  const position = categoryItems.findIndex((entry) => entry.slug === item.slug);
  const previous = categoryItems[position - 1];
  const next = categoryItems[position + 1];

  return <div className="e-shop-shell e-shop-shell-product">
    <ShopSidebar categoryId={item.category} productHandle={item.slug} />
    <div className="e-shop-content">
      <nav className="e-product-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">EVERNE</Link><span aria-hidden="true">/</span>
        <Link to={`/collections/${item.category}`}>{category?.label}</Link><span aria-hidden="true">/</span>
        <span aria-current="page">{item.name}</span>
      </nav>
      <article className="e-product-page" aria-labelledby="product-title">
      <div className="e-product-gallery" aria-label="Reserved image positions for pending product photography">
        <div className="e-product-image-slot e-product-image-main" role="note" aria-label="Primary product photograph is not yet available">
          <span className="e-product-image-pending">Photograph pending</span>
        </div>
        <div className="e-product-image-pair">
          <div className="e-product-image-slot" role="note" aria-label="Secondary product photograph is not yet available"><span className="e-product-image-secondary">Second view pending</span></div>
          <div className="e-product-image-slot" role="note" aria-label="Garment detail photograph is not yet available"><span className="e-product-image-secondary">Detail view pending</span></div>
        </div>
      </div>
      <div className="e-product-information">
        <p className="e-product-category">{category?.label}</p>
        <h1 id="product-title" tabIndex={-1}>{item.name}</h1>
        <p className="e-product-intro">{item.description}</p>
        <p className="e-product-pending">NOT AVAILABLE TO ORDER</p>
        <div className="e-product-size-status" aria-label="Size selection unavailable pending fit review">
          <span>SIZE SELECTION</span><span>AWAITING FIT APPROVAL</span>
        </div>
        <div className="e-product-accordions">
          <details className="e-product-accordion">
            <summary>Design & fit</summary>
            <p>{item.designDirection}</p><p>{item.fitDirection}</p>
          </details>
          <details className="e-product-accordion">
            <summary>Styling</summary>
            <p>{item.stylingNote}</p>
          </details>
          <details className="e-product-accordion">
            <summary>Details under review</summary>
            <dl>
              <div><dt>Composition & care</dt><dd>Pending fabric, care-label and physical-sample review.</dd></div>
              <div><dt>Sizes & colours</dt><dd>Not verified or offered at this stage.</dd></div>
              <div><dt>Price & delivery</dt><dd>Not published. No orders or reservations can be placed.</dd></div>
            </dl>
          </details>
        </div>
        <p className="e-product-disclaimer">Private design preview only. Final garment details and photography have not been approved.</p>
        <Link className="e-text-link" to={`/collections/${item.category}`}>BACK TO {category?.label.toUpperCase()} <span aria-hidden="true">↗</span></Link>
      </div>
      </article>
      <nav className="e-product-pagination" aria-label="Browse more pieces">
        <Link to={previous ? `/products/${previous.slug}` : `/collections/${item.category}`}>
          <span>{previous ? '← PREVIOUS PIECE' : '← BACK TO CATEGORY'}</span>
          <strong>{previous?.name ?? category?.label}</strong>
        </Link>
        <Link to={next ? `/products/${next.slug}` : '/collections/all'}>
          <span>{next ? 'NEXT PIECE →' : 'ALL PIECES →'}</span>
          <strong>{next?.name ?? 'Explore the collection'}</strong>
        </Link>
      </nav>
    </div>
  </div>;
}

function Care() {
  return <>
    <section className="e-inner-hero" aria-labelledby="care-title">
      <div className="e-inner-copy"><span className="e-kicker">EVERNE / CARE</span><h1 id="care-title" tabIndex={-1}>The care<br /><em>of things.</em></h1><p>Considered care, for the pieces you choose to keep.</p></div>
      <div className="e-inner-photo"><img src={editorial('04-satin-detail.jpg')} alt="Abstract satin folds, used solely as an editorial reference." /><span>EDITORIAL REFERENCE / NOT AN EVERNE PRODUCT</span></div>
    </section>
    <section className="e-inner-body">
      <div><span className="e-kicker">01 / THE IDEA</span><h2>Wear. Care.<br /><em>Repeat.</em></h2></div>
      <div className="e-inner-prose"><p>CARE explores the quieter side of a wardrobe: the habits and objects that help garments last.</p><p>Accessories are still being assessed. Until specifications, photographs and fulfillment terms are verified, no products can be ordered here.</p><Link className="e-text-link" to="/standards">OUR STANDARD <span aria-hidden="true">↗</span></Link></div>
    </section>
  </>;
}

function Standards() {
  return <>
    <section className="e-inner-hero" aria-labelledby="standard-title">
      <div className="e-inner-copy"><span className="e-kicker">EVERNE / OUR STANDARD</span><h1 id="standard-title" tabIndex={-1}>First the piece.<br /><em>Then the picture.</em></h1><p>Beautiful presentation begins with something real.</p></div>
      <div className="e-inner-photo"><img src={editorial('03-fabric-study.jpg')} alt="Fabric texture photographed as visual direction, not a claim about EVERNE materials." /><span>EDITORIAL REFERENCE / NO VERIFIED MATERIAL CLAIM</span></div>
    </section>
    <section className="e-inner-body e-standard-body">
      <div><span className="e-kicker">01 / HOW WE SELECT</span><h2>Nothing<br /><em>assumed.</em></h2></div>
      <div className="e-inner-prose"><p>EVERNE is an independent womenswear curation project in Hamburg. We select from external suppliers; we do not manufacture the garments or treat supplier listings as proof of quality.</p><p>Our first edit remains in preparation. No garments are available to order.</p></div>
    </section>
    <section className="e-standard-section" aria-label="Verification standards">
      <div className="e-standard-list">{standards.map((item, index) => <div key={item.title} className="e-standard-row"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}</div>
      <div className="e-standard-foot"><span>WHAT IS NOT YET VERIFIED</span><p>Final garments, fibre composition, fit and measurements, product photographs, retail prices and shipping and return terms. The lifestyle images on this preview are independent editorial references only.</p></div>
    </section>
  </>;
}

export default function EvernePreview({ page }: { page: Page }) {
  const { handle, category: categoryId } = useParams<{ handle: string; category: string }>();
  const product = page === 'product' ? findProductDraft(handle) : undefined;
  useEffect(() => {
    const collectionLabel = categoryId === 'all' ? 'All Pieces' : draftCategories.find((entry) => entry.id === categoryId)?.label;
    const title = product ? `EVERNE — ${product.name} | Design Preview` : page === 'collection' ? `EVERNE — ${collectionLabel ?? 'Collection'} | Design Preview` : page === 'care' ? 'EVERNE — Care' : page === 'standards' ? 'EVERNE — Our Standard' : 'EVERNE — Womenswear';
    const description = product ? `${product.name}: an EVERNE design concept in development. Product photography, specifications and ordering are not available.` : 'EVERNE is an independent womenswear project in preparation. The collection is not yet available to order.';
    applySeo({ title, description, path: product ? `/products/${product.slug}` : page === 'collection' ? `/collections/${categoryId}` : page === 'home' ? '/' : '/' + page, type: 'website', indexable: false });
  }, [page, product, categoryId]);
  return <div className="everne-editorial" id="top"><Header page={page} /><main id="main" tabIndex={-1}>{page === 'home' ? <Home /> : page === 'care' ? <Care /> : page === 'standards' ? <Standards /> : page === 'collection' ? <CollectionPage categoryId={categoryId} /> : <ProductPage handle={handle} />}</main><Footer /></div>;
}
