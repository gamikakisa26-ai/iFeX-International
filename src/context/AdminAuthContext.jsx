import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import {
  adminLogin as apiLogin,
  adminLogout as apiLogout,
  adminCheckSession,
  getAdminToken,
} from '../lib/api';

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    (async () => {
      const token = getAdminToken();
      if (!token) {
        setChecking(false);
        return;
      }
      const valid = await adminCheckSession();
      setIsAuthenticated(valid);
      setChecking(false);
    })();
  }, []);

  const login = useCallback(async (password) => {
    await apiLogin(password);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(async () => {
    await apiLogout();
    setIsAuthenticated(false);
  }, []);

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated, checking, login, logout }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  return ctx;
}
