import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacters } from '@/contexts/CharacterContext';
import CharacterDetail from '@/components/characters/CharacterDetail';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { AlertTriangle } from 'lucide-react';

const CharacterDetailPage = () => {
  const { characterSlug } = useParams();
  const navigate = useNavigate();
  const { characters, loading } = useCharacters();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!loading && (!characterSlug || (characters.length > 0 && !characters.some(char => char.name.toLowerCase().replace(/\s+/g, '-') === characterSlug)))) {
      setError(true);
      // Damos un momento para que el usuario vea el error antes de redireccionar
      const timeout = setTimeout(() => {
        navigate('/personajes');
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [characterSlug, characters, navigate, loading]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] bg-brainrot-darker">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] bg-brainrot-darker text-white px-4 text-center">
        <AlertTriangle className="w-16 h-16 text-yellow-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Personaje no encontrado</h1>
        <p className="text-gray-400 mb-4">El personaje que buscas no existe o ha sido eliminado.</p>
        <p className="text-sm text-gray-500">Redirigiendo a la página de personajes...</p>
      </div>
    );
  }

  const character = characters.find(char => char.name.toLowerCase().replace(/\s+/g, '-') === characterSlug);

  if (!character) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-80px)] bg-brainrot-darker text-white px-4 text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-gray-400">Cargando personaje...</p>
      </div>
    );
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
      <div className="min-h-screen bg-brainrot-darker">
        <CharacterDetail character={character} />
      </div>
    </>
  );
};

export default CharacterDetailPage;
