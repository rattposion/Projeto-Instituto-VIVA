const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'; // agora pode ser configurado por .env

export { API_URL };

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login inválido');
  return res.json();
}

function getToken() {
  return localStorage.getItem('token');
}

function authHeaders() {
  return {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + getToken()
  };
}

// Depoimentos
export async function getTestimonials() {
  const res = await fetch(`${API_URL}/testimonials`);
  return res.json();
}
export async function createTestimonial(data: any) {
  const res = await fetch(`${API_URL}/testimonials`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function updateTestimonial(id: number, data: any) {
  const res = await fetch(`${API_URL}/testimonials/${id}`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function deleteTestimonial(id: number) {
  const res = await fetch(`${API_URL}/testimonials/${id}`, {
    method: 'DELETE', headers: authHeaders()
  });
  return res.json();
}

// Notícias
export async function getNews() {
  const res = await fetch(`${API_URL}/news`);
  return res.json();
}
export async function createNews(data: any) {
  const res = await fetch(`${API_URL}/news`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function updateNews(id: number, data: any) {
  const res = await fetch(`${API_URL}/news/${id}`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function deleteNews(id: number) {
  const res = await fetch(`${API_URL}/news/${id}`, {
    method: 'DELETE', headers: authHeaders()
  });
  return res.json();
}

// Informações do site
export async function getSiteInfo() {
  const res = await fetch(`${API_URL}/siteinfo`);
  return res.json();
}
export async function createSiteInfo(data: any) {
  const res = await fetch(`${API_URL}/siteinfo`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function updateSiteInfo(id: number, data: any) {
  const res = await fetch(`${API_URL}/siteinfo/${id}`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function deleteSiteInfo(id: number) {
  const res = await fetch(`${API_URL}/siteinfo/${id}`, {
    method: 'DELETE', headers: authHeaders()
  });
  return res.json();
}

// Pixel
export async function getPixel() {
  const res = await fetch(`${API_URL}/pixel`);
  return res.json();
}
export async function createPixel(data: any) {
  const res = await fetch(`${API_URL}/pixel`, {
    method: 'POST', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function updatePixel(id: number, data: any) {
  const res = await fetch(`${API_URL}/pixel/${id}`, {
    method: 'PUT', headers: authHeaders(), body: JSON.stringify(data)
  });
  return res.json();
}
export async function deletePixel(id: number) {
  const res = await fetch(`${API_URL}/pixel/${id}`, {
    method: 'DELETE', headers: authHeaders()
  });
  return res.json();
} 