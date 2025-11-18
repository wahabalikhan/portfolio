import React from 'react';
import { X } from 'lucide-react';

export default function ImageModal({ isOpen, src, alt, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="image-modal-overlay" onClick={onClose}>
      <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="image-modal-close" onClick={onClose} aria-label="Close image">
          <X className="w-6 h-6" />
        </button>
        <img src={src} alt={alt} className="image-modal-image" />
      </div>
    </div>
  );
}
