import React from 'react';
import { Target, Eye, Heart, Award, Users, Calendar } from 'lucide-react';
import AnimacoesLudicas from './AnimacoesLudicas';

const About = () => {
  return (
    <section id="sobre" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Sobre o Instituto VIVA
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            O Instituto VIVA nasceu do sonho de criar um espaço onde pessoas com TEA 
            pudessem desenvolver todo seu potencial em um ambiente acolhedor e especializado.
          </p>
        </div>

        {/* Mission, Vision, Values */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center p-8 bg-blue-50 rounded-2xl">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Missão</h3>
            <p className="text-gray-600">
              Promover o desenvolvimento integral de pessoas com TEA através de programas especializados, 
              oferecendo suporte às famílias e contribuindo para uma sociedade mais inclusiva.
            </p>
          </div>

          <div className="text-center p-8 bg-green-50 rounded-2xl">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Visão</h3>
            <p className="text-gray-600">
              Ser referência nacional em atendimento especializado para pessoas com TEA, 
              reconhecida pela excelência, inovação e impacto social transformador.
            </p>
          </div>

          <div className="text-center p-8 bg-yellow-50 rounded-2xl">
            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Valores</h3>
            <p className="text-gray-600">
              Amor, respeito, inclusão, transparência, excelência profissional e compromisso 
              com o desenvolvimento humano e a dignidade de cada pessoa.
            </p>
          </div>
        </div>

        <AnimacoesLudicas />

        {/* Story and Achievements */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-gray-800">Nossa História</h3>
            <p className="text-gray-600 leading-relaxed">
              O Instituto VIVA foi fundado por um grupo de profissionais e familiares de pessoas com TEA, 
              unidos pela necessidade de criar um espaço verdadeiramente especializado e acolhedor. 
              Começamos com apenas 5 crianças atendidas e hoje somos uma referência regional.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Nossa abordagem multidisciplinar combina as melhores práticas baseadas em evidências 
              científicas com o cuidado humanizado, sempre respeitando a individualidade e o potencial 
              único de cada pessoa.
            </p>
            
            {/* Timeline */}
            {/*
            <div className="space-y-4 mt-8">
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                <div>
                  <span className="font-semibold text-blue-600">2009</span> - Fundação do Instituto
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <span className="font-semibold text-green-600">2015</span> - Expansão dos serviços
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                <div>
                  <span className="font-semibold text-yellow-600">2020</span> - Certificação de excelência
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                <div>
                  <span className="font-semibold text-red-600">2024</span> - 500+ famílias atendidas
                </div>
              </div>
            </div>
            */}
          </div>

          <div className="space-y-6">
            <img 
              src="https://images.pexels.com/photos/8613092/pexels-photo-8613092.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Equipe do Instituto VIVA"
              className="w-full h-80 object-cover rounded-2xl shadow-lg"
            />
            
            {/* Achievements */}
            {/*
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-6 rounded-xl text-center">
                <Award className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">5</div>
                <div className="text-sm text-gray-600">Certificações</div>
              </div>
              <div className="bg-green-50 p-6 rounded-xl text-center">
                <Users className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">50+</div>
                <div className="text-sm text-gray-600">Profissionais</div>
              </div>
              <div className="bg-yellow-50 p-6 rounded-xl text-center">
                <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">15</div>
                <div className="text-sm text-gray-600">Anos</div>
              </div>
              <div className="bg-red-50 p-6 rounded-xl text-center">
                <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">100%"</div>
                <div className="text-sm text-gray-600">Dedicação</div>
              </div>
            </div>
            */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;