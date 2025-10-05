import { useState, useEffect } from 'react';
import { API_CONFIG } from '@/config/api';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isValidating, setIsValidating] = useState(true);

  // Validar token com o backend (desabilitado - endpoint não existe ainda)
  const validateToken = async (token: string): Promise<boolean> => {
    // TODO: Implementar endpoint /auth/validate no backend
    // Por enquanto, sempre retorna true para não deslogar
    return true;
    
    /* CÓDIGO ORIGINAL (reativar quando backend tiver o endpoint):
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}/auth/validate`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': API_CONFIG.API_KEY,
        },
      });
      return response.ok;
    } catch (error) {
      console.error('Erro ao validar token:', error);
      return false;
    }
    */
  };

  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem('user');
      const token = localStorage.getItem('token');
      
      if (storedUser && token) {
        try {
          const userData = JSON.parse(storedUser);
          
          // Autenticar localmente (para o menu aparecer imediatamente)
          setUser(userData);
          setIsAuthenticated(true);
          setIsAdmin(userData.role === 'admin');
          
          // Validar token com backend (sempre retorna true por enquanto)
          const isValid = await validateToken(token);
          
          if (!isValid) {
            setUser(null);
            setIsAuthenticated(false);
            setIsAdmin(false);
            localStorage.removeItem('user');
            localStorage.removeItem('token');
          }
        } catch (error) {
          console.error('Erro ao carregar dados do usuário:', error);
          localStorage.removeItem('user');
          localStorage.removeItem('token');
        }
      }
      
      setIsValidating(false);
    };
    
    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_CONFIG.API_KEY,
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Credenciais inválidas: ${response.status}`);
    }

    const data = await response.json();
    
    const userData: User = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      role: data.user.role || 'admin',
    };

    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.role === 'admin');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', data.accessToken);
  };

  const register = async (data: RegisterData) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_CONFIG.API_KEY,
      },
      body: JSON.stringify({ ...data, role: 'admin' }),
    });

    if (!response.ok) {
      const errorText = await response.text().catch(() => 'Unknown error');
      throw new Error(`Erro ao registrar usuário: ${response.status}`);
    }

    const responseData = await response.json();
    
    const userData: User = {
      id: responseData.user.id,
      name: responseData.user.name,
      email: responseData.user.email,
      role: responseData.user.role || 'admin',
    };

    setUser(userData);
    setIsAuthenticated(true);
    setIsAdmin(userData.role === 'admin');
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', responseData.accessToken);
  };

  const logout = async () => {
    const token = localStorage.getItem('token');
    
    try {
      // Invalidar token no backend
      if (token) {
        await fetch(`${API_CONFIG.BASE_URL}/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'x-api-key': API_CONFIG.API_KEY,
          },
        });
      }
    } catch (error) {
      if (import.meta.env.DEV) {
        console.error('Erro ao fazer logout no servidor:', error);
      }
      // Continua mesmo se falhar no backend
    } finally {
      // Limpar localmente sempre
      setUser(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  return {
    user,
    isAuthenticated,
    isAdmin,
    isValidating,
    login,
    register,
    logout,
  };
};
