import { createContext, useContext, useState } from 'react';
import { api, getSession, saveSession } from '../api';

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getSession()?.user || null);

  // mode is "login" or "register"
  const authenticate = async (mode, form) => {
    const session = await api(`/auth/${mode}`, { method: 'POST', body: form });
    saveSession(session);
    setUser(session.user);
  };

  const logout = async () => {
    await api('/auth/logout', { method: 'POST' }).catch(() => {});
    saveSession(null);
    setUser(null);
  };

  return <AuthContext.Provider value={{ user, authenticate, logout }}>{children}</AuthContext.Provider>;
}
