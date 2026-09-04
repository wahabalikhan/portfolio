'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';

function ChevronLeft() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Lightbox({ images, index, onChange, onClose }) {
  const multi = images.length > 1;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      if (!multi) return;
      if (e.key === 'ArrowLeft')  onChange((index - 1 + images.length) % images.length);
      if (e.key === 'ArrowRight') onChange((index + 1) % images.length);
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [index, images.length, multi, onChange, onClose]);

  return createPortal(
    <div className="lb-backdrop" onClick={onClose}>
      {/* Close */}
      <button className="lb-close" onClick={onClose} aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </button>

      {/* Counter */}
      {multi && (
        <div className="lb-counter">{index + 1} / {images.length}</div>
      )}

      {/* Image */}
      <div className="lb-img-wrap" onClick={(e) => e.stopPropagation()}>
        <img src={images[index]} alt={`Photo ${index + 1}`} className="lb-img" />
      </div>

      {/* Arrows */}
      {multi && (
        <>
          <button
            className="lb-arrow lb-arrow-left"
            onClick={(e) => { e.stopPropagation(); onChange((index - 1 + images.length) % images.length); }}
            aria-label="Previous"
          >
            <ChevronLeft />
          </button>
          <button
            className="lb-arrow lb-arrow-right"
            onClick={(e) => { e.stopPropagation(); onChange((index + 1) % images.length); }}
            aria-label="Next"
          >
            <ChevronRight />
          </button>
        </>
      )}
    </div>,
    document.body
  );
}
