import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { applySeo } from './seo';
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
    brief: 'Ein unkomplizierter Ausgangspunkt für Looks mit klarer Linie. Die endgültige Passform und Materialqualität werden erst anhand echter Muster entschieden.',
    photo: 'trench',
  },
  knitwear: {
    line: 'Softness with presence.',
    brief: 'Strick als Statement im Alltag. Wir suchen nach ausgewogenen Proportionen, angenehm tragbaren Materialien und hochwertiger Verarbeitung.',
    photo: 'knit',
  },
  trousers: {
    line: 'A new kind of uniform.',
    brief: 'Entspannte Silhouetten treffen auf präzise Linien. Schnitt, Größenlauf und Stoff müssen im Lieferantenmuster überzeugen.',
    photo: 'tailored',
  },
  dresses: {
    line: 'Easy, never ordinary.',
    brief: 'Ein Teil, viele Möglichkeiten. Im Fokus stehen natürliche Bewegung, eine überzeugende Passform und sorgfältig geprüfte Details.',
    photo: 'tailored',
  },
  skirts: {
    line: 'Movement in focus.',
    brief: 'Neue Proportionen für eine vielseitige Garderobe. Länge, Haptik und Verarbeitung sind noch Teil unserer Auswahl.',
    photo: 'trench',
  },
};

export default function ConceptDetailPage() {
  const { slug } = useParams();
  const piece = conceptPieces.find((item) => conceptSlug(item.name) === slug);

  useEffect(() => {
    applySeo({
      title: piece ? `${piece.name} — EVERNE WOMAN Designstudie` : 'Designstudie nicht gefunden — EVERNE WOMAN',
      description: 'Eine unverbindliche EVERNE WOMAN Designstudie. Noch kein lieferbarer Artikel und keine Bestellmöglichkeit.',
      path: slug ? '/edit/' + slug : '/edit',
      type: 'website',
      indexable: false,
    });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [piece, slug]);

  if (!piece) return <CollectionPendingPage />;

  const category = fashionCategories.find((item) => item.id === piece.category)!;
  const story = direction[piece.category];
  const index = conceptPieces.indexOf(piece);
  const related = conceptPieces.filter((item) => item.category !== piece.category).slice(index % 4, index % 4 + 3);

  return (
    <div className="everne-woman w-detail-page">
      <a className="w-skip-link" href="#detail-main">Zum Inhalt springen</a>
      <div className="w-announcement"><span>EVERNE WOMAN / THE EDIT</span><span>Designvorschau · Bestellungen noch geschlossen</span><span>Hamburg · DE</span></div>
      <header className="w-detail-header">
        <Link className="w-detail-back" to="/">← <span>Zur Kollektion</span></Link>
        <Link className="w-logo" to="/" aria-label="EVERNE WOMAN Startseite">EVERNE<span>WOMAN</span></Link>
        <span className="w-detail-header-caption">CURATION STUDY / {String(index + 1).padStart(2, '0')}</span>
      </header>

      <main id="detail-main">
        <div className="w-detail-breadcrumb"><Link to="/">EVERNE WOMAN</Link><span>/</span><span>THE EDIT</span><span>/</span><span>{piece.name}</span></div>
        <section className="w-detail-layout" aria-labelledby="piece-title">
          <div className="w-detail-artwork">
            <div className={'w-concept-visual w-detail-swatch tone-' + piece.tone} aria-label="Abstrakte Farb- und Designstudie, keine Produktabbildung" role="img">
              <span className="w-concept-watermark">E.</span>
              <span className="w-concept-index">EVERNE / 0{String(index + 1).padStart(2, '0')}</span>
              <span className="w-concept-label">NOT A PRODUCT PHOTOGRAPH</span>
            </div>
            <div className="w-detail-art-note"><span>01 / Farb- und Formstudie</span><span>Noch keine Abbildung eines Verkaufsartikels</span></div>
          </div>
          <div className="w-detail-content">
            <span className="w-kicker">THE EDIT / {category.title}</span>
            <h1 id="piece-title">{piece.name}</h1>
            <p className="w-detail-tagline">{story.line}</p>
            <div className="w-detail-price"><span>Geplantes Preisziel</span><strong>{formatTargetPrice(piece.targetPrice)}</strong></div>
            <p className="w-detail-body">{story.brief}</p>
            <div className="w-detail-status"><span className="w-detail-status-dot" aria-hidden="true"/><strong>In Auswahl — noch nicht bestellbar</strong><p>Dieses Piece ist derzeit ein Konzept. Wir haben dafür noch keine verbindlichen Lieferantenartikel, verfügbaren Größen oder bestätigten Lieferzeiten veröffentlicht.</p></div>
            <dl className="w-detail-facts">
              <div><dt>Stilkategorie</dt><dd>{category.title}</dd></div>
              <div><dt>Material & Pflege</dt><dd>Nach Lieferantenauswahl</dd></div>
              <div><dt>Größen & Farben</dt><dd>Nach Musterprüfung</dd></div>
              <div><dt>Versand</dt><dd>Vor Verkaufsstart ausgewiesen</dd></div>
            </dl>
            <Link className="w-solid-link w-detail-cta" to="/">Weitere Designstudien ansehen <span aria-hidden="true">→</span></Link>
          </div>
        </section>

        <section className="w-detail-editorial" aria-labelledby="detail-editorial-title">
          <div className="w-detail-editorial-copy"><span className="w-kicker">THE EVERNE POINT OF VIEW</span><h2 id="detail-editorial-title">Curated, <em>not rushed.</em></h2><p>Wir wählen den finalen Artikel erst nach Prüfung von Schnitt, Material, Größen, Herkunft, Verfügbarkeit und Retourenprozess. Diese Editorial-Fotografie dient ausschließlich als Stilreferenz.</p></div>
          <div className="w-detail-editorial-image"><img src={import.meta.env.BASE_URL + 'editorial/' + story.photo + '.jpg'} alt="Editorial-Stilreferenz für die geplante Kollektion, kein Produktfoto" loading="lazy"/></div>
        </section>

        <section className="w-detail-related"><div className="w-kicker">EXPLORE THE EDIT</div><h2>Weitere <em>Ideen.</em></h2><div className="w-detail-related-grid">{related.map((item) => <Link key={item.name} to={'/edit/' + conceptSlug(item.name)} className="w-detail-related-card"><div className={'w-concept-visual tone-' + item.tone}><span className="w-concept-watermark">E.</span><span className="w-concept-label">DESIGNSTUDIE ↗</span></div><span>{item.name}</span><small>Preisziel {formatTargetPrice(item.targetPrice)}</small></Link>)}</div></section>
      </main>

      <footer className="w-detail-footer"><Link to="/">EVERNE WOMAN</Link><span>Designvorschau · Kein aktiver Verkauf</span><a href={import.meta.env.BASE_URL + 'rechtliches.html'}>Rechtliche Informationen</a></footer>
    </div>
  );
}
