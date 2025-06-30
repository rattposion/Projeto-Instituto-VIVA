import React, { useEffect, useState } from 'react';

/**
 * Página de Diagnóstico do Admin
 * Exibe status dos pixels, erros e logs
 */
const Diagnostics: React.FC = () => {
  const [pixels, setPixels] = useState<any[]>([]);
  const [logs, setLogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Buscar pixels e logs da API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const resPixels = await fetch('/api/pixels', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        const dataPixels = await resPixels.json();
        if (!resPixels.ok) throw new Error(dataPixels.error || 'Erro ao buscar pixels');
        setPixels(dataPixels);
        // Buscar logs de erro do primeiro pixel (exemplo)
        if (dataPixels.length > 0) {
          const resLogs = await fetch(`/api/logs/pixel/${dataPixels[0].id}?level=ERROR`, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          });
          const dataLogs = await resLogs.json();
          if (resLogs.ok) setLogs(dataLogs);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Diagnóstico</h1>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <>
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Status dos Pixels</h2>
            <table className="w-full bg-white dark:bg-gray-800 rounded shadow mb-4">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="p-3">Nome</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Último Evento</th>
                  <th className="p-3">Ações</th>
                </tr>
              </thead>
              <tbody>
                {pixels.map(pixel => (
                  <tr key={pixel.id} className="border-b dark:border-gray-700">
                    <td className="p-3">{pixel.name}</td>
                    <td className="p-3">
                      <span className={pixel.status === 'ACTIVE' ? 'text-green-600' : 'text-red-600'}>
                        {pixel.status === 'ACTIVE' ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="p-3">{pixel.lastEventAt ? new Date(pixel.lastEventAt).toLocaleString() : '-'}</td>
                    <td className="p-3">
                      <a href={`https://www.facebook.com/events_manager2/list/pixel/${pixel.pixelId}/diagnostics`} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Testar na Meta</a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Logs de Erro (Pixel selecionado)</h2>
            <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
              <thead>
                <tr className="text-left border-b dark:border-gray-700">
                  <th className="p-3">Data</th>
                  <th className="p-3">Mensagem</th>
                </tr>
              </thead>
              <tbody>
                {logs.map(log => (
                  <tr key={log.id} className="border-b dark:border-gray-700">
                    <td className="p-3">{new Date(log.createdAt).toLocaleString()}</td>
                    <td className="p-3">{log.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Diagnostics; 