import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Footer from '../components/Footer';
import ImageModal from '../components/ImageModal';

export default function DesignSystemPage() {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <BackButton onClick={() => navigate(-1)} />
      
      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        Bridging gaps between UX x Eng through a Design System
      </h1>

      <p className="text-gray-600 mb-4">February 2022 — June 2022• ~5 months</p>
      
      <img 
        src="/images/ds.png" 
        alt="Design System"
        className="w-full rounded-lg mb-8 border border-gray-200 cursor-pointer hover:opacity-90 transition-opacity"
        onClick={() => setSelectedImage({ src: '/images/ds.png', alt: 'Design System' })}
      />

      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Case study coming soon</h2>
        
        <p className="text-gray-700 leading-relaxed mb-6">
          Just prepping up the materials for this case study, will be live shortly!
        </p>
      </section>

      <Footer />
      <ImageModal 
        isOpen={!!selectedImage} 
        src={selectedImage?.src} 
        alt={selectedImage?.alt}
        onClose={() => setSelectedImage(null)}
      />
    </div>
  );
}