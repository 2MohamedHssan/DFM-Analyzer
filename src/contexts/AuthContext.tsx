import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface DecodedToken {
  sub: string;
  name: string;
  email: string;
  exp: number;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for token in localStorage on initial load
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(storedToken);
        const currentTime = Math.floor(Date.now() / 1000);
        
        if (decodedToken.exp > currentTime) {
          setToken(storedToken);
          setUser({
            id: decodedToken.sub,
            name: decodedToken.name,
            email: decodedToken.email
          });
        } else {
          // Token expired
          localStorage.removeItem('token');
        }
      } catch (error) {
        // Invalid token
        localStorage.removeItem('token');
      }
    }
    setIsLoading(false);
  }, []);

  // Mock login function - In a real app, this would make an API call
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // This is a mock implementation
      if (email === 'user@example.com' && password === 'password') {
        // Mock successful login with a fake JWT token
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiZW1haWwiOiJ1c2VyQGV4YW1wbGUuY29tIiwiZXhwIjoxOTk5OTk5OTk5fQ.tCsWtS5B4rKZCDn8v-jYVAJmkrESdHoiVZ3jBzIp9XE';
        
        localStorage.setItem('token', mockToken);
        
        const decodedToken = jwtDecode<DecodedToken>(mockToken);
        setToken(mockToken);
        setUser({
          id: decodedToken.sub,
          name: decodedToken.name,
          email: decodedToken.email
        });
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // This is a mock implementation
      if (email && password) {
        // In a real app, you would make an API call to register the user
        // For now, we'll just simulate a successful registration
        
        // Mock JWT token
        const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5ODc2NTQzMjEiLCJuYW1lIjoiSmFuZSBEb2UiLCJlbWFpbCI6InVzZXJAZXhhbXBsZS5jb20iLCJleHAiOjE5OTk5OTk5OTl9.3NZySlx1-h3crXMVRSLaXt2EfN5MDp6oJkOx3lT7i3c';
        
        localStorage.setItem('token', mockToken);
        
        const decodedToken = jwtDecode<DecodedToken>(mockToken);
        setToken(mockToken);
        setUser({
          id: decodedToken.sub,
          name: name || decodedToken.name,
          email: decodedToken.email
        });
      } else {
        throw new Error('Invalid registration data');
      }
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  // Mock forgot password function
  const forgotPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      // This is a mock implementation
      // In a real app, you would make an API call to send a reset password email
      if (!email) {
        throw new Error('Email is required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      return;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Mock reset password function
  const resetPassword = async (token: string, password: string) => {
    try {
      setIsLoading(true);
      
      // This is a mock implementation
      // In a real app, you would make an API call to reset the password
      if (!token || !password) {
        throw new Error('Token and password are required');
      }
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      return;
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      isAuthenticated: !!user,
      isLoading,
      login,
      register,
      logout,
      forgotPassword,
      resetPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};