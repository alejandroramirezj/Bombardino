import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'sonner';

interface UserProfile {
  id: string;
  email: string;
  name?: string;
  picture?: string;
  password?: string;
  createdCharacters: string[];
  votedCharacters: string[];
}

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: (credential: string) => void;
  register: (email: string, password: string, name?: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  isAuthenticated: boolean;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  addVotedCharacter: (characterId: string) => void;
  removeVotedCharacter: (characterId: string) => void;
  addCreatedCharacter: (characterId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simular base de datos local
  const [usersDB, setUsersDB] = useState<UserProfile[]>(() => {
    const storedUsers = localStorage.getItem('brainrot-users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  // Persistir usuarios en localStorage cada vez que cambie la base de datos
  useEffect(() => {
    if (usersDB.length > 0) {
      localStorage.setItem('brainrot-users', JSON.stringify(usersDB));
    }
  }, [usersDB]);

  // Sincronizar usuario actual con la base de datos
  useEffect(() => {
    if (user) {
      const updatedUserFromDB = usersDB.find(u => u.id === user.id);
      if (updatedUserFromDB) {
        const { password: _, ...safeUser } = updatedUserFromDB;
        localStorage.setItem('brainrot-user', JSON.stringify(safeUser));
        setUser(safeUser);
      }
    }
  }, [usersDB, user?.id]);

  useEffect(() => {
    // Comprobar si existe una sesión guardada en localStorage
    const checkSavedSession = () => {
      try {
        const savedUser = localStorage.getItem('brainrot-user');
        if (savedUser) {
          const parsedUser = JSON.parse(savedUser);
          
          // Asegurarse de que los arrays existan
          if (!Array.isArray(parsedUser.createdCharacters)) {
            parsedUser.createdCharacters = [];
          }
          
          if (!Array.isArray(parsedUser.votedCharacters)) {
            parsedUser.votedCharacters = [];
          }
          
          setUser(parsedUser);
          
          // Sincronizar con la base de datos de usuarios
          setUsersDB(prev => {
            const userIndex = prev.findIndex(u => u.id === parsedUser.id);
            if (userIndex >= 0) {
              // Actualizar usuario existente
              const updatedUsers = [...prev];
              updatedUsers[userIndex] = {
                ...prev[userIndex],
                createdCharacters: parsedUser.createdCharacters,
                votedCharacters: parsedUser.votedCharacters,
                name: parsedUser.name
              };
              return updatedUsers;
            } else {
              // Añadir nuevo usuario a la "base de datos"
              return [...prev, {
                ...parsedUser,
                password: "predeterminada" // No almacenamos contraseñas reales
              }];
            }
          });
        }
      } catch (error) {
        console.error("Error al recuperar sesión:", error);
        // Si hay error, limpiar localStorage corrupto
        localStorage.removeItem('brainrot-user');
      }
      
      setIsLoading(false);
    };
    
    // Cargar usuarios "demo" para la aplicación
    const loadUsers = async () => {
      // Usuarios predefinidos para demostración
      return [
        {
          id: "user1",
          email: "user@example.com",
          password: "password123",
          name: "Usuario Demo",
          createdCharacters: [],
          votedCharacters: []
        },
        {
          id: "user2",
          email: "demo@brainrot.com",
          password: "demo123",
          name: "Demo User",
          createdCharacters: [],
          votedCharacters: []
        }
      ];
    };
    
    loadUsers().then(users => {
      setUsersDB(users);
      checkSavedSession();
    });
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const foundUser = usersDB.find(u => u.email === email && u.password === password);
      
      if (!foundUser) {
        toast.error("Email o contraseña incorrectos");
        setIsLoading(false);
        return false;
      }
      
      const { password: _, ...safeUser } = foundUser;
      // Asegurarse de que los arrays estén inicializados
      safeUser.votedCharacters = safeUser.votedCharacters || [];
      safeUser.createdCharacters = safeUser.createdCharacters || [];
      
      localStorage.setItem('brainrot-user', JSON.stringify(safeUser));
      setUser(safeUser);
      toast.success("Inicio de sesión exitoso");
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
      toast.error("Error al iniciar sesión");
      setIsLoading(false);
      return false;
    }
  };

  const register = async (email: string, password: string, name?: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Verificar si el email ya está registrado
      if (usersDB.some(u => u.email === email)) {
        toast.error("Este email ya está registrado");
        setIsLoading(false);
        return false;
      }
      
      // Crear nuevo usuario
      const newUser: UserProfile = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        password,
        name: name || email.split('@')[0],
        createdCharacters: [],
        votedCharacters: []
      };
      
      // Actualizar la "base de datos"
      setUsersDB(prev => [...prev, newUser]);
      
      // Registrar sesión (sin la contraseña)
      const { password: _, ...safeUser } = newUser;
      localStorage.setItem('brainrot-user', JSON.stringify(safeUser));
      setUser(safeUser);
      
      toast.success("Registro exitoso");
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error de registro:", error);
      toast.error("Error al registrar usuario");
      setIsLoading(false);
      return false;
    }
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Verificar si el email existe
      const userExists = usersDB.some(u => u.email === email);
      
      if (!userExists) {
        toast.error("No existe una cuenta con este email");
        setIsLoading(false);
        return false;
      }
      
      // En una app real, aquí enviaríamos un email con un link para restablecer la contraseña
      // Para esta demo, simplemente mostramos un mensaje
      toast.success("Se ha enviado un enlace a tu email para restablecer la contraseña");
      
      setIsLoading(false);
      return true;
    } catch (error) {
      console.error("Error al restablecer contraseña:", error);
      toast.error("Error al procesar la solicitud");
      setIsLoading(false);
      return false;
    }
  };

  const loginWithGoogle = (credential: string) => {
    setIsLoading(true);
    try {
      // Decode JWT token to get user info
      const payload = JSON.parse(atob(credential.split('.')[1]));
      
      const newUser: UserProfile = {
        id: payload.sub,
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        createdCharacters: [],
        votedCharacters: []
      };
      
      // Verificar si el usuario ya existe, si no, añadirlo a la "base de datos"
      if (!usersDB.some(u => u.id === newUser.id)) {
        setUsersDB(prev => [...prev, newUser]);
      }
      
      localStorage.setItem('brainrot-user', JSON.stringify(newUser));
      setUser(newUser);
      toast.success(`¡Bienvenido, ${payload.name}!`);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error);
      toast.error("Error al iniciar sesión con Google");
      setIsLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('brainrot-user');
    setUser(null);
    toast.success("Desconexión realizada con éxito");
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!user) return;
    
    try {
      // Actualizar usuario en la "base de datos"
      setUsersDB(prev => prev.map(u => 
        u.id === user.id ? { ...u, ...data } : u
      ));
      
      // Actualizar usuario actual
      const updatedUser = { ...user, ...data };
      localStorage.setItem('brainrot-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      toast.success("Perfil actualizado correctamente");
    } catch (error) {
      console.error("Error al actualizar perfil:", error);
      toast.error("Error al actualizar perfil");
    }
  };

  const addVotedCharacter = (characterId: string) => {
    if (!user) return;
    
    try {
      // Verificar si ya está en la lista
      if (user.votedCharacters.includes(characterId)) return;
      
      const updatedVotedCharacters = [...user.votedCharacters, characterId];
      
      // Actualizar usuario en la base de datos
      setUsersDB(prev => prev.map(u => 
        u.id === user.id 
          ? { ...u, votedCharacters: updatedVotedCharacters }
          : u
      ));
      
      // Actualizar usuario actual
      const updatedUser = { ...user, votedCharacters: updatedVotedCharacters };
      localStorage.setItem('brainrot-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error al añadir personaje votado:", error);
      toast.error("Error al registrar el voto");
    }
  };

  const removeVotedCharacter = (characterId: string) => {
    if (!user) return;
    
    try {
      const updatedVotedCharacters = user.votedCharacters.filter(id => id !== characterId);
      
      // Actualizar usuario en la base de datos
      setUsersDB(prev => prev.map(u => 
        u.id === user.id 
          ? { ...u, votedCharacters: updatedVotedCharacters }
          : u
      ));
      
      // Actualizar usuario actual
      const updatedUser = { ...user, votedCharacters: updatedVotedCharacters };
      localStorage.setItem('brainrot-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error al eliminar personaje votado:", error);
      toast.error("Error al eliminar el voto");
    }
  };

  const addCreatedCharacter = (characterId: string) => {
    if (!user) return;
    
    try {
      // Verificar si ya está en la lista
      if (user.createdCharacters.includes(characterId)) return;
      
      const updatedCreatedCharacters = [...user.createdCharacters, characterId];
      
      // Actualizar usuario en la base de datos
      setUsersDB(prev => prev.map(u => 
        u.id === user.id 
          ? { ...u, createdCharacters: updatedCreatedCharacters }
          : u
      ));
      
      // Actualizar usuario actual
      const updatedUser = { ...user, createdCharacters: updatedCreatedCharacters };
      localStorage.setItem('brainrot-user', JSON.stringify(updatedUser));
      setUser(updatedUser);
    } catch (error) {
      console.error("Error al añadir personaje creado:", error);
      toast.error("Error al registrar el personaje creado");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        resetPassword,
        isAuthenticated: !!user,
        updateUserProfile,
        addVotedCharacter,
        removeVotedCharacter,
        addCreatedCharacter
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
