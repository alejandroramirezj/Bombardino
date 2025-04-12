import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacters } from '@/contexts/CharacterContext';
import CharacterDetail from '@/components/characters/CharacterDetail';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const CharacterDetailPage = () => {
  const { characterSlug } = useParams();
  const navigate = useNavigate();
  const { characters, loading } = useCharacters();

  useEffect(() => {
    if (!characterSlug || (characters.length > 0 && !characters.some(char => char.name.toLowerCase().replace(/\s+/g, '-') === characterSlug))) {
      navigate('/personajes');
    }
  }, [characterSlug, characters, navigate]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  const character = characters.find(char => char.name.toLowerCase().replace(/\s+/g, '-') === characterSlug);

  if (!character) {
    return null;
  }

  return (
    <>
      <Helmet>
        <title>{`${character.name} | Personajes Bombardino`}</title>
        <meta name="description" content={`Conoce todo sobre ${character.name}, ${character.type.toLowerCase()} del universo Bombardino. ${character.description?.substring(0, 150)}...`} />
        <meta property="og:title" content={`${character.name} | Personajes Bombardino`} />
        <meta property="og:description" content={`Conoce todo sobre ${character.name}, ${character.type.toLowerCase()} del universo Bombardino`} />
        <meta property="og:image" content={character.image} />
        <meta property="og:type" content="profile" />
      </Helmet>
      <CharacterDetail character={character} />
    </>
  );
};

export default CharacterDetailPage;
