
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Character } from '../types';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

interface VoteContextType {
  voteForCharacter: (characterId: string) => void;
  hasVotedFor: (characterId: string) => boolean;
  userVotes: string[];
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [userVotes, setUserVotes] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const storedVotes = localStorage.getItem(`brainrot-votes-${user.id}`);
      if (storedVotes) {
        setUserVotes(JSON.parse(storedVotes));
      } else {
        setUserVotes([]);
      }
    } else {
      setUserVotes([]);
    }
  }, [user]);

  const voteForCharacter = (characterId: string) => {
    if (!user) {
      toast.error("Devi accedere per votare");
      return;
    }

    if (userVotes.includes(characterId)) {
      toast.error("Hai già votato per questo personaggio");
      return;
    }

    const updatedVotes = [...userVotes, characterId];
    setUserVotes(updatedVotes);
    localStorage.setItem(`brainrot-votes-${user.id}`, JSON.stringify(updatedVotes));
    
    // Update character votes in localStorage
    const characters = JSON.parse(localStorage.getItem('brainrot-characters') || '[]');
    const updatedCharacters = characters.map((char: Character) => {
      if (char.id === characterId) {
        return { ...char, votes: char.votes + 1 };
      }
      return char;
    });
    
    localStorage.setItem('brainrot-characters', JSON.stringify(updatedCharacters));
    toast.success("Voto registrato!");
  };

  const hasVotedFor = (characterId: string) => {
    return userVotes.includes(characterId);
  };

  return (
    <VoteContext.Provider
      value={{
        voteForCharacter,
        hasVotedFor,
        userVotes
      }}
    >
      {children}
    </VoteContext.Provider>
  );
};

export const useVote = () => {
  const context = useContext(VoteContext);
  if (context === undefined) {
    throw new Error('useVote must be used within a VoteProvider');
  }
  return context;
};
