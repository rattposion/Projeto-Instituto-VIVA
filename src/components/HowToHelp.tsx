import React from 'react';
import { Heart, Users, Briefcase, Gift, CreditCard, Calendar } from 'lucide-react';
import AnimacoesLudicas from './AnimacoesLudicas';
import { fbqTrack } from '../utils/facebookPixel';
import { sendCapiEvent } from '../utils/fbCapi';

const HowToHelp = () => {
  const helpOptions = [
    {
      icon: Heart,
      title: "Doação Única",
      description: "Faça uma doação pontual e ajude diretamente no atendimento de uma família.",
      amount: "A partir de R$ 1,00",
      color: "red",
      action: "Doar Agora"
    },
    {
      icon: Calendar,
      title: "Doação Mensal",
      description: "Torne-se um padrinho/madrinha e garanta continuidade no atendimento.",
      amount: "A partir de R$ 20,00/mês",
      color: "blue",
      action: "Ser Padrinho"
    },
    {
      icon: Users,
      title: "Voluntariado",
      description: "Doe seu tempo e talento em atividades, eventos e projetos especiais.",
      amount: "Algumas horas por semana",
      color: "green",
      action: "Quero Ajudar"
    },
    {
      icon: Briefcase,
      title: "Parcerias Empresariais",
      description: "Sua empresa pode apoiar através de patrocínios, doações ou responsabilidade social.",
      amount: "Valores personalizados",
      color: "purple",
      action: "Fazer Parceria"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: "bg-red-50 text-red-600 border-red-200 hover:bg-red-500 hover:text-white",
      blue: "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-500 hover:text-white",
      green: "bg-green-50 text-green-600 border-green-200 hover:bg-green-500 hover:text-white",
      purple: "bg-purple-50 text-purple-600 border-purple-200 hover:bg-purple-500 hover:text-white"
    };
    return colors[color as keyof typeof colors] || colors.red;
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Como Você Pode Ajudar
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Existem várias formas de fazer parte da nossa missão e contribuir para transformar vidas. 
            Escolha a que mais combina com você e junte-se a nós!
          </p>
        </div>

        <AnimacoesLudicas />

        {/* Help Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {helpOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border-2 ${getColorClasses(option.color).split(' ').slice(0, 3).join(' ')}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-3">{option.title}</h3>
                <p className="text-gray-600 mb-4 text-sm leading-relaxed">{option.description}</p>
                
                <div className="text-lg font-semibold text-blue-600 mb-6">{option.amount}</div>
                
                <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 border-2 ${getColorClasses(option.color)}`}
                  onClick={() => {
                    if(option.title === 'Doação Única') {
                      fbqTrack('Purchase', { value: 1, currency: 'BRL', type: 'pontual' });
                      sendCapiEvent('Purchase', {}, { value: 1, currency: 'BRL', type: 'pontual' });
                    }
                    if(option.title === 'Doação Mensal') {
                      fbqTrack('Subscribe', { value: 20, currency: 'BRL', type: 'mensal' });
                      sendCapiEvent('Subscribe', {}, { value: 20, currency: 'BRL', type: 'mensal' });
                    }
                    if(option.title === 'Voluntariado') {
                      fbqTrack('Lead', { type: 'voluntariado' });
                      sendCapiEvent('Lead', {}, { type: 'voluntariado' });
                    }
                    if(option.title === 'Parcerias Empresariais') {
                      fbqTrack('Lead', { type: 'parceria' });
                      sendCapiEvent('Lead', {}, { type: 'parceria' });
                    }
                  }}
                >
                  {option.action}
                </button>
              </div>
            );
          })}
        </div>

        {/* Donation Impact */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg mb-16">
          <h3 className="text-3xl font-bold text-gray-800 text-center mb-12">
            Veja o Impacto da Sua Doação
          </h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">R$</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">R$ 100</h4>
              <p className="text-gray-600 text-sm">
                Custeia 2 sessões de terapia ABA para uma criança, contribuindo diretamente 
                para seu desenvolvimento comportamental e social.
              </p>
            </div>
            
            <div className="text-center p-6 bg-green-50 rounded-xl">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">R$</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">R$ 250</h4>
              <p className="text-gray-600 text-sm">
                Financia um mês de atendimento multidisciplinar completo, incluindo 
                fonoaudiologia, terapia ocupacional e psicologia.
              </p>
            </div>
            
            <div className="text-center p-6 bg-yellow-50 rounded-xl">
              <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">R$</span>
              </div>
              <h4 className="text-xl font-bold text-gray-800 mb-2">R$ 500</h4>
              <p className="text-gray-600 text-sm">
                Patrocina materiais terapêuticos especializados e equipamentos sensoriais 
                que beneficiam todas as crianças atendidas.
              </p>
            </div>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-800 mb-6">Oportunidades de Voluntariado</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-blue-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Apoio em Atividades</h4>
                  <p className="text-gray-600 text-sm">Auxilie nas atividades recreativas, esportivas e culturais.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-green-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Eventos e Campanhas</h4>
                  <p className="text-gray-600 text-sm">Participe da organização de eventos de arrecadação e conscientização.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Capacitação Profissional</h4>
                  <p className="text-gray-600 text-sm">Compartilhe seus conhecimentos em palestras e workshops.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4 p-4 bg-white rounded-xl shadow-sm">
                <div className="w-3 h-3 bg-red-500 rounded-full mt-2"></div>
                <div>
                  <h4 className="font-semibold text-gray-800">Apoio Administrativo</h4>
                  <p className="text-gray-600 text-sm">Ajude nas atividades administrativas e de comunicação.</p>
                </div>
              </div>
            </div>
            
            <button className="mt-8 bg-green-500 text-white px-8 py-4 rounded-full hover:bg-green-600 transition-colors font-semibold flex items-center space-x-2"
              onClick={() => fbqTrack('Lead', { type: 'voluntariado' })}
            >
              <Users className="w-5 h-5" />
              <span>Quero Ser Voluntário</span>
            </button>
          </div>
          
          <div className="space-y-6">
            <img 
              src="https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800" 
              alt="Voluntários do Instituto VIVA"
              className="w-full h-64 object-cover rounded-2xl shadow-lg"
            />
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h4 className="text-lg font-semibold text-gray-800 mb-3">Transparência Total</h4>
              <p className="text-gray-600 text-sm mb-4">
                Acreditamos na transparência total. Todos os nossos relatórios financeiros 
                e de atividades estão disponíveis para consulta.
              </p>
              <button className="text-blue-600 font-semibold text-sm hover:text-blue-700 transition-colors">
                Ver Relatórios →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToHelp;