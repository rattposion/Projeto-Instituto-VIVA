import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Layout from './components/layout/Layout';

// Auth Pages
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ForgotPassword from './pages/auth/ForgotPassword';

// Admin Pages
import Dashboard from './pages/Dashboard';
import Pixels from './pages/Pixels';
import Events from './pages/Events';
import Conversions from './pages/Conversions';
import Diagnostics from './pages/Diagnostics';
import Integrations from './pages/Integrations';
import Workspaces from './pages/Workspaces';
import Settings from './pages/Settings';

// Original Instituto VIVA components
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import HowToHelp from './components/HowToHelp';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsappFloatButton from './components/WhatsappFloatButton';

// Instituto VIVA Homepage
const InstitutoVivaHome: React.FC = () => {
  return (
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
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            <Routes>
              {/* Instituto VIVA Homepage */}
              <Route path="/" element={<InstitutoVivaHome />} />
              
              {/* Admin Auth Routes */}
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/register" element={<Register />} />
              <Route path="/admin/forgot-password" element={<ForgotPassword />} />
              
              {/* Admin Protected Routes */}
              <Route path="/admin" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route index element={<Navigate to="/admin/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="pixels" element={<Pixels />} />
                <Route path="pixels/:id" element={<div>Pixel Detail - Em desenvolvimento</div>} />
                <Route path="events" element={<Events />} />
                <Route path="conversions" element={<Conversions />} />
                <Route path="diagnostics" element={<Diagnostics />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="workspaces" element={<Workspaces />} />
                <Route path="settings" element={<Settings />} />
              </Route>
            </Routes>
            
            <Toaster 
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#363636',
                  color: '#fff',
                },
              }}
            />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;