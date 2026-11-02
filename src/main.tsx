import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter, Route, Routes } from 'react-router-dom';
import EvernePreview from './EvernePreview';
import RouteFocus from './RouteFocus';
import './everne-editorial.css';

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
        <Route path="/" element={<EvernePreview page="home" />} />
        <Route path="/care" element={<EvernePreview page="care" />} />
        <Route path="/standards" element={<EvernePreview page="standards" />} />
        <Route path="/collections/:category" element={<EvernePreview page="collection" />} />
        <Route path="/products/:handle" element={<EvernePreview page="product" />} />
        <Route path="*" element={<EvernePreview page="home" />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
