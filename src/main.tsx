import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import WomenswearApp from './WomenswearApp';
import ConceptDetailPage from './ConceptDetailPage';
import CollectionPendingPage from './CollectionPendingPage';
import CarePage from './CarePage';
import RouteFocus from './RouteFocus';
import './womenswear.css';

// A separate, explicit build mode produces a file://-friendly Safari review.
// The deployed storefront retains its existing BrowserRouter and URL routes.
const offlinePreview = import.meta.env.VITE_OFFLINE_PREVIEW === '1';
const Router = offlinePreview ? HashRouter : BrowserRouter;
const basename = offlinePreview || import.meta.env.BASE_URL === '/'
  ? undefined
  : import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router basename={basename}>
      <RouteFocus />
      <Routes>
        <Route path="/" element={<WomenswearApp />} />
        <Route path="/edit/:slug" element={<ConceptDetailPage />} />
        <Route path="/care" element={<CarePage />} />
        <Route path="/products/:handle" element={<CollectionPendingPage />} />
        <Route path="*" element={<CollectionPendingPage />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
