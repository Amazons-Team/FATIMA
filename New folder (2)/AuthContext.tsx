import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { User } from '../database/models';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithSocial: (provider: 'google' | 'facebook') => Promise<boolean>;
  register: (userData: Partial<User>) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage or session)
    const checkLoggedIn = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to restore authentication state:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate a successful login with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data based on email (in real app, this would come from backend)
      let mockUser: User | null = null;
      
      if (email === 'patient@example.com' && password === 'password') {
        mockUser = {
          id: 'p1',
          name: 'محمد أحمد',
          email: 'patient@example.com',
          password: '', // Don't store password in client
          phone: '+966 50 123 4567',
          role: 'patient',
          createdAt: new Date(),
          updatedAt: new Date()
        };
      } else if (email === 'doctor@example.com' && password === 'password') {
        mockUser = {
          id: 'd1',
          name: 'د. أحمد محمد',
          email: 'doctor@example.com',
          password: '', // Don't store password in client
          phone: '+966 50 987 6543',
          role: 'doctor',
          createdAt: new Date(),
          updatedAt: new Date()
        };
      } else if (email === 'admin@example.com' && password === 'password') {
        mockUser = {
          id: 'a1',
          name: 'سارة علي',
          email: 'admin@example.com',
          password: '', // Don't store password in client
          phone: '+966 50 111 2222',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date()
        };
      } else if (email === 'developer@example.com' && password === 'password') {
        mockUser = {
          id: 'dev1',
          name: 'خالد عمر',
          email: 'developer@example.com',
          password: '', // Don't store password in client
          phone: '+966 50 333 4444',
          role: 'developer',
          createdAt: new Date(),
          updatedAt: new Date()
        };
      }
      
      if (mockUser) {
        setUser(mockUser);
        localStorage.setItem('user', JSON.stringify(mockUser));
        return true;
      }
      
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const loginWithSocial = async (provider: 'google' | 'facebook'): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would integrate with Google/Facebook OAuth
      // For now, we'll simulate a successful login with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: 'social1',
        name: 'مستخدم مواقع التواصل',
        email: `social_${provider}@example.com`,
        password: '', // Don't store password in client
        phone: '+966 50 555 6666',
        role: 'patient',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error(`${provider} login failed:`, error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData: Partial<User>): Promise<boolean> => {
    setLoading(true);
    try {
      // In a real app, this would be an API call to your backend
      // For now, we'll simulate a successful registration
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name: userData.name || '',
        email: userData.email || '',
        password: '', // Don't store password in client
        phone: userData.phone || '',
        role: userData.role || 'patient',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      
      setUser(mockUser);
      localStorage.setItem('user', JSON.stringify(mockUser));
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, loginWithSocial, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
