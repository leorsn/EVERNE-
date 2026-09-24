import type { PreviewProduct } from './previewCatalog';
import './steam-brush-experience.css';

type SteamBrushExperienceProps = {
  steamBrush: PreviewProduct;
  system: PreviewProduct;
  steamPrice: string;
  systemPrice: string;
};

function productHref(handle: string) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}products/${handle}`;
}

const steps = [
  {
    number: '01',
    title: 'Fill & heat',
    copy: 'Fill the reservoir as directed and allow the unit to heat before working on the garment.',
  },
  {
    number: '02',
    title: 'Work in controlled passes',
    copy: 'Move steadily over suitable fabric to relax light creasing rather than repeatedly pressing one area.',
  },
  {
    number: '03',
    title: 'Check the care label',
    copy: 'Follow the garment care label and test delicate or unfamiliar materials on an inconspicuous area first.',
  },
];

export default function SteamBrushExperience({ steamBrush, system, steamPrice, systemPrice }: SteamBrushExperienceProps) {
  return (
    <>
      <section className="featured-product" id="steam-brush" aria-labelledby="steam-brush-title">
        <div className="featured-gallery">
          <figure className="featured-gallery-main">
            <img src={steamBrush.images[0]} alt={steamBrush.alt[0]} loading="eager" />
          </figure>
          <figure>
            <img src={steamBrush.images[1]} alt={steamBrush.alt[1]} loading="lazy" />
          </figure>
          <figure>
            <img src={steamBrush.images[2]} alt={steamBrush.alt[2]} loading="lazy" />
          </figure>
        </div>

        <div className="featured-product-copy">
          <div className="section-label"><span>02</span><span>Hero product</span></div>
          <span className="eyebrow">{steamBrush.ritual}</span>
          <h2 id="steam-brush-title">{steamBrush.title}</h2>
          <div className="featured-price-row">
            <strong>{steamPrice}</strong>
            <span>Edition 01 · orders currently closed</span>
          </div>
          <p className="featured-lead">{steamBrush.description}</p>

          <div className="featured-proof" aria-label="Steam Brush product facts">
            <div><span>Power</span><strong>1000W</strong></div>
            <div><span>Format</span><strong>Foldable</strong></div>
            <div><span>Included</span><strong>Brush + cup</strong></div>
          </div>

          <div className="featured-actions">
            <a href={productHref(steamBrush.handle)}>View full details <span>→</span></a>
            <a href="#system-comparison">Compare with the system <span>↓</span></a>
          </div>

          <details className="featured-details">
            <summary>Product details <span>+</span></summary>
            <ul>
              {steamBrush.details?.map((detail) => <li key={detail}>{detail}</li>)}
            </ul>
          </details>
          <details className="featured-details">
            <summary>Garment care <span>+</span></summary>
            <p>{steamBrush.howToUse}</p>
          </details>
        </div>
      </section>

      <section className="steam-rationale" aria-labelledby="steam-rationale-title">
        <div className="steam-rationale-head">
          <div className="section-label"><span>03</span><span>Why steam first</span></div>
          <h2 id="steam-rationale-title">A useful reset<br /><em>between wears.</em></h2>
        </div>
        <div className="steam-rationale-grid">
          {steamBrush.benefits?.slice(0, 3).map((benefit, index) => (
            <article key={benefit.title}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{benefit.title}</h3>
              <p>{benefit.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="system-comparison" id="system-comparison" aria-labelledby="system-comparison-title">
        <div className="system-comparison-copy">
          <div className="section-label"><span>04</span><span>Choose your level</span></div>
          <h2 id="system-comparison-title">Start with steam.<br /><em>Or build the full routine.</em></h2>
          <p>The Steam Brush is the focused entry point. The EVERNE System adds surface renewal and fine-knit care for €34 more than the Steam Brush alone.</p>
        </div>

        <div className="comparison-cards">
          <article className="comparison-card">
            <div className="comparison-card-head"><span>Focused care</span><strong>{steamPrice}</strong></div>
            <h3>{steamBrush.title}</h3>
            <ul>
              <li><span>Steam refresh</span><strong>Included</strong></li>
              <li><span>Electronic lint removal</span><strong>—</strong></li>
              <li><span>Cashmere care</span><strong>—</strong></li>
            </ul>
            <a href={productHref(steamBrush.handle)}>View Steam Brush <span>→</span></a>
          </article>

          <article className="comparison-card comparison-card--system">
            <div className="comparison-card-head"><span>Complete routine</span><strong>{systemPrice}</strong></div>
            <h3>{system.title}</h3>
            <ul>
              {system.facts?.map((fact) => <li key={fact}><span>{fact}</span><strong>Included</strong></li>)}
            </ul>
            <div className="system-value"><span>Individual value €161</span><strong>Save €32</strong></div>
            <a href={productHref(system.handle)}>View the system <span>→</span></a>
          </article>
        </div>
      </section>

      <section className="use-sequence" aria-labelledby="use-sequence-title">
        <div className="use-sequence-head">
          <div className="section-label"><span>05</span><span>How to use</span></div>
          <h2 id="use-sequence-title">Three steps.<br />No complicated ritual.</h2>
        </div>
        <div className="use-sequence-grid">
          {steps.map((step) => (
            <article key={step.number}>
              <span>{step.number}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
        <p className="use-sequence-note">Always follow the product instructions and garment care label. Test delicate or unfamiliar fabrics first.</p>
      </section>

      <div className="mobile-decision-bar" aria-label="Steam Brush quick decision">
        <div><span>Steam Brush</span><strong>{steamPrice}</strong></div>
        <a href={productHref(steamBrush.handle)}>View details</a>
      </div>
    </>
  );
}
