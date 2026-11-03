import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from './seo';
import { trendCandidates, type TrendCandidate } from './trendCandidates';
import { reviewedTrendProducts } from './trendProducts';

type Page = 'home' | 'discover' | 'candidate' | 'standard' | 'about' | 'not-found';

const firstCandidate = trendCandidates[0];

const selectionPrinciples = [
  { number: '01', name: 'Relevance', description: 'A product must solve a recognizable problem or bring something useful to everyday life.' },
  { number: '02', name: 'Evidence', description: 'Supplier descriptions and social-media attention are starting points, not proof of quality.' },
  { number: '03', name: 'Delivery', description: 'Availability, shipping, returns and the real costs must be checked before an item can be listed.' },
];

function Header({ page }: { page: Page }) {
  return <header className="t-header">
    <Link className="t-mark" to="/" aria-label="EVERNE home">EVERNE</Link>
    <nav className="t-navigation" aria-label="Primary navigation">
      <Link to="/discover" aria-current={page === 'discover' ? 'page' : undefined}>DISCOVER</Link>
      <Link to="/standard" aria-current={page === 'standard' ? 'page' : undefined}>OUR STANDARD</Link>
      <Link to="/about" aria-current={page === 'about' ? 'page' : undefined}>ABOUT</Link>
    </nav>
    <span className="t-header-status">PRE-LAUNCH EDITION</span>
  </header>;
}

function Footer() {
  return <footer className="t-footer">
    <div className="t-footer-main">
      <Link className="t-footer-mark" to="/">EVERNE</Link>
      <p>Independently selected. Carefully reviewed.<br />Hamburg, Germany.</p>
    </div>
    <div className="t-footer-bottom">
      <span>© EVERNE 2026 · Private concept preview · No sales</span>
      <nav aria-label="Legal and information">
        <Link to="/standard">Our standard</Link>
        <a href="/legal.html#imprint">Legal notice</a>
        <a href="/legal.html#privacy">Privacy</a>
        <a href="/legal.html#shipping">Shipping & returns</a>
      </nav>
    </div>
  </footer>;
}

function CandidateImagePlaceholder({ number = '001' }: { number?: string }) {
  return <div className="t-candidate-image" role="img" aria-label="Product photograph pending verification">
    <span>EVERNE / RESEARCH {number}</span>
    <strong>IMAGE<br />PENDING</strong>
    <span>ACTUAL PRODUCT PHOTOGRAPHY REQUIRED</span>
  </div>;
}

function CandidateCard({ candidate }: { candidate: TrendCandidate }) {
  return <article className="t-candidate-card">
    <Link to={`/discover/${candidate.slug}`} aria-label={`View ${candidate.workingTitle} research concept`}>
      <CandidateImagePlaceholder />
      <div className="t-candidate-card-meta"><span>{candidate.category.toUpperCase()} / WORKING CONCEPT</span><span>NOT FOR SALE</span></div>
      <h2>{candidate.workingTitle} <span aria-hidden="true">↗</span></h2>
      <p>Product and supplier verification pending.</p>
    </Link>
  </article>;
}

function Home() {
  return <>
    <section className="t-hero" aria-labelledby="t-hero-title">
      <div className="t-hero-copy">
        <span className="t-kicker">EVERNE / A DIFFERENT KIND OF SELECTION</span>
        <h1 id="t-hero-title" tabIndex={-1}>Less noise.<br /><em>Better finds.</em></h1>
        <p>Products worth a closer look. Across categories, without the unnecessary clutter.</p>
        <Link className="t-primary-link" to="/discover">EXPLORE THE FIRST DROP <span aria-hidden="true">↗</span></Link>
      </div>
      <div className="t-hero-side" aria-label="First drop status">
        <span>01 / THE FIRST SELECTION</span>
        <div className="t-hero-side-middle"><strong>EVERNE</strong><p>DISCOVERY<br />IN PROGRESS</p></div>
        <span>PRODUCTS UNDER REVIEW / ORDERS CLOSED</span>
      </div>
    </section>
    <section className="t-first-look" aria-labelledby="t-first-look-title">
      <div className="t-first-look-heading"><span className="t-kicker">FIRST LOOK / PRODUCT RESEARCH</span><span>01 / 01</span></div>
      <div className="t-first-look-grid">
        <CandidateImagePlaceholder />
        <div className="t-first-look-copy">
          <span className="t-kicker">{firstCandidate.category.toUpperCase()} / CANDIDATE 001</span>
          <h2 id="t-first-look-title">{firstCandidate.workingTitle}.</h2>
          <p>{firstCandidate.summary}</p>
          <span className="t-research-pill">SOURCING REVIEW · NOT FOR SALE</span>
          <Link className="t-text-link" to={`/discover/${firstCandidate.slug}`}>VIEW THE RESEARCH CONCEPT <span aria-hidden="true">↗</span></Link>
        </div>
      </div>
    </section>
    <section className="t-statement" aria-labelledby="t-statement-title">
      <span className="t-kicker">THE APPROACH</span>
      <h2 id="t-statement-title">Not another endless catalog.</h2>
      <p>We are preparing a focused selection of products from different areas of everyday life. Nothing appears for sale until its details and fulfillment have been checked.</p>
      <Link className="t-text-link" to="/standard">HOW WE SELECT <span aria-hidden="true">↗</span></Link>
    </section>
    <section className="t-preview-banner" aria-label="Shop launch status">
      <span>FIRST DROP / IN PREPARATION</span>
      <Link to="/discover">DISCOVER THE EDIT <span aria-hidden="true">↗</span></Link>
    </section>
  </>;
}

function Discover() {
  const categories = [...new Set(reviewedTrendProducts.map((product) => product.category))];
  return <section className="t-inner t-discover" aria-labelledby="t-discover-title">
    <div className="t-inner-heading">
      <span className="t-kicker">THE EVERNE EDIT / 001</span>
      <h1 id="t-discover-title" tabIndex={-1}>Discover.</h1>
      <p>A deliberately small selection, built around what earns its place.</p>
    </div>
    {reviewedTrendProducts.length > 0 ? <>
      <div className="t-collection-bar"><span>ALL PRODUCTS · {reviewedTrendProducts.length}</span><span>{categories.join(' / ')}</span></div>
      <div className="t-product-grid">
        {reviewedTrendProducts.map((product) => <article className="t-product-card" key={product.slug}>
          <img src={product.primaryImage.publicPath} alt={product.primaryImage.altText} loading="lazy" />
          <div className="t-product-card-meta"><span>{product.category}</span><span>€{product.retailGrossEur}</span></div>
          <h2>{product.title}</h2><p>{product.description}</p>
        </article>)}
      </div>
      <p className="t-review-note">Reviewed catalog preview only. Ordering is not enabled.</p>
    </> : <>
      <div className="t-research-status" role="status"><span>FIRST DROP / IN PROGRESS</span><p>One working concept is being researched below. <strong>No products are approved for sale, and checkout remains closed.</strong></p></div>
      <div className="t-candidate-grid">
        {trendCandidates.map((candidate) => <CandidateCard key={candidate.slug} candidate={candidate} />)}
      </div>
      <div className="t-review-note">CONCEPTS UNDER REVIEW — NO PRODUCTS PUBLISHED / NO CHECKOUT</div>
    </>}
  </section>;
}

function CandidateDetail() {
  const candidate = firstCandidate;
  return <section className="t-inner t-candidate-detail" aria-labelledby="t-candidate-title">
    <Link className="t-back-link" to="/discover">← BACK TO DISCOVER</Link>
    <div className="t-detail-grid">
      <CandidateImagePlaceholder />
      <div className="t-detail-information">
        <span className="t-kicker">{candidate.category.toUpperCase()} / CANDIDATE 001</span>
        <h1 id="t-candidate-title" tabIndex={-1}>{candidate.workingTitle}.</h1>
        <span className="t-research-pill">RESEARCH CONCEPT · NOT FOR SALE</span>
        <p className="t-detail-intro">{candidate.summary}</p>
        <dl className="t-detail-facts">
          <div><dt>Exact model</dt><dd>Not yet verified</dd></div>
          <div><dt>Materials & dimensions</dt><dd>Supplier confirmation pending</dd></div>
          <div><dt>Price & availability</dt><dd>Not approved</dd></div>
          <div><dt>Shipping & returns</dt><dd>Not verified</dd></div>
        </dl>
        <p className="t-detail-explanation">This is a private look at the product-research workflow, not an offer to purchase. There is no reservation list, cart or purchase button.</p>
        <Link className="t-text-link" to="/standard">HOW PRODUCTS ARE VERIFIED <span aria-hidden="true">↗</span></Link>
      </div>
    </div>
    <div className="t-detail-checks">
      <div><span className="t-kicker">BEFORE A FIRST DROP</span><h2>What must be verified.</h2></div>
      <ol>{candidate.reviewChecks.map((check) => <li key={check}>{check}</li>)}</ol>
    </div>
  </section>;
}

function Standard() {
  return <section className="t-inner" aria-labelledby="t-standard-title">
    <div className="t-inner-heading">
      <span className="t-kicker">WHAT MAKES THE EDIT</span>
      <h1 id="t-standard-title" tabIndex={-1}>The standard.</h1>
      <p>Interest gets our attention. Verification earns a product its place.</p>
    </div>
    <div className="t-principles">
      {selectionPrinciples.map(({ number, name, description }) => <article className="t-principle" key={number}>
        <span>{number}</span><h2>{name}</h2><p>{description}</p>
      </article>)}
    </div>
    <div className="t-disclosure"><span>TRANSPARENCY</span><p>EVERNE is a curator and retailer, not the manufacturer of the products we research. Popularity does not establish safety or quality. No product, supplier payment workflow, fulfillment promise or retail price has been approved for this new direction.</p></div>
  </section>;
}

function About() {
  return <section className="t-inner t-about" aria-labelledby="t-about-title">
    <div className="t-inner-heading">
      <span className="t-kicker">ABOUT EVERNE</span>
      <h1 id="t-about-title" tabIndex={-1}>Good finds.<br /><em>No fixed category.</em></h1>
      <p>EVERNE is an independent online store concept from Hamburg. The aim is straightforward: make interesting, useful products easier to discover.</p>
    </div>
    <div className="t-about-grid"><h2>Built to change<br />with what matters.</h2><div><p>Our focus is not one product type. We look at emerging interest, everyday usefulness and the practical reality of bringing an item to customers.</p><p>This is a private concept preview. The selection, supplier arrangements, prices and consumer information still require verification before any public sale.</p><Link className="t-text-link" to="/discover">VIEW THE FIRST DROP <span aria-hidden="true">↗</span></Link></div></div>
  </section>;
}

function Missing() {
  return <section className="t-inner" aria-labelledby="t-missing-title"><div className="t-inner-heading"><span className="t-kicker">EVERNE / PREVIEW</span><h1 id="t-missing-title" tabIndex={-1}>Not listed.</h1><p>This product or page is not part of the current preview. Nothing is available to order.</p><Link className="t-primary-link" to="/discover">BACK TO DISCOVER <span aria-hidden="true">↗</span></Link></div></section>;
}

export default function TrendStorePreview({ page }: { page: Page }) {
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'EVERNE — A New Selection', discover: 'EVERNE — Discover',
      candidate: 'EVERNE — Jewellery Bag Research Concept',
      standard: 'EVERNE — Our Standard', about: 'EVERNE — About', 'not-found': 'EVERNE — Page Not Listed',
    };
    applySeo({
      title: titles[page],
      description: 'EVERNE is preparing a focused selection of products across categories. No products are approved for sale.',
      path: '/next.html', indexable: false,
    });
  }, [page]);

  return <div className="trend-store" id="top">
    <a className="t-skip" href="#main">Skip to content</a>
    <Header page={page} />
    <main id="main" tabIndex={-1}>
      {page === 'home' ? <Home /> : page === 'discover' ? <Discover /> : page === 'candidate' ? <CandidateDetail /> : page === 'standard' ? <Standard /> : page === 'about' ? <About /> : <Missing />}
    </main>
    <Footer />
  </div>;
}
