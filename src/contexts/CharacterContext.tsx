import React, { createContext, useContext, useState, useEffect } from 'react';
import initialCharacters from '../data/characters';
import { toast } from 'sonner';
import { Character, CharacterType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

export interface CharacterContextType {
  characters: Character[];
  loading: boolean;
  error: string | null;
  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
  deleteCharacter: (id: string) => void;
  getTopCharacters: (limit: number) => Character[];
  getCharacterById: (id: string) => Character | undefined;
  getRandomCharacters: (limit: number) => Character[];
  voteForCharacter: (characterId: string) => void;
  hasUserVotedFor: (characterId: string, userId: string) => boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Asegurarnos de que los personajes iniciales tengan la estructura correcta
  const normalizedInitialCharacters = initialCharacters.map(char => ({
    ...char,
    votes: Array.isArray(char.votes) ? char.votes : [],
    voteCount: typeof char.voteCount === 'number' ? char.voteCount : 0
  }));

  // Cargar personajes guardados desde localStorage
  const loadSavedCharacters = () => {
    try {
      const savedCharacters = localStorage.getItem('brainrot-characters');
      if (savedCharacters) {
        const parsedCharacters = JSON.parse(savedCharacters);
        // Combinar personajes iniciales con los guardados, evitando duplicados por ID
        const combinedCharacters = [...normalizedInitialCharacters];
        
        parsedCharacters.forEach((savedChar: Character) => {
          const existingIndex = combinedCharacters.findIndex(c => c.id === savedChar.id);
          if (existingIndex >= 0) {
            // Actualizar personaje existente
            combinedCharacters[existingIndex] = savedChar;
          } else {
            // Añadir nuevo personaje
            combinedCharacters.push(savedChar);
          }
        });
        
        return combinedCharacters;
      }
    } catch (error) {
      console.error("Error al cargar personajes guardados:", error);
    }
    return normalizedInitialCharacters;
  };

  const [characters, setCharacters] = useState<Character[]>(loadSavedCharacters());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, addVotedCharacter, removeVotedCharacter, addCreatedCharacter } = useAuth();

  // Guardar personajes en localStorage cuando cambien
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('brainrot-characters', JSON.stringify(characters));
    }
  }, [characters, loading]);

  useEffect(() => {
    // Eliminamos la carga artificial para respuesta inmediata
    setLoading(false);
  }, []);

  const getCharacterById = (id: string): Character | undefined => {
    return characters.find(character => character.id === id);
  };

  const getCharactersByType = (type: CharacterType | 'all'): Character[] => {
    if (type === 'all') {
      return characters;
    }
    return characters.filter(character => character.type === type);
  };

  const getTopCharacters = (limit: number) => {
    return [...characters]
      .sort((a, b) => b.voteCount - a.voteCount)
      .slice(0, limit);
  };

  const getRandomCharacters = (limit: number) => {
    return [...characters]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const addCharacter = (character: Omit<Character, 'id' | 'votes' | 'voteCount'> & { id?: string }) => {
    const newCharacter: Character = {
      id: character.id || crypto.randomUUID(),
      name: character.name,
      type: character.type,
      power: character.power,
      description: character.description,
      image: character.image,
      allies: character.allies || [],
      rivals: character.rivals || [],
      votes: [],
      voteCount: 0,
      phrase: character.phrase,
      appearances: character.appearances || [],
      abilities: character.abilities || [],
      biography: character.biography || ''
    };

    setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
    
    // Registrar el personaje creado en el perfil del usuario
    if (user) {
      addCreatedCharacter(newCharacter.id);
    }
    
    toast.success('¡Personaje creado con éxito!');
  };

  const updateCharacter = (character: Character) => {
    // Asegurarnos de que los votos sean siempre un array
    const updatedCharacter = {
      ...character,
      votes: Array.isArray(character.votes) ? character.votes : [],
      voteCount: typeof character.voteCount === 'number' ? character.voteCount : 0
    };

    setCharacters(prevCharacters =>
      prevCharacters.map(char =>
        char.id === character.id ? updatedCharacter : char
      )
    );
    toast.success('¡Personaje actualizado con éxito!');
  };

  const deleteCharacter = (id: string) => {
    setCharacters(prevCharacters => 
      prevCharacters.filter(char => char.id !== id)
    );
    toast.success('Personaje eliminado con éxito');
  };

  const voteForCharacter = async (characterId: string) => {
    try {
      if (!user) {
        toast.error('Debes iniciar sesión para votar');
        return;
      }

      const userId = user.id;
      const characterIndex = characters.findIndex(char => char.id === characterId);
      
      if (characterIndex === -1) {
        toast.error('Personaje no encontrado');
        return;
      }

      const character = characters[characterIndex];
      const votes = Array.isArray(character.votes) ? character.votes : [];
      const hasVoted = votes.includes(userId);

      const updatedCharacters = [...characters];
      if (hasVoted) {
        // Quitar voto
        updatedCharacters[characterIndex] = {
          ...character,
          votes: votes.filter(id => id !== userId),
          voteCount: Math.max(0, character.voteCount - 1)
        };
        
        // Actualizar perfil del usuario
        removeVotedCharacter(characterId);
        
        toast.success('Voto eliminado');
      } else {
        // Añadir voto
        updatedCharacters[characterIndex] = {
          ...character,
          votes: [...votes, userId],
          voteCount: (character.voteCount || 0) + 1
        };
        
        // Actualizar perfil del usuario
        addVotedCharacter(characterId);
        
        toast.success('¡Voto registrado!');
      }
      
      setCharacters(updatedCharacters);
      
    } catch (error) {
      console.error('Error al votar:', error);
      toast.error('Error al procesar el voto');
    }
  };

  const hasUserVotedFor = (characterId: string, userId: string) => {
    const character = characters.find(char => char.id === characterId);
    if (!character) return false;
    const votes = Array.isArray(character.votes) ? character.votes : [];
    return votes.includes(userId);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        loading,
        error,
        addCharacter,
        updateCharacter,
        deleteCharacter,
        getTopCharacters,
        getCharacterById,
        getRandomCharacters,
        voteForCharacter,
        hasUserVotedFor,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharacterProvider');
  }
  return context;
};
