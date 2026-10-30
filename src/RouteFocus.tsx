import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// React Router changes the page without moving keyboard focus. On an actual
// route change, focus the destination heading, while preserving its scroll
// position and the existing #edit return behaviour.
export default function RouteFocus() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

  useEffect(() => {
    if (import.meta.env.VITE_OFFLINE_PREVIEW !== '1') return;
    // The portable HashRouter would otherwise treat #main, #detail-main,
    // #pending-main and other in-page anchors as entirely different routes.
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
      const isSkipLink = link?.classList.contains('w-skip-link') ?? false;
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

  useEffect(() => {
    const changedPage = previousPath.current !== location.pathname;
    previousPath.current = location.pathname;
    if (!changedPage) return;

    const frame = window.requestAnimationFrame(() => {
      const returnToEdit = location.pathname === '/' && location.hash === '#edit';
      const heading = returnToEdit
        ? document.getElementById('edit-title')
        : document.querySelector<HTMLElement>('main h1');
      heading?.focus({ preventScroll: true });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.hash]);

  return null;
}
