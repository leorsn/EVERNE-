import { useState } from 'react';

// Presentation only. Callers must independently verify product identity,
// photograph rights and visual-asset approval before passing any photos.
// The active EVERNE preview deliberately supplies no product photographs.
export type ProductPhoto = Readonly<{
  publicPath: string;
  altText: string;
}>;

type ProductPhotoGalleryProps = {
  photos?: readonly ProductPhoto[];
};

export default function ProductPhotoGallery({ photos }: ProductPhotoGalleryProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState(0);
  if (!photos?.length) return <div className="e-product-gallery" aria-label="Reserved image positions for pending product photography">
    <div className="e-product-image-slot e-product-image-main" role="note" aria-label="Primary product photograph is not yet available">
      <span className="e-photo-slot-index" aria-hidden="true">01 / 03</span>
      <span className="e-product-image-pending">Photograph pending</span>
      <span className="e-photo-slot-caption" aria-hidden="true">FRONT VIEW / IMAGE NOT APPROVED</span>
    </div>
    <div className="e-product-image-pair">
      <div className="e-product-image-slot" role="note" aria-label="Secondary product photograph is not yet available"><span className="e-photo-slot-index" aria-hidden="true">02 / 03</span><span className="e-product-image-secondary">Back view pending</span><span className="e-photo-slot-caption" aria-hidden="true">BACK VIEW</span></div>
      <div className="e-product-image-slot" role="note" aria-label="Garment detail photograph is not yet available"><span className="e-photo-slot-index" aria-hidden="true">03 / 03</span><span className="e-product-image-secondary">Detail view pending</span><span className="e-photo-slot-caption" aria-hidden="true">GARMENT DETAIL</span></div>
    </div>
  </div>;

  const activeIndex = Math.min(selectedPhotoIndex, photos.length - 1);
  const activePhoto = photos[activeIndex];
  const multiplePhotos = photos.length > 1;

  return <div className="e-product-gallery" aria-label="Product photography">
    <div className="e-product-image-slot e-product-image-main e-product-image-reviewed">
      <img src={activePhoto.publicPath} alt={activePhoto.altText} loading="eager" decoding="async" />
      <span className="e-photo-slot-index" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
      {multiplePhotos && <div className="e-product-gallery-controls" role="group" aria-label="Product image navigation">
        <button type="button" className="e-product-gallery-arrow" aria-label="Previous product photograph" onClick={() => setSelectedPhotoIndex((index) => (index - 1 + photos.length) % photos.length)}><span aria-hidden="true">‹</span></button>
        <button type="button" className="e-product-gallery-arrow" aria-label="Next product photograph" onClick={() => setSelectedPhotoIndex((index) => (index + 1) % photos.length)}><span aria-hidden="true">›</span></button>
      </div>}
    </div>
    {multiplePhotos && <div className="e-product-gallery-thumbnails" role="group" aria-label="Choose a product photograph">
      {photos.map((photo, index) => <button type="button" className="e-product-gallery-thumbnail" key={photo.publicPath} aria-label={`View product photograph ${index + 1} of ${photos.length}`} aria-pressed={index === activeIndex} onClick={() => setSelectedPhotoIndex(index)}>
        <img src={photo.publicPath} alt="" loading="lazy" decoding="async" />
      </button>)}
    </div>}
  </div>;
}
