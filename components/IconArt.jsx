// A stand-in graphic until a product has screenshots: its icon centred on a background.
// It fills its box, so the box sets the shape (16:10 on cards and case-study heroes).
// `bg`: the background colour (a product's brand colour); without it, a dark grey gradient.
// With `alt`, screen readers get it as one image; without, it's decorative.
export default function IconArt({ src, bg, alt = '' }) {
  return (
    <div className={bg ? 'icon-art icon-art-on-brand' : 'icon-art'} style={bg ? { background: bg } : undefined}role={alt ? 'img' : undefined} aria-label={alt || undefined}>
      <img src={src} alt="" aria-hidden="true" className="icon-art-img" />
    </div>
  );
}
