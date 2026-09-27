import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './careSetProduct';
import './manualCareProducts';
import App from './App';
import ProductDetailPage from './ProductDetailPage';
import NotFoundPage from './NotFoundPage';
import './styles.css';
import './preview.css';
import './legal-footer.css';
import './editorial-polish.css';
import './storefront-restructure.css';
import './product-detail.css';
import './impact-pass.css';
import './final-refinements.css';

const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/products/:handle" element={<ProductDetailPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
