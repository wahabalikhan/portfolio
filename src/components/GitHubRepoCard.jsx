import React from 'react';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Java:       '#b07219',
  PHP:        '#4F5D95',
  CSS:        '#563d7c',
  HTML:       '#e34c26',
  Ruby:       '#701516',
  Go:         '#00ADD8',
  Rust:       '#dea584',
  'C#':       '#178600',
  'C++':      '#f34b7d',
  Swift:      '#fa7343',
  Kotlin:     '#A97BFF',
  Dart:       '#00B4AB',
};

function timeAgo(dateStr) {
  if (!dateStr) return '';
  const now = new Date();
  const date = new Date(dateStr);
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMins < 60)   return `Updated ${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
  if (diffHours < 24)  return `Updated ${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
  if (diffDays < 30)   return `Updated ${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
  if (diffMonths < 12) return `Updated ${diffMonths} month${diffMonths !== 1 ? 's' : ''} ago`;
  return `Updated on ${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
}

export default function GitHubRepoCard({ name, description, language, topics = [], updated, fork, parent, url }) {
  const langColor = LANGUAGE_COLORS[language] || '#8b949e';

  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="gh-card">
      <div className="gh-card-top">
        <span className="gh-repo-name">{name}</span>
        <span className="gh-badge">Public</span>
      </div>

      {fork && parent && (
        <p className="gh-fork-text">
          Forked from{' '}
          <a
            href={parent.html_url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="gh-fork-link"
          >
            {parent.full_name}
          </a>
        </p>
      )}

      {description && <p className="gh-description">{description}</p>}

      {topics.length > 0 && (
        <div className="gh-topics">
          {topics.map((topic) => (
            <span key={topic} className="gh-topic">{topic}</span>
          ))}
        </div>
      )}

      <div className="gh-footer">
        {language && (
          <span className="gh-lang">
            <span className="gh-lang-dot" style={{ backgroundColor: langColor }} />
            {language}
          </span>
        )}
        {updated && <span className="gh-updated">{timeAgo(updated)}</span>}
      </div>
    </a>
  );
}
