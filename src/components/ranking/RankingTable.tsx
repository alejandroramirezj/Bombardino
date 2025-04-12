import { useCharacters } from '@/contexts/CharacterContext';
import { Link } from 'react-router-dom';

const RankingTable = () => {
  const { getTopCharacters } = useCharacters();
  const topCharacters = getTopCharacters(10);

  const getPowerBarColor = (power: number) => {
    if (power >= 90) return 'power-bar-fill-90-100';
    if (power >= 80) return 'power-bar-fill-80-90';
    if (power >= 70) return 'power-bar-fill-70-80';
    return 'power-bar-fill-0-70';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-white">
        <thead className="text-xs uppercase bg-brainrot-darker">
          <tr>
            <th className="p-4">#</th>
            <th className="p-4 text-left">Nome</th>
            <th className="p-4">Tipo</th>
            <th className="p-4">Potenza</th>
            <th className="p-4">Voti</th>
          </tr>
        </thead>
        
        <tbody>
          {topCharacters.map((character, index) => (
            <tr 
              key={character.id} 
              className="border-b border-gray-800 hover:bg-brainrot-light/50 transition-colors"
            >
              <td className="p-4 font-bold text-gray-400">{index + 1}</td>
              <td className="p-4">
                <Link to={`/personajes/${character.name.toLowerCase().replace(/\s+/g, '-')}`} className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-brainrot-darker border border-brainrot-light p-0.5">
                    <img 
                      src={
                        character.image.startsWith('http') 
                          ? character.image 
                          : character.image.startsWith('/') 
                            ? `${import.meta.env.BASE_URL || '/Bombardino'}${character.image}` 
                            : `${import.meta.env.BASE_URL || '/Bombardino'}/images/${character.name.replace(/\s+/g, '%20')}.webp`
                      }
                      alt={character.name} 
                      className="h-full w-full object-contain bg-brainrot-darker"
                      loading="lazy"
                      onError={(e) => { 
                        (e.target as HTMLImageElement).src = `${import.meta.env.BASE_URL || '/Bombardino'}/placeholder.svg`;
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
                  <div className="w-32 bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${getPowerBarColor(character.power)}`} 
                      style={{ width: `${character.power}%` }}
                    ></div>
                  </div>
                  <span className="font-bold text-yellow-400">{character.power}</span>
                </div>
              </td>
              <td className="p-4">
                <span className="font-bold text-brainrot-blue">{character.votes}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RankingTable;
