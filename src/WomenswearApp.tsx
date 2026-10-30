import { useEffect, useState } from 'react';
import { applySeo } from './seo';
import {
  conceptPieces,
  fashionCategories,
  formatTargetPrice,
  type FashionCategory,
} from './womenswearCatalog';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';
const editorialImage = (name: string) => base + 'editorial/' + name + '.jpg';

const questions = [
  {
    question: 'Kann ich die neue Kollektion bereits bestellen?',
    answer: 'Noch nicht. Dies ist eine Design- und Sortimentsvorschau. Wir prüfen derzeit konkrete Artikel, Größen, Lieferanten und den Versand. Erst danach öffnen wir den Checkout.',
  },
  {
    question: 'Wie viel werden die Stücke kosten?',
    answer: 'Die geplante Preisspanne liegt zwischen 30 und 60 Euro inklusive Umsatzsteuer. Gezeigte Einzelpreise sind Preisziele und noch keine verbindlichen Angebote.',
  },
  {
    question: 'Welche Größen wird es geben?',
    answer: 'Wir planen überwiegend XS bis XL. Verbindliche Größen und Maßtabellen erscheinen erst nach Auswahl des jeweiligen Lieferanten und tatsächlichen Artikels.',
  },
  {
    question: 'Wie funktionieren Lieferung und Retoure?',
    answer: 'Vor Verkaufsstart veröffentlichen wir die konkreten Lieferzeiten, Versandkosten, Rücksendeadresse und Widerrufsinformationen. Momentan nehmen wir keine Bestellungen an.',
  },
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true">{diagonal ? '↗' : '→'}</span>;
}

