import { API_URL } from './api';

export async function getPixelConfig() {
  const token = localStorage.getItem('token');
  const res = await fetch(`${API_URL}/api/pixels`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {}
  });
  if (res.status === 401) return null;
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || 'Erro ao buscar pixels');
  return Array.isArray(data) ? data.find((item: any) => item.enabled) : null;
} 