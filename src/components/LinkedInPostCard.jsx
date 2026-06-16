import React, { useState } from 'react';

const POST_TEXT = `Well well well... another offsite in Vienna 🇦🇹😉

Spent time with (some of 😤) my lovely design team exploring how AI is changing our day-to-day workflows.

From working closer to the codebase with Claude + VS Code, to turning live product pages into editable Figma files and building live prototypes for faster feedback loops. The focus was clear:

Less time on repetitive tasks. More time solving real problems for users.

Really exciting to see how quickly the role of design is evolving and becoming more connected with engineering.

Already using a lot of these workflows day-to-day... curious to hear how you might be?`;

const POST_URL = 'https://www.linkedin.com/posts/wahabalikhan_well-well-well-another-offsite-in-vienna-share-7460980419354767360-ccql/?utm_source=share&utm_medium=member_desktop&rcm=ACoAACSCBrcBL3apkuFweZg2tOKpQltp8f9s0PQ';

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LinkedIn">
      <rect width="20" height="20" rx="4" fill="#0A66C2" />
      <path d="M5.5 8H7.5V14.5H5.5V8ZM6.5 7C5.84 7 5.5 6.56 5.5 6C5.5 5.44 5.84 5 6.5 5C7.16 5 7.5 5.44 7.5 6C7.5 6.56 7.16 7 6.5 7ZM14.5 14.5H12.5V11.2C12.5 10.1 11.9 9.8 11.4 9.8C10.9 9.8 10.5 10.2 10.5 11.3V14.5H8.5V8H10.4V8.9C10.7 8.3 11.4 7.9 12.3 7.9C13.9 7.9 14.5 9 14.5 10.7V14.5Z" fill="white" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
      <ellipse cx="6" cy="6" rx="2.5" ry="5" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export default function LinkedInPostCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="li-card">
      {/* Header */}
      <div className="li-header">
        <img
          src="/images/profile.png"
          alt="Wahab Khan"
          className="li-avatar"
        />
        <div className="li-header-text">
          <span className="li-name">Wahab Khan</span>
          <span className="li-title">Product Designer · NN/g UX Certified</span>
          <span className="li-meta">
            <span>1mo</span>
            <span className="li-meta-dot">•</span>
            <GlobeIcon />
          </span>
        </div>
        <div className="li-badge">
          <LinkedInIcon />
        </div>
      </div>

      {/* Post text */}
      <div className="li-body">
        <div className={`li-text${expanded ? ' li-text-expanded' : ''}`}>
          {POST_TEXT.split('\n').map((line, i) => (
            <React.Fragment key={i}>
              {line}
              {i < POST_TEXT.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        {!expanded && (
          <button className="li-see-more" onClick={() => setExpanded(true)}>
            …see more
          </button>
        )}
        {expanded && (
          <button className="li-see-more" onClick={() => setExpanded(false)}>
            see less
          </button>
        )}
      </div>

      {/* Post image */}
      <div className="li-image-wrap">
        {/* REPLACE THIS SRC with the actual Vienna offsite photo once saved to public folder */}
        <img
          src="/images/vienna_trip.jpeg"
          alt="Vienna offsite"
          className="li-image"
        />
      </div>

      {/* Footer */}
      <div className="li-footer">
        <div className="li-reactions">
          <span className="li-reaction-emojis">👍 ❤️ 🙌</span>
          <span className="li-reaction-count">42 reactions</span>
        </div>
        <div className="li-divider" />
        <a
          href={POST_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="li-view-link"
        >
          View on LinkedIn ↗
        </a>
      </div>
    </div>
  );
}
