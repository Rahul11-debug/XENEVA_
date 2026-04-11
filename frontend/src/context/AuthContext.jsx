import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

const api = axios.create({ baseURL: '/api' });
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('xenova_token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const AuthProvider = ({ children }) => {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token    = localStorage.getItem('xenova_token');
    const userData = localStorage.getItem('xenova_user');
    if (token && userData) {
      try { setUser(JSON.parse(userData)); } catch { logout(); }
    }
    setLoading(false);
  }, []);

  const register = async (username, email, password, role, adminSecret) => {
    const { data } = await api.post('/auth/register', { username, email, password, role, adminSecret });
    localStorage.setItem('xenova_token', data.token);
    localStorage.setItem('xenova_user',  JSON.stringify(data));
    setUser(data);
    return data;
  };

  const login = async (email, password) => {
    const { data } = await api.post('/auth/login', { email, password });
    localStorage.setItem('xenova_token', data.token);
    localStorage.setItem('xenova_user',  JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem('xenova_token');
    localStorage.removeItem('xenova_user');
    setUser(null);
  };

  const saveScore = async (score, total, percentage, rank) => {
    const { data } = await api.post('/auth/quiz-score', { score, total, percentage, rank });
    const updated = { ...user, quizScores: data.quizScores };
    localStorage.setItem('xenova_user', JSON.stringify(updated));
    setUser(updated);
    return data;
  };

  const refreshScores = async () => {
    const { data } = await api.get('/auth/scores');
    const updated = { ...user, quizScores: data.quizScores };
    localStorage.setItem('xenova_user', JSON.stringify(updated));
    setUser(updated);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      register,
      saveScore,
      refreshScores,
      loading,
      isLoggedIn: !!user,
      isAdmin:    user?.role === 'admin',
      isVisitor:  user?.role === 'visitor',
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
