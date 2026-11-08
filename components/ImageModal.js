'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';
import { MarkerLayer } from '@/components/CaseStudyParts';

export default function ImageModal({ isOpen, src, alt, markers, onClose }) {
  // Escape closes it, like the lightbox on the home page.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose} aria-label="Close image">
          <X className="w-6 h-6" />
        </button>
        {markers?.length ? (
          // Shrink-wraps the image so the markers sit on the same spots when enlarged.
          <div className="image-modal-marked">
            <img src={src} alt={alt} className="image-modal-image" />
            <MarkerLayer markers={markers} />
          </div>
        ) : (
          <img src={src} alt={alt} className="image-modal-image" />
        )}
      </div>
    </div>
  );
}
