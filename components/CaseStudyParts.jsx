'use client';

// Building blocks for decision-led case studies (first used on /git-diff/).

// A small label above a section's takeaway heading, naming the section type ("The problem",
// "Research"…), so skimmers see the structure. Written in sentence case; the CSS shows it in
// small capitals.
export function SectionLabel({ children }) {
  return <p className="cs-eyebrow">{children}</p>;
}

// "At a glance": role, team, timeline and results in one compact grid.
export function AtAGlance({ items }) {
  return (
    <section className="cs-glance" aria-labelledby="at-a-glance">
      <h2 id="at-a-glance" className="cs-glance-title">At a glance</h2>
      <dl className="cs-glance-grid">
        {items.map(({ label, value }) => (
          <div key={label} className={`cs-glance-item${label === 'Results' ? ' cs-glance-results' : ''}`}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

// A numbered marker, used on annotated images and beside the list that explains them.
export function MarkerNumber({ n }) {
  return <span className="cs-marker" aria-hidden="true">{n}</span>;
}

// Numbered markers over an image. Positions are percentages of the image (x from the
// left, y from the top), so they stay on the right spot at any size.
export function MarkerLayer({ markers }) {
  if (!markers?.length) return null;
  return markers.map(({ n, x, y }) => (
    <span key={n} className="cs-marker cs-marker-placed" style={{ left: `${x}%`, top: `${y}%` }} aria-hidden="true">{n}</span>
  ));
}

// A case-study image that opens the click-to-enlarge viewer, optionally with markers.
export function CaseImage({ src, alt, markers, onOpen, className = '' }) {
  return (
    <figure className={`cs-figure ${className}`}>
      <button type="button" className="cs-figure-button" onClick={() => onOpen({ src, alt, markers })} aria-label={`Enlarge image: ${alt}`}>
        <img src={src} alt={alt} />
        <MarkerLayer markers={markers} />
      </button>
    </figure>
  );
}

// One decision: its number and headline, then labelled parts (Options, Why…, Trade-off…).
// `sketch` ({ src, alt }) is optional: nothing shows until one is added.
export function Decision({ n, title, parts, sketch, onOpen }) {
  return (
    <div className="cs-decision">
      <h3 className="cs-decision-title">
        <span className="cs-decision-num" aria-hidden="true">{n}</span>
        <span><span className="sr-only">{n}. </span>{title}</span>
      </h3>
      <div className="cs-decision-parts">
        {parts.map(({ label, text }) => (
          <p key={label}><span className="cs-part-label">{label}</span> {text}</p>
        ))}
      </div>
      {sketch && <CaseImage src={sketch.src} alt={sketch.alt} onOpen={onOpen} className="cs-decision-sketch" />}
    </div>
  );
}

// Personas as cards: side by side on wider screens, stacked on phones. Each card's title
// is the persona's name.
export function PersonaCards({ people }) {
  return (
    <ul className="cs-persona-grid">
      {people.map(({ name, text }) => (
        <li key={name} className="cs-persona">
          <h3 className="cs-persona-name">{name}</h3>
          <p className="cs-persona-text">{text}</p>
        </li>
      ))}
    </ul>
  );
}
