import { useCharacters } from '@/contexts/CharacterContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight, Trophy } from 'lucide-react';

const RankingSection = () => {
  const { getTopCharacters } = useCharacters();
  const topRankedCharacters = getTopCharacters(5);

  const getPowerBarColor = (power: number) => {
    if (power >= 90) return 'power-bar-fill-90-100';
    if (power >= 80) return 'power-bar-fill-80-90';
    if (power >= 70) return 'power-bar-fill-70-80';
    return 'power-bar-fill-0-70';
  };

  return (
    <section className="py-16 bg-brainrot-darker">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-yellow-400">TOP</span> PERSONAJES
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Los personajes más poderosos del universo Bombardino. Este ranking está basado en su poder y votos.
          </p>
        </div>
        
        <div className="bg-brainrot-dark rounded-lg overflow-hidden mb-10 shadow-lg max-w-4xl mx-auto">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-white">
              <thead className="text-xs uppercase bg-brainrot-darker">
                <tr>
                  <th className="p-4 w-12">#</th>
                  <th className="p-4 text-left">Nombre</th>
                  <th className="p-4 w-28">Tipo</th>
                  <th className="p-4 w-40">Poder</th>
                  <th className="p-4 w-24">Votos</th>
                </tr>
              </thead>
              
              <tbody>
                {topRankedCharacters.map((character, index) => (
                  <tr 
                    key={character.id} 
                    className="border-b border-gray-800 hover:bg-brainrot-light/50 transition-colors"
                  >
                    <td className="p-4 font-bold text-center">
                      {index === 0 ? (
                        <Trophy className="h-5 w-5 text-yellow-400 mx-auto" />
                      ) : index + 1}
                    </td>
                    <td className="p-4">
                      <Link to={`/personajes/${character.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden bg-brainrot-darker border border-brainrot-light p-0.5">
                          <img 
                            src={
                              character.image.startsWith('http') 
                                ? character.image 
                                : character.image.startsWith('/') 
                                  ? character.image
                                  : `/images/${character.name.replace(/\s+/g, '%20')}.webp`
                            }
                            alt={character.name} 
                            className="h-full w-full object-contain bg-brainrot-darker"
                            width="40"
                            height="40"
                            loading="lazy"
                            onError={(e) => { 
                              (e.target as HTMLImageElement).src = `/placeholder.svg`;
                            }}
                          />
                        </div>
                        <span className="text-white hover:text-brainrot-blue transition-colors">
                          {character.name}
                        </span>
                      </Link>
                    </td>
                    <td className="p-4">
                      <span className={`type-badge type-${character.type.toLowerCase()}`}>
                        {character.type}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getPowerBarColor(character.power)}`} 
                            style={{ width: `${character.power}%` }}
                          ></div>
                        </div>
                        <span className="font-bold text-yellow-400">{character.power}</span>
                      </div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="font-bold text-brainrot-blue">{character.votes}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="text-center">
          <Button 
            asChild 
            variant="outline" 
            size="lg"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400/20"
          >
            <Link to="/ranking" className="inline-flex items-center">
              Ver ranking completo
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RankingSection; 