import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Character } from '@/types';
import { Badge } from '@/components/ui/badge';
import { Heart, Eye } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  index?: number;
}

const CharacterCard = ({ character, index = 0 }: CharacterCardProps) => {
  const characterSlug = character.name.toLowerCase().replace(/\s+/g, '-');
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
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
  
  // Variantes para animaciones
  const cardVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const imageVariants = {
    hover: {
      scale: 1.08, 
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  const contentVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };
  
  const glowVariants = {
    initial: { opacity: 0 },
    hover: {
      opacity: 0.7,
      transition: {
        duration: 0.5
      }
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="bg-gradient-to-b from-brainrot-light to-brainrot-dark rounded-lg overflow-hidden shadow-lg group relative"
    >
      {/* Efecto de brillo en hover */}
      <motion.div 
        className="absolute inset-0 bg-brainrot-blue/5 rounded-lg" 
        variants={glowVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
      />
      
      <Link to={`/personajes/${characterSlug}`} className="block h-full relative z-10">
        <div className="relative h-52 overflow-hidden">
          {/* Overlay de gradiente en hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-brainrot-darker to-transparent opacity-0 group-hover:opacity-80 transition-opacity duration-300 z-10"></div>
          
          {/* Imagen con animación */}
          <motion.img
            src={imageError ? `placeholder.svg` : getImagePath()}
            alt={character.name}
            className="w-full h-full object-contain object-center bg-brainrot-darker"
            onError={() => setImageError(true)}
            variants={imageVariants}
          />
          
          <div className="absolute top-2 right-2 z-20">
            <Badge 
              variant="outline" 
              className="bg-brainrot-dark/80 text-brainrot-turquoise border-brainrot-turquoise backdrop-blur-sm transform transition-transform group-hover:scale-110"
            >
              {character.type}
            </Badge>
          </div>
          
          {/* Botón de "Ver más" que aparece en hover */}
          <motion.div 
            className="absolute bottom-0 left-0 right-0 flex justify-center pb-2 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-brainrot-blue/80 text-white px-4 py-2 rounded-full backdrop-blur-sm flex items-center gap-2">
              <Eye size={16} />
              <span>Ver detalles</span>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="p-5"
          variants={contentVariants}
        >
          <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-brainrot-turquoise transition-colors duration-300">{character.name}</h3>
          <p className="text-gray-400 text-sm mb-4 line-clamp-3">{character.description}</p>
          
          <div className="flex justify-between items-center">
            <span className="flex items-center text-brainrot-turquoise text-sm font-medium gap-1.5 group-hover:scale-105 transition-transform duration-300">
              <Heart size={14} className="fill-brainrot-turquoise text-brainrot-turquoise animate-pulse" />
              {character.voteCount || 0} votos
            </span>
            <span className="text-gray-400 text-sm group-hover:text-white transition-all duration-300 group-hover:translate-x-1">
              Ver más →
            </span>
          </div>
        </motion.div>
      </Link>
      
      {/* Efecto de borde brillante en hover */}
      <div className="absolute inset-0 rounded-lg border border-transparent group-hover:border-brainrot-blue/50 transition-all duration-300"></div>
    </motion.div>
  );
};

export default CharacterCard;
