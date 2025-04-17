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
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Cara frontal */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl border-4 border-brainrot-turquoise bg-brainrot-dark"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img 
            src="/images/Bombardino-card-front.webp"
            alt={`Front of ${character.name} card`}
            className="w-full h-full object-cover object-center"
          />
        </div>
        
        {/* Cara trasera */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-xl border-4 border-brainrot-blue bg-brainrot-dark"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)"
          }}
        >
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