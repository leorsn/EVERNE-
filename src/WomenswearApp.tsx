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

const styleNotes = [
  {
    label: '01 / OFF DUTY',
    title: 'The art of ease.',
    description: 'A considered daily ritual. Fluid lines, quiet textures and immaculate foundations made for wherever the day leads.',
    pieces: ['Essential Rib Top', 'Wide Leg Trouser', 'Relaxed Crew Knit'],
  },
  {
    label: '02 / AFTER HOURS',
    title: 'After dark.',
    description: 'An expressive silhouette needs very little else. A close fit, a precise line and texture that speaks for itself.',
    pieces: ['Second Skin Body', 'The Black Mini', 'Off-Shoulder Knit'],
  },
  {
    label: '03 / NEW PERSPECTIVE',
    title: 'Beyond convention.',
    description: 'Subtle contrasts, lived-in denim and beautifully chosen layers. A more individual interpretation of modern elegance.',
    pieces: ['Fine Knit Top', 'Straight Leg Denim', 'Wrap Knit Cardigan'],
  },
] as const;

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
  const [activeStyle, setActiveStyle] = useState(0);

  useEffect(() => {
    applySeo({
      title: 'EVERNE — The Dark Atelier | Collection Preview',
      description: 'EVERNE explores a darker kind of elegance: considered silhouettes, black-on-black essentials and a curated fashion collection preview.',
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
  const selectedStyle = styleNotes[activeStyle];

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
        <span>EVERNE WOMAN / COLLECTION 01</span>
        <span>Collection preview · Shopping not yet available</span>
        <span>Hamburg · Germany</span>
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
          <a href="#edit" onClick={closeMenu}>The Edit</a>
          <a href="#story" onClick={closeMenu}>Our World</a>
          <a href="#style-notes" onClick={closeMenu}>Style Notes</a>
          <Link to="/standards" onClick={() => setMenuOpen(false)}>Our Standard</Link>
          <Link to="/care" onClick={() => setMenuOpen(false)}>Everne Care</Link>
        </nav>
        <a className="w-logo" href="#top" onClick={closeMenu} aria-label="EVERNE homepage">EVERNE<span>WOMAN</span></a>
        <a className="w-header-cta" href="#edit" onClick={closeMenu}>The Edit <Arrow diagonal /></a>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="w-hero" aria-labelledby="hero-title">
          <div className="w-hero-copy">
            <div className="w-section-meta"><span>01 / THE DARK ATELIER</span><span>Collection study / 2026</span></div>
            <div className="w-hero-main">
              <p className="w-overline">THE ART OF BEING UNFORGETTABLE</p>
              <h1 id="hero-title" tabIndex={-1}>A darker<br /><em>kind of elegance.</em></h1>
              <p className="w-hero-description">A considered edit of womenswear: sculpted silhouettes, tactile layers and essentials with a quiet edge. Explore 20 styles in development before our first collection is ready to shop.</p>
              <a className="w-solid-link" href="#edit">Explore the 20-piece edit <Arrow /></a>
            </div>
            <div className="w-hero-foot">
              <span>SUBSTANCE OVER SPECTACLE</span>
              <span>€34–€59 · Planned price range</span>
            </div>
          </div>
          <div className="w-hero-media">
            <img src={editorialImage('dark-hero')} alt="Woman in a black tailored leather-look coat against a charcoal studio backdrop — conceptual fashion editorial" fetchPriority="high" />
            <div className="w-image-stamp"><span>E / 01</span><small>THE DARK ATELIER</small></div>
            <span className="w-vertical-caption">EVERNE — A STUDY IN CONTRAST</span>
          </div>
        </section>

        <div className="w-marquee" aria-label="Brand philosophy">
          <span>FORM. FEELING. FREEDOM.</span><span className="w-star">✦</span>
          <span>THE DARK ATELIER / 001</span><span className="w-star">✦</span>
          <span>LESS NOISE. MORE PRESENCE.</span><span className="w-star">✦</span>
          <span>FORM. FEELING. FREEDOM.</span>
        </div>

        <section className="w-trust-rail" aria-label="What visitors can expect from this preview">
          <div><strong>20 planned pieces</strong><span>Explore the first womenswear direction</span></div>
          <div><strong>Selection before sales</strong><span>No checkout until actual garments are verified</span></div>
          <div><strong>Clarity before checkout</strong><span>Real sizing, delivery and returns information required</span></div>
        </section>

        <section className="w-intro" id="collection">
          <div className="w-kicker">01 — THE WARDROBE</div>
          <div className="w-intro-content">
            <h2>A study in<br /><em>modern allure.</em></h2>
            <p>Created around contrast: soft against structured, timeless against unexpected. A wardrobe with intention — never a uniform.</p>
          </div>
        </section>

        <section className="w-category-section" aria-label="Planned fashion categories">
          <div className="w-category-grid">
            {fashionCategories.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={'w-category-card w-category-' + item.id}
                onClick={() => selectCategory(item.id)}
                aria-pressed={category === item.id}
                aria-label={item.title + ': view design concepts'}
              >
                {index === 0 && <img src={editorialImage('dark-coat')} alt="" loading="lazy" />}
                {index === 1 && <img src={editorialImage('dark-knit')} alt="" loading="lazy" />}
                {index === 2 && <img src={editorialImage('dark-hero')} alt="" loading="lazy" />}
                {index === 3 && <img src={editorialImage('dark-dress')} alt="" loading="lazy" />}
                {index === 4 && <img src={editorialImage('dark-skirt')} alt="" loading="lazy" />}
                <span className="w-category-no">0{index + 1} / {String(item.count).padStart(2, '0')} PIECES</span>
                <span className="w-category-info">
                  <span className="w-category-title">{item.title} <Arrow diagonal /></span>
                  <span className="w-category-price">Target prices {item.priceRange}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="w-media-note">Editorial photography illustrates our style direction, not garments available for purchase.</p>
        </section>

        <section className="w-story" id="story">
          <div className="w-story-photo">
            <img src={editorialImage('dark-coat')} alt="Woman in black sculptural tailoring — editorial style reference" loading="lazy" />
            <span>THE LOOK / 001</span>
          </div>
          <div className="w-story-copy">
            <div className="w-kicker">02 — THE POINT OF VIEW</div>
            <h2>Presence<br /><em>without noise.</em></h2>
            <p>EVERNE is being developed in Hamburg as an independent curated fashion label. We select from external suppliers, and we believe a beautiful silhouette deserves equally clear information about its fabric, fit and delivery.</p>
            <div className="w-story-rule"><span>01 / Sample before claims</span><span>02 / Measurements before size advice</span><span>03 / Clear terms before checkout</span></div>
            <Link className="w-text-link" to="/standards">How we select <Arrow diagonal /></Link>
          </div>
        </section>

        <section className="w-style-notes" id="style-notes" aria-labelledby="style-notes-title">
          <div className="w-style-intro">
            <span className="w-kicker">03 — STYLE NOTES</span>
            <h2 id="style-notes-title">Wear it<br /><em>your way.</em></h2>
            <p>The best wardrobe isn't a set of rules. It's a collection of pieces you can make your own — from slow mornings to spontaneous nights.</p>
            <span className="w-style-intro-foot">THREE MOODS / ONE WARDROBE</span>
          </div>
          <div className="w-style-explorer">
            <div className="w-style-options" role="group" aria-label="Choose a styling direction">
              {styleNotes.map((style, index) => (
                <button
                  key={style.label}
                  type="button"
                  className={activeStyle === index ? 'is-active' : ''}
                  aria-pressed={activeStyle === index}
                  onClick={() => setActiveStyle(index)}
                >
                  <span>{style.label}</span>
                  <span aria-hidden="true">{activeStyle === index ? '●' : '○'}</span>
                </button>
              ))}
            </div>
            <div className="w-style-selection">
              <div className="w-style-selection-heading">
                <div>
                  <span className="w-kicker">THE SELECTED EDIT</span>
                  <h3 aria-live="polite">{selectedStyle.title}</h3>
                </div>
                <p>{selectedStyle.description}</p>
              </div>
              <div className="w-style-piece-grid">
                {selectedStyle.pieces.map((name, index) => {
                  const piece = conceptPieces.find((item) => item.name === name)!;
                  return (
                    <Link key={piece.name} className="w-style-piece" to={conceptLink(piece.name, editView)} aria-label={'View design concept: ' + piece.name}>
                      <div className={'w-style-piece-art tone-' + piece.tone} aria-hidden="true">
                        <span className="w-style-piece-number">0{index + 1}</span>
                        <span className="w-style-piece-mark">E.</span>
                        <span className="w-style-piece-arrow">↗</span>
                      </div>
                      <span className="w-style-piece-name">{piece.name}</span>
                      <span className="w-style-piece-price">TARGET {formatTargetPrice(piece.targetPrice)}</span>
                    </Link>
                  );
                })}
              </div>
              <p className="w-style-notice">Styling inspiration only. These are design concepts, not photographs or available products.</p>
            </div>
          </div>
        </section>

        <section className="w-edit" id="edit" aria-labelledby="edit-title">
          <div className="w-edit-header">
            <div>
              <div className="w-kicker">04 — COMING INTO FOCUS</div>
              <h2 id="edit-title" tabIndex={-1}>The <em>Edit.</em></h2>
            </div>
            <div className="w-edit-description">
              <p>20 planned pieces. An early edit — not yet available to buy.</p>
              <span>PREVIEW / NO CHECKOUT</span>
            </div>
          </div>

          <div className="w-edit-confidence">
            <div>
              <span className="w-kicker">CURATION, WITH CONTEXT</span>
              <p>Each card is a design direction, not a stocked garment. Final photographs, garment composition, measurements and purchase information follow only after review.</p>
            </div>
            <Link to="/standards">Read our selection standard <Arrow diagonal /></Link>
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
                      <span className="w-concept-watermark">E.</span>
                      <span className="w-concept-index">{String(index + 1).padStart(2, '0')}</span>
                      <span className="w-concept-label">CONCEPT ONLY ↗</span>
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
          <p className="w-disclaimer">This edit is a creative and sourcing plan. Product names, final prices, fabrics, sizing and availability will only be confirmed after sourcing is complete.</p>
        </section>

        <section className="w-bottom-editorial">
          <div className="w-bottom-copy">
            <span className="w-overline">EVERNE WOMAN / COL. 01</span>
            <h2>Leave an<br /><em>impression.</em></h2>
            <p>Our first drop is taking shape. Actual garments, detailed sizing and clear delivery information are coming soon.</p>
            <a className="w-outline-link" href="#faq">Find out more <Arrow /></a>
          </div>
          <div className="w-bottom-photo">
            <img src={editorialImage('dark-knit')} alt="Close editorial detail of refined black ribbed knitwear — styling reference" loading="lazy" />
          </div>
        </section>

        <section className="w-care" id="care" aria-labelledby="care-title">
          <div className="w-care-intro">
            <div className="w-kicker">05 — THE CARE STUDIO</div>
            <span className="w-care-monogram" aria-hidden="true">E.</span>
            <h2 id="care-title">Wear well.<br /><em>Keep forever.</em></h2>
            <p>A quieter chapter of EVERNE. Thoughtful garment-care essentials made to accompany the things you choose to keep.</p>
            <span className="w-care-tag">EVERNE CARE / ORIGINAL COLLECTION</span>
            <Link className="w-care-explore" to="/care">Discover the Care Studio <Arrow diagonal /></Link>
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
          <div><div className="w-kicker">06 — GOOD TO KNOW</div><h2>The little<br /><em>details.</em></h2></div>
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
          <div><a href="#top" className="w-footer-logo">EVERNE</a><p>In the details.<br />In the feeling.</p></div>
          <div><span>Explore</span><a href="#collection">Categories</a><a href="#edit">The Edit</a><a href="#style-notes">Style Notes</a><a href="#story">Our World</a><Link to="/standards">Our Standard</Link><Link to="/care">Everne Care</Link></div>
          <div><span>Information</span><a href={base + 'legal.html#imprint'}>Legal notice</a><a href={base + 'legal.html#privacy'}>Privacy</a><a href={base + 'legal.html#returns'}>Returns</a><a href={base + 'legal.html#shipping'}>Shipping & returns</a></div>
        </div>
        <div className="w-footer-bottom"><span>© 2026 EVERNE · Hamburg</span><span>Collection preview · No active sales</span><span>Commerce foundation by Shopify</span></div>
      </footer>
    </div>
  );
}
