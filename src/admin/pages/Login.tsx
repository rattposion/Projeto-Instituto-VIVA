import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/api';
// import { loginWithMeta } from '../../utils/api'; // Para OAuth futuro

/**
 * Página de Login do Admin
 * Permite login com e-mail e senha
 */
const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Função para login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao logar');
      // Salva token e redireciona
      localStorage.setItem('token', data.token);
      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <form onSubmit={handleLogin} className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Login Admin</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">E-mail</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring" placeholder="Digite seu e-mail" />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Senha</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required className="w-full px-3 py-2 border rounded focus:outline-none focus:ring" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition mb-2">
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {/* <button type="button" className="w-full bg-gray-200 text-gray-800 py-2 rounded mt-2" onClick={loginWithMeta} disabled>
          Entrar com Meta (em breve)
        </button> */}
        <div className="text-center mt-4">
          <a href="#" className="text-blue-500 hover:underline text-sm">Esqueci minha senha</a>
        </div>
      </form>
    </div>
  );
};

export default Login; 