import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { applySeo, clearProductStructuredData } from './seo';

export default function CollectionPendingPage() {
  useEffect(() => {
    clearProductStructuredData();
    applySeo({
      title: 'EVERNE WOMAN — Collection Coming Soon',
      description: 'The new EVERNE womenswear collection is currently being curated.',
      path: window.location.pathname,
      indexable: false,
    });
  }, []);

  return (
    <div className="w-pending">
      <a className="w-skip-link" href="#pending-main">Skip to content</a>
      <header><Link to="/" className="w-footer-logo">EVERNE</Link><span>WOMAN / COL. 01</span></header>
      <main id="pending-main" tabIndex={-1}>
        <span className="w-overline">A NEW CHAPTER IS TAKING SHAPE</span>
        <h1 tabIndex={-1}>Something new<br /><em>is coming.</em></h1>
        <p>Our former garment-care collection is being reimagined. The new womenswear edit is still in the making, and orders are not yet available.</p>
        <Link to="/" className="w-solid-link">Explore the preview <span aria-hidden="true">→</span></Link>
      </main>
      <footer>© 2026 EVERNE · COLLECTION PREVIEW</footer>
    </div>
  );
}
