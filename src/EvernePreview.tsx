import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from './seo';
import { draftCategories, findProductDraft, productDrafts } from './productDrafts';

type Page = 'home' | 'care' | 'standards' | 'product' | 'collection';
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

function Header({ page, categoryId }: { page: Page; categoryId?: string }) {
  return <>
    <a className="e-skip" href="#main">Skip to content</a>
    <header className="e-header">
      <nav className="e-nav-left" aria-label="Collection navigation">
        <Link className={page === 'home' ? 'e-active' : ''} aria-current={page === 'home' ? 'page' : undefined} to="/">WOMAN</Link>
        <Link to="/#direction">OUR DIRECTION</Link>
      </nav>
      <Link to="/" className="e-wordmark" aria-label="EVERNE — home">EVERNE</Link>
      <nav className="e-nav-right" aria-label="Other sections">
        <Link className={page === 'care' ? 'e-active' : ''} aria-current={page === 'care' ? 'page' : undefined} to="/care">CARE</Link>
        <Link className={page === 'standards' ? 'e-active' : ''} aria-current={page === 'standards' ? 'page' : undefined} to="/standards">OUR STANDARD</Link>
      </nav>
    </header>
    <nav className="e-shop-nav" aria-label="Shop by category">
      <span className="e-shop-nav-label">WOMAN / THE EDIT</span>
      <div className="e-shop-nav-links">
        <Link to="/collections/all" className={page === 'collection' && categoryId === 'all' ? 'e-selected' : ''} aria-current={page === 'collection' && categoryId === 'all' ? 'page' : undefined}>ALL PIECES</Link>
        {draftCategories.map((category) => <Link key={category.id} to={`/collections/${category.id}`} className={(page === 'collection' || page === 'product') && categoryId === category.id ? 'e-selected' : ''} aria-current={page === 'collection' && categoryId === category.id ? 'page' : undefined}>{category.label.toUpperCase()}</Link>)}
      </div>
      <span className="e-shop-nav-counter">20 / EDIT 01</span>
    </nav>
  </>;
}

function Footer() {
  return <footer className="e-footer">
    <div className="e-footer-main">
      <Link to="/" className="e-footer-wordmark">EVERNE</Link>
      <p>An independent womenswear project.<br />Hamburg, Germany.</p>
    </div>
    <div className="e-footer-bottom">
      <span>© EVERNE 2026 · Private design preview · No active sales</span>
      <nav aria-label="Footer navigation">
        <Link to="/standards">Our standard</Link><Link to="/care">Care</Link>
        <a href="/legal.html#imprint">Imprint</a><a href="/legal.html#privacy">Privacy</a>
        <a href="/legal.html#shipping">Delivery & returns</a>
      </nav>
    </div>
    <p className="e-reference-note">Editorial reference photography only. Clothing pictured is not an EVERNE product.</p>
  </footer>;
}

function CollectionPage({ categoryId }: { categoryId?: string }) {
  const category = draftCategories.find((entry) => entry.id === categoryId);
  const all = categoryId === 'all';
  if (!all && !category) return <section className="e-product-missing">
    <span className="e-kicker">EVERNE / WOMAN</span>
    <h1 tabIndex={-1}>Collection not found.</h1>
    <p>Explore the current design edit. No garments are available to order.</p>
    <Link className="e-text-link" to="/collections/all">VIEW ALL PIECES <span aria-hidden="true">↗</span></Link>
  </section>;
  const items = all ? productDrafts : productDrafts.filter((item) => item.category === categoryId);

  return <section className="e-collection-page" aria-labelledby="collection-page-title">
    <nav className="e-collection-breadcrumb" aria-label="Breadcrumb"><Link to="/">EVERNE</Link><span>/</span><Link to="/collections/all">WOMAN</Link>{!all && <><span>/</span><span>{category?.label}</span></>}</nav>
    <div className="e-collection-heading">
      <div><span className="e-kicker">EVERNE / WOMAN / FIRST EDIT</span><h1 id="collection-page-title" tabIndex={-1}>{all ? 'All pieces.' : category?.label}</h1></div>
      <div className="e-collection-heading-right"><span>{String(items.length).padStart(2, '0')} PIECES</span><p>Collection in preparation.<br />Photography and product details to follow.</p></div>
    </div>
    <div className="e-collection-grid" role="list" aria-label={`${all ? 'All' : category?.label} design concepts`}>
      {items.map((item) => <article className="e-collection-card" role="listitem" key={item.slug}>
        <Link to={`/products/${item.slug}`} aria-label={`View ${item.name} design preview`}>
          <div className="e-collection-card-image" aria-hidden="true">
            <span className="e-collection-card-index">EVERNE / WOMAN</span>
            <span className="e-collection-image-pending">IMAGE<br />PENDING</span>
            <span className="e-collection-card-photo">PRODUCT PHOTOGRAPHY TO FOLLOW</span>
          </div>
          <div className="e-collection-card-caption"><h2>{item.name}</h2><span>DESIGN PREVIEW <span aria-hidden="true">↗</span></span></div>
        </Link>
      </article>)}
    </div>
    <p className="e-collection-disclosure">DEVELOPMENT PREVIEW ONLY. PHOTOGRAPHS, MATERIALS, FIT, SIZES AND PRICES ARE NOT APPROVED. NO ORDERS CAN BE PLACED.</p>
  </section>;
}

