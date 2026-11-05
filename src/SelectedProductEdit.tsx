import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProductPhotoGallery from './ProductPhotoGallery';
import { applySeo } from './seo';
import { findSelectedProduct, selectedProducts } from './selectedProductPhotos';
import './selected-product-edit.css';

const previewNotice = 'AI-generated editorial studies based on supplier listings. Actual product appearance, fit and materials must be checked against a physical sample. No orders are available.';

export function SelectedProductIndex() {
  const [category, setCategory] = useState('All pieces');
  const categories = ['All pieces', 'Trousers', 'Knitwear', 'Jackets'];
  const visibleProducts = category === 'All pieces' ? selectedProducts : selectedProducts.filter((product) => product.category === category);
  useEffect(() => { applySeo({ title: 'Supplier-Linked Edit — EVERNE', description: previewNotice, path: '/selected', indexable: false }); }, []);
  return <main className="e-selected-edit" id="main">
    <header className="e-selected-header"><Link to="/" className="e-selected-wordmark">EVERNE</Link><Link to="/collections/all">Design concepts ↗</Link></header>
    <div className="e-selected-intro"><span>EVERNE WOMAN / IMAGE REVIEW</span><h1>Selected pieces.</h1><p>Five supplier-linked garments in a unified digital styling study.</p></div>
    <nav className="e-selected-filters" aria-label="Filter selected pieces by category">{categories.map((option) => <button key={option} type="button" aria-pressed={category === option} onClick={() => setCategory(option)}>{option}</button>)}<span>{visibleProducts.length} {visibleProducts.length === 1 ? 'piece' : 'pieces'}</span></nav>
    <div className="e-selected-grid">{visibleProducts.map((product, index) => <Link to={`/selected/${product.slug}`} className="e-selected-card" key={product.slug}>
      <div className="e-selected-card-image"><img src={product.photos[0].publicPath} alt={product.photos[0].altText} loading={index < 2 ? 'eager' : 'lazy'} /></div>
      <div><span>{product.category}</span><strong>{product.title}</strong><small>Explore five views <span aria-hidden="true">↗</span></small></div>
    </Link>)}</div>
    <p className="e-selected-disclosure">{previewNotice}</p>
    <footer className="e-selected-footer"><Link to="/">Back to EVERNE</Link><span>Private visual review · Checkout unavailable</span></footer>
  </main>;
}

export function SelectedProductDetail() {
  const { slug } = useParams();
  const product = findSelectedProduct(slug);
  useEffect(() => { applySeo({ title: product ? `${product.title} — EVERNE Image Review` : 'Product Not Found — EVERNE', description: previewNotice, path: slug ? `/selected/${slug}` : '/selected', indexable: false }); }, [product, slug]);
  if (!product) return <main className="e-selected-edit"><Link to="/selected">← All selected pieces</Link><h1>Product not found.</h1></main>;
  const index = selectedProducts.indexOf(product);
  const previous = selectedProducts[(index - 1 + selectedProducts.length) % selectedProducts.length];
  const next = selectedProducts[(index + 1) % selectedProducts.length];
  return <main className="e-selected-edit e-selected-detail" id="main">
    <header className="e-selected-header"><Link to="/" className="e-selected-wordmark">EVERNE</Link><Link to="/selected">← Selected edit</Link></header>
    <nav className="e-selected-breadcrumb" aria-label="Breadcrumb"><Link to="/selected">Selected pieces</Link><span>/</span><span>{product.category}</span><span>/</span><span>{product.title}</span></nav>
    <div className="e-selected-detail-grid">
      <ProductPhotoGallery key={product.slug} photos={product.photos} />
      <section className="e-selected-info"><span className="e-selected-eyebrow">STYLING STUDY {String(index + 1).padStart(2, '0')} / {String(selectedProducts.length).padStart(2, '0')}</span>
        <h1>{product.title}</h1><p>{product.description}</p>
        <div className="e-selected-fact"><span>Supplier-listed variations</span><strong>{product.variantNote}</strong></div>
        <div className="e-selected-fact"><span>Images</span><strong>5 AI-generated visual studies</strong></div>
        <div className="e-selected-fact"><span>Price & availability</span><strong>Pending independent verification</strong></div>
        <p className="e-selected-warning">{previewNotice}</p>
        <button type="button" disabled className="e-product-disabled-cta">NOT AVAILABLE TO ORDER</button>
        <Link to="/selected" className="e-selected-back">← Browse all five pieces</Link>
      </section>
    </div>
    <nav className="e-selected-next" aria-label="Navigate between selected products"><Link to={`/selected/${previous.slug}`}><span>← Previous piece</span><strong>{previous.title}</strong></Link><Link to={`/selected/${next.slug}`}><span>Next piece →</span><strong>{next.title}</strong></Link></nav>
  </main>;
}
