import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { io } from 'socket.io-client';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);
  const [socket, setSocket] = useState(null);

  // Initialize socket when user logs in.
  // Connect to '/' (same origin) so the request goes through Vite's proxy
  // → no CORS issue in local dev, and works unchanged in production too.
  const initSocket = useCallback((userId) => {
    const s = io('/', { withCredentials: true });
    s.on('connect', () => s.emit('join', userId));
    setSocket(s);
    return s;
  }, []);

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userData = await authService.getMe(token);
          setUser(userData);
          initSocket(userData._id);
        } catch {
          localStorage.removeItem('token');
          setToken(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, [token, initSocket]);

  const login = async (email, password) => {
    const data = await authService.login(email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data);
    initSocket(data._id);
    return data;
  };

  const register = async (name, email, password) => {
    const data = await authService.register(name, email, password);
    localStorage.setItem('token', data.token);
    setToken(data.token);
    setUser(data);
    initSocket(data._id);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, socket, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
