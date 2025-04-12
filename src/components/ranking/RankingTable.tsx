
import { useCharacters } from '@/contexts/CharacterContext';
import { Link } from 'react-router-dom';

const RankingTable = () => {
  const { getTopCharacters } = useCharacters();
  const topCharacters = getTopCharacters();

  const getPowerBarColor = (power: number) => {
    if (power >= 90) return 'bg-gradient-to-r from-red-600 to-red-400';
    if (power >= 80) return 'bg-gradient-to-r from-yellow-600 to-yellow-400';
    if (power >= 70) return 'bg-gradient-to-r from-green-600 to-green-400';
    return 'bg-gradient-to-r from-blue-600 to-blue-400';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full bg-brainrot-darker rounded-lg overflow-hidden">
        <thead>
          <tr className="bg-brainrot-light text-left">
            <th className="p-4 text-brainrot-turquoise">#</th>
            <th className="p-4 text-brainrot-turquoise">Character</th>
            <th className="p-4 text-brainrot-turquoise">Type</th>
            <th className="p-4 text-brainrot-turquoise">Power</th>
            <th className="p-4 text-brainrot-turquoise">Votes</th>
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
                <Link to={`/character/${character.id}`} className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src={character.image} 
                      alt={character.name} 
                      className="h-full w-full object-cover"
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
