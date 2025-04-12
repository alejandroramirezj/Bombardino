
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';
import { useCharacters } from './CharacterContext';

interface VoteContextType {
  voteForCharacter: (characterId: string) => void;
  hasVotedFor: (characterId: string) => boolean;
  userVotes: string[];
}

const VoteContext = createContext<VoteContextType | undefined>(undefined);

export const VoteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const { updateCharacterVotes } = useCharacters();
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
    
    // Update character votes using the context method
    updateCharacterVotes(characterId, 1);
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
