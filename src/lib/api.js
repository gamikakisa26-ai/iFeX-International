const ADMIN_TOKEN_KEY = 'ifex_admin_token';

// Use environment variable for API URL, fallback to relative path for dev
const API_BASE = import.meta.env.VITE_API_URL || '/api';

async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data?.message || 'Something went wrong. Please try again.');
  }
  return data;
}

export function getAdminToken() {
  return localStorage.getItem(ADMIN_TOKEN_KEY);
}

export function setAdminToken(token) {
  localStorage.setItem(ADMIN_TOKEN_KEY, token);
}

export function clearAdminToken() {
  localStorage.removeItem(ADMIN_TOKEN_KEY);
}

function authHeaders() {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- Public ---------------------------------------------------------------

export async function fetchContent() {
  const res = await fetch(`${API_BASE}/content`);
  const data = await handleResponse(res);
  return data.data;
}

// --- Admin auth -------------------------------------------------------------

export async function adminLogin(password) {
  const res = await fetch(`${API_BASE}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password }),
  });
  const data = await handleResponse(res);
  setAdminToken(data.token);
  return data.token;
}

export async function adminLogout() {
  try {
    await fetch(`${API_BASE}/admin/logout`, { method: 'POST', headers: authHeaders() });
  } finally {
    clearAdminToken();
  }
}

export async function adminCheckSession() {
  const res = await fetch(`${API_BASE}/admin/session`, { headers: authHeaders() });
  if (!res.ok) return false;
  const data = await res.json().catch(() => ({}));
  return !!data.success;
}

// --- Admin: company ---------------------------------------------------------

export async function adminUpdateCompany(partialCompany) {
  const res = await fetch(`${API_BASE}/admin/company`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(partialCompany),
  });
  const data = await handleResponse(res);
  return data.data;
}

// --- Admin: portfolio ---------------------------------------------------------

export async function adminCreateProject(project) {
  const res = await fetch(`${API_BASE}/admin/portfolio`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(project),
  });
  const data = await handleResponse(res);
  return data.data;
}

export async function adminUpdateProject(id, partialProject) {
  const res = await fetch(`${API_BASE}/admin/portfolio/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(partialProject),
  });
  const data = await handleResponse(res);
  return data.data;
}

export async function adminDeleteProject(id) {
  const res = await fetch(`${API_BASE}/admin/portfolio/${id}`, {
    method: 'DELETE',
    headers: authHeaders(),
  });
  return handleResponse(res);
}

export async function adminUploadImage(file) {
  const formData = new FormData();
  formData.append('image', file);
  const res = await fetch(`${API_BASE}/admin/upload`, {
    method: 'POST',
    headers: authHeaders(),
    body: formData,
  });
  const data = await handleResponse(res);
  return data.url;
}
