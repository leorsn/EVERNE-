import { useEffect } from 'react';
import { applySeo } from './seo';

function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith('/') ? import.meta.env.BASE_URL : `${import.meta.env.BASE_URL}/`;
  return `${base}${path.replace(/^\//, '')}`;
}

export default function NotFoundPage() {
  useEffect(() => {
    applySeo({
      title: 'Page not found — EVERNE',
      description: 'The requested EVERNE page could not be found.',
      path: window.location.pathname,
      indexable: false,
    });
  }, []);

  return (
    <div className="not-found-page">
      <header className="topbar">
        <a className="brand" href={withBase('')} aria-label="EVERNE home">EVERNE</a>
        <nav aria-label="Primary navigation">
          <a href={withBase('#collection')}>Collection</a>
          <a href={withBase('rechtliches.html')}>Legal</a>
        </nav>
      </header>
      <main className="not-found-main" id="main-content">
        <span className="eyebrow">Error 404</span>
        <h1>Page not found.</h1>
        <p>The page may have moved or the address may be incorrect. Return to the EVERNE collection to continue browsing Edition 01.</p>
        <a className="text-link" href={withBase('#collection')}>Back to the collection <span>→</span></a>
      </main>
      <footer>
        <div className="footer-bottom"><span>© 2026 EVERNE</span><span>Hamburg, Germany · EUR</span></div>
      </footer>
    </div>
  );
}