export default function WomenswearApp() {
  const [category, setCategory] = useState<FashionCategory | 'all'>('all');
  const [showAll, setShowAll] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openQuestion, setOpenQuestion] = useState<number | null>(null);

  useEffect(() => {
    applySeo({
      title: 'EVERNE WOMAN — Modern essentials & new expressions',
      description: 'EVERNE WOMAN: eine Vorschau auf moderne Damenmode zwischen 30 und 60 Euro. Essentials und Trendteile, neu kuratiert.',
      path: '/',
      type: 'website',
      indexable: false,
    });
  }, []);

  const selectedPieces = category === 'all'
    ? conceptPieces
    : conceptPieces.filter((piece) => piece.category === category);
  const visiblePieces = showAll || category !== 'all'
    ? selectedPieces
    : selectedPieces.slice(0, 8);

  function selectCategory(nextCategory: FashionCategory | 'all') {
    setCategory(nextCategory);
    setShowAll(false);
    setMenuOpen(false);
    document.getElementById('edit')?.scrollIntoView({ behavior: 'smooth' });
  }

  function closeMenu() { setMenuOpen(false); }

  return (
    <div className="everne-woman" id="top">
      <a className="w-skip-link" href="#main">Zum Inhalt springen</a>

      <div className="w-announcement">
        <span>EVERNE WOMAN / COLLECTION 01</span>
        <span>Designvorschau · Bestellungen noch geschlossen</span>
        <span>Hamburg · DE</span>
      </div>

      <header className="w-header">
        <button
          className="w-menu-toggle"
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          aria-expanded={menuOpen}
          aria-controls="woman-nav"
        >
          {menuOpen ? 'Schließen' : 'Menü'} <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
        </button>
        <nav id="woman-nav" className={menuOpen ? 'w-nav is-open' : 'w-nav'} aria-label="Hauptnavigation">
          <a href="#collection" onClick={closeMenu}>Kollektion</a>
          <a href="#story" onClick={closeMenu}>Unsere Welt</a>
          <a href="#edit" onClick={closeMenu}>The Edit</a>
        </nav>
        <a className="w-logo" href="#top" aria-label="EVERNE Startseite">EVERNE<span>WOMAN</span></a>
        <a className="w-header-cta" href="#edit">The Edit <Arrow diagonal /></a>
      </header>

      <main id="main">
        <section className="w-hero" aria-labelledby="hero-title">
          <div className="w-hero-copy">
            <div className="w-section-meta"><span>01 / THE NEW EVERYDAY</span><span>Autumn / Winter 26</span></div>
            <div className="w-hero-main">
              <p className="w-overline">Modern femininity. Your way.</p>
              <h1 id="hero-title">Für jeden Tag.<br /><em>Nicht alltäglich.</em></h1>
              <p className="w-hero-description">Die Pieces, zu denen du immer wieder greifst. Klare Essentials, neue Silhouetten und ein bisschen Mut zum Anderssein.</p>
              <a className="w-solid-link" href="#collection">Kollektion entdecken <Arrow /></a>
            </div>
            <div className="w-hero-foot">
              <span>ESSENTIALS × EXPRESSION</span>
              <span>30–60 € · Geplante Preisspanne</span>
            </div>
          </div>
          <div className="w-hero-media">
            <img src={editorialImage('tailored')} alt="Zwei Frauen in elegant geschnittenen, neutralen Outfits vor einem hellen Torbogen – Editorial-Stilreferenz" fetchPriority="high" />
            <div className="w-image-stamp"><span>EVERNE</span><small>THE WOMAN EDITION</small></div>
            <span className="w-vertical-caption">A MORE PERSONAL UNIFORM — 2026</span>
          </div>
        </section>

        <div className="w-marquee" aria-label="Markenwerte">
          <span>EVERYDAY, ELEVATED</span><span className="w-star">✳</span>
          <span>YOUR STYLE. YOUR RULES.</span><span className="w-star">✳</span>
          <span>ESSENTIALS WITH ATTITUDE</span><span className="w-star">✳</span>
          <span>EVERYDAY, ELEVATED</span>
        </div>

        <section className="w-intro" id="collection">
          <div className="w-kicker">01 — THE WARDROBE</div>
          <div className="w-intro-content">
            <h2>Eine Garderobe.<br /><em>Viele Versionen von dir.</em></h2>
            <p>Mal reduziert, mal ausdrucksstark. EVERNE verbindet unkomplizierte Lieblingsstücke mit ausgewählten Trends. Nicht für einen einzigen Look – sondern für deinen.</p>
          </div>
        </section>

        <section className="w-category-section" aria-label="Geplante Modekategorien">
          <div className="w-category-grid">
            {fashionCategories.map((item, index) => (
              <button
                key={item.id}
                type="button"
                className={'w-category-card w-category-' + item.id}
                onClick={() => selectCategory(item.id)}
                aria-label={item.title + ': Entwürfe ansehen'}
              >
                {index === 0 && <img src={editorialImage('trench')} alt="" loading="lazy" />}
                {index === 1 && <img src={editorialImage('knit')} alt="" loading="lazy" />}
                {index === 2 && <img src={editorialImage('tailored')} alt="" loading="lazy" />}
                <span className="w-category-no">0{index + 1} / {String(item.count).padStart(2, '0')} PIECES</span>
                <span className="w-category-info">
                  <span className="w-category-title">{item.title} <Arrow diagonal /></span>
                  <span className="w-category-price">Preisziele {item.priceRange}</span>
                </span>
              </button>
            ))}
          </div>
          <p className="w-media-note">Editorial-Bilder zeigen die Stilrichtung, nicht die späteren Verkaufsartikel.</p>
        </section>

        <section className="w-story" id="story">
          <div className="w-story-photo">
            <img src={editorialImage('trench')} alt="Frau in beigefarbenem Mantel und Sonnenbrille – urbane Mode-Stilreferenz" loading="lazy" />
            <span>THE LOOK / 001</span>
          </div>
          <div className="w-story-copy">
            <div className="w-kicker">02 — THE POINT OF VIEW</div>
            <h2>Quiet pieces.<br /><em>Bold energy.</em></h2>
            <p>70 Prozent zeitlose Essentials. 30 Prozent neue Impulse. Unser Ansatz für Outfits, die sich mühelos kombinieren lassen und trotzdem nach dir aussehen.</p>
            <div className="w-story-rule"><span>01 / Wear it your way</span><span>02 / Repeat your favourites</span><span>03 / Make it yours</span></div>
            <a className="w-text-link" href="#edit">In die Auswahl schauen <Arrow diagonal /></a>
          </div>
        </section>

        <section className="w-edit" id="edit">
          <div className="w-edit-header">
            <div>
              <div className="w-kicker">03 — COMING INTO FOCUS</div>
              <h2>The <em>Edit.</em></h2>
            </div>
            <div className="w-edit-description">
              <p>20 geplante Pieces. Eine erste Kuratierung – noch keine lieferbaren Produkte.</p>
              <span>PREVIEW / NO CHECKOUT</span>
            </div>
          </div>

          <div className="w-filters" role="group" aria-label="Kategorie auswählen">
            <button type="button" className={category === 'all' ? 'is-active' : ''} onClick={() => selectCategory('all')}>Alle <span>20</span></button>
            {fashionCategories.map((item) => (
              <button key={item.id} type="button" className={category === item.id ? 'is-active' : ''} onClick={() => selectCategory(item.id)}>{item.title} <span>{item.count}</span></button>
            ))}
          </div>

          <div className="w-concept-grid">
            {visiblePieces.map((piece) => {
              const index = conceptPieces.indexOf(piece);
              return (
                <article className="w-concept-card" key={piece.name}>
                  <div className={'w-concept-visual tone-' + piece.tone} aria-hidden="true">
                    <span className="w-concept-watermark">E.</span>
                    <span className="w-concept-index">{String(index + 1).padStart(2, '0')}</span>
                    <span className="w-concept-label">CURATION STUDY</span>
                  </div>
                  <div className="w-concept-meta">
                    <div><span>{fashionCategories.find((item) => item.id === piece.category)?.title}</span><h3>{piece.name}</h3></div>
                    <div className="w-target-price"><span>Preisziel</span><strong>{formatTargetPrice(piece.targetPrice)}</strong></div>
                  </div>
                </article>
              );
            })}
          </div>

          {category === 'all' && !showAll &&
            <button className="w-show-all" type="button" onClick={() => setShowAll(true)}>Alle 20 Konzepte ansehen <Arrow /></button>
          }
          <p className="w-disclaimer">Diese Auswahl ist ein Gestaltungs- und Einkaufsplan. Namen, Preise, Material, Größen und Verfügbarkeit werden erst nach bestätigter Beschaffung verbindlich veröffentlicht.</p>
        </section>

        <section className="w-bottom-editorial">
          <div className="w-bottom-copy">
            <span className="w-overline">EVERNE WOMAN / COL. 01</span>
            <h2>Dress like<br /><em>yourself.</em></h2>
            <p>Der nächste Drop ist in Vorbereitung. Bald mit echten Artikeln, klaren Größeninformationen und transparenten Lieferbedingungen.</p>
            <a className="w-outline-link" href="#faq">Mehr erfahren <Arrow /></a>
          </div>
          <div className="w-bottom-photo">
            <img src={editorialImage('knit')} alt="Frau in auffälligem Strickpullover – Editorial-Stilreferenz für Trendteile" loading="lazy" />
          </div>
        </section>

        <section className="w-faq" id="faq">
          <div><div className="w-kicker">04 — GOOD TO KNOW</div><h2>Die wichtigen<br /><em>Details.</em></h2></div>
          <div className="w-faq-list">
            {questions.map((item, index) => (
              <div className="w-faq-item" key={item.question}>
                <button type="button" aria-expanded={openQuestion === index} onClick={() => setOpenQuestion((value) => value === index ? null : index)}>
                  <span>{item.question}</span><span aria-hidden="true">{openQuestion === index ? '−' : '+'}</span>
                </button>
                {openQuestion === index && <p>{item.answer}</p>}
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-footer">
        <div className="w-footer-top">
          <div><a href="#top" className="w-footer-logo">EVERNE</a><p>Modern essentials.<br />New expressions.</p></div>
          <div><span>Explore</span><a href="#collection">Kollektion</a><a href="#edit">The Edit</a><a href="#story">Unsere Welt</a></div>
          <div><span>Information</span><a href={base + 'rechtliches.html#impressum'}>Impressum</a><a href={base + 'rechtliches.html#datenschutz'}>Datenschutz</a><a href={base + 'rechtliches.html#widerruf'}>Widerruf</a><a href={base + 'rechtliches.html#versand'}>Versand & Retouren</a></div>
        </div>
        <div className="w-footer-bottom"><span>© 2026 EVERNE · Hamburg</span><span>Designvorschau · Kein aktiver Verkauf</span><span>Commerce foundation by Shopify</span></div>
      </footer>
    </div>
  );
}
