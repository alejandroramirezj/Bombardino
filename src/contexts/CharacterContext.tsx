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
  const [characters, setCharacters] = useState<Character[]>(initialCharacters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, addVotedCharacter, removeVotedCharacter, addCreatedCharacter } = useAuth();

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

  const addCharacter = (character: Omit<Character, 'id' | 'votes' | 'voteCount'> & { id?: string, votes?: string[], voteCount?: number }) => {
    // Crear un personaje completo con valores por defecto para los campos opcionales
    const newCharacter: Character = {
      id: character.id || crypto.randomUUID(),
      name: character.name,
      type: character.type,
      power: character.power,
      description: character.description,
      image: character.image,
      allies: character.allies || [],
      rivals: character.rivals || [],
      votes: character.votes || [],
      voteCount: character.voteCount || 0,
      phrase: character.phrase,
      appearances: character.appearances,
      abilities: character.abilities,
      biography: character.biography
    };

    setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
    
    // Registrar el personaje creado en el perfil del usuario
    if (user) {
      addCreatedCharacter(newCharacter.id);
    }
    
    toast.success('¡Personaje creado con éxito!');
  };

  const updateCharacter = (character: Character) => {
    setCharacters(prevCharacters =>
      prevCharacters.map(char =>
        char.id === character.id ? character : char
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
      const hasVoted = character.votes?.includes(userId) || false;

      const updatedCharacters = [...characters];
      if (hasVoted) {
        // Quitar voto
        updatedCharacters[characterIndex] = {
          ...character,
          votes: character.votes.filter(id => id !== userId),
          voteCount: character.voteCount - 1
        };
        
        // Actualizar perfil del usuario
        removeVotedCharacter(characterId);
        
        toast.success('Voto eliminado');
      } else {
        // Añadir voto
        updatedCharacters[characterIndex] = {
          ...character,
          votes: [...character.votes, userId],
          voteCount: character.voteCount + 1
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
    return character?.votes?.includes(userId) || false;
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
