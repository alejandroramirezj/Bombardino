
import { Character } from '@/types';
import { Button } from '@/components/ui/button';
import { useVote } from '@/contexts/VoteContext';
import { useAuth } from '@/contexts/AuthContext';
import { ThumbsUp, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

interface CharacterDetailProps {
  character: Character;
}

const CharacterDetail = ({ character }: CharacterDetailProps) => {
  const { voteForCharacter, hasVotedFor } = useVote();
  const { isAuthenticated } = useAuth();
  const hasVoted = hasVotedFor(character.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/characters" className="inline-flex items-center text-brainrot-blue hover:underline mb-8">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Torna a tutti i personaggi
      </Link>
      
      <h1 className="text-5xl font-bold text-center mb-4 text-white">{character.name}</h1>
      
      <div className="flex justify-center mb-8">
        <span className={`type-badge type-${character.type.toLowerCase()}`}>
          {character.type}
        </span>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="relative aspect-square bg-brainrot-dark rounded-lg overflow-hidden">
          <img 
            src={character.image} 
            alt={character.name} 
            className="w-full h-full object-contain"
            loading="lazy"
          />
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            Clicca sull'immagine per attivare il potere
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-brainrot-light rounded-lg p-6">
            <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Biografia</h2>
            <p className="text-gray-300">{character.biography || character.description}</p>
          </div>
          
          {character.abilities && character.abilities.length > 0 && (
            <div className="bg-brainrot-light rounded-lg p-6">
              <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Abilità</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {character.abilities.map((ability, index) => (
                  <div key={index} className="flex items-center bg-brainrot-dark p-3 rounded">
                    <div className="w-2 h-2 bg-brainrot-blue rounded-full mr-2"></div>
                    <span className="text-sm">{ability}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {character.phrase && (
            <div className="bg-brainrot-light rounded-lg p-6">
              <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Frase caratteristica</h2>
              <blockquote className="border-l-4 border-brainrot-blue pl-4 py-2 italic text-gray-300">
                "{character.phrase}"
              </blockquote>
            </div>
          )}
          
          {character.appearances && character.appearances.length > 0 && (
            <div className="bg-brainrot-light rounded-lg p-6">
              <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Apparizioni notevoli</h2>
              <ul className="list-inside space-y-2">
                {character.appearances.map((appearance, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-brainrot-blue mr-2">■</span>
                    <span className="text-gray-300">{appearance}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-brainrot-light rounded-lg p-6">
          <h2 className="text-xl font-bold text-brainrot-turquoise mb-6">Statistiche di base</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-gray-400">Potere</span>
                <span className="font-bold text-yellow-400">{character.power}/100</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2.5">
                <div 
                  className="h-2.5 rounded-full bg-gradient-to-r from-yellow-500 to-red-500" 
                  style={{ width: `${character.power}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-brainrot-light rounded-lg p-6">
          <h2 className="text-xl font-bold text-brainrot-turquoise mb-6">Relazioni</h2>
          
          <div className="mb-6">
            <h3 className="text-green-500 text-sm font-semibold mb-2">Alleati</h3>
            <div className="flex flex-wrap gap-2">
              {character.allies.map((ally, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-green-900/30 text-green-400 text-xs rounded-full"
                >
                  {ally}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-red-500 text-sm font-semibold mb-2">Rivali</h3>
            <div className="flex flex-wrap gap-2">
              {character.rivals.map((rival, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-red-900/30 text-red-400 text-xs rounded-full"
                >
                  {rival}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-center">
        <Button
          size="lg"
          variant={hasVoted ? "secondary" : "default"}
          onClick={() => voteForCharacter(character.id)}
          disabled={!isAuthenticated || hasVoted}
          className={hasVoted ? "bg-gray-700 text-gray-300" : "bg-brainrot-blue hover:bg-brainrot-blue/90"}
        >
          <ThumbsUp className="h-5 w-5 mr-2" />
          {hasVoted ? "Hai già votato" : "Vota per questo personaggio"}
        </Button>
      </div>
    </div>
  );
};

export default CharacterDetail;
