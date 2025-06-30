import React, { useEffect, useState } from 'react';
import { API_URL, authHeaders } from '../../utils/api';

/**
 * Página de Conversões do Admin
 * Exibe conversões personalizadas, funis e KPIs
 */
const Conversions: React.FC = () => {
  const [conversions, setConversions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');
  const [newPixelId, setNewPixelId] = useState('');
  const [creating, setCreating] = useState(false);

  // Buscar conversões da API
  useEffect(() => {
    const fetchConversions = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/api/conversions`, {
          headers: authHeaders()
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Erro ao buscar conversões');
        setConversions(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchConversions();
  }, []);

  // Função para criar nova conversão
  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/conversions/pixel/${newPixelId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ name: newName, rules: {} })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao criar conversão');
      setConversions(prev => [data, ...prev]);
      setShowModal(false);
      setNewName('');
      setNewPixelId('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Conversões</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setShowModal(true)}>Nova Conversão</button>
      </div>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <form onSubmit={handleCreate} className="bg-white dark:bg-gray-800 p-6 rounded shadow w-full max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Nova Conversão</h2>
            <div className="mb-3">
              <label className="block mb-1 text-gray-700 dark:text-gray-200">Nome</label>
              <input type="text" value={newName} onChange={e => setNewName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="mb-3">
              <label className="block mb-1 text-gray-700 dark:text-gray-200">Pixel ID</label>
              <input type="text" value={newPixelId} onChange={e => setNewPixelId(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <button type="button" className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowModal(false)}>Cancelar</button>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded" disabled={creating}>{creating ? 'Criando...' : 'Criar'}</button>
            </div>
            {error && <div className="text-red-500 mt-2">{error}</div>}
          </form>
        </div>
      )}
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th className="p-3">Nome</th>
              <th className="p-3">Pixel</th>
              <th className="p-3">Funil</th>
              <th className="p-3">Taxa de Conversão</th>
              <th className="p-3">Valor Gerado</th>
              <th className="p-3">Ações</th>
            </tr>
          </thead>
          <tbody>
            {conversions.map(conv => (
              <tr key={conv.id} className="border-b dark:border-gray-700">
                <td className="p-3">{conv.name}</td>
                <td className="p-3">{conv.pixelId}</td>
                <td className="p-3">{conv.rules?.funnel?.join(' → ') || '-'}</td>
                <td className="p-3">{conv.kpi?.conversionRate ? `${conv.kpi.conversionRate}%` : '-'}</td>
                <td className="p-3">{conv.kpi?.value ? `R$ ${conv.kpi.value}` : '-'}</td>
                <td className="p-3 flex gap-2">
                  <button className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500">Editar</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">Deletar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Conversions; 