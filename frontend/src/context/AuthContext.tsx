import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UsuarioAutenticado } from '../types/api';
import { authApi } from '../api/auth';

interface AuthContextType {
  usuario: UsuarioAutenticado | null;
  login: (correo: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [usuario, setUsuario] = useState<UsuarioAutenticado | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await authApi.getSession();
        setUsuario(session.usuario);
      } catch (error) {
        // No hay sesión activa
        localStorage.removeItem('accessToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const login = async (correo: string, password: string) => {
    const response = await authApi.login({ correo, password });
    localStorage.setItem('accessToken', response.accessToken);
    setUsuario(response.usuario);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    } finally {
      localStorage.removeItem('accessToken');
      setUsuario(null);
    }
  };

  const value: AuthContextType = {
    usuario,
    login,
    logout,
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};