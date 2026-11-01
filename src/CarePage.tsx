import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from './seo';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

const carePieces = [
  {
    number: '01',
    name: 'Garment Brush',
    image: 'garment-brush',
    alt: 'Wooden garment brush with natural bristles on a light stone plinth',
    description: 'A simple garment-care ritual for suitable fabrics. Always check the care label first.',
  },
  {
    number: '02',
    name: 'Cashmere Comb',
    image: 'cashmere-comb',
    alt: 'Rounded wooden cashmere comb with a metal comb edge',
    description: 'A considered tool for carefully tending to compatible knitwear surfaces.',
  },
  {
    number: '03',
    name: 'Cedar Wardrobe Set',
    image: 'cedar-wardrobe-set',
    alt: 'Cedar wardrobe-care accessories arranged for a catalog photograph',
    description: 'A compact wardrobe-care study for thoughtful storage and everyday upkeep.',
  },
  {
    number: '04',
    name: 'The Renewal Set',
    image: 'renewal-set',
    alt: 'Garment-care tools grouped together in a light studio photograph',
    description: 'A curated introduction to gentle care habits and maintaining favorite pieces.',
  },
] as const;

export default function CarePage() {
  useEffect(() => {
    applySeo({
      title: 'EVERNE CARE — The Care Studio | Collection Preview',
      description: 'The original EVERNE garment-care direction. Explore a curated catalog preview of care tools and the rituals around the things you keep.',
      path: '/care',
      indexable: false,
    });
  }, []);

  return (
    <div className="everne-woman w-care-page" id="top">
      <a className="w-skip-link" href="#care-main">Skip to content</a>
      <div className="w-announcement">
        <span>EVERNE / THE CARE STUDIO</span>
        <span>Collection preview · Shopping not yet available</span>
        <span>Hamburg · Germany</span>
      </div>

      <header className="w-care-page-header">
        <Link className="w-care-back" to="/">← <span>EVERNE WOMAN</span></Link>
        <Link className="w-logo" to="/" aria-label="EVERNE homepage">EVERNE<span>CARE</span></Link>
        <a className="w-care-header-index" href="#care-catalog">THE ORIGINAL EDIT ↓</a>
      </header>

      <main id="care-main" tabIndex={-1}>
        <section className="w-care-page-hero" aria-labelledby="care-page-title">
          <div className="w-care-page-hero-copy">
            <div className="w-kicker">EVERNE / OBJECTS OF CARE</div>
            <h1 id="care-page-title" tabIndex={-1}>The things<br /><em>worth keeping.</em></h1>
            <p>Style is personal. So is the way we care for it. Discover the quieter side of EVERNE — rituals and accessories for a more considered wardrobe.</p>
            <a className="w-outline-link" href="#care-catalog">Explore the care edit <span aria-hidden="true">↓</span></a>
            <span className="w-care-page-hero-foot">THE ORIGINAL COLLECTION / 2026</span>
          </div>
          <div className="w-care-page-hero-photo">
            <img src={base + 'products/renewal-set/lifestyle.webp'} alt="A considered arrangement of garment-care tools in a bright architectural setting" fetchPriority="high" />
            <span>THE CARE STUDIO / EVERNE</span>
          </div>
        </section>

        <section className="w-care-catalog" id="care-catalog" aria-labelledby="care-catalog-title">
          <div className="w-care-catalog-heading">
            <div>
              <span className="w-kicker">01 — THE ORIGINAL EDIT</span>
              <h2 id="care-catalog-title">Care, <em>considered.</em></h2>
            </div>
            <p>Four pieces from our original garment-care direction. This is a non-transactional catalog preview: availability, exact specifications and fulfillment are still being verified.</p>
          </div>
          <div className="w-care-catalog-grid">
            {carePieces.map((item) => (
              <article className="w-care-catalog-product" key={item.number}>
                <div className="w-care-catalog-photo">
                  <img src={base + 'products/' + item.image + '/catalog.webp'} alt={item.alt} loading="lazy" />
                  <span>CARE / {item.number}</span>
                </div>
                <div className="w-care-catalog-copy">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <span>CATALOG PREVIEW / NOT AVAILABLE TO ORDER</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="w-care-ritual" aria-labelledby="care-ritual-title">
          <div className="w-care-ritual-heading">
            <span className="w-kicker">02 — A MORE CONSIDERED RITUAL</span>
            <h2 id="care-ritual-title">Care is a<br /><em>way of wearing.</em></h2>
          </div>
          <div className="w-care-ritual-steps">
            <div><span>01</span><strong>Read the label.</strong><p>The garment maker's instructions always come first.</p></div>
            <div><span>02</span><strong>Begin gently.</strong><p>Test delicate or unfamiliar textiles on an inconspicuous area.</p></div>
            <div><span>03</span><strong>Keep with intention.</strong><p>Store clean, dry pieces appropriately for their materials.</p></div>
          </div>
        </section>

        <section className="w-care-return">
          <span className="w-kicker">THE EVERNE UNIVERSE</span>
          <h2>Back to<br /><em>the atelier.</em></h2>
          <Link className="w-solid-link" to="/">Explore EVERNE WOMAN <span aria-hidden="true">→</span></Link>
        </section>
      </main>

      <footer className="w-detail-footer">
        <Link to="/">EVERNE</Link>
        <span>Collection preview · No active sales</span>
        <a href={base + 'legal.html'}>Legal information</a>
      </footer>
    </div>
  );
}
