import { useState } from 'react';
import CharacterCard from './CharacterCard';
import { Character, CharacterType } from '@/types';

interface CharacterGridProps {
  characters: Character[];
}

const CharacterGrid = ({ characters }: CharacterGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {characters.map((character, index) => (
        <CharacterCard 
          key={character.id} 
          character={character} 
          index={index}
        />
      ))}
    </div>
  );
};

export default CharacterGrid;
