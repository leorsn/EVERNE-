import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

// React Router changes the page without moving keyboard focus. On an actual
// route change, focus the destination heading. Browser back/forward returns to
// the previous catalogue position; ordinary links begin at the page heading.
export default function RouteFocus() {
  const location = useLocation();
  const navigationType = useNavigationType();
  const previousLocation = useRef({ pathname: location.pathname, hash: location.hash });
  const scrollPositions = useRef(new Map<string, number>());

  useEffect(() => {
    if (!('scrollRestoration' in window.history)) return;
    const previousMode = window.history.scrollRestoration;
    window.history.scrollRestoration = 'manual';
    return () => { window.history.scrollRestoration = previousMode; };
  }, []);

  useLayoutEffect(() => {
    const recordPosition = () => scrollPositions.current.set(location.key, window.scrollY);
    window.addEventListener('scroll', recordPosition, { passive: true });
    return () => window.removeEventListener('scroll', recordPosition);
  }, [location.key]);

  useEffect(() => {
    if (import.meta.env.VITE_OFFLINE_PREVIEW !== '1') return;
    // The portable HashRouter would otherwise treat in-page anchors as routes.
    // Install this once for all pages, not only the home collection.
    function jumpToSection(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const targetId = link?.getAttribute('href')?.slice(1);
      if (!targetId) return;
      const target = document.getElementById(targetId);
      if (!target) return;
      event.preventDefault();
      const isSkipLink = link?.classList.contains('e-skip') || link?.classList.contains('w-skip-link') || false;
      target.scrollIntoView({
        behavior: isSkipLink || window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      });
      if (isSkipLink && target instanceof HTMLElement) {
        target.focus({ preventScroll: true });
      }
    }
    document.addEventListener('click', jumpToSection);
    return () => document.removeEventListener('click', jumpToSection);
  }, []);

  useLayoutEffect(() => {
    const changedPage = previousLocation.current.pathname !== location.pathname;
    const changedHash = previousLocation.current.hash !== location.hash;
    previousLocation.current = { pathname: location.pathname, hash: location.hash };
    if (!changedPage && !changedHash) return;

    const destination = location.hash ? document.getElementById(location.hash.slice(1)) : null;
    if (destination) {
      destination.scrollIntoView({ behavior: 'auto' });
      (destination.querySelector<HTMLElement>('h1, h2') ?? destination).focus({ preventScroll: true });
    } else if (changedPage) {
      const saved = navigationType === 'POP' ? scrollPositions.current.get(location.key) : undefined;
      window.scrollTo({ top: saved ?? 0, behavior: 'auto' });
      document.querySelector<HTMLElement>('main h1')?.focus({ preventScroll: true });
    }
  }, [location.key, location.pathname, location.hash, navigationType]);

  return null;
}
