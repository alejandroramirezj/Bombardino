import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface AuthContextType {
  user: { id: string; email: string } | null;
  isLoading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const storedUser = localStorage.getItem('brainrot-user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string) => {
    setIsLoading(true);
    try {
      // Simulate magic link email sending
      toast.success("¡Email de acceso enviado! Para esta demo, accederás automáticamente.");
      
      // In a real app, you would send a magic link email here
      // For demo purposes, we'll just log in the user immediately
      setTimeout(() => {
        const newUser = { id: Math.random().toString(36).substring(2, 9), email };
        localStorage.setItem('brainrot-user', JSON.stringify(newUser));
        setUser(newUser);
        setIsLoading(false);
      }, 1500);
    } catch (error) {
      toast.error("Error al enviar el email");
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('brainrot-user');
    setUser(null);
    toast.success("Desconexión realizada con éxito");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
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
