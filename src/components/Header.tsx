import React, { useState } from 'react';
import { Menu, X, Heart, Phone, Mail, Instagram } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-blue-50 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center text-sm text-blue-700">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>(61) 99168-1369</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>institutovivatea@gmail.com</span>
              </div>
              <a href="https://instagram.com/institutovivatea" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1 text-pink-600 hover:text-pink-700 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
                <span className="hidden sm:inline">Instagram</span>
              </a>
            </div>
            <div className="hidden md:block">
              <span>Transformando vidas com amor e inclusão</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-3">
            <img 
              src="/WhatsApp Image 2025-06-23 at 16.59-Photoroom.jpg" 
              alt="Instituto VIVA" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Instituto VIVA</h1>
              <p className="text-sm text-blue-600">Projeto de Vida e Inclusão</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Início
            </a>
            <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Sobre Nós
            </a>
            <a href="#projetos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Projetos
            </a>
            <a href="#depoimentos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Depoimentos
            </a>
            <a href="#noticias" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Notícias
            </a>
            <a href="#contato" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
              Contato
            </a>
            <button 
              className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center space-x-2 font-medium"
              onClick={() => { if(window.fbq) window.fbq('track', 'QueroAjudar'); }}
            >
              <Heart className="w-4 h-4" />
              <span>Quero Ajudar</span>
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <a href="#inicio" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Início
              </a>
              <a href="#sobre" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Sobre Nós
              </a>
              <a href="#projetos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Projetos
              </a>
              <a href="#depoimentos" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Depoimentos
              </a>
              <a href="#noticias" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Notícias
              </a>
              <a href="#contato" className="text-gray-700 hover:text-blue-600 transition-colors font-medium">
                Contato
              </a>
              <button 
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center space-x-2 font-medium"
                onClick={() => { if(window.fbq) window.fbq('track', 'QueroAjudar'); }}
              >
                <Heart className="w-4 h-4" />
                <span>Quero Ajudar</span>
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;