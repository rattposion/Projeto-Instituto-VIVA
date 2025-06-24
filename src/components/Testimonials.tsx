import React from 'react';
import { Star, Quote } from 'lucide-react';
import AnimacoesLudicas from './AnimacoesLudicas';

const Testimonials = () => {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Mãe do João",
      content: "O Instituto VIVA transformou a vida do meu filho e da nossa família. João chegou aqui sem falar uma palavra e hoje se comunica, brinca e está incluído na escola regular. A equipe é excepcional!",
      rating: 5,
      image: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Carlos Oliveira",
      role: "Pai da Ana",
      content: "Há 5 anos procurávamos um lugar que realmente entendesse nossa filha. No VIVA encontramos profissionais qualificados e um ambiente acolhedor. Ana desenvolveu autonomia e autoestima.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Fernanda Costa",
      role: "Mãe do Pedro",
      content: "O programa de preparação para vida adulta foi fundamental para Pedro. Hoje ele tem habilidades sociais, trabalha meio período e sonha com a faculdade. Gratidão eterna ao VIVA!",
      rating: 5,
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Roberto Santos",
      role: "Pai do Lucas",
      content: "Lucas era muito agitado e tinha dificuldades sensoriais. Com a terapia ocupacional e ABA, ele aprendeu a se regular e hoje participa de todas as atividades familiares com alegria.",
      rating: 5,
      image: "https://images.pexels.com/photos/1181562/pexels-photo-1181562.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "Juliana Ferreira",
      role: "Mãe da Sofia",
      content: "A musicoterapia despertou talentos que nem sabíamos que Sofia tinha. Ela toca piano, canta e se expressa através da música. O VIVA vê potencial onde outros veem limitações.",
      rating: 5,
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=150"
    },
    {
      name: "André Rodrigues",
      role: "Pai do Gabriel",
      content: "O apoio às famílias foi essencial para nós. Aprendemos estratégias, conhecemos outras famílias e hoje somos uma rede de apoio. Gabriel floresceu neste ambiente de amor e compreensão.",
      rating: 5,
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=150"
    }
  ];

  return (
    <section id="depoimentos" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Histórias que Inspiram
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada família tem uma história única de superação e crescimento. 
            Conheça alguns dos depoimentos que nos motivam a continuar nossa missão.
          </p>
        </div>

        <AnimacoesLudicas />

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 relative hover:shadow-lg transition-all duration-300">
              <Quote className="w-8 h-8 text-blue-500 mb-4" />
              
              <p className="text-gray-700 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>
              
              <div className="flex items-center space-x-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              
              <div className="flex items-center mt-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Video Testimonials Section */}
        <div className="bg-blue-50 rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Notícias</h3>
            <p className="text-gray-600">
              Fique por dentro das novidades, eventos e conquistas do Instituto VIVA.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Exemplo de notícias fictícias */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Evento Inclusivo"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">Semana da Inclusão reúne famílias e especialistas</h4>
                <p className="text-sm text-gray-600 mt-2">Evento contou com palestras, oficinas e atividades para promover a inclusão de pessoas com TEA.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Nova Certificação"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">Instituto VIVA recebe certificação de excelência</h4>
                <p className="text-sm text-gray-600 mt-2">Reconhecimento nacional pela qualidade dos serviços prestados às famílias.</p>
              </div>
            </div>
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <img 
                src="https://images.pexels.com/photos/8613264/pexels-photo-8613264.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Projeto Música e Vida"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-800">Projeto Música e Vida transforma o cotidiano das crianças</h4>
                <p className="text-sm text-gray-600 mt-2">Aulas de musicoterapia ampliam as possibilidades de expressão e desenvolvimento.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Impact Numbers */}
        {/*
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">98%</div>
            <div className="text-gray-600">Satisfação das Famílias</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
            <div className="text-gray-600">Vidas Transformadas</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-yellow-600 mb-2">15</div>
            <div className="text-gray-600">Anos de Dedicação</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-red-600 mb-2">100%</div>
            <div className="text-gray-600">Amor e Cuidado</div>
          </div>
        </div>
        */}
      </div>
    </section>
  );
};

export default Testimonials;
