
import { Link } from 'react-router-dom';
import { Character } from '@/types';
import { Button } from '@/components/ui/button';
import { useVote } from '@/contexts/VoteContext';
import { Info, ThumbsUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface CharacterCardProps {
  character: Character;
}

const CharacterCard = ({ character }: CharacterCardProps) => {
  const { voteForCharacter, hasVotedFor } = useVote();
  const { isAuthenticated } = useAuth();
  const hasVoted = hasVotedFor(character.id);

  const getPowerBarColor = (power: number) => {
    if (power >= 90) return 'power-bar-fill-90-100';
    if (power >= 80) return 'power-bar-fill-80-90';
    if (power >= 70) return 'power-bar-fill-70-80';
    return 'power-bar-fill-0-70';
  };

  const handleVote = (e: React.MouseEvent) => {
    e.preventDefault();
    voteForCharacter(character.id);
  };

  return (
    <div className="character-card">
      <div className="relative aspect-square overflow-hidden">
        <img 
          src={character.image} 
          alt={character.name}
          className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
        />
      </div>
      
      <div className="p-4">
        <Link to={`/character/${character.id}`}>
          <h3 className="text-xl font-bold text-brainrot-turquoise mb-1">{character.name}</h3>
        </Link>
        
        <div className="mb-3">
          <span className={`type-badge type-${character.type.toLowerCase()}`}>
            {character.type}
          </span>
        </div>
        
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Potenza:</span>
            <span className="text-xs font-bold text-yellow-400">{character.power}/100</span>
          </div>
          <div className="power-bar">
            <div 
              className={getPowerBarColor(character.power)}
              style={{ width: `${character.power}%` }}
            ></div>
          </div>
        </div>
        
        <p className="text-sm text-gray-300 mb-4 line-clamp-2">{character.description}</p>
        
        <div className="border-t border-gray-700 pt-4 mt-4">
          <div className="flex justify-between items-center">
            <div className="text-brainrot-blue font-bold">
              {character.votes} <span className="text-xs text-gray-400">voti</span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline"
                size="sm"
                asChild
                className="text-brainrot-turquoise border-brainrot-turquoise hover:bg-brainrot-turquoise/20"
              >
                <Link to={`/character/${character.id}`}>
                  <Info className="w-4 h-4 mr-1" />
                  Details
                </Link>
              </Button>
              
              <Button
                variant={hasVoted ? "secondary" : "default"}
                size="sm"
                onClick={handleVote}
                disabled={!isAuthenticated || hasVoted}
                className={hasVoted ? "bg-gray-700 text-gray-300" : "bg-brainrot-blue hover:bg-brainrot-blue/80"}
              >
                <ThumbsUp className="w-4 h-4 mr-1" />
                Vote
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
