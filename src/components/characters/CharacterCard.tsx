import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Character } from '@/types';
import { Badge } from '@/components/ui/badge';

interface CharacterCardProps {
  character: Character;
  index?: number;
}

const CharacterCard = ({ character, index = 0 }: CharacterCardProps) => {
  const characterSlug = character.name.toLowerCase().replace(/\s+/g, '-');
  const [imageError, setImageError] = useState(false);
  
  const getImagePath = () => {
    // Si la imagen es una URL externa, usarla directamente
    if (character.image.startsWith('http')) {
      return character.image;
    }
    
    // Si la imagen ya empieza con /images/, añadir el prefijo base
    if (character.image.startsWith('/images/')) {
      return `${character.image.substring(1)}`;
    }
    
    // Si la imagen es un nombre de archivo, construir la ruta en /images/
    const fileName = character.name.replace(/\s+/g, '%20');
    return `images/${fileName}.webp`;
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-brainrot-light rounded-lg overflow-hidden shadow-lg hover:shadow-brainrot-blue/20 transition-all duration-300"
    >
      <Link to={`/personajes/${characterSlug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageError ? `placeholder.svg` : getImagePath()}
            alt={character.name}
            className="w-full h-full object-contain object-center bg-brainrot-darker transition-transform duration-500 hover:scale-105"
            onError={() => setImageError(true)}
          />
          <div className="absolute top-2 right-2">
            <Badge variant="outline" className="bg-brainrot-dark/80 text-brainrot-turquoise border-brainrot-turquoise">
              {character.type}
            </Badge>
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">{character.name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{character.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="text-brainrot-turquoise text-sm font-medium">
              {character.voteCount || 0} votos
            </span>
            <span className="text-gray-400 text-sm hover:text-brainrot-blue transition-colors">
              Ver más →
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CharacterCard;
