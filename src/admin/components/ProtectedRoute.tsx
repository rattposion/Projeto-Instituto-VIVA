import React from 'react';
import { Navigate } from 'react-router-dom';

/**
 * Componente para proteger rotas do admin
 * Redireciona para login se não autenticado
 */
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute; 