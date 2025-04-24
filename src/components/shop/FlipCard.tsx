import { useState } from 'react';
import { motion } from 'framer-motion';
import { Character } from '@/types';
import { RotateCcw } from 'lucide-react';

interface FlipCardProps {
  character: Character;
  onClick?: () => void;
}

const FlipCard = ({ character, onClick }: FlipCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
    if (onClick) onClick();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="w-[300px] h-[420px] perspective-1000 cursor-pointer mx-auto relative"
      onClick={handleClick}
      onHoverStart={() => setShowHint(true)}
      onHoverEnd={() => setShowHint(false)}
    >
      <motion.div 
        className="absolute -top-3 -right-3 z-10 p-1 bg-brainrot-blue/80 rounded-full shadow-lg"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={showHint && !isFlipped ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
        transition={{ duration: 0.2 }}
      >
        <RotateCcw className="w-4 h-4 text-white" />
      </motion.div>
      
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Cara frontal */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-brainrot-turquoise bg-brainrot-dark"
          style={{ backfaceVisibility: "hidden" }}
        >
          <img 
            src="/images/Bombardino-card-front.webp"
            alt={`Front of ${character.name} card`}
            className="w-full h-full object-cover object-center"
            width={300}
            height={420}
            loading="lazy"
          />
        </div>
        
        {/* Cara trasera */}
        <div 
          className="absolute w-full h-full rounded-xl overflow-hidden shadow-2xl border-4 border-brainrot-blue bg-brainrot-dark"
          style={{ 
            backfaceVisibility: "hidden", 
            transform: "rotateY(180deg)"
          }}
        >
          <img 
            src="/images/Bombardino-card-back.webp"
            alt={`Back of ${character.name} card`}
            className="w-full h-full object-cover object-center"
            width={300}
            height={420}
            loading="lazy"
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FlipCard; 