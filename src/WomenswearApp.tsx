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
];

const styleNotes = [
  {
    label: '01 / OFF DUTY',
    title: 'Easy, always.',
    description: 'A softer kind of uniform. Familiar foundations, relaxed proportions, and one extra layer for wherever the day leads.',
    pieces: ['Essential Rib Top', 'Wide Leg Trouser', 'Relaxed Crew Knit'],
  },
  {
    label: '02 / AFTER HOURS',
    title: 'Understated drama.',
    description: 'The simplest pieces can make the strongest impression. A close fit, a sharp silhouette, a little unexpected texture.',
    pieces: ['Second Skin Body', 'The Black Mini', 'Off-Shoulder Knit'],
  },
  {
    label: '03 / NEW PERSPECTIVE',
    title: 'Rules? Your own.',
    description: 'An expressive knit, lived-in denim and a layer that ties everything together. Effortlessly individual.',
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
      title: 'EVERNE WOMAN — Modern essentials & new expressions',
      description: 'Discover the EVERNE WOMAN preview: modern wardrobe essentials and expressive pieces, with planned prices between €34 and €59.',
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

  function closeMenu() { setMenuOpen(false); }

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
          <a href="#collection" onClick={closeMenu}>Collection</a>
          <a href="#story" onClick={closeMenu}>Our World</a>
          <a href="#style-notes" onClick={closeMenu}>Style Notes</a>
          <a href="#edit" onClick={closeMenu}>The Edit</a>
        </nav>
        <a className="w-logo" href="#top" onClick={closeMenu} aria-label="EVERNE homepage">EVERNE<span>WOMAN</span></a>
        <a className="w-header-cta" href="#edit" onClick={closeMenu}>The Edit <Arrow diagonal /></a>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="w-hero" aria-labelledby="hero-title">
          <div className="w-hero-copy">
            <div className="w-section-meta"><span>01 / THE NEW EVERYDAY</span><span>Collection study / 2026</span></div>
            <div className="w-hero-main">
              <p className="w-overline">Modern femininity. Your way.</p>
              <h1 id="hero-title">For every day.<br /><em>Never ordinary.</em></h1>
              <p className="w-hero-description">The pieces you reach for again and again. Effortless essentials, fresh silhouettes and a little room to be different.</p>
              <a className="w-solid-link" href="#collection">Explore the collection <Arrow /></a>
            </div>
            <div className="w-hero-foot">
              <span>ESSENTIALS × EXPRESSION</span>
              <span>€34–€59 · Planned price range</span>
            </div>
          </div>
          <div className="w-hero-media">
            <img src={editorialImage('tailored')} alt="Two women in tailored neutral outfits by a light stone archway — editorial style reference" fetchPriority="high" />
            <div className="w-image-stamp"><span>EVERNE</span><small>THE WOMAN EDITION</small></div>
            <span className="w-vertical-caption">A MORE PERSONAL UNIFORM — 2026</span>
          </div>
        </section>

        <div className="w-marquee" aria-label="Brand philosophy">
          <span>EVERYDAY, ELEVATED</span><span className="w-star">✳</span>
          <span>YOUR STYLE. YOUR RULES.</span><span className="w-star">✳</span>
          <span>ESSENTIALS WITH ATTITUDE</span><span className="w-star">✳</span>
          <span>EVERYDAY, ELEVATED</span>
        </div>

        <section className="w-intro" id="collection">
          <div className="w-kicker">01 — THE WARDROBE</div>
          <div className="w-intro-content">
            <h2>One wardrobe.<br /><em>Every version of you.</em></h2>
            <p>Some days understated. Others unapologetic. EVERNE brings together effortless favourites and considered trends. Not for one particular look — for yours.</p>
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
                {index === 0 && <img src={editorialImage('trench')} alt="" loading="lazy" />}
                {index === 1 && <img src={editorialImage('knit')} alt="" loading="lazy" />}
                {index === 2 && <img src={editorialImage('tailored')} alt="" loading="lazy" />}
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
            <img src={editorialImage('trench')} alt="Woman wearing a beige coat and sunglasses — urban fashion style reference" loading="lazy" />
            <span>THE LOOK / 001</span>
          </div>
          <div className="w-story-copy">
            <div className="w-kicker">02 — THE POINT OF VIEW</div>
            <h2>Quiet pieces.<br /><em>Bold energy.</em></h2>
            <p>70% enduring essentials. 30% fresh perspective. Our formula for a wardrobe that works effortlessly together while still feeling entirely your own.</p>
            <div className="w-story-rule"><span>01 / Wear it your way</span><span>02 / Repeat your favourites</span><span>03 / Make it yours</span></div>
            <a className="w-text-link" href="#edit">Explore the edit <Arrow diagonal /></a>
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
                      <span className="w-concept-label">VIEW CONCEPT ↗</span>
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
            <h2>Dress like<br /><em>yourself.</em></h2>
            <p>Our first drop is taking shape. Actual garments, detailed sizing and clear delivery information are coming soon.</p>
            <a className="w-outline-link" href="#faq">Find out more <Arrow /></a>
          </div>
          <div className="w-bottom-photo">
            <img src={editorialImage('knit')} alt="Woman wearing a statement knit sweater — editorial trend reference" loading="lazy" />
          </div>
        </section>

        <section className="w-faq" id="faq">
          <div><div className="w-kicker">05 — GOOD TO KNOW</div><h2>The little<br /><em>details.</em></h2></div>
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
          <div><a href="#top" className="w-footer-logo">EVERNE</a><p>Modern essentials.<br />New expressions.</p></div>
          <div><span>Explore</span><a href="#collection">Collection</a><a href="#edit">The Edit</a><a href="#style-notes">Style Notes</a><a href="#story">Our World</a></div>
          <div><span>Information</span><a href={base + 'legal.html#imprint'}>Legal notice</a><a href={base + 'legal.html#privacy'}>Privacy</a><a href={base + 'legal.html#returns'}>Returns</a><a href={base + 'legal.html#shipping'}>Shipping & returns</a></div>
        </div>
        <div className="w-footer-bottom"><span>© 2026 EVERNE · Hamburg</span><span>Collection preview · No active sales</span><span>Commerce foundation by Shopify</span></div>
      </footer>
    </div>
  );
}
