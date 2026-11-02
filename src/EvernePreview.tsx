import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from './seo';

type Page = 'home' | 'care' | 'standards';
const categories = [
  { name: 'Tops & Bodysuits', image: '06-bodysuit.jpg', alt: 'Woman wearing a black sleeveless bodysuit against a neutral backdrop.' },
  { name: 'Knitwear', image: '07-knitwear.jpg', alt: 'Woman wearing an ivory roll-neck sweater and dark trousers in a studio.' },
  { name: 'Trousers & Denim', image: '08-denim.jpg', alt: 'Woman wearing blue jeans and a white sleeveless top.' },
  { name: 'Dresses', image: '09-dress.jpg', alt: 'Woman wearing a black long-sleeved dress and boots.' },
  { name: 'Skirts', image: '10-skirt.jpg', alt: 'Woman wearing a camel ribbed midi skirt with a pale long-sleeved top.' },
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
        <Link className={page === 'home' ? 'e-active' : ''} aria-current={page === 'home' ? 'page' : undefined} to="/#collection">WOMAN</Link>
        <Link to="/#direction">OUR DIRECTION</Link>
      </nav>
      <Link to="/" className="e-wordmark" aria-label="EVERNE — home">EVERNE</Link>
      <nav className="e-nav-right" aria-label="Other sections">
        <Link className={page === 'care' ? 'e-active' : ''} aria-current={page === 'care' ? 'page' : undefined} to="/care">CARE</Link>
        <Link className={page === 'standards' ? 'e-active' : ''} aria-current={page === 'standards' ? 'page' : undefined} to="/standards">OUR STANDARD</Link>
      </nav>
    </header>
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

function Home() {
  return <>
    <section className="e-hero" aria-labelledby="hero-title">
      <div className="e-hero-visual">
        <img src={editorial('05-tailoring.jpg')} alt="Independent styling reference: woman wearing a black tailored blazer and trousers. This outfit is not an EVERNE product." fetchPriority="high" />
        <span className="e-visual-credit">STYLING REFERENCE / NOT AN EVERNE GARMENT</span>
      </div>
      <div className="e-hero-copy">
        <span className="e-kicker">EVERNE / WOMAN</span>
        <div className="e-hero-content">
          <h1 id="hero-title" tabIndex={-1}>The first<br /><em>edit.</em></h1>
          <p>A new perspective on the everyday wardrobe.</p>
          <a className="e-text-link" href="#collection">DISCOVER THE WARDROBE <span aria-hidden="true">↗</span></a>
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
        <p>Five directions for the first edit.<br />The collection is in preparation.</p>
      </div>
      <div className="e-wardrobe-grid" role="list" aria-label="Planned womenswear categories with reference photographs">
        {categories.map(({ name, image, alt }, index) => <article className="e-category" role="listitem" key={name}>
          <div className="e-category-image">
            <img src={editorial(image)} loading={index < 3 ? 'eager' : 'lazy'} alt={alt + ' Independent reference photo, not an EVERNE garment.'} />
            <span>STYLING STUDY</span>
          </div>
          <div className="e-category-caption">
            <div><span>0{index + 1} / WOMAN</span><h3>{name}</h3></div>
            <span className="e-category-status">IN PREPARATION</span>
          </div>
        </article>)}
        <div className="e-wardrobe-endnote">
          <span className="e-kicker">COMING INTO FOCUS</span>
          <p>The pieces<br /><em>come first.</em></p>
          <span>We are reviewing the garments, fit and details before the collection is made available.</span>
          <Link className="e-text-link" to="/standards">OUR STANDARD <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
      <p className="e-wardrobe-disclosure">PHOTOGRAPHIC STYLE REFERENCES ONLY. THE CLOTHING SHOWN IS NOT FROM EVERNE. NO GARMENTS ARE YET AVAILABLE TO ORDER.</p>
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
  useEffect(() => {
    const title = page === 'care' ? 'EVERNE — Care' : page === 'standards' ? 'EVERNE — Our Standard' : 'EVERNE — Womenswear';
    applySeo({ title, description: 'EVERNE is an independent womenswear project in preparation. The collection is not yet available to order.', path: page === 'home' ? '/' : '/' + page, type: 'website', indexable: false });
  }, [page]);
  return <div className="everne-editorial" id="top"><Header page={page} /><main id="main" tabIndex={-1}>{page === 'home' ? <Home /> : page === 'care' ? <Care /> : <Standards />}</main><Footer /></div>;
}
