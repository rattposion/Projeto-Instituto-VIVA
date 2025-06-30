import React, { useEffect, useState } from 'react';
import { authHeaders } from '../../utils/api';

/**
 * Página de Eventos do Admin
 * Exibe listagem de eventos, filtro por pixel e tipo
 */
const Events: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [pixels, setPixels] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [pixelId, setPixelId] = useState('');
  const [type, setType] = useState('');

  // Buscar pixels para filtro
  useEffect(() => {
    const fetchPixels = async () => {
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
      }
    };
    fetchPixels();
  }, []);

  // Buscar eventos da API
  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError('');
      try {
        let url = '/api/events';
        if (pixelId) url = `/api/events/pixel/${pixelId}`;
        const res = await fetch(url, {
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
        let data = await res.json();
        // Filtro por tipo
        if (type) data = data.filter((e: any) => e.type === type);
        setEvents(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [pixelId, type]);

  // Extrair tipos únicos de evento para filtro
  const eventTypes = Array.from(new Set(events.map(e => e.type)));

  return (
    <div className="p-8">
      <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6">
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Pixel</label>
          <select value={pixelId} onChange={e => setPixelId(e.target.value)} className="px-3 py-2 border rounded w-48">
            <option value="">Todos</option>
            {pixels.map((p: any) => (
              <option key={p.id} value={p.id}>{p.name}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-gray-700 dark:text-gray-200">Tipo de Evento</label>
          <select value={type} onChange={e => setType(e.target.value)} className="px-3 py-2 border rounded w-48">
            <option value="">Todos</option>
            {eventTypes.map((t, i) => (
              <option key={i} value={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      {loading ? (
        <div>Carregando...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <table className="w-full bg-white dark:bg-gray-800 rounded shadow">
          <thead>
            <tr className="text-left border-b dark:border-gray-700">
              <th className="p-3">Pixel</th>
              <th className="p-3">Tipo</th>
              <th className="p-3">Data</th>
              <th className="p-3">Dados</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} className="border-b dark:border-gray-700">
                <td className="p-3">{pixels.find((p: any) => p.id === event.pixelId)?.name || '-'}</td>
                <td className="p-3">{event.type}</td>
                <td className="p-3">{new Date(event.receivedAt).toLocaleString()}</td>
                <td className="p-3">
                  <pre className="text-xs whitespace-pre-wrap max-w-xs overflow-x-auto">{JSON.stringify(event.data, null, 2)}</pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Events; 