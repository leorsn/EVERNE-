import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { applySeo } from './seo';
import { conceptLink, editViewSearch, parseEditView } from './womenswearNavigation';
import {
  conceptPieces,
  fashionCategories,
  formatTargetPrice,
  type FashionCategory,
} from './womenswearCatalog';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';
const editorialImage = (name: string) => base + 'editorial/' + name + '.webp';

const questions = [
  {
    question: 'Can I shop the new collection yet?',
    answer: 'Not yet. This is a preview of our creative direction and planned assortment. We are reviewing actual garments, sizes, suppliers and delivery arrangements before opening checkout.',
  },
  {
    question: 'How much will the pieces cost?',
    answer: 'Our planned price range is €34–€59, including VAT. Individual prices shown are targets only, not confirmed retail prices or offers for sale.',
  },
  {
    question: 'Which sizes will be available?',
    answer: 'Our size range is not confirmed yet. Some supplier samples use combined sizes such as S/M and L/XL, while others offer individual sizes. We will publish exact garment measurements and fit guidance only after selecting and checking the final pieces.',
  },
  {
    question: 'How will shipping and returns work?',
    answer: 'Before launch, we will publish confirmed delivery times, shipping fees, a return address and withdrawal information. We are not accepting orders at present.',
  },
  {
    question: 'What is EVERNE CARE?',
    answer: 'EVERNE CARE is our dedicated garment-care studio, built around the original care collection. Explore the separate CARE page; ordering will only be enabled once Shopify and fulfillment details have been verified.',
  },
  {
    question: 'Who is behind EVERNE and how are pieces selected?',
    answer: 'EVERNE is an independent womenswear curation project being developed in Hamburg. We review external supplier garments, and do not present a concept as a confirmed product. Our selection process and the outstanding checks are explained under Our Standard.',
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export default function WomenswearApp() {
  const location = useLocation();
  const navigate = useNavigate();
  const editView = parseEditView(location.search);
  const { category, showAll } = editView;
  const [menuOpen, setMenuOpen] = useState(false);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  useEffect(() => {
    applySeo({
      title: 'EVERNE — Collection 01 | Womenswear Preview',
      description: 'Explore Collection 01 from EVERNE. Twenty planned womenswear pieces in an early, non-transactional collection preview.',
      path: '/',
      type: 'website',
      indexable: false,
    });
  }, []);

  useEffect(() => {
    // React Router does not reliably restore a hash target when the home page
    // mounts after a detail route. Wait until the collection DOM exists.
    if (location.hash !== '#edit') return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById('edit')?.scrollIntoView({ behavior: 'auto' });
    });
    return () => window.cancelAnimationFrame(frame);
    // Only on mount: changing a filter uses its own reduced-motion-aware scroll.
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuToggleRef.current?.focus();
      }
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    function closeWhenOutside(event: PointerEvent) {
      if (event.target instanceof Node && !headerRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('pointerdown', closeWhenOutside);
    return () => document.removeEventListener('pointerdown', closeWhenOutside);
  }, [menuOpen]);

  const selectedPieces = category === 'all'
    ? conceptPieces
    : conceptPieces.filter((piece) => piece.category === category);
  const visiblePieces = showAll || category !== 'all'
    ? selectedPieces
    : selectedPieces.slice(0, 8);

  function selectCategory(nextCategory: FashionCategory | 'all') {
    navigate({ search: editViewSearch({ category: nextCategory, showAll: false }) }, { replace: true });
    setMenuOpen(false);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById('edit')?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }

  function closeMenu(event: { currentTarget: HTMLAnchorElement }) {
    setMenuOpen(false);
    if (!menuOpen) return;
    // A closed mobile menu hides its focused link. Move keyboard focus to
    // the destination instead of leaving Tab to restart in the header.
    const section = document.getElementById(event.currentTarget.hash.slice(1));
    const destination = section?.querySelector<HTMLElement>('h1, h2') ?? section;
    if (!destination) return;
    window.requestAnimationFrame(() => {
      destination.tabIndex = -1;
      destination.focus({ preventScroll: true });
    });
  }

  return (
    <div className="everne-woman" id="top">
      <a className="w-skip-link" href="#main">Skip to content</a>

      <div className="w-announcement">
        <span>Collection 01 is taking shape</span>
        <span>Shopping not yet available — collection preview</span>
        <span>Worldwide / English</span>
      </div>

      <header className="w-header" ref={headerRef}>
        <button
          ref={menuToggleRef}
          className="w-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="woman-nav"
        >
          {menuOpen ? 'Close' : 'Menu'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav id="woman-nav" className={menuOpen ? 'w-nav is-open' : 'w-nav'} aria-label="Main navigation">
          <a href="#edit" onClick={closeMenu}>New In</a>
          <a href="#collection" onClick={closeMenu}>Clothing</a>
          <a href="#story" onClick={closeMenu}>The Brand</a>
          <Link to="/care" onClick={() => setMenuOpen(false)}>Care</Link>
        </nav>
        <a className="w-logo" href="#top" onClick={closeMenu} aria-label="EVERNE homepage">EVERNE</a>
        <Link className="w-header-cta" to="/standards" onClick={() => setMenuOpen(false)}>Our Standard <Arrow diagonal /></Link>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="w-hero" aria-labelledby="hero-title">
          <div className="w-hero-copy">
            <div className="w-section-meta"><span>EVERNE / WOMENSWEAR</span><span>01 — 2026</span></div>
            <div className="w-hero-main">
              <p className="w-overline">INTRODUCING / THE FIRST EDIT</p>
              <h1 id="hero-title" tabIndex={-1}>COLLECTION<br />01.</h1>
              <p className="w-hero-description">A new direction in everyday womenswear. Explore the 20-piece edit ahead of launch.</p>
              <a className="w-solid-link" href="#edit">Discover the collection <Arrow /></a>
            </div>
            <div className="w-hero-foot">
              <span>THE EVERNE EDIT</span>
              <span>€34–€59 / PLANNED PRICES</span>
            </div>
          </div>
          <div className="w-hero-media">
            <img src={editorialImage('dark-hero')} alt="Editorial fashion reference showing a model in dark tailoring, not a product for sale" fetchPriority="high" />
          </div>
        </section>

        <section className="w-trust-rail" aria-label="What visitors can expect from this preview">
          <div><strong>Collection 01</strong><span>20 planned pieces</span></div>
          <div><strong>Selection before sales</strong><span>No checkout until actual garments are verified</span></div>
          <div><strong>Our process</strong><Link to="/standards">Read the selection standard <Arrow diagonal /></Link></div>
        </section>

        <section className="w-category-section" id="collection" aria-label="Planned fashion categories">
          <div className="w-category-heading"><h2>EXPLORE THE EDIT</h2><p>Twenty styles. Five categories. One first collection.</p></div>
          <div className="w-category-grid">
            <button type="button" className="w-category-card w-category-knitwear" onClick={() => selectCategory('knitwear')} aria-pressed={category === 'knitwear'}>
              <img src={editorialImage('dark-coat')} alt="" loading="lazy" />
              <span className="w-category-info"><span className="w-category-title">EVERYDAY UNIFORM <Arrow diagonal /></span><span className="w-category-price">EXPLORE KNITWEAR</span></span>
            </button>
            <button type="button" className="w-category-card w-category-dresses" onClick={() => selectCategory('dresses')} aria-pressed={category === 'dresses'}>
              <img src={editorialImage('dark-dress')} alt="" loading="lazy" />
              <span className="w-category-info"><span className="w-category-title">AFTER HOURS <Arrow diagonal /></span><span className="w-category-price">EXPLORE DRESSES</span></span>
            </button>
          </div>
          <div className="w-category-shortcuts" aria-label="All categories">
            {fashionCategories.map((item) => (
              <button key={item.id} type="button" onClick={() => selectCategory(item.id)} aria-pressed={category === item.id}>
                {item.title}<span>{String(item.count).padStart(2,'0')} <Arrow diagonal /></span>
              </button>
            ))}
          </div>
          <p className="w-media-note">Campaign images are mood references, not photographs of the planned garments.</p>
        </section>

        <section className="w-edit" id="edit" aria-labelledby="edit-title">
          <div className="w-edit-header">
            <div>
              <div className="w-kicker">COLLECTION 01 / WOMENSWEAR</div>
              <h2 id="edit-title" tabIndex={-1}>THE EDIT</h2>
            </div>
            <div className="w-edit-description">
              <p>20 planned pieces. Target prices from €34–€59.</p>
              <span>COLLECTION PREVIEW / NO CHECKOUT</span>
            </div>
          </div>

          <div className="w-edit-confidence">
            <div>
              <span className="w-kicker">BEFORE THE FIRST DROP</span>
              <p>Each card is a design direction, not a stocked garment. We will replace this preview with actual product photography and verified sizing, fabrics, delivery and return terms before orders open.</p>
            </div>
            <Link to="/standards">How we select <Arrow diagonal /></Link>
          </div>

          <div className="w-filters" role="group" aria-label="Choose a category">
            <button type="button" aria-pressed={category === 'all'} className={category === 'all' ? 'is-active' : ''} onClick={() => selectCategory('all')}>All <span>20</span></button>
            {fashionCategories.map((item) => (
              <button key={item.id} type="button" aria-pressed={category === item.id} className={category === item.id ? 'is-active' : ''} onClick={() => selectCategory(item.id)}>{item.title} <span>{item.count}</span></button>
            ))}
          </div>

          <p className="w-results-summary" role="status" aria-live="polite">
            Showing {visiblePieces.length} of {selectedPieces.length} planned design concepts{category === 'all' ? '' : ` in ${fashionCategories.find((item) => item.id === category)?.title}`}.
          </p>

          <div className="w-concept-grid" id="w-concepts">
            {visiblePieces.map((piece) => {
              const index = conceptPieces.indexOf(piece);
              return (
                <article className="w-concept-card" key={piece.name}>
                  <Link className="w-concept-link" to={conceptLink(piece.name, editView)} aria-label={'View the ' + piece.name + ' design concept'}>
                    <div className={'w-concept-visual tone-' + piece.tone} aria-hidden="true">
                      <span className="w-concept-watermark">{String(index + 1).padStart(2, '0')}</span>
                      <span className="w-concept-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="w-concept-label">COLLECTION STUDY ↗</span>
                    </div>
                    <div className="w-concept-meta">
                      <div><span>{fashionCategories.find((item) => item.id === piece.category)?.title}</span><h3>{piece.name}</h3></div>
                      <div className="w-target-price"><span>Price target</span><strong>{formatTargetPrice(piece.targetPrice)}</strong></div>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>

          {category === 'all' &&
            <button
              className="w-show-all"
              type="button"
              aria-expanded={showAll}
              aria-controls="w-concepts"
              onClick={() => navigate({ search: editViewSearch({ category: 'all', showAll: !showAll }), hash: location.hash }, { replace: true })}
            >
              {showAll ? 'Show fewer concepts' : 'View all 20 concepts'} <Arrow />
            </button>
          }
          <p className="w-disclaimer">Concept index only. No inventory is confirmed; final product photographs and details are pending supplier and sample review.</p>
        </section>

        <section className="w-story" id="story">
          <div className="w-story-photo">
            <img src={editorialImage('dark-skirt')} alt="Womenswear editorial mood reference, not a product photograph" loading="lazy" />
          </div>
          <div className="w-story-copy">
            <div className="w-kicker">THE BRAND</div>
            <h2>EVERNE<br />WOMAN.</h2>
            <p>EVERNE is an independent womenswear curation project developed in Hamburg. We work with external suppliers and only intend to offer pieces once the garments, fit, materials and order experience have been checked.</p>
            <Link className="w-text-link" to="/standards">Our approach <Arrow diagonal /></Link>
          </div>
        </section>

        <section className="w-care" id="care" aria-labelledby="care-title">
          <div className="w-care-intro">
            <div className="w-kicker">A SEPARATE COLLECTION</div>
            <h2 id="care-title">EVERNE<br />CARE.</h2>
            <p>The original care collection — brushes, combs and essentials for looking after the pieces you own.</p>
            <span className="w-care-tag">GARMENT CARE / PREVIEW</span>
            <Link className="w-care-explore" to="/care">Explore Care <Arrow diagonal /></Link>
          </div>
          <div className="w-care-products" aria-label="Everne Care original collection preview">
            <article className="w-care-product">
              <img src={base + 'products/garment-brush/catalog.webp'} alt="Wooden garment brush with natural bristles" loading="lazy" />
              <div><span>CARE / 001</span><h3>Garment Brush</h3></div>
            </article>
            <article className="w-care-product">
              <img src={base + 'products/cashmere-comb/catalog.webp'} alt="Wooden cashmere comb with a metal comb edge" loading="lazy" />
              <div><span>CARE / 002</span><h3>Cashmere Comb</h3></div>
            </article>
            <p className="w-care-note">Original care catalog preview. Online ordering is currently unavailable; availability will be confirmed with our Shopify store.</p>
          </div>
        </section>

        <section className="w-faq" id="faq">
          <div><div className="w-kicker">INFORMATION</div><h2>GOOD TO KNOW.</h2></div>
          <div className="w-faq-list">
            {questions.map((item, index) => (
              <div className="w-faq-item" key={item.question}>
                <button type="button" aria-expanded={openQuestion === index} aria-controls={'woman-faq-answer-' + index} onClick={() => setOpenQuestion((value) => value === index ? null : index)}>
                  <span>{item.question}</span><span aria-hidden="true">{openQuestion === index ? '−' : '+'}</span>
                </button>
                <p id={'woman-faq-answer-' + index} hidden={openQuestion !== index}>{item.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-footer">
        <div className="w-footer-top">
          <div><a href="#top" className="w-footer-logo">EVERNE</a><p>Womenswear & garment care.<br />Hamburg, Germany.</p></div>
          <div><span>Explore</span><a href="#collection">Categories</a><a href="#edit">Collection 01</a><a href="#story">The Brand</a><Link to="/standards">Our Standard</Link><Link to="/care">Everne Care</Link></div>
          <div><span>Information</span><a href={base + 'legal.html#imprint'}>Legal notice</a><a href={base + 'legal.html#privacy'}>Privacy</a><a href={base + 'legal.html#returns'}>Returns</a><a href={base + 'legal.html#shipping'}>Shipping & returns</a></div>
        </div>
        <div className="w-footer-bottom"><span>© 2026 EVERNE · Hamburg</span><span>Collection preview · No active sales</span><span>EVERNE WOMAN / 01</span></div>
      </footer>
    </div>
  );
}
