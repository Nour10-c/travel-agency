import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Décoder le token JWT pour obtenir les informations utilisateur
        const payload = JSON.parse(atob(token.split('.')[1]));
        setUser({ ...payload, token });
      } catch (error) {
        console.error('Erreur lors du décodage du token:', error);
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

const login = async (email, password) => {
    try {
      const response = await authAPI.login({ email, password });
      const { token } = response.data;
      localStorage.setItem('token', token);
      setUser({ token });
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      
      // Différencier les types d'erreurs
      let errorMessage;
      if (!error.response) {
        // Erreur réseau (CORS, serveur down, etc.)
        errorMessage = 'Erreur de connexion au serveur. Vérifie que le backend est bien déployé.';
        console.log('🔴 Erreur réseau détectée - Vérifie le backend sur Render');
      } else if (error.response.status === 401) {
        errorMessage = 'Email ou mot de passe incorrect.';
      } else if (error.response.status === 403) {
        errorMessage = 'Accès refusé.';
      } else {
        errorMessage = error.response?.data?.message || 'Erreur de connexion. Vérifiez vos identifiants.';
      }
      
      return { success: false, message: errorMessage, isNetworkError: !error.response };
    }
  };

  const register = async (name, email, password) => {
    try {
      await authAPI.register({ name, email, password });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Erreur d\'inscription' };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
