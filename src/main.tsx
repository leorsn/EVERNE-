import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WomenswearApp from './WomenswearApp';
import CollectionPendingPage from './CollectionPendingPage';
import './womenswear.css';

const basename = import.meta.env.BASE_URL === '/' ? undefined : import.meta.env.BASE_URL.replace(/\/$/, '');

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route path="/" element={<WomenswearApp />} />
        <Route path="/products/:handle" element={<CollectionPendingPage />} />
        <Route path="*" element={<CollectionPendingPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
