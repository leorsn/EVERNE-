import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo } from './seo';

const base = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : import.meta.env.BASE_URL + '/';

const checks = [
  {
    number: '01',
    title: 'The garment itself.',
    description: 'A supplier listing is a starting point, not our quality verdict. Fabric, construction, care labels and the actual sample must be reviewed before we describe an item as ready.',
  },
  {
    number: '02',
    title: 'Fit you can understand.',
    description: 'Real measurements, available sizes and fit notes must come from confirmed product information. We will not imply that every style fits the same way.',
  },
  {
    number: '03',
    title: 'The full cost, upfront.',
    description: 'An actual price, delivery destination, shipping charge and expected dispatch window belong in the shopping journey before payment.',
  },
  {
    number: '04',
    title: 'Help after delivery.',
    description: 'A clear contact route, withdrawal information, return address and a workable refund process are part of the product experience — not fine print.',
  },
] as const;

export default function StandardsPage() {
  useEffect(() => {
    applySeo({
      title: 'The EVERNE Standard — How We Select | Collection Preview',
      description: 'A transparent look at what EVERNE checks before any womenswear concept becomes an item available to order.',
      path: '/standards',
      indexable: false,
    });
  }, []);

  return (
    <div className="everne-woman w-standards-page" id="top">
      <a className="w-skip-link" href="#standards-main">Skip to content</a>
      <div className="w-announcement">
        <span>EVERNE WOMAN / OUR STANDARD</span>
        <span>Collection preview · Shopping not yet available</span>
        <span>Hamburg · Germany</span>
      </div>

      <header className="w-detail-header">
        <Link className="w-detail-back" to="/#edit">← <span>Back to the edit</span></Link>
        <Link className="w-logo" to="/" aria-label="EVERNE WOMAN homepage">EVERNE<span>WOMAN</span></Link>
        <span className="w-detail-header-caption">THE STANDARD / 2026</span>
      </header>

      <main id="standards-main" tabIndex={-1}>
        <section className="w-standards-intro" aria-labelledby="standards-title">
          <div className="w-kicker">A NOTE FROM THE ATELIER</div>
          <h1 id="standards-title" tabIndex={-1}>The standard<br /><em>is proof.</em></h1>
          <div className="w-standards-intro-bottom">
            <p>EVERNE is an independent womenswear curation project being developed in Hamburg. We select from external suppliers; we do not present a supplier's listing as a garment we have made or approved.</p>
            <p>The first edit contains 20 design concepts. They are an invitation to explore our direction — not a promise of inventory. Orders remain closed while the essentials below are checked.</p>
          </div>
        </section>

        <section className="w-standards-checks" aria-labelledby="standards-checks-title">
          <div className="w-standards-section-heading">
            <span className="w-kicker">01 — BEFORE A PIECE GOES LIVE</span>
            <h2 id="standards-checks-title">Considered,<br /><em>not assumed.</em></h2>
          </div>
          <div className="w-standards-check-grid">
            {checks.map((item) => (
              <article key={item.number}>
                <span className="w-standards-number">{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="w-standards-status" aria-labelledby="standards-status-title">
          <div>
            <span className="w-kicker">02 — WHERE WE STAND</span>
            <h2 id="standards-status-title">Honesty is<br /><em>the detail.</em></h2>
          </div>
          <div>
            <h3>What is decided</h3>
            <p>Our visual direction, five womenswear categories, 20 planning concepts and the intended €34–€59 price range.</p>
            <h3>What is not yet verified</h3>
            <p>Final garments, fibre composition, fit, size availability, supplier arrangements, shipping charges, return handling and final retail prices.</p>
            <p className="w-standards-disclosure">No garments are available to order on this preview. We will only present verified product information when the collection is ready.</p>
          </div>
        </section>

        <section className="w-standards-next">
          <span className="w-kicker">EXPLORE WITH CLARITY</span>
          <h2>Discover the<br /><em>direction.</em></h2>
          <div className="w-standards-actions">
            <Link className="w-solid-link" to="/#edit">View the 20 concepts <span aria-hidden="true">→</span></Link>
            <a className="w-outline-link" href={base + 'legal.html'}>Legal information <span aria-hidden="true">↗</span></a>
          </div>
        </section>
      </main>

      <footer className="w-detail-footer">
        <Link to="/">EVERNE WOMAN</Link>
        <span>Collection preview · No active sales</span>
        <a href={base + 'legal.html'}>Legal information</a>
      </footer>
    </div>
  );
}
