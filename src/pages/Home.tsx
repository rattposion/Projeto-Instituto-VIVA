import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import AnimacoesLudicas from '../components/AnimacoesLudicas';
import HowToHelp from '../components/HowToHelp';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import WhatsappFloatButton from '../components/WhatsappFloatButton';
// Importe outros componentes do site conforme necessário

const Home: React.FC = () => (
  <>
    <Header />
    <Hero />
    <About />
    <AnimacoesLudicas />
    <HowToHelp />
    <Services />
    <Testimonials />
    <Contact />
    <Footer />
    <WhatsappFloatButton />
  </>
);

export default Home; 