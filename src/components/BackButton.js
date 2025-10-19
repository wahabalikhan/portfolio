import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="text-blue-600 hover:underline inline-flex items-center gap-2 mb-8"
    >
      <ArrowLeft className="w-4 h-4" />
      Back home
    </button>
  );
}