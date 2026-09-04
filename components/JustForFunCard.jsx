'use client';

import React, { useState } from 'react';
import Lightbox from '@/components/Lightbox';

const POST_TEXT = `What a first week at Adverity

Straight into Vienna 🇦🇹 for the 10-year anniversary and already got to meet the team in person, the best way to start!

Great conversations around Product and UX, plus a week full of highlights, from Prater theme park rides to an incredible night at Mirage (and somehow winning headphones in a raffle 😄)

The biggest highlight was finally meeting my UX team of course (some couldn't make it unfortunately 😞), and yes, we somehow managed to fit 5 people in the tiny photobooth with Sarah Loigge's coordination 😂

Excited for what's ahead, cheers 🚀

Eliza Ash  Tais D.  Aryna Denysenko  Jakub Tatarko  Olga Dovbnia

#chocolateside`;

const IMAGES = [
  '/images/vienna_trip/1.jpeg',
  '/images/vienna_trip/2.jpeg',
  '/images/vienna_trip/3.jpeg',
  '/images/vienna_trip/4.jpeg',
  '/images/vienna_trip/5.jpeg',
  '/images/vienna_trip/6.jpeg',
];

function GlobeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="6" cy="6" r="5" stroke="currentColor" strokeWidth="1" fill="none" />
      <ellipse cx="6" cy="6" rx="2.5" ry="5" stroke="currentColor" strokeWidth="1" fill="none" />
      <line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="LinkedIn">
      <rect width="20" height="20" rx="4" fill="#0A66C2" />
      <path d="M5.5 8H7.5V14.5H5.5V8ZM6.5 7C5.84 7 5.5 6.56 5.5 6C5.5 5.44 5.84 5 6.5 5C7.16 5 7.5 5.44 7.5 6C7.5 6.56 7.16 7 6.5 7ZM14.5 14.5H12.5V11.2C12.5 10.1 11.9 9.8 11.4 9.8C10.9 9.8 10.5 10.2 10.5 11.3V14.5H8.5V8H10.4V8.9C10.7 8.3 11.4 7.9 12.3 7.9C13.9 7.9 14.5 9 14.5 10.7V14.5Z" fill="white" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M6 12l4-4-4-4" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function JustForFunCard() {
  const [expanded, setExpanded] = useState(false);
  const [slide, setSlide] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const prev = (e) => { e.stopPropagation(); setSlide(i => (i - 1 + IMAGES.length) % IMAGES.length); };
  const next = (e) => { e.stopPropagation(); setSlide(i => (i + 1) % IMAGES.length); };

  return (
    <div className="li-card">
      <div className="li-header">
        <img src="/images/profile.png" alt="Wahab Khan" className="li-avatar" />
        <div className="li-header-text">
          <span className="li-name">Wahab Khan</span>
          <span className="li-title">Product Designer · NN/g UX Certified</span>
          <span className="li-meta">
            <span>2y</span>
            <span className="li-meta-dot">•</span>
            <GlobeIcon />
          </span>
        </div>
        <div className="li-badge">
          <LinkedInIcon />
        </div>
      </div>

      <div className="li-body">
        <div className={`li-text${expanded ? ' li-text-expanded' : ''}`}>
          {POST_TEXT.split('\n').map((line, i, arr) => (
            <React.Fragment key={i}>
              {line}
              {i < arr.length - 1 && <br />}
            </React.Fragment>
          ))}
        </div>
        {!expanded ? (
          <button className="li-see-more" onClick={() => setExpanded(true)}>…see more</button>
        ) : (
          <button className="li-see-more" onClick={() => setExpanded(false)}>see less</button>
        )}
      </div>

      {/* Slideshow */}
      <div className="jff-slideshow">
        <img
          src={IMAGES[slide]}
          alt={`Vienna trip photo ${slide + 1}`}
          className="li-image"
          style={{ cursor: 'zoom-in' }}
          onClick={() => setLightboxIndex(slide)}
        />
        <button className="jff-arrow jff-arrow-left" onClick={prev} aria-label="Previous photo">
          <ChevronLeft />
        </button>
        <button className="jff-arrow jff-arrow-right" onClick={next} aria-label="Next photo">
          <ChevronRight />
        </button>
        <div className="jff-dots">
          {IMAGES.map((_, i) => (
            <button
              key={i}
              className={`jff-dot${i === slide ? ' jff-dot-active' : ''}`}
              onClick={(e) => { e.stopPropagation(); setSlide(i); }}
              aria-label={`Photo ${i + 1}`}
            />
          ))}
        </div>
        <div className="jff-counter">{slide + 1} / {IMAGES.length}</div>
      </div>

      <div className="li-footer">
        <div className="li-reactions">
          <span className="li-reaction-emojis">👍 ❤️ 🙌</span>
          <span className="li-reaction-count">55 reactions · 3 comments</span>
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={IMAGES}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}
