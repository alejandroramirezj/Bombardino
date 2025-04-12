import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CharacterType } from '@/types';
import { Search, SortAsc, SortDesc } from 'lucide-react';

interface FilterValues {
  type: string;
  search: string;
  sortBy: string;
  sortOrder: 'recent' | 'popularity' | 'alphabetical';
}

interface FiltersProps {
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

const characterTypes: ('all' | CharacterType)[] = [
  'all',
  'Anfibio',
  'Tecnologia',
  'Galattico',
  'Ladro',
  'Sonoro',
  'Indonesiano',
  'Musicale',
  'Aereo',
  'Bagno',
  'Acquatico-Vegetale',
  'Gelatto',
  'Animalico',
  'Fruttoso',
  'Folletto',
  'Musico',
  'Criminale',
  'Fiabosco',
  'Metallo',
  'Buffonazzo'
];

const sortOptions = [
  { value: 'name', label: 'Nombre' },
  { value: 'votes', label: 'Votos' },
  { value: 'power', label: 'Poder' }
];

const CharacterFilters = ({ filters, onFilterChange }: FiltersProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({
      ...filters,
      [name]: value,
    });
  };

  return (
    <div className="mb-8 bg-gray-800 rounded-lg p-6 shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Búsqueda */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-300 mb-2">
            Buscar por nombre
          </label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Nombre o descripción..."
            value={filters.search}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md 
              text-white placeholder-gray-400 focus:ring-2 focus:ring-brainrot-turquoise 
              focus:border-transparent"
          />
        </div>

        {/* Ordenar por */}
        <div>
          <label htmlFor="sortBy" className="block text-sm font-medium text-gray-300 mb-2">
            Ordenar por
          </label>
          <select
            id="sortBy"
            name="sortBy"
            value={filters.sortBy}
            onChange={handleInputChange}
            className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md 
              text-white focus:ring-2 focus:ring-brainrot-turquoise 
              focus:border-transparent"
          >
            <option value="name">Nombre (A-Z)</option>
            <option value="power">Poder (Mayor-Menor)</option>
            <option value="votes">Popularidad (Votos)</option>
            <option value="recent">Más recientes</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default CharacterFilters; 