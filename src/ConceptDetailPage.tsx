import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { applySeo } from './seo';
import { collectionReturnLink, conceptLink, parseEditView } from './womenswearNavigation';
import {
  conceptPieces,
  conceptSlug,
  fashionCategories,
  formatTargetPrice,
  type FashionCategory,
} from './womenswearCatalog';
import CollectionPendingPage from './CollectionPendingPage';

const direction: Record<FashionCategory, { line: string; brief: string; photo: string }> = {
  tops: {
    line: 'The foundation, reimagined.',
    brief: 'An effortless starting point for looks with clean lines. Final fit and fabric quality will be confirmed only after reviewing physical samples.',
    photo: 'dark-coat',
  },
  knitwear: {
    line: 'Softness with presence.',
    brief: 'Knitwear that makes an everyday statement. We are looking for balanced proportions, comfortable fabrics and thoughtful finishing.',
    photo: 'dark-knit',
  },
  trousers: {
    line: 'A new kind of uniform.',
    brief: 'Relaxed silhouettes meet precise tailoring. Cut, sizing and fabric must all stand up to a hands-on sample review.',
    photo: 'dark-hero',
  },
  dresses: {
    line: 'Easy, never ordinary.',
    brief: 'One piece, endless possibilities. We are focusing on natural movement, flattering fits and details worth taking a closer look at.',
    photo: 'dark-dress',
  },
  skirts: {
    line: 'Movement in focus.',
    brief: 'Fresh proportions for a versatile wardrobe. Length, feel and finish are still being considered as part of the selection process.',
    photo: 'dark-skirt',
  },
};

export default function ConceptDetailPage() {
  const { slug } = useParams();
  const location = useLocation();
  const piece = conceptPieces.find((item) => conceptSlug(item.name) === slug);
  const backTo = collectionReturnLink(location.search);
  const originatingView = parseEditView(location.search);

  useEffect(() => {
    applySeo({
      title: piece ? `${piece.name} — EVERNE WOMAN Design Concept` : 'Concept Not Found — EVERNE WOMAN',
      description: 'An EVERNE WOMAN design concept. This is not an available product and cannot yet be ordered.',
      path: slug ? '/edit/' + slug : '/edit',
      type: 'website',
      indexable: false,
    });
    window.scrollTo(0, 0);
  }, [piece, slug]);

  if (!piece) return <CollectionPendingPage />;

  const category = fashionCategories.find((item) => item.id === piece.category)!;
  const story = direction[piece.category];
  const index = conceptPieces.indexOf(piece);
  const related = conceptPieces.filter((item) => item.category !== piece.category).slice(index % 4, index % 4 + 3);

  return (
    <div className="everne-woman w-detail-page">
      <a className="w-skip-link" href="#detail-main">Skip to content</a>
      <div className="w-announcement"><span>EVERNE WOMAN / THE EDIT</span><span>Collection preview · Shopping not yet available</span><span>Hamburg · Germany</span></div>
      <header className="w-detail-header">
        <Link className="w-detail-back" to={backTo} aria-label="Back to collection">← <span>Back to collection</span></Link>
        <Link className="w-logo" to="/" aria-label="EVERNE WOMAN homepage">EVERNE<span>WOMAN</span></Link>
        <span className="w-detail-header-caption">CURATION STUDY / {String(index + 1).padStart(2, '0')}</span>
      </header>

      <main id="detail-main" tabIndex={-1}>
        <div className="w-detail-breadcrumb"><Link to="/">EVERNE WOMAN</Link><span>/</span><span>THE EDIT</span><span>/</span><span>{piece.name}</span></div>
        <section className="w-detail-layout" aria-labelledby="piece-title">
          <div className="w-detail-artwork">
            <div className={'w-concept-visual w-detail-swatch tone-' + piece.tone} aria-label="Abstract colour and design study, not a product photograph" role="img">
              <span className="w-concept-watermark">E.</span>
              <span className="w-concept-index">EVERNE / 0{String(index + 1).padStart(2, '0')}</span>
              <span className="w-concept-label">NOT A PRODUCT PHOTOGRAPH</span>
            </div>
            <div className="w-detail-art-note"><span>01 / COLOUR & FORM STUDY</span><span>Not a photograph of an available garment</span></div>
          </div>
          <div className="w-detail-content">
            <span className="w-kicker">THE EDIT / {category.title}</span>
            <h1 id="piece-title" tabIndex={-1}>{piece.name}</h1>
            <p className="w-detail-tagline">{story.line}</p>
            <div className="w-detail-price"><span>Planned price target</span><strong>{formatTargetPrice(piece.targetPrice)}</strong></div>
            <p className="w-detail-body">{story.brief}</p>
            <div className="w-detail-status"><span className="w-detail-status-dot" aria-hidden="true"/><strong>In curation — not available to order</strong><p>This piece is currently a concept. We have not yet confirmed a supplier garment, available sizes or delivery times.</p></div>
            <dl className="w-detail-facts">
              <div><dt>Category</dt><dd>{category.title}</dd></div>
              <div><dt>Fabric & care</dt><dd>To be confirmed after sourcing</dd></div>
              <div><dt>Sizes & colours</dt><dd>To be confirmed after sample review</dd></div>
              <div><dt>Shipping</dt><dd>Details available before launch</dd></div>
            </dl>
            <Link className="w-solid-link w-detail-cta" to={backTo}>Explore more design concepts <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="w-detail-editorial" aria-labelledby="detail-editorial-title">
          <div className="w-detail-editorial-copy"><span className="w-kicker">THE EVERNE POINT OF VIEW</span><h2 id="detail-editorial-title">Curated, <em>not rushed.</em></h2><p>We will select the final garment only after reviewing its cut, fabric, sizing, origin, availability and returns process. This editorial image is a style reference only.</p></div>
          <div className="w-detail-editorial-image"><img src={import.meta.env.BASE_URL + 'editorial/' + story.photo + '.webp'} alt="Editorial style reference for the planned collection, not a product photograph" loading="lazy"/></div>
        </section>

        <section className="w-detail-related"><div className="w-kicker">EXPLORE THE EDIT</div><h2>More <em>ideas.</em></h2><div className="w-detail-related-grid">{related.map((item) => <Link key={item.name} to={conceptLink(item.name, originatingView)} className="w-detail-related-card"><div className={'w-concept-visual tone-' + item.tone}><span className="w-concept-watermark">E.</span><span className="w-concept-label">DESIGN CONCEPT ↗</span></div><span>{item.name}</span><small>Price target {formatTargetPrice(item.targetPrice)}</small></Link>)}</div></section>
      </main>

      <footer className="w-detail-footer"><Link to="/">EVERNE WOMAN</Link><span>Collection preview · No active sales</span><a href={import.meta.env.BASE_URL + 'legal.html'}>Legal information</a></footer>
    </div>
  );
}
