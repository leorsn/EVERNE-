import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// React Router changes the page without moving keyboard focus. On an actual
// route change, focus the destination heading, while preserving its scroll
// position and the existing #edit return behaviour.
export default function RouteFocus() {
  const location = useLocation();
  const previousPath = useRef(location.pathname);

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
