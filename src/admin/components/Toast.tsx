import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'error';
}

/**
 * Toast para exibir mensagens rápidas
 */
const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => (
  <div className={`fixed top-6 right-6 px-4 py-2 rounded shadow-lg z-50 text-white ${type === 'success' ? 'bg-green-600' : 'bg-red-600'}`}>
    {message}
  </div>
);

export default Toast; 