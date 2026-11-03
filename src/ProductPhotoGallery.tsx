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

  return <div className="e-product-gallery" aria-label="Product photography">
    <div className="e-product-image-slot e-product-image-main e-product-image-reviewed">
      <img src={photos[0].publicPath} alt={photos[0].altText} loading="eager" decoding="async" />
      <span className="e-photo-slot-index" aria-hidden="true">01 / {String(photos.length).padStart(2, '0')}</span>
    </div>
    {photos.length > 1 && <div className="e-product-image-pair">
      {photos.slice(1).map((photo, index) => <div className="e-product-image-slot e-product-image-reviewed" key={photo.publicPath}>
        <img src={photo.publicPath} alt={photo.altText} loading="lazy" decoding="async" />
        <span className="e-photo-slot-index" aria-hidden="true">{String(index + 2).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}</span>
      </div>)}
    </div>}
  </div>;
}
