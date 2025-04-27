
import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, getDashboardRoute } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

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
  logout: () => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string, organizationName?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  isLoading: boolean;
  dashboardURL: string;
}

// Create the context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  resetPassword: async () => {},
  updateProfile: async () => {},
  isLoading: true,
  dashboardURL: '/',
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [dashboardURL, setDashboardURL] = useState<string>('/');
  const { toast } = useToast();
  
  // Update dashboard URL when user role changes
  useEffect(() => {
    setDashboardURL(getDashboardRoute(user?.role));
  }, [user?.role]);
  
  // Check for existing session on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setIsLoading(true);
        
        // Check if we have a session
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error checking auth session:', error);
          return;
        }
        
        if (session) {
          // Get user profile from the database
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single();
            
          if (profileError) {
            console.error('Error fetching user profile:', profileError);
            return;
          }
          
          const userData = {
            id: session.user.id,
            email: session.user.email || '',
            firstName: profile.first_name,
            lastName: profile.last_name,
            organizationId: profile.organization_id,
            role: profile.role,
          };
          
          setUser(userData);
          console.log("Session restored, user:", userData);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkAuth();
    
    // Set up subscription to auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log("Auth state changed:", event, session?.user?.email);
      
      if (event === 'SIGNED_IN' && session) {
        // Get user profile from the database
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
          
        if (profileError) {
          console.error('Error fetching user profile:', profileError);
          return;
        }
        
        const userData = {
          id: session.user.id,
          email: session.user.email || '',
          firstName: profile.first_name,
          lastName: profile.last_name,
          organizationId: profile.organization_id,
          role: profile.role,
        };
        
        setUser(userData);
        console.log("User signed in:", userData);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        console.log("User signed out");
      } else if (event === 'TOKEN_REFRESHED') {
        console.log("Token refreshed");
      }
    });
    
    return () => {
      // Clean up the subscription
      authListener.subscription.unsubscribe();
    };
  }, []);
  
  // Login function
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      // User is set via the onAuthStateChange listener
      return Promise.resolve();
    } catch (error: any) {
      console.error('Login error:', error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Register function
  const register = async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    organizationName?: string
  ) => {
    try {
      setIsLoading(true);
      
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (authError) {
        throw new Error(authError.message);
      }
      
      if (!authData.user) {
        throw new Error('Failed to create user');
      }
      
      // Create organization if needed
      let organizationId = undefined;
      
      if (organizationName) {
        const { data: orgData, error: orgError } = await supabase
          .from('organizations')
          .insert({
            name: organizationName,
            status: 'pending',
          })
          .select()
          .single();
          
        if (orgError) {
          console.error('Error creating organization:', orgError);
        } else {
          organizationId = orgData.id;
        }
      }
      
      // Create user profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: authData.user.id,
          first_name: firstName,
          last_name: lastName,
          email,
          organization_id: organizationId,
          role: organizationName ? 'business' : 'customer', // If creating an org, they're a business
        });
        
      if (profileError) {
        console.error('Error creating profile:', profileError);
      }
      
      // User will be set via the onAuthStateChange listener
      return Promise.resolve();
    } catch (error: any) {
      console.error('Registration error:', error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      return Promise.resolve();
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        variant: 'destructive',
        title: 'Logout failed',
        description: error.message || 'An error occurred during logout',
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Password reset function
  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      
      if (error) {
        throw error;
      }
      return Promise.resolve();
    } catch (error: any) {
      console.error('Password reset error:', error);
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update profile function
  const updateProfile = async (data: Partial<User>) => {
    try {
      if (!user?.id) {
        throw new Error('User not authenticated');
      }
      
      setIsLoading(true);
      
      const updates = {
        first_name: data.firstName,
        last_name: data.lastName,
        updated_at: new Date(),
      };
      
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);
        
      if (error) {
        throw error;
      }
      
      // Update local user state
      setUser(prev => prev ? { ...prev, ...data } : null);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile information has been updated successfully.',
      });
      return Promise.resolve();
    } catch (error: any) {
      console.error('Profile update error:', error);
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: error.message || 'Failed to update profile',
      });
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated: !!user,
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        isLoading,
        dashboardURL
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export default AuthContext;
