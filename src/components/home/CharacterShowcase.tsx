
import { useCharacters } from '@/contexts/CharacterContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CharacterShowcase = () => {
  const { getTopCharacters } = useCharacters();
  const topCharacters = getTopCharacters(3);

  return (
    <section className="py-16 bg-brainrot-light">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">ESPLORA PERSONAGGI</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Scopri tutti i personaggi dell'universo di Bombardino Coccodrillo. Filtra per tipo o esplora tutti i personaggi epici.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topCharacters.map(character => (
            <Link 
              key={character.id}
              to={`/character/${character.id}`}
              className="block transition-transform hover:scale-105"
            >
              <div className="bg-brainrot-dark rounded-lg overflow-hidden h-full">
                <div className="aspect-square overflow-hidden">
                  <img 
                    src={character.image} 
                    alt={character.name}
                    className="w-full h-full object-cover transform transition-transform hover:scale-110 duration-500"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-brainrot-turquoise mb-2">{character.name}</h3>
                  <div className="mb-3">
                    <span className={`type-badge type-${character.type.toLowerCase()}`}>
                      {character.type}
                    </span>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{character.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs text-gray-500">
                      <span className="text-brainrot-blue font-bold">{character.votes}</span> voti
                    </div>
                    <div className="text-xs text-gray-500">
                      Potenza: <span className="text-yellow-400 font-bold">{character.power}/100</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        <div className="text-center">
          <Button asChild variant="outline" className="border-brainrot-blue text-brainrot-blue hover:bg-brainrot-blue/20">
            <Link to="/characters" className="inline-flex items-center">
              Vedi tutti i personaggi
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CharacterShowcase;
