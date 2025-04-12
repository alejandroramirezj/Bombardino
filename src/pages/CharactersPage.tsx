import { useState, useEffect } from 'react';
import { useCharacters } from '@/contexts/CharacterContext';
import CharacterGrid from '@/components/characters/CharacterGrid';
import CharacterFilters from '@/components/characters/CharacterFilters';
import { Character } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';

const CharactersPage = () => {
  const { characters, loading } = useCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    search: '',
    sortBy: 'name'
  });

  useEffect(() => {
    if (loading) return;
    
    let results = [...characters];
    
    // Filtrar por tipo
    if (filters.type !== 'all') {
      results = results.filter(character => 
        character.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    // Filtrar por búsqueda
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      results = results.filter(character => 
        character.name.toLowerCase().includes(searchTerm) || 
        character.description?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Ordenar
    results.sort((a, b) => {
      switch(filters.sortBy) {
        case 'votes':
          return (b.votes || 0) - (a.votes || 0);
        case 'power':
          return (b.power || 0) - (a.power || 0);
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    setFilteredCharacters(results);
  }, [characters, filters, loading]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <>
      <Helmet>
        <title>Personajes | Universo Bombardino</title>
        <meta name="description" content="Explora todos los personajes del universo Bombardino. Descubre héroes, villanos y aliados con sus historias y habilidades." />
      </Helmet>
      
      <div className="container mx-auto py-12 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Personajes <span className="text-brainrot-turquoise">Bombardino</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explora todos los personajes del universo Bombardino. Descubre sus historias, 
            habilidades y relaciones con otros personajes.
          </p>
        </div>
        
        <CharacterFilters 
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        
        {loading ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <LoadingSpinner size="lg" />
          </div>
        ) : (
          filteredCharacters.length > 0 ? (
            <CharacterGrid characters={filteredCharacters} />
          ) : (
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-white mb-2">No se encontraron personajes</h3>
              <p className="text-gray-400">
                No hay personajes que coincidan con los criterios de búsqueda.
                Intenta con otros filtros.
              </p>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default CharactersPage;
