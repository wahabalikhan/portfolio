// The RealTechJobs thumbnail, built in HTML and CSS so it stays sharp at any size and screen
// density: brand blue, the white icon with the blue R and the white "RealTechJobs" wordmark top
// left, and the two-line headline left-aligned and centred vertically, in Geist (RealTechJobs'
// own font, loaded in app/layout.js). It fills its box (a card's .cs-thumb or the case study's
// .cs-hero-art), and every size scales with its width (.rtj-thumb in app/globals.css).
// The icon is inline SVG, not an <img>, so the card's thumbnail image styles (.cs-thumb img)
// can't stretch it.
// With `alt`, screen readers get it as one image; without, it's decorative.
export default function RealTechJobsThumb({ alt = '' }) {
  return (
    <div className="rtj-thumb" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : true}>
      <div className="rtj-thumb-inner">
        <div className="rtj-thumb-lockup">
          <svg className="rtj-thumb-icon" viewBox="0 0 112 112" aria-hidden="true" focusable="false">
            <rect width="112" height="112" rx="24" fill="#FFFFFF" />
            <path d="M34 84V28h22c11 0 18 6 18 16s-7 16-18 16H34" fill="none" stroke="#1D4ED8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M56 62l24 22M66 84h14V70" fill="none" stroke="#1D4ED8" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="rtj-thumb-wordmark">RealTechJobs</span>
        </div>
        <p className="rtj-thumb-headline">Only real tech jobs,<br />straight from employers.</p>
      </div>
    </div>
  );
}
