import { createContext, useContext, useState, useEffect } from 'react';
import { ApiService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Vérifier l'utilisateur au chargement
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('citil_token');
      const userData = localStorage.getItem('citil_user');
      
      console.log('AuthContext - Token:', !!token, 'UserData:', !!userData);
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          console.log('AuthContext - Parsed user:', parsedUser);
          
          // Vérifier la validité du token avec le serveur
          try {
            const response = await ApiService.getUserInfo();
            if (response.user_info) {
              // Token valide, mettre à jour les données utilisateur
              setUser(response.user_info);
              localStorage.setItem('citil_user', JSON.stringify(response.user_info));
            } else {
              throw new Error('Token invalide');
            }
          } catch (error) {
            console.error('Token invalide, déconnexion:', error);
            // Token invalide, nettoyer le localStorage
            localStorage.removeItem('citil_token');
            localStorage.removeItem('citil_user');
            setUser(null);
          }
        } catch (error) {
          console.error('Erreur lors du parsing des données utilisateur:', error);
          localStorage.removeItem('citil_token');
          localStorage.removeItem('citil_user');
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();

    // Écouter les changements d'authentification
    const handleAuthChange = () => {
      const token = localStorage.getItem('citil_token');
      const userData = localStorage.getItem('citil_user');
      
      if (token && userData) {
        try {
          setUser(JSON.parse(userData));
        } catch (error) {
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    window.addEventListener('authChanged', handleAuthChange);
    return () => window.removeEventListener('authChanged', handleAuthChange);
  }, []);

  const login = async (email, password) => {
    try {
      const result = await ApiService.login(email, password);
      setUser(result.user);
      return result;
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      throw error;
    }
  };

  const register = async (name, email, password, password_confirmation) => {
    try {
      const result = await ApiService.register(name, email, password, password_confirmation);
      setUser(result.user);
      return result;
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await ApiService.logout();
      setUser(null);
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
      setUser(null);
    }
  };

  const isAdmin = () => {
    return user && user.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      isAdmin, 
      loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};