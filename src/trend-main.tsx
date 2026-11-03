import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import RouteFocus from './RouteFocus';
import TrendStorePreview from './TrendStorePreview';
import './trend-store.css';

// A dedicated, non-commercial review page. The existing storefront is still
// the root entry; this is not a production switch or an automatic product feed.
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <RouteFocus />
      <Routes>
        <Route path="/" element={<TrendStorePreview page="home" />} />
        <Route path="/discover" element={<TrendStorePreview page="discover" />} />
        <Route path="/discover/jewellery-bag" element={<TrendStorePreview page="candidate" />} />
        <Route path="/standard" element={<TrendStorePreview page="standard" />} />
        <Route path="/about" element={<TrendStorePreview page="about" />} />
        <Route path="*" element={<TrendStorePreview page="not-found" />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
