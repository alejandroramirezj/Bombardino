
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character, CharacterType } from '../types';
import initialCharacters from '../data/characters';

interface CharacterContextType {
  characters: Character[];
  getCharacterById: (id: string) => Character | undefined;
  getCharactersByType: (type: CharacterType | 'Tutti') => Character[];
  getTopCharacters: (limit?: number) => Character[];
  addCharacter: (character: Omit<Character, 'id' | 'votes'>) => void;
  updateCharacterVotes: (characterId: string, increment: number) => void;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [characters, setCharacters] = useState<Character[]>([]);

  useEffect(() => {
    const storedCharacters = localStorage.getItem('brainrot-characters');
    if (storedCharacters) {
      setCharacters(JSON.parse(storedCharacters));
    } else {
      // Initialize with default characters
      setCharacters(initialCharacters);
      localStorage.setItem('brainrot-characters', JSON.stringify(initialCharacters));
    }
  }, []);

  const getCharacterById = (id: string): Character | undefined => {
    return characters.find(char => char.id === id);
  };

  const getCharactersByType = (type: CharacterType | 'Tutti'): Character[] => {
    if (type === 'Tutti') {
      return characters;
    }
    return characters.filter(char => char.type === type);
  };

  const getTopCharacters = (limit = 10): Character[] => {
    return [...characters]
      .sort((a, b) => b.power - a.power || b.votes - a.votes)
      .slice(0, limit);
  };

  const addCharacter = (character: Omit<Character, 'id' | 'votes'>) => {
    const newCharacter: Character = {
      ...character,
      id: Math.random().toString(36).substring(2, 9),
      votes: 0
    };
    
    const updatedCharacters = [...characters, newCharacter];
    setCharacters(updatedCharacters);
    localStorage.setItem('brainrot-characters', JSON.stringify(updatedCharacters));
  };

  const updateCharacterVotes = (characterId: string, increment: number) => {
    const updatedCharacters = characters.map(char => {
      if (char.id === characterId) {
        return { ...char, votes: char.votes + increment };
      }
      return char;
    });
    
    setCharacters(updatedCharacters);
    localStorage.setItem('brainrot-characters', JSON.stringify(updatedCharacters));
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        getCharacterById,
        getCharactersByType,
        getTopCharacters,
        addCharacter,
        updateCharacterVotes
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
