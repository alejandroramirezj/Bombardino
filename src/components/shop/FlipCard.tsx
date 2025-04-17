import { useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types';

interface FlipCardProps {
  character: Character;
  onClick?: () => void;
}

const FlipCard = ({ character, onClick }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
  };

  return (
    <div 
      className="w-[300px] h-[420px] perspective-1000 cursor-pointer mx-auto relative"
      onClick={handleClick}
    >
      <motion.div
        className="relative w-full h-full preserve-3d transition-all duration-500"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Cara frontal */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border-4 border-brainrot-turquoise bg-brainrot-dark">
          <img 
            src="/images/Bombardino-card-front.webp"
            alt={`Front of ${character.name} card`}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Cara trasera */}
        <div className="absolute w-full h-full backface-hidden rounded-xl overflow-hidden shadow-xl border-4 border-brainrot-blue bg-brainrot-dark rotateY-180">
          <img 
            src="/images/Bombardino-card-back.webp"
            alt={`Back of ${character.name} card`}
            className="w-full h-full object-cover object-center"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default FlipCard; 