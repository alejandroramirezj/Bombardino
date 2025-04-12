
import { useState } from 'react';
import { useCharacters } from '@/contexts/CharacterContext';
import CharacterCard from './CharacterCard';
import { CharacterType } from '@/types';

interface CharacterGridProps {
  filter?: CharacterType | 'Tutti';
}

const CharacterGrid = ({ filter = 'Tutti' }: CharacterGridProps) => {
  const { getCharactersByType } = useCharacters();
  const [selectedType, setSelectedType] = useState<CharacterType | 'Tutti'>(filter);
  
  const characters = getCharactersByType(selectedType);
  
  const typeFilters: Array<CharacterType | 'Tutti'> = [
    'Tutti', 'Anfibio', 'Bagno', 'Tecnologia', 'Ladro', 
    'Sonoro', 'Indonesiano', 'Galattico', 'Musicale', 'Aereo'
  ];

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {typeFilters.map(type => (
          <button
            key={type}
            onClick={() => setSelectedType(type)}
            className={`px-4 py-2 rounded-md text-sm transition-colors ${
              selectedType === type 
                ? 'bg-brainrot-blue text-white' 
                : 'bg-brainrot-light text-gray-300 hover:bg-gray-700'
            }`}
          >
            {type}
          </button>
        ))}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {characters.map(character => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
      
      {characters.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-gray-500 mb-2">Nessun personaggio trovato</h3>
          <p className="text-gray-600">Non ci sono personaggi con questo filtro.</p>
        </div>
      )}
    </div>
  );
};

export default CharacterGrid;
