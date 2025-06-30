import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import HowToHelp from './components/HowToHelp';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsappFloatButton from './components/WhatsappFloatButton';
import CookieConsent, { Cookies } from 'react-cookie-consent';
// Admin imports
import Login from './admin/pages/Login';
import Dashboard from './admin/pages/Dashboard';
import TestimonialsAdmin from './admin/pages/Testimonials';
import News from './admin/pages/News';
import SiteInfo from './admin/pages/SiteInfo';
import Pixel from './admin/pages/Pixel';
import Sidebar from './admin/components/Sidebar';
import HeaderAdmin from './admin/components/Header';
import ProtectedRoute from './admin/components/ProtectedRoute';
import Events from './admin/pages/Events';
import Pixels from './admin/pages/Pixels';

/**
 * Estrutura de rotas do painel admin
 */
const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
    <Sidebar />
    <div className="flex-1 flex flex-col">
      <HeaderAdmin />
      <main className="flex-1">{children}</main>
    </div>
  </div>
);

const Site = () => (
  <div className="min-h-screen">
    <Header />
    <Hero />
    <About />
    <Services />
    <Testimonials />
    <HowToHelp />
    <Contact />
    <Footer />
    <WhatsappFloatButton />
    <CookieConsent
      location="bottom"
      buttonText="Aceitar"
      declineButtonText="Recusar"
      enableDeclineButton
      style={{ background: '#2B373B' }}
      buttonStyle={{ color: '#fff', background: '#4eaf4e', fontSize: '13px' }}
      declineButtonStyle={{ color: '#fff', background: '#d9534f', fontSize: '13px' }}
      onAccept={() => { if(window.fbq) window.fbq('consent', 'grant'); }}
      onDecline={() => { if(window.fbq) window.fbq('consent', 'revoke'); }}
    >
      Utilizamos cookies para melhorar sua experiência e para fins de marketing (Pixel Meta/Facebook). Você pode aceitar ou recusar.
    </CookieConsent>
  </div>
);

function App() {
  React.useEffect(() => {
    if (Cookies.get('CookieConsent') === 'true' && window.fbq) {
      window.fbq('consent', 'grant');
    }
  }, []);
  return (
    <Router>
      <Routes>
        {/* Rotas do Admin */}
        <Route path="/admin/login" element={<Login />} />
        <Route
          path="/admin/*"
          element={
            <ProtectedRoute>
              <AdminLayout>
                <Routes>
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="pixels" element={<Pixels />} />
                  <Route path="events" element={<Events />} />
                  <Route path="testimonials" element={<TestimonialsAdmin />} />
                  <Route path="news" element={<News />} />
                  <Route path="siteinfo" element={<SiteInfo />} />
                  <Route path="*" element={<Navigate to="/admin/dashboard" />} />
                </Routes>
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        {/* Rotas do site principal */}
        <Route path="/" element={<Site />} />
        {/* Outras rotas públicas podem ser adicionadas aqui */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;