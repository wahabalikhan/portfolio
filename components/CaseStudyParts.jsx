'use client';

import { Fragment } from 'react';

// Building blocks for decision-led case studies (first used on /git-diff/).

// A small label above a section's takeaway heading, naming the section type ("The problem",
// "Research"…), so skimmers see the structure. Written in sentence case; the CSS shows it in
// small capitals.
// Each label is also the section's anchor (#the-problem, #goals…).
const slug = (text) => String(text).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export function SectionLabel({ children }) {
  return <p className="cs-eyebrow" id={slug(children)}>{children}</p>;
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

// A case-study image that opens the click-to-enlarge viewer, optionally with markers
// and a caption underneath.
// For fast, sharp screenshots, pass `webp` (a srcset of WebP files at several widths), with
// `src` as the PNG fallback, `width` and `height` (so the page doesn't jump as it loads) and
// `full` (the largest file, for the viewer). Browsers pick the WebP that suits the screen.
const COLUMN_SIZES = '(min-width: 768px) 720px, calc(100vw - 3rem)';
export function CaseImage({ src, alt, markers, caption, onOpen, className = '', webp, width, height, full }) {
  const img = <img src={src} alt={alt} width={width} height={height} loading={webp ? 'lazy' : undefined} decoding={webp ? 'async' : undefined} />;
  return (
    <figure className={`cs-figure ${className}`}>
      <button type="button" className="cs-figure-button" onClick={() => onOpen({ src: full || src, alt, markers })} aria-label={`Enlarge image: ${alt}`}>
        {webp ? <picture><source type="image/webp" srcSet={webp} sizes={COLUMN_SIZES} />{img}</picture> : img}
        <MarkerLayer markers={markers} />
      </button>
      {caption && <figcaption className="cs-figure-caption">{caption}</figcaption>}
    </figure>
  );
}

// A simple step diagram: numbered steps joined by arrows, in a row on wider screens and
// stacked on phones. Screen readers get it as one image described by `label`, because
// the text after it explains each step in full.
export function StepFlow({ steps, label }) {
  return (
    <div className="cs-steps" role="img" aria-label={label}>
      {steps.map((title, i) => (
        <Fragment key={title}>
          {i > 0 && <span className="cs-step-link" />}
          <div className="cs-step">
            <span className="cs-decision-num">{i + 1}</span>
            <span className="cs-step-title">{title}</span>
          </div>
        </Fragment>
      ))}
    </div>
  );
}

// Optional pictures: shown only once their file exists in public/images (the list is read
// at build time, next.config.js), with alt text, a caption and the click-to-enlarge viewer.
const IMAGE_FILES = new Set((process.env.NEXT_PUBLIC_IMAGE_FILES || '').split('|').filter(Boolean));
export const imageExists = (src) => IMAGE_FILES.has(src.split('/').pop());
export function VisualSlot({ src, alt, caption, onOpen, className = '' }) {
  if (!imageExists(src)) return null;
  return <CaseImage src={src} alt={alt} caption={caption} onOpen={onOpen} className={className} />;
}

// "Shipped first": what went out in the first release, in a small box of its own.
export function ShippedFirst({ children }) {
  return (
    <aside className="cs-shipped">
      <p><span className="cs-shipped-label">Shipped first</span> {children}</p>
    </aside>
  );
}

// A reframed question, set large: the old one muted, the new one prominent.
export function FromTo({ from, to }) {
  return (
    <div className="cs-fromto">
      <p className="cs-from"><span className="cs-fromto-label">From</span><span className="cs-fromto-q">{from}</span></p>
      <p className="cs-to"><span className="cs-fromto-label">To</span><span className="cs-fromto-q">{to}</span></p>
    </div>
  );
}

// A small horizontal bar chart: one series, each bar labelled with its name and value.
// Screen readers get the description (`summary`) and a table of the values.
export function SimpleBars({ bars, summary, caption }) {
  const max = Math.max(...bars.map((b) => b.value));
  return (
    <figure className="cs-bars">
      <div aria-hidden="true">
        {bars.map((b) => (
          <div key={b.label} className="cs-bar-row">
            <span className="cs-bar-label">{b.label}</span>
            <span className="cs-bar-track">
              <span className="cs-bar" style={{ width: `${(b.value / max) * 100}%` }} />
            </span>
            <span className="cs-bar-value">{b.display ?? b.value.toLocaleString('en-GB')}</span>
          </div>
        ))}
      </div>
      {/* For screen readers only (a table can't be hidden reliably on its own, so its wrapper
          is). The caption is the figure's, shown once below. */}
      <div className="sr-only">
        <p>{summary}</p>
        <table>
          <thead><tr><th scope="col">Stage</th><th scope="col">Jobs listed</th></tr></thead>
          <tbody>{bars.map((b) => <tr key={b.label}><th scope="row">{b.label}</th><td>{b.display ?? b.value.toLocaleString('en-GB')}</td></tr>)}</tbody>
        </table>
      </div>
      {caption && <figcaption className="cs-figure-caption">{caption}</figcaption>}
    </figure>
  );
}

// One decision: its number and headline, then labelled parts (Options, Why…, Trade-off…),
// then anything passed as children (a "Shipped first" box). `lead` shows above the parts
// (a From/To).
// `sketch` ({ src, alt, caption }) is optional: it shows once its file exists.
export function Decision({ n, title, parts, sketch, onOpen, lead, children }) {
  return (
    <div className="cs-decision">
      <h3 className="cs-decision-title">
        <span className="cs-decision-num" aria-hidden="true">{n}</span>
        <span><span className="sr-only">{n}. </span>{title}</span>
      </h3>
      {lead && <div className="cs-decision-extra cs-decision-lead">{lead}</div>}
      <div className="cs-decision-parts">
        {parts.map(({ label, text, list }) => (
          <Fragment key={label}>
            <p><span className="cs-part-label">{label}</span>{text ? ` ${text}` : ''}</p>
            {list && <ul className="cs-part-list">{list.map((item) => <li key={item}>{item}</li>)}</ul>}
          </Fragment>
        ))}
      </div>
      {children && <div className="cs-decision-extra">{children}</div>}
      {sketch && <VisualSlot src={sketch.src} alt={sketch.alt} caption={sketch.caption} onOpen={onOpen} className="cs-decision-sketch" />}
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
