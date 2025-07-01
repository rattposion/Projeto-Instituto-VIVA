import React from 'react';
import { Heart, Users, ArrowRight, Play } from 'lucide-react';
import { motion } from 'framer-motion';
import AnimacoesLudicas from './AnimacoesLudicas';

const Hero = () => {
  return (
    <section id="inicio" className="relative bg-gradient-to-br from-blue-50 via-white to-green-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 leading-tight">
                Transformando Vidas com{' '}
                <span className="text-blue-600">Cuidado</span>,{' '}
                <span className="text-green-600">Amor</span> e{' '}
                <span className="text-yellow-600">Inclusão</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                O Instituto VIVA é dedicado ao apoio integral de pessoas com Transtorno do Espectro Autista (TEA) 
                e suas famílias, promovendo desenvolvimento, autonomia e qualidade de vida através de programas 
                especializados e acolhimento humanizado.
              </p>
            </div>

            {/* Stats */}
            {/*
            <div className="grid grid-cols-3 gap-6 py-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">500+</div>
                <div className="text-sm text-gray-600">Famílias Atendidas</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">15</div>
                <div className="text-sm text-gray-600">Anos de Experiência</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-600">98%</div>
                <div className="text-sm text-gray-600">Satisfação das Famílias</div>
              </div>
            </div>
            */}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-red-500 text-white px-8 py-4 rounded-full hover:bg-red-600 transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                <Heart className="w-5 h-5" />
                <span>Quero Ajudar</span>
              </button>
              <button className="border-2 border-blue-500 text-blue-500 px-8 py-4 rounded-full hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center space-x-2 font-semibold text-lg">
                <Users className="w-5 h-5" />
                <span>Conheça Nossos Projetos</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <AnimacoesLudicas />
          </div>

          {/* Image/Video Section */}
          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl overflow-hidden">
              <img 
                src="https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Criança com autismo em atividade terapêutica"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <button className="bg-white bg-opacity-90 p-4 rounded-full hover:bg-opacity-100 transition-all duration-300 transform hover:scale-110">
                  <Play className="w-8 h-8 text-blue-600 ml-1" />
                </button>
              </div>
            </div>
            
            {/* Floating cards */}
            <div className="absolute -top-6 -left-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-sm font-medium">Atendimento Ativo</span>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">24/7</div>
                <div className="text-xs text-gray-600">Suporte às Famílias</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;