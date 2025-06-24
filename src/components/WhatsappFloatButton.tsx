import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsappFloatButton = () => {
  return (
    <a
      href="https://wa.me/5561999999999" // Substitua pelo número real
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg p-4 flex items-center justify-center animate-pulse transition-all duration-300 group"
      aria-label="Conversar no WhatsApp"
    >
      <MessageCircle className="w-7 h-7" />
      <span className="ml-2 font-semibold hidden sm:inline">WhatsApp</span>
    </a>
  );
};

export default WhatsappFloatButton; 