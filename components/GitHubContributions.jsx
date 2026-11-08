'use client';

import { useEffect, useRef, useState } from 'react';

const LEVELS = [
  { min: 0,  max: 0,  color: '#ebedf0', label: 'No contributions' },
  { min: 1,  max: 3,  color: '#9be9a8', label: '1–3 contributions' },
  { min: 4,  max: 6,  color: '#40c463', label: '4–6 contributions' },
  { min: 7,  max: 9,  color: '#30a14e', label: '7–9 contributions' },
  { min: 10, max: Infinity, color: '#216e39', label: '10+ contributions' },
];

// The graph is one SVG drawn in these units and scaled to the container's width, so the
// squares and the gaps between them grow and shrink together and always stay square.
const CELL = 11;           // a day's square
const GAP = 3;             // the space between squares
const PITCH = CELL + GAP;
const MONTHS_H = 16;       // the month-label row above the squares
const WEEKS = 53;

function cellColor(count) {
  return (LEVELS.find(l => count >= l.min && count <= l.max) || LEVELS[0]).color;
}

// A label at the first week of each month, skipping one that would crowd the next.
function monthLabels(weeks) {
  const labels = [];
  let lastMonth = null;
  weeks.forEach((days, wi) => {
    const month = new Date(days[0].date).toLocaleString('en-GB', { month: 'short', timeZone: 'UTC' });
    if (month !== lastMonth) {
      labels.push({ col: wi, label: month });
      lastMonth = month;
    }
  });
  return labels.filter((l, i) => !labels[i + 1] || labels[i + 1].col - l.col >= 3);
}

function Graph({ weeks, label }) {
  const cols = weeks ? weeks.length : WEEKS;
  const width = cols * PITCH - GAP;
  const height = MONTHS_H + 7 * PITCH - GAP;
  const scrollRef = useRef(null);
  const [scrollable, setScrollable] = useState(false);

  // On narrow screens the graph keeps a readable square size and scrolls sideways inside
  // its own box, starting at the most recent weeks (the right-hand end).
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const check = () => {
      const over = el.scrollWidth > el.clientWidth + 1;
      setScrollable(over);
      if (over) el.scrollLeft = el.scrollWidth;
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [weeks]);

  return (
    <div
      ref={scrollRef}
      className="gh-contrib-scroll"
      {...(scrollable ? { tabIndex: 0, role: 'region', 'aria-label': 'Contribution graph (scrolls sideways)' } : {})}
    >
      <svg
        className="gh-contrib-svg"
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label={label}
      >
        {weeks && monthLabels(weeks).map(({ col, label: m }) => (
          <text key={col} x={col * PITCH} y={10} className="gh-contrib-month-label">{m}</text>
        ))}
        {weeks
          ? weeks.map((days, wi) => days.map((day) => {
              const row = new Date(day.date).getUTCDay();
              return (
                <rect
                  key={day.date}
                  x={wi * PITCH}
                  y={MONTHS_H + row * PITCH}
                  width={CELL}
                  height={CELL}
                  rx={2}
                  fill={cellColor(day.count)}
                >
                  <title>{`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}</title>
                </rect>
              );
            }))
          : Array.from({ length: WEEKS * 7 }).map((_, i) => (
              <rect
                key={i}
                x={Math.floor(i / 7) * PITCH}
                y={MONTHS_H + (i % 7) * PITCH}
                width={CELL}
                height={CELL}
                rx={2}
                className="gh-contrib-skeleton-rect"
              />
            ))}
      </svg>
    </div>
  );
}

function Legend({ skeleton }) {
  return (
    <div className="gh-contrib-legend" aria-hidden="true">
      <span className="gh-contrib-legend-label">Less</span>
      {LEVELS.map(l => (
        <div
          key={l.color}
          className={`gh-contrib-cell${skeleton ? ' gh-contrib-skeleton-cell' : ''}`}
          style={skeleton ? { opacity: 0.4 } : { background: l.color }}
        />
      ))}
      <span className="gh-contrib-legend-label">More</span>
    </div>
  );
}

function Skeleton() {
  return (
    <div className="gh-contrib-wrap">
      <div className="gh-contrib-header">
        <div className="gh-contrib-skeleton-text" style={{ width: 220, height: 16, borderRadius: 4 }} />
      </div>
      <Graph weeks={null} label="Loading the contribution graph" />
      <Legend skeleton />
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

  return (
    <div className="gh-contrib-wrap">
      <div className="gh-contrib-header">
        <span className="gh-contrib-total">{total} contributions in the last year</span>
      </div>
      <Graph weeks={weeks} label={`GitHub contribution graph: ${total} contributions in the last year`} />
      <Legend />
    </div>
  );
}
