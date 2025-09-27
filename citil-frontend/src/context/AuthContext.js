import { createContext, useContext, useState } from 'react';
import api from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      await api.get('/sanctum/csrf-cookie'); // important pour Sanctum !
      const response = await api.post('/api/login', { email, password });
      // Si tu utilises JWT :
      // if (response.data.token) {
      //   localStorage.setItem('token', response.data.token);
      // }
      // Pour Sanctum, rien à stocker, le cookie est géré automatiquement
      setUser(response.data.user);
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
    }
  };

  const logout = async () => {
    try {
      await api.post('/api/logout');
      localStorage.removeItem('token');
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};