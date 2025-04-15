import { useState, useEffect } from 'react';
import { useCharacters } from '@/contexts/CharacterContext';
import CharacterGrid from '@/components/characters/CharacterGrid';
import CharacterFilters from '@/components/characters/CharacterFilters';
import { Character } from '@/types';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const CharactersPage = () => {
  const { characters, loading } = useCharacters();
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([]);
  const [filters, setFilters] = useState({
    type: 'all',
    search: '',
    sortBy: 'name',
    sortOrder: 'popularity' as 'recent' | 'popularity' | 'alphabetical'
  });

  const clearLocalStorage = () => {
    localStorage.removeItem('brainrot-characters');
    toast.success('Cache de personajes limpiado. Recarga la página para ver los cambios.');
  };

  useEffect(() => {
    if (loading) return;
    
    let results = [...characters];
    
    // Debug para detectar personajes duplicados
    console.log('IDs de personajes:', results.map(char => char.id));
    console.log('Nombres de personajes:', results.map(char => char.name));
    
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
    
    // Aplicar el orden de clasificación principal
    switch (filters.sortOrder) {
      case 'recent':
        // Asumir que los personajes más recientes están al final del array original
        results.sort((a, b) => (b.id > a.id ? 1 : -1));
        break;
      case 'popularity':
        results.sort((a, b) => (b.votes?.length || 0) - (a.votes?.length || 0));
        break;
      case 'alphabetical':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }
    
    // Aplicar ordenamiento secundario si es diferente del principal
    if (
      (filters.sortOrder === 'popularity' && filters.sortBy !== 'votes') ||
      (filters.sortOrder === 'alphabetical' && filters.sortBy !== 'name') ||
      (filters.sortOrder === 'recent' && filters.sortBy !== 'recent')
    ) {
    // Ordenar
      switch(filters.sortBy) {
        case 'votes':
          results.sort((a, b) => (b.votes?.length || 0) - (a.votes?.length || 0));
          break;
        case 'power':
          results.sort((a, b) => (b.power || 0) - (a.power || 0));
          break;
        case 'name':
          results.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case 'recent':
          results.sort((a, b) => (b.id > a.id ? 1 : -1));
          break;
      }
    }
    
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
          <div className="mt-4">
            <Button 
              variant="outline"
              onClick={clearLocalStorage}
              className="text-xs text-gray-400 hover:text-white"
            >
              Limpiar caché
            </Button>
          </div>
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
