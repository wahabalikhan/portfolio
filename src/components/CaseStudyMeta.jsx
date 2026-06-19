import React from 'react';

// Renders project metadata as pill chips rather than bare <p> bylines.
// Chip UI breaks Reader Mode's article-detection heuristic in Safari, Firefox, and Edge.
export default function CaseStudyMeta({ items }) {
  return (
    <div className="cs-meta" role="group" aria-label="Project details">
      {items.map(({ label, value }) => (
        <div key={label} className="cs-meta-item">
          <span className="meta-label">{label}</span>
          <span className="meta-value">{value}</span>
        </div>
      ))}
    </div>
  );
}
