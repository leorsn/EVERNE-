import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from './seo';

type Page = 'home' | 'care' | 'standards';

const categories = [
  'Tops & Bodysuits',
  'Knitwear',
  'Trousers & Denim',
  'Dresses',
  'Skirts',
];

const standards = [
  {
    title: 'The garment',
    text: 'Before a style is offered, its actual sample, construction, fabric and care information need to be reviewed.',
  },
  {
    title: 'The fit',
    text: 'Sizes, measurements and fit notes must be based on confirmed garments — never assumptions from a supplier listing.',
  },
  {
    title: 'The details',
    text: 'Final prices, delivery times, shipping charges and return arrangements must be clear before orders open.',
  },
  {
    title: 'The imagery',
    text: 'Product photography will appear only when it represents reviewed, approved pieces. No substitute campaign imagery is being used here.',
  },
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Header({ page }: { page: Page }) {
  return (
    <>
      <a className="e-skip" href="#main">Skip to content</a>
      <div className="e-statusbar">
        <span>EVERNE / AN INDEPENDENT WARDROBE PROJECT</span>
        <span>COLLECTION IN PREPARATION</span>
      </div>
      <header className="e-header">
        <Link to="/" className="e-wordmark" aria-label="EVERNE — home">EVERNE</Link>
        <nav className="e-navigation" aria-label="Main navigation">
          <Link className={page === 'home' ? 'e-active' : ''} aria-current={page === 'home' ? 'page' : undefined} to="/#collection">WOMENSWEAR</Link>
          <Link className={page === 'care' ? 'e-active' : ''} aria-current={page === 'care' ? 'page' : undefined} to="/care">CARE</Link>
          <Link className={page === 'standards' ? 'e-active' : ''} aria-current={page === 'standards' ? 'page' : undefined} to="/standards">THE STANDARD</Link>
        </nav>
        <span className="e-header-note">HAMBURG&nbsp; / &nbsp;2026</span>
      </header>
    </>
  );
}

function Footer() {
  return (
    <footer className="e-footer">
      <div className="e-footer-top">
        <span className="e-footer-brand">EVERNE</span>
        <p>An independent womenswear project.</p>
      </div>
      <div className="e-footer-bottom">
        <span>© EVERNE 2026 · Preview only · No active sales</span>
        <nav aria-label="Footer navigation">
          <Link to="/standards">Our standard</Link>
          <Link to="/care">Care</Link>
          <a href="/legal.html#imprint">Imprint</a>
          <a href="/legal.html#privacy">Privacy</a>
          <a href="/legal.html#shipping">Delivery & returns</a>
        </nav>
      </div>
    </footer>
  );
}

function Home() {
  return (
    <>
      <section className="e-hero" aria-labelledby="hero-title">
        <div className="e-hero-top"><span>WOMENSWEAR</span><span>FIRST EDIT / IN PROGRESS</span></div>
        <div className="e-hero-center">
          <span className="e-hero-index">E — 01</span>
          <h1 id="hero-title" tabIndex={-1}>A wardrobe,<br /><em>in the making.</em></h1>
        </div>
        <div className="e-hero-bottom">
          <p>An independent womenswear project.<br />The first selection is under review.</p>
          <a href="#collection">THE FIRST EDIT <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="e-collection e-section-pad" id="collection" aria-labelledby="collection-title">
        <div className="e-section-number"><span>01 / THE COLLECTION</span><span>WOMAN</span></div>
        <div className="e-section-intro">
          <h2 id="collection-title" tabIndex={-1}>What comes<br /><em>next.</em></h2>
          <p>Our first edit is planned across five categories. No garment is confirmed for sale. Photography and specifications will follow only after supplier and sample approval.</p>
        </div>
        <div className="e-category-list" role="list" aria-label="Planned womenswear categories">
          {categories.map((name, index) => (
            <div className="e-category" role="listitem" key={name}>
              <span className="e-category-index">0{index + 1}</span>
              <span className="e-category-title">{name}</span>
              <span className="e-category-status">IN DEVELOPMENT</span>
            </div>
          ))}
        </div>
        <div className="e-collection-note"><span>NOT YET AVAILABLE TO ORDER</span><span>NO APPROVED PRODUCT PHOTOGRAPHY YET</span></div>
      </section>

      <section className="e-approach e-section-pad" id="studio" aria-labelledby="approach-title">
        <div className="e-section-number"><span>02 / OUR APPROACH</span><span>THE PROCESS</span></div>
        <div className="e-approach-body">
          <h2 id="approach-title">First the piece.<br /><em>Then the picture.</em></h2>
          <div>
            <p>EVERNE is taking shape in Hamburg. We work with external suppliers and review the details before presenting any piece as part of the collection.</p>
            <p>Before launch, we need verified garments, exact sizing, approved photography and workable delivery and return arrangements. There is no checkout at this stage.</p>
            <Link className="e-editorial-link" to="/standards">READ OUR STANDARD <Arrow /></Link>
          </div>
        </div>
      </section>

      <section className="e-afterword e-section-pad" aria-labelledby="afterword-title">
        <div><span className="e-eyebrow">03 / A SECOND DIRECTION</span><h2 id="afterword-title">The care<br /><em>of things.</em></h2></div>
        <div><p>Alongside womenswear, EVERNE CARE explores how garments are maintained. Its accessories will be presented after their specifications and photography are verified.</p><Link className="e-editorial-link e-link-dark" to="/care">DISCOVER CARE <Arrow /></Link></div>
      </section>
    </>
  );
}

function Care() {
  return (
    <>
      <section className="e-subhero" aria-labelledby="care-title">
        <span className="e-eyebrow">EVERNE / THE CARE STUDIO</span>
        <h1 id="care-title" tabIndex={-1}>The care<br /><em>of things.</em></h1>
        <div className="e-subhero-foot"><span>OBJECTS & RITUALS / IN PREPARATION</span><span>NO ACTIVE SALES</span></div>
      </section>
      <section className="e-copy-section e-section-pad">
        <div className="e-section-number"><span>01 / THE IDEA</span><span>CARE</span></div>
        <div className="e-split-copy"><h2>Keep what<br /><em>matters.</em></h2><div><p>CARE is the quieter side of EVERNE: looking after garments so they remain part of everyday life.</p><p>Our proposed care accessories are still being reviewed. Product specifications, approved photography, availability and fulfillment terms are not confirmed, so we are not displaying a product catalogue.</p></div></div>
        <div className="e-quiet-list">
          <div><span>01</span><p>Follow the care label of each garment.</p></div>
          <div><span>02</span><p>Treat unfamiliar materials gently.</p></div>
          <div><span>03</span><p>Store clean, dry pieces with care.</p></div>
        </div>
        <Link className="e-editorial-link e-link-dark" to="/standards">OUR APPROACH TO APPROVAL <Arrow /></Link>
      </section>
    </>
  );
}

function Standards() {
  return (
    <>
      <section className="e-subhero" aria-labelledby="standard-title">
        <span className="e-eyebrow">EVERNE / THE STANDARD</span>
        <h1 id="standard-title" tabIndex={-1}>The details<br /><em>come first.</em></h1>
        <div className="e-subhero-foot"><span>OUR SELECTION PROCESS</span><span>BEFORE LAUNCH</span></div>
      </section>
      <section className="e-copy-section e-section-pad">
        <div className="e-section-number"><span>01 / HOW WE SELECT</span><span>THE STANDARD</span></div>
        <div className="e-split-copy"><h2>Proof before<br /><em>presentation.</em></h2><div><p>EVERNE is an independent womenswear curation project in Hamburg. We select from external suppliers; we do not manufacture the garments or treat a supplier listing as proof of quality.</p><p>The first edit is still a collection of planning concepts. Final products, sizes, prices and logistics are being checked. No garments are available to order.</p></div></div>
        <div className="e-standard-list">
          {standards.map((item, index) => <div key={item.title} className="e-standard-row"><span>0{index + 1}</span><h3>{item.title}</h3><p>{item.text}</p></div>)}
        </div>
        <div className="e-standard-foot"><span>WHAT IS NOT YET VERIFIED</span><p>Final garments, supplier approvals, fibre composition, exact sizes and fit, approved images, shipping fees, delivery windows, return address and final retail prices.</p></div>
      </section>
    </>
  );
}

export default function EvernePreview({ page }: { page: Page }) {
  useEffect(() => {
    const title = page === 'care' ? 'EVERNE — Care Studio' : page === 'standards' ? 'EVERNE — Our Standard' : 'EVERNE — Womenswear in Preparation';
    applySeo({
      title,
      description: 'EVERNE is an independent womenswear project in preparation. The collection is not yet available to order.',
      path: page === 'home' ? '/' : `/${page}`,
      type: 'website',
      indexable: false,
    });
  }, [page]);

  return (
    <div className="everne-editorial" id="top">
      <Header page={page} />
      <main id="main" tabIndex={-1}>
        {page === 'home' ? <Home /> : page === 'care' ? <Care /> : <Standards />}
      </main>
      <Footer />
    </div>
  );
}
