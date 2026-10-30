import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo, clearProductStructuredData } from './seo';

export default function CollectionPendingPage() {
  useEffect(() => {
    clearProductStructuredData();
    applySeo({
      title: 'EVERNE WOMAN — Kollektion in Vorbereitung',
      description: 'Die neue EVERNE Damenmode-Kollektion wird derzeit kuratiert.',
      path: window.location.pathname,
      indexable: false,
    });
  }, []);

  return (
    <div className="w-pending">
      <header><Link to="/" className="w-footer-logo">EVERNE</Link><span>WOMAN / COL. 01</span></header>
      <main>
        <span className="w-overline">A NEW CHAPTER IS TAKING SHAPE</span>
        <h1>Etwas Neues<br /><em>kommt.</em></h1>
        <p>Unsere bisherige Pflegekollektion wird überarbeitet. Die neue Damenmode-Auswahl befindet sich noch in Vorbereitung; Bestellungen sind derzeit nicht möglich.</p>
        <Link to="/" className="w-solid-link">Zur neuen Vorschau <span aria-hidden="true">→</span></Link>
      </main>
      <footer>© 2026 EVERNE · DESIGNVORSCHAU</footer>
    </div>
  );
}
