import React from 'react';

/**
 * Header do painel admin
 * Exibe nome do usuário, botão de logout e alternância dark/light
 */
const Header: React.FC = () => {
  // Simulação de usuário logado
  const user = { name: 'Admin' };

  // Alternância de tema (dark/light)
  const toggleTheme = () => {
    document.documentElement.classList.toggle('dark');
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/admin/login';
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-900 flex items-center justify-between px-6 border-b dark:border-gray-700">
      <div className="font-bold text-lg text-blue-700 dark:text-blue-300">Painel Admin</div>
      <div className="flex items-center gap-4">
        <span className="text-gray-700 dark:text-gray-200">{user.name}</span>
        <button onClick={toggleTheme} className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800" title="Alternar tema">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 5.66l-.71-.71M4.05 4.93l-.71-.71"/></svg>
        </button>
        <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Sair</button>
      </div>
    </header>
  );
};

export default Header; 