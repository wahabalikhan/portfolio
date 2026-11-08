// A stand-in graphic until a product has screenshots: its icon centred on a dark background.
// It fills its box, so the box sets the shape (16:10 on cards and case-study heroes).
// With `alt`, screen readers get it as one image; without, it's decorative.
export default function IconArt({ src, alt = '' }) {
  return (
    <div className="icon-art" role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      <img src={src} alt="" aria-hidden="true" className="icon-art-img" />
    </div>
  );
}
