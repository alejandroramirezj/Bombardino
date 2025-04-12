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
    if (isAuthenticated) {
      voteForCharacter(character.id);
    }
  };

  return (
    <div className="bg-brainrot-light rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
      <div className="h-64 overflow-hidden bg-brainrot-darker border border-brainrot-light p-1 rounded-lg">
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
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{character.name}</h3>
          <span className={`type-badge type-${character.type.toLowerCase()}`}>
            {character.type}
          </span>
        </div>
        <p className="text-gray-400 mb-4 line-clamp-3">{character.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-sm text-brainrot-blue">
            <span className="font-bold">{character.votes}</span> voti
          </div>
          <Link 
            to={`/characters/${character.id}`}
            className="text-brainrot-blue hover:underline font-medium"
          >
            Dettagli
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
