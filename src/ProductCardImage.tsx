import type { ProductPhoto } from './ProductPhotoGallery';

// Visual-only component. Never pass sourcing photos or editorial references here;
// a real product image must pass the separate release and image-rights gates.
type ProductCardImageProps = {
  index: number;
  total: number;
  photo?: ProductPhoto;
};

export default function ProductCardImage({ index, total, photo }: ProductCardImageProps) {
  const count = `${String(index).padStart(2, '0')} / ${String(total).padStart(2, '0')}`;

  if (!photo) return <div className="e-collection-card-image" aria-hidden="true">
    <span className="e-collection-image-index">{count}</span>
    <span className="e-collection-image-pending">IMAGE PENDING</span>
  </div>;

  return <div className="e-collection-card-image e-collection-card-image-reviewed">
    <img src={photo.publicPath} alt={photo.altText} loading="lazy" decoding="async" />
    <span className="e-collection-image-index" aria-hidden="true">{count}</span>
  </div>;
}
