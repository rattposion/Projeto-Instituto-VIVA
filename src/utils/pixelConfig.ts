import { API_URL, authHeaders } from './api';

export async function getPixelConfig() {
  const headers = authHeaders();
  console.log('Enviando headers para /api/pixels:', headers);
  const res = await fetch(`${API_URL}/api/pixels`, {
    headers
  });
  console.log('Status da resposta /api/pixels:', res.status);
  if (res.status === 401) {
    const text = await res.text();
    console.warn('Resposta 401:', text);
    return null;
  }
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao buscar pixels');
  return Array.isArray(data) ? data.find((item: any) => item.enabled) : null;
} 