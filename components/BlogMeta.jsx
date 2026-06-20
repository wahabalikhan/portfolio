import React from 'react';

// Replaces the bare date <p> on blog pages with a tag chip + date bar.
// Breaks Reader Mode's h1 → byline article-detection heuristic.
export default function BlogMeta({ date, category = 'Blog' }) {
  return (
    <div className="blog-meta" role="group" aria-label="Post details">
      <span className="blog-meta-tag">{category}</span>
      <span className="blog-meta-sep" aria-hidden="true">·</span>
      <span className="blog-meta-date">{date}</span>
    </div>
  );
}