function Home() {
  return <>
    <section className="e-hero" aria-labelledby="hero-title">
      <div className="e-hero-visual">
        <img src={editorial('05-tailoring.jpg')} alt="Independent styling reference: fashion model wearing an oversized black blazer and boots against a neutral studio backdrop. This outfit is not an EVERNE product." fetchPriority="high" />
        <span className="e-visual-credit">STYLING REFERENCE / NOT AN EVERNE GARMENT</span>
      </div>
      <div className="e-hero-copy">
        <span className="e-kicker">EVERNE / WOMAN</span>
        <div className="e-hero-content">
          <h1 id="hero-title" tabIndex={-1}>The first<br /><em>edit.</em></h1>
          <p>A considered edit of modern womenswear.</p>
          <Link className="e-text-link" to="/collections/all">EXPLORE THE EDIT <span aria-hidden="true">↗</span></Link>
        </div>
        <span className="e-hero-index">WOMENSWEAR / COLLECTION IN PREPARATION</span>
      </div>
    </section>

    <section className="e-wardrobe" id="collection" aria-labelledby="collection-title">
      <div className="e-wardrobe-heading">
        <div>
          <span className="e-kicker">THE FIRST SELECTION / WOMAN</span>
          <h2 id="collection-title" tabIndex={-1}>The wardrobe.</h2>
        </div>
        <p>Five wardrobe categories.<br />Collection in preparation.</p>
      </div>
      <div className="e-wardrobe-grid" role="list" aria-label="Planned womenswear categories with reference photographs">
        {categories.map(({ id, name, image, alt }, index) => <article className="e-category" role="listitem" key={name}>
          <Link to={`/collections/${id}`} aria-label={`Explore ${name} design concepts`}>
            <div className="e-category-image">
              <img src={editorial(image)} loading={index < 3 ? 'eager' : 'lazy'} alt={alt + ' Independent reference photo, not an EVERNE garment.'} />
              <span>STYLING STUDY</span>
            </div>
            <div className="e-category-caption">
              <div><span>0{index + 1} / WOMAN</span><h3>{name}</h3></div>
              <span className="e-category-status">VIEW PIECES ↗</span>
            </div>
          </Link>
        </article>)}
        <div className="e-wardrobe-endnote">
          <span className="e-kicker">ABOUT THE FIRST EDIT</span>
          <p>Nothing rushed.</p>
          <span>Fit, fabric information and final product imagery are being reviewed before launch.</span>
          <Link className="e-text-link" to="/standards">OUR STANDARD <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <p className="e-wardrobe-disclosure">PHOTOGRAPHIC STYLE REFERENCES ONLY. THE CLOTHING SHOWN IS NOT FROM EVERNE. NO GARMENTS ARE YET AVAILABLE TO ORDER.</p>
    </section>

    <section className="e-collection-entry" aria-label="Browse the full edit">
      <div><span className="e-kicker">THE FIRST EDIT / 20 DESIGN CONCEPTS</span><p>Explore the pieces.</p></div>
      <Link className="e-text-link" to="/collections/all">VIEW ALL PIECES <span aria-hidden="true">↗</span></Link>
    </section>

    <section className="e-approach" id="direction" aria-label="EVERNE direction">
      <span className="e-kicker">EVERNE / OUR DIRECTION</span>
      <p>Considered pieces.<br /><em>A quieter wardrobe.</em></p>
      <Link className="e-text-link" to="/standards">HOW WE SELECT <span aria-hidden="true">↗</span></Link>
    </section>

    <section className="e-care-teaser" aria-labelledby="care-teaser-title">
      <span className="e-kicker">EVERNE / CARE</span>
      <h2 id="care-teaser-title">Made to be kept in mind.</h2>
      <Link className="e-text-link" to="/care">DISCOVER CARE <span aria-hidden="true">↗</span></Link>
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

  const index = productDrafts.indexOf(item);
  const category = draftCategories.find((entry) => entry.id === item.category);
  const next = productDrafts[(index + 1) % productDrafts.length];
  const previous = productDrafts[(index - 1 + productDrafts.length) % productDrafts.length];

  return <>
    <nav className="e-product-breadcrumb" aria-label="Breadcrumb">
      <Link to="/">EVERNE</Link><span>/</span><Link to="/collections/all">WOMAN</Link><span>/</span><Link to={`/collections/${item.category}`}>{category?.label}</Link>
    </nav>
    <article className="e-product-page" aria-labelledby="product-title">
      <div className="e-product-gallery" aria-label="Reserved image positions for pending product photography">
        <div className="e-product-image-slot e-product-image-main" role="note" aria-label="Primary product photograph is not yet available">
          <span>EVERNE / WOMAN</span>
          <strong>IMAGE<br />PENDING</strong>
          <span>01 / MAIN PRODUCT IMAGE</span>
        </div>
        <div className="e-product-image-pair">
          <div className="e-product-image-slot" role="note" aria-label="Secondary product photograph is not yet available"><span>02 / SECONDARY VIEW</span><small>AWAITING APPROVED PHOTO</small></div>
          <div className="e-product-image-slot" role="note" aria-label="Garment detail photograph is not yet available"><span>03 / DETAIL VIEW</span><small>AWAITING APPROVED PHOTO</small></div>
        </div>
      </div>
      <div className="e-product-information">
        <span className="e-kicker">EVERNE / WOMAN · DESIGN PREVIEW {String(index + 1).padStart(2, '0')} / 20</span>
        <h1 id="product-title" tabIndex={-1}>{item.name}</h1>
        <p className="e-product-intro">{item.description}</p>
        <div className="e-product-pending"><span>IN DEVELOPMENT</span><span>NOT AVAILABLE TO ORDER</span></div>
        <section className="e-product-copy" aria-labelledby="design-direction-title">
          <h2 id="design-direction-title">Design direction</h2>
          <p>{item.designDirection}</p>
        </section>
        <section className="e-product-copy" aria-labelledby="styling-note-title">
          <h2 id="styling-note-title">Styling note</h2>
          <p>{item.stylingNote}</p>
        </section>
        <div className="e-product-specs" aria-label="Specifications still under review">
          <h2>Details under review</h2>
          <dl>
            <div><dt>Fit direction</dt><dd>{item.fitDirection}</dd></div>
            <div><dt>Composition & care</dt><dd>Pending fabric, care-label and physical-sample review.</dd></div>
            <div><dt>Sizes & colours</dt><dd>Not verified or offered at this stage.</dd></div>
            <div><dt>Price & delivery</dt><dd>Not published. No orders or reservations can be placed.</dd></div>
          </dl>
        </div>
        <p className="e-product-disclaimer">This is a private design-page draft, not an offer. Descriptions are creative direction only and do not confirm that a particular garment, fabric or fit is available.</p>
        <Link className="e-text-link" to={`/collections/${item.category}`}>BACK TO {category?.label.toUpperCase()} <span aria-hidden="true">↗</span></Link>
      </div>
    </article>
    <nav className="e-product-pagination" aria-label="More design concepts">
      <Link to={`/products/${previous.slug}`}><span>PREVIOUS CONCEPT</span><strong>{previous.name}</strong></Link>
      <Link to={`/products/${next.slug}`}><span>NEXT CONCEPT</span><strong>{next.name}</strong></Link>
    </nav>
  </>;
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
  return <div className="everne-editorial" id="top"><Header page={page} categoryId={product?.category ?? categoryId} /><main id="main" tabIndex={-1}>{page === 'home' ? <Home /> : page === 'care' ? <Care /> : page === 'standards' ? <Standards /> : page === 'collection' ? <CollectionPage categoryId={categoryId} /> : <ProductPage handle={handle} />}</main><Footer /></div>;
}
