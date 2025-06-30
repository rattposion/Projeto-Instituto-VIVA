import React from 'react';

/**
 * Página de Configurações do Admin
 * Exibe dados do usuário, preferências e alertas
 */
const Settings: React.FC = () => {
  // Simulação de dados do usuário e workspace
  const user = { name: 'Admin', email: 'admin@email.com' };
  const workspace = { name: 'Workspace Exemplo', members: 5 };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Configurações</h1>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Usuário</h2>
        <div className="mb-2">Nome: <b>{user.name}</b></div>
        <div className="mb-2">E-mail: <b>{user.email}</b></div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Alterar Senha</button>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Workspace</h2>
        <div className="mb-2">Nome: <b>{workspace.name}</b></div>
        <div className="mb-2">Membros: <b>{workspace.members}</b></div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Gerenciar Membros</button>
      </div>
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-2">Alertas</h2>
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">Configurar Alertas</button>
      </div>
      <div>
        <h2 className="text-lg font-semibold mb-2">Tema</h2>
        <button className="bg-gray-800 text-white px-4 py-2 rounded mr-2" onClick={() => document.documentElement.classList.add('dark')}>Modo Escuro</button>
        <button className="bg-gray-200 text-gray-800 px-4 py-2 rounded" onClick={() => document.documentElement.classList.remove('dark')}>Modo Claro</button>
      </div>
    </div>
  );
};

export default Settings; 