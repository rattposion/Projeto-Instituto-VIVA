import { API_URL } from './api';

export async function getPixelConfig() {
  const res = await fetch(`${API_URL}/pixel`);
  const data = await res.json();
  // Supondo que retorna um array, pega o primeiro ativo
  return data.find((item: any) => item.enabled);
} 