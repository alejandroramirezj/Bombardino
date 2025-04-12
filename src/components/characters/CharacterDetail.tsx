import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, AlertCircle, Share2, ChevronLeft } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCharacters } from '@/contexts/CharacterContext';
import { Character } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import ShareModal from '../shared/ShareModal';
import { toast } from 'sonner';

interface CharacterDetailProps {
  character: Character;
}

export default function CharacterDetail({ character }: CharacterDetailProps) {
  const { isAuthenticated, user } = useAuth();
  const { voteForCharacter, hasUserVotedFor } = useCharacters();
  const [showShareModal, setShowShareModal] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      setHasVoted(hasUserVotedFor(character.id, user.id));
    }
  }, [isAuthenticated, user, character.id, hasUserVotedFor]);

  const handleVote = async () => {
    if (!isAuthenticated) {
      toast.error('Debes iniciar sesión para votar');
      return;
    }

    setIsVoting(true);
    await voteForCharacter(character.id);
    setHasVoted(true);
    setIsVoting(false);
    toast.success(`¡Has votado por ${character.name}!`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const getImagePath = () => {
    // Si la imagen es una URL externa, usarla directamente
    if (character.image.startsWith('http')) {
      return character.image;
    }
    
    // Si la imagen ya empieza con /images/, usar directamente
    if (character.image.startsWith('/images/')) {
      return character.image;
    }
    
    // Si la imagen es un nombre de archivo, construir la ruta en /images/
    const fileName = character.name.replace(/\s+/g, '%20');
    return `/images/${fileName}.webp`;
  };

  // Se agrega un efecto para resetear el error de imagen cuando cambia el personaje
  useEffect(() => {
    setImageError(false);
  }, [character.id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          to={`/personajes`}
          className="inline-flex items-center text-gray-400 hover:text-brainrot-turquoise transition-colors"
        >
          <ChevronLeft size={20} />
          <span>Volver a personajes</span>
        </Link>
      </div>
      
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Columna Izquierda - Imagen */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-1"
        >
          <div className="bg-brainrot-light rounded-xl overflow-hidden shadow-xl mb-4">
            <img 
              src={getImagePath()}
              alt={character.name}
              className="w-full h-[400px] object-contain object-center bg-brainrot-darker transition-transform duration-500"
            />
          </div>
          
          <div className="flex gap-2 mb-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className={`rounded-full ${
                      hasVoted 
                        ? 'bg-red-500 text-white hover:bg-red-600' 
                        : 'bg-white bg-opacity-20 hover:bg-opacity-30 text-white'
                    }`}
                    onClick={handleVote}
                    disabled={!isAuthenticated}
                  >
                    <Heart className={`h-5 w-5 ${hasVoted ? 'fill-current' : ''}`} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{hasVoted ? 'Ya has votado' : 'Votar por este personaje'}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 text-white"
                    onClick={() => setShowShareModal(true)}
                  >
                    <Share2 className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Compartir personaje</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          
          {!isAuthenticated && (
            <div className="bg-brainrot-dark p-4 rounded-lg border border-amber-600 flex items-center text-sm mb-4">
              <AlertCircle className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-amber-500">
                <Link to={`/login`} className="underline font-medium hover:text-amber-400">
                  Inicia sesión
                </Link> para votar por este personaje.
              </p>
            </div>
          )}
        </motion.div>
        
        {/* Columna Derecha - Información */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-2"
        >
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <h1 className="text-3xl md:text-4xl font-bold text-white">{character.name}</h1>
            <Badge className="bg-brainrot-blue border-none text-white">{character.type}</Badge>
          </div>
          
          {/* Biografía */}
          <motion.div 
            variants={itemVariants}
            className="bg-brainrot-light p-6 rounded-xl mb-6"
          >
            <h2 className="text-xl font-bold text-white mb-3">Biografía</h2>
            <p className="text-gray-300 leading-relaxed whitespace-pre-line">
              {character.biography || 'No hay información biográfica disponible para este personaje.'}
            </p>
          </motion.div>
          
          {/* Habilidades */}
          {character.abilities && character.abilities.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="bg-brainrot-light p-6 rounded-xl mb-6"
            >
              <h2 className="text-xl font-bold text-white mb-3">Habilidades</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {character.abilities.map((ability, index) => (
                  <li key={index} className="leading-relaxed">
                    {ability}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {/* Apariciones Notables */}
          {character.appearances && character.appearances.length > 0 && (
            <motion.div 
              variants={itemVariants}
              className="bg-brainrot-light p-6 rounded-xl mb-6"
            >
              <h2 className="text-xl font-bold text-white mb-3">Apariciones Notables</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                {character.appearances.map((appearance, index) => (
                  <li key={index} className="leading-relaxed">
                    {appearance}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
          
          {/* Estadísticas */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6"
          >
            <div className="bg-brainrot-light p-4 rounded-xl text-center">
              <p className="text-gray-400 text-sm mb-1 capitalize">Poder</p>
              <p className="text-2xl font-bold text-brainrot-turquoise">{character.power}/10</p>
            </div>
            {/* Puedes agregar más estadísticas fijas aquí */}
          </motion.div>
          
          {/* Relaciones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Aliados */}
            {character.allies && character.allies.length > 0 && (
              <motion.div 
                variants={itemVariants}
                className="bg-brainrot-light p-6 rounded-xl"
              >
                <h2 className="text-xl font-bold text-white mb-3">Aliados</h2>
                <ul className="space-y-2">
                  {character.allies.map((ally, index) => {
                    const allySlug = ally.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <li key={index}>
                        <Link 
                          to={`/personajes/${allySlug}`}
                          className="text-brainrot-turquoise hover:underline"
                        >
                          {ally}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
            
            {/* Rivales */}
            {character.rivals && character.rivals.length > 0 && (
              <motion.div 
                variants={itemVariants}
                className="bg-brainrot-light p-6 rounded-xl"
              >
                <h2 className="text-xl font-bold text-white mb-3">Rivales</h2>
                <ul className="space-y-2">
                  {character.rivals.map((rival, index) => {
                    const rivalSlug = rival.toLowerCase().replace(/\s+/g, '-');
                    return (
                      <li key={index}>
                        <Link 
                          to={`/personajes/${rivalSlug}`}
                          className="text-pink-500 hover:underline"
                        >
                          {rival}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {showShareModal && (
        <ShareModal 
          title={`¡Mira este personaje de Bombardino: ${character.name}!`}
          url={`${window.location.origin}/#/personajes/${character.name.toLowerCase().replace(/\s+/g, '-')}`}
          onClose={() => setShowShareModal(false)}
        />
      )}
    </div>
  );
}
