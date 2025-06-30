import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Sidebar de navegação do painel admin
 */
const Sidebar: React.FC = () => {
  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-900 shadow flex flex-col">
      <div className="h-16 flex items-center justify-center font-bold text-xl text-blue-700 dark:text-blue-300 border-b dark:border-gray-700">
        Admin Pixel
      </div>
      <nav className="flex-1 px-4 py-6 space-y-2">
        <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? 'block px-4 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white font-semibold' : 'block px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}>Dashboard</NavLink>
        <NavLink to="/admin/pixels" className={({ isActive }) => isActive ? 'block px-4 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white font-semibold' : 'block px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}>Pixels</NavLink>
        <NavLink to="/admin/events" className={({ isActive }) => isActive ? 'block px-4 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white font-semibold' : 'block px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}>Eventos</NavLink>
        <NavLink to="/admin/conversions" className={({ isActive }) => isActive ? 'block px-4 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white font-semibold' : 'block px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}>Conversões</NavLink>
        <NavLink to="/admin/diagnostics" className={({ isActive }) => isActive ? 'block px-4 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white font-semibold' : 'block px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}>Diagnóstico</NavLink>
        <NavLink to="/admin/integrations" className={({ isActive }) => isActive ? 'block px-4 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white font-semibold' : 'block px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}>Integrações</NavLink>
        <NavLink to="/admin/settings" className={({ isActive }) => isActive ? 'block px-4 py-2 rounded bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-white font-semibold' : 'block px-4 py-2 rounded hover:bg-blue-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}>Configurações</NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar; 