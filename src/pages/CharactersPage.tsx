
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import CharacterGrid from '@/components/characters/CharacterGrid';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const CharactersPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">ESPLORA PERSONAGGI</h1>
            <p className="text-gray-400">
              Scopri tutti i personaggi dell'universo di Bombardino Coccodrillo. Filtra per tipo o esplora tutti i personaggi epici.
            </p>
          </div>
          
          {isAuthenticated && (
            <Button asChild className="bg-brainrot-blue hover:bg-brainrot-blue/90 whitespace-nowrap">
              <Link to="/characters/create" className="inline-flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Crea personaggio
              </Link>
            </Button>
          )}
        </div>
      </div>
      
      <CharacterGrid />
    </div>
  );
};

export default CharactersPage;
