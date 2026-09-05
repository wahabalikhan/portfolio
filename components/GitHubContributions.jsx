'use client';

import { useState, useEffect } from 'react';

const LEVELS = [
  { min: 0,  max: 0,  color: '#ebedf0', label: 'No contributions' },
  { min: 1,  max: 3,  color: '#9be9a8', label: '1–3 contributions' },
  { min: 4,  max: 6,  color: '#40c463', label: '4–6 contributions' },
  { min: 7,  max: 9,  color: '#30a14e', label: '7–9 contributions' },
  { min: 10, max: Infinity, color: '#216e39', label: '10+ contributions' },
];

function cellColor(count) {
  return (LEVELS.find(l => count >= l.min && count <= l.max) || LEVELS[0]).color;
}

function monthLabels(weeks) {
  const labels = [];
  let lastMonth = null;
  weeks.forEach((days, wi) => {
    const month = new Date(days[0].date).toLocaleString('default', { month: 'short' });
    if (month !== lastMonth) {
      labels.push({ col: wi, label: month });
      lastMonth = month;
    }
  });
  return labels;
}

function Skeleton() {
  const cols = 53;
  const rows = 7;
  return (
    <div className="gh-contrib-wrap">
      <div className="gh-contrib-header">
        <div className="gh-contrib-skeleton-text" style={{ width: 220, height: 16, borderRadius: 4 }} />
      </div>
      <div className="gh-contrib-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols * rows }).map((_, i) => (
          <div key={i} className="gh-contrib-cell gh-contrib-skeleton-cell" />
        ))}
      </div>
      <div className="gh-contrib-legend">
        <span className="gh-contrib-legend-label">Less</span>
        {LEVELS.map(l => (
          <div key={l.color} className="gh-contrib-cell gh-contrib-skeleton-cell" style={{ opacity: 0.4 }} />
        ))}
        <span className="gh-contrib-legend-label">More</span>
      </div>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="gh-contrib-wrap gh-contrib-error">
      <p className="gh-contrib-error-text">Contribution data unavailable right now.</p>
    </div>
  );
}

export default function GitHubContributions() {
  const [state, setState] = useState('loading'); // 'loading' | 'error' | 'done'
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('/api/github-contributions')
      .then(res => {
        if (!res.ok) {
          return res.json().then(body => {
            console.error('[GH Contributions] API error:', body);
            throw new Error(body.error || `HTTP ${res.status}`);
          }).catch(e => { if (e.message) throw e; throw new Error(`HTTP ${res.status}`); });
        }
        return res.json();
      })
      .then(json => {
        if (json.error || !json.weeks) {
          console.error('[GH Contributions] Bad response:', json);
          throw new Error(json.error || 'Missing weeks field');
        }
        setData(json);
        setState('done');
      })
      .catch(err => {
        console.error('[GH Contributions] Failed:', err.message);
        setState('error');
      });
  }, []);

  if (state === 'loading') return <Skeleton />;
  if (state === 'error') return <ErrorState />;

  const { total, weeks } = data;
  const labels = monthLabels(weeks);

  return (
    <div className="gh-contrib-wrap">
      <div className="gh-contrib-header">
        <span className="gh-contrib-total">{total} contributions in the last year</span>
      </div>

      {/* Month labels */}
      <div className="gh-contrib-months" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
        {labels.map(({ col, label }) => (
          <span key={col} className="gh-contrib-month-label" style={{ gridColumnStart: col + 1 }}>
            {label}
          </span>
        ))}
      </div>

      {/* Grid: each week is a column */}
      <div className="gh-contrib-grid" style={{ gridTemplateColumns: `repeat(${weeks.length}, 1fr)` }}>
        {weeks.map((days, wi) =>
          days.map((day, di) => (
            <div
              key={`${wi}-${di}`}
              className="gh-contrib-cell"
              style={{ background: cellColor(day.count), gridRow: di + 1, gridColumn: wi + 1 }}
              title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
            />
          ))
        )}
      </div>

      {/* Legend */}
      <div className="gh-contrib-legend">
        <span className="gh-contrib-legend-label">Less</span>
        {LEVELS.map(l => (
          <div key={l.color} className="gh-contrib-cell" style={{ background: l.color }} />
        ))}
        <span className="gh-contrib-legend-label">More</span>
      </div>
    </div>
  );
}
