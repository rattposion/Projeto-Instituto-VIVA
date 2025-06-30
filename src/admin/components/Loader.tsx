import React from 'react';

/**
 * Loader animado para feedback de carregamento
 */
const Loader: React.FC = () => (
  <div className="flex items-center justify-center py-8">
    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

export default Loader; 