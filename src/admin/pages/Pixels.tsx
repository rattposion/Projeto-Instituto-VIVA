import React, { useEffect, useState } from 'react';
import { authHeaders } from '../../utils/api';

/**
 * Página de Pixels do Admin
 * Exibe listagem e permite criar/editar/deletar pixels
 */
const Pixels: React.FC = () => {
  const [pixels, setPixels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Busca pixels da API
  useEffect(() => {
    const fetchPixels = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/pixels', {
          headers: authHeaders()
        });
        const contentType = res.headers.get('content-type');
        if (!res.ok) {
          let errorMsg = 'Erro desconhecido';
          if (contentType && contentType.includes('application/json')) {
            const data = await res.json();
            errorMsg = data.error || errorMsg;
          } else {
            errorMsg = await res.text();
          }
          throw new Error(errorMsg);
        }
        const data = await res.json();
        setPixels(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchPixels();
  }, []);

  // Função para deletar pixel
  const handleDelete = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja deletar este Pixel?')) return;
    try {
      const res = await fetch(`/api/pixels/${id}`, {
        method: 'DELETE',
        headers: authHeaders()
      });
      if (!res.ok) throw new Error('Erro ao deletar');
      setPixels(pixels.filter(p => p.id !== id));
    } catch (err) {
      alert('Erro ao deletar Pixel');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Pixels</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Novo Pixel</button>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th className="p-3">Nome</th>
              <th className="p-3">ID</th>
              <th className="p-3">Status</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {pixels.map(pixel => (
              <tr key={pixel.id} className="border-b dark:border-gray-700">
                <td className="p-3">{pixel.name}</td>
                <td className="p-3">{pixel.pixelId}</td>
                <td className="p-3">
                  <span className={pixel.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}>
                    {pixel.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Editar</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => handleDelete(pixel.id)}>Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Pixels; 