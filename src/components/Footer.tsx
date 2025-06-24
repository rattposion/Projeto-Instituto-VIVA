import React from 'react';
import { Heart, Facebook, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/WhatsApp Image 2025-06-23 at 16.59-Photoroom.jpg" 
                alt="Instituto VIVA" 
                className="h-10 w-auto"
              />
              <div>
                <h3 className="text-xl font-bold">Instituto VIVA</h3>
                <p className="text-sm text-gray-300">Projeto de Vida e Inclusão</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Transformando vidas com cuidado, amor e inclusão. Dedicados ao 
              apoio integral de pessoas com TEA e suas famílias.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-pink-600 rounded-full flex items-center justify-center hover:bg-pink-700 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
       
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li><a href="#sobre" className="text-gray-300 hover:text-white transition-colors">Sobre Nós</a></li>
              <li><a href="#projetos" className="text-gray-300 hover:text-white transition-colors">Projetos</a></li>
              <li><a href="#depoimentos" className="text-gray-300 hover:text-white transition-colors">Depoimentos</a></li>
              <li><a href="#contato" className="text-gray-300 hover:text-white transition-colors">Contato</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Transparência</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Nossos Serviços</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terapia ABA</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Fonoaudiologia</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Terapia Ocupacional</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Psicologia</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Musicoterapia</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white transition-colors">Arteterapia</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contato</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gray-400 mt-0.5" />
                <div className="text-sm text-gray-300">
                  <p>Rua, 123</p>
                  <p>, Brasilia</p>
                  <p>CEP: 22</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <div className="text-sm text-gray-300">
                  <p>(61) 99999-9999</p>
                  <p>(61 3333-4444</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <div className="text-sm text-gray-300">
                  <p>contato@institutoviva.org.br</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h4 className="text-lg font-semibold mb-2">Receba nossas novidades</h4>
              <p className="text-gray-300 text-sm">
                Inscreva-se em nossa newsletter e fique por dentro de tudo sobre TEA.
              </p>
            </div>
            <div className="flex gap-4">
              <input 
                type="email" 
                placeholder="Seu e-mail"
                className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                Inscrever
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm text-gray-400">
              © 2025 Instituto VIVA. Todos os direitos reservados.
            </div>
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              <a href="#" className="hover:text-white transition-colors">Cookies</a>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>para transformar vidas</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;