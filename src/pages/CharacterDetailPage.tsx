
import { useParams, Navigate } from 'react-router-dom';
import { useCharacters } from '@/contexts/CharacterContext';
import CharacterDetail from '@/components/characters/CharacterDetail';

const CharacterDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getCharacterById } = useCharacters();
  
  if (!id) {
    return <Navigate to="/characters" />;
  }
  
  const character = getCharacterById(id);
  
  if (!character) {
    return <Navigate to="/characters" />;
  }
  
  return <CharacterDetail character={character} />;
};

export default CharacterDetailPage;
