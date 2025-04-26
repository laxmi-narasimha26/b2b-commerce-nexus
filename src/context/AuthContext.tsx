
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define user types
interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  organizationId?: string;
  role?: string;
}

// Define context types
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // In a real app, this would check localStorage or cookies for a token
        // and validate it with an API call
        const savedUser = localStorage.getItem('b2b_user');
        
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        localStorage.removeItem('b2b_user');
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // This would be a real API call in production
      // For now, we'll simulate a successful login with mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const mockUser: User = {
        id: 'user_1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        organizationId: 'org_1',
        role: 'admin',
      };
      
      // Save to state and localStorage
      setUser(mockUser);
      localStorage.setItem('b2b_user', JSON.stringify(mockUser));
    } catch (error) {
      console.error('Login error:', error);
      throw new Error('Invalid credentials');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('b2b_user');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login,
        logout,
        isLoading 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
