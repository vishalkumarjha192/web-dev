// Fetch wrapper: adds the access token and refreshes it when it expires
let refreshing = null;

export const getSession = () => JSON.parse(localStorage.getItem('session') || 'null');
export const saveSession = (s) =>
  s ? localStorage.setItem('session', JSON.stringify(s)) : localStorage.removeItem('session');

function send(path, { method = 'GET', body } = {}) {
  const token = getSession()?.accessToken;
  return fetch(`/api${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: body ? JSON.stringify(body) : undefined
  });
}

async function refreshSession() {
  const res = await send('/auth/refresh', { method: 'POST', body: { refreshToken: getSession()?.refreshToken } });
  if (!res.ok) {
    saveSession(null);
    window.location.assign('/login');
    throw new Error('Session expired, please log in again');
  }
  saveSession(await res.json());
}

export async function api(path, options) {
  let res = await send(path, options);
  if (res.status === 401 && getSession() && !['/auth/login', '/auth/register'].includes(path)) {
    refreshing = refreshing || refreshSession().finally(() => { refreshing = null; });
    await refreshing;
    res = await send(path, options);
  }
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed. Is the backend running?');
  return data;
}
