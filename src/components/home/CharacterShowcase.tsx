import { useCharacters } from '@/contexts/CharacterContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';

const CharacterShowcase = () => {
  const { getTopCharacters } = useCharacters();
  const topCharacters = getTopCharacters(3);

  return (
    <section className="py-16 bg-brainrot-light">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">ESPLORA PERSONAGGI</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Scopri tutti i personaggi dell'universo di Bombardino Coccodrillo. Filtra per tipo o esplora tutti i personaggi epici.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {topCharacters.map(character => (
            <Card 
              key={character.id}
              className="bg-brainrot-dark border-none overflow-hidden hover:shadow-lg transition-all duration-300"
            >
              <Link to={`/character/${character.id}`}>
                <div className="aspect-square bg-brainrot-darker border border-brainrot-light p-1 rounded-lg overflow-hidden">
                  <img 
                    src={character.image}
                    alt={character.name}
                    width="100%"
                    height="auto"
                    className="object-contain w-full h-full rounded-lg"
                    loading="lazy" 
                    decoding="async"
                  />
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-brainrot-turquoise mb-2">{character.name}</h3>
                  
                  <div className="mb-3">
                    <span className={`type-badge type-${character.type.toLowerCase()}`}>
                      {character.type}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{character.description}</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-brainrot-blue">
                      <span className="font-bold">{character.votes}</span> voti
                    </div>
                    <div className="text-sm">
                      Potenza: <span className="text-yellow-400 font-bold">{character.power}/100</span>
                    </div>
                  </div>
                </div>
              </Link>
            </Card>
          ))}
        </div>
        
        <div className="text-center">
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-brainrot-blue text-brainrot-blue hover:bg-brainrot-blue/20"
          >
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
