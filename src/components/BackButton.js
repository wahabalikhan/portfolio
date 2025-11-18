import React from 'react';
import { ArrowLeft } from 'lucide-react';

export default function BackButton({ onClick }) {
  return (
    <button 
      onClick={onClick}
      className="link-text text-blue-600 dark:text-blue-400 inline-flex items-center gap-2 mb-8 bg-transparent dark:bg-transparent hover:bg-transparent dark:hover:bg-transparent"
    >
      <ArrowLeft className="w-4 h-4" />
      Back home
    </button>
  );
}