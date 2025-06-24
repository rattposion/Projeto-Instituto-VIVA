import React from 'react';
import { Brain, Users, Gamepad2, Music, Palette, MessageCircle, ArrowRight } from 'lucide-react';
import AnimacoesLudicas from './AnimacoesLudicas';

const Services = () => {
  const services = [
    {
      icon: Brain,
      title: "Terapia ABA",
      description: "Análise do Comportamento Aplicada com profissionais certificados, focando no desenvolvimento de habilidades e redução de comportamentos desafiadores.",
      color: "blue",
      features: ["Avaliação individualizada", "Planos personalizados", "Acompanhamento familiar"]
    },
    {
      icon: MessageCircle,
      title: "Fonoaudiologia",
      description: "Desenvolvimento da comunicação verbal e não-verbal, trabalhando linguagem, fala e habilidades sociais de comunicação.",
      color: "green",
      features: ["Comunicação alternativa", "Desenvolvimento da fala", "Habilidades sociais"]
    },
    {
      icon: Gamepad2,
      title: "Terapia Ocupacional",
      description: "Desenvolvimento de habilidades motoras, sensoriais e de vida diária para maior autonomia e qualidade de vida.",
      color: "yellow",
      features: ["Integração sensorial", "Habilidades motoras", "Autonomia pessoal"]
    },
    {
      icon: Users,
      title: "Psicologia",
      description: "Suporte psicológico especializado para crianças, adolescentes e famílias, promovendo bem-estar emocional e adaptação.",
      color: "purple",
      features: ["Atendimento individual", "Terapia familiar", "Grupos de apoio"]
    },
    {
      icon: Music,
      title: "Musicoterapia",
      description: "Uso terapêutico da música para estimular comunicação, expressão emocional e desenvolvimento cognitivo.",
      color: "pink",
      features: ["Expressão musical", "Desenvolvimento cognitivo", "Regulação emocional"]
    },
    {
      icon: Palette,
      title: "Arteterapia",
      description: "Expressão artística como ferramenta terapêutica para comunicação, criatividade e desenvolvimento emocional.",
      color: "indigo",
      features: ["Expressão criativa", "Desenvolvimento motor", "Autoestima"]
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "bg-blue-50 text-blue-600 border-blue-200",
      green: "bg-green-50 text-green-600 border-green-200",
      yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
      purple: "bg-purple-50 text-purple-600 border-purple-200",
      pink: "bg-pink-50 text-pink-600 border-pink-200",
      indigo: "bg-indigo-50 text-indigo-600 border-indigo-200"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section id="projetos" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Nossos Projetos e Serviços
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Oferecemos um conjunto abrangente de terapias e programas especializados, 
            desenvolvidos por uma equipe multidisciplinar experiente e dedicada.
          </p>
        </div>

        <AnimacoesLudicas />

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${getColorClasses(service.color)}`}>
                  <Icon className="w-8 h-8" />
                </div>
                
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{service.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <button className="text-blue-600 font-semibold flex items-center space-x-2 hover:text-blue-700 transition-colors">
                  <span>Saiba mais</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Programs Section */}
        <div className="bg-white rounded-2xl p-8 lg:p-12 shadow-lg">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-800 mb-6">Programas Especiais</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Programa de Inclusão Escolar</h4>
                  <p className="text-gray-600">Apoio especializado para inclusão em escolas regulares, com acompanhamento pedagógico e orientação aos educadores.</p>
                </div>
                
                <div className="border-l-4 border-green-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Grupo de Habilidades Sociais</h4>
                  <p className="text-gray-600">Atividades em grupo para desenvolvimento de competências sociais, comunicação e relacionamento interpessoal.</p>
                </div>
                
                <div className="border-l-4 border-yellow-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Preparação para Vida Adulta</h4>
                  <p className="text-gray-600">Programa voltado para adolescentes e jovens adultos, focando em autonomia, habilidades profissionais e vida independente.</p>
                </div>
                
                <div className="border-l-4 border-red-500 pl-6">
                  <h4 className="text-xl font-semibold text-gray-800 mb-2">Apoio às Famílias</h4>
                  <p className="text-gray-600">Orientação, grupos de apoio e capacitação para familiares, fortalecendo a rede de suporte e cuidado.</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <img 
                src="https://images.pexels.com/photos/8613264/pexels-photo-8613264.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Atividades em grupo no Instituto VIVA"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              
              <div className="bg-blue-50 p-6 rounded-xl">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">Atendimento Personalizado</h4>
                <p className="text-blue-700 text-sm">
                  Cada pessoa é única. Por isso, desenvolvemos planos terapêuticos individualizados, 
                  respeitando as necessidades, potencialidades e objetivos específicos de cada um.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;