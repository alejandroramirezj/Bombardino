import React from 'react';
import { motion } from 'framer-motion';

interface FloatingEmojisProps {
  emojis?: string[];
  count?: number;
}

// Función para generar un número aleatorio en un rango
const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

const FloatingEmojis: React.FC<FloatingEmojisProps> = ({ 
  emojis = ['🐊', '✈️', '💥', '💣'], // Emojis por defecto
  count = 15 // Número de emojis a mostrar
}) => {

  const emojiElements = Array.from({ length: count }).map((_, i) => {
    const emoji = emojis[i % emojis.length];
    const isExplosion = emoji === '💥' || emoji === '💣';
    const size = isExplosion ? randomInRange(25, 45) : randomInRange(20, 40);
    const duration = randomInRange(5, 15);
    const delay = randomInRange(0, 5);

    // Animación base de flotación
    const floatAnimation = {
      y: [randomInRange(-10, 10), randomInRange(-10, 10)],
      x: [randomInRange(-10, 10), randomInRange(-10, 10)],
      rotate: [randomInRange(-20, 20), randomInRange(-20, 20)],
      transition: {
        duration: duration,
        delay: delay,
        repeat: Infinity,
        repeatType: 'mirror' as const,
        ease: 'easeInOut' as const,
      }
    };
    
    // Animación específica para explosiones (aparecer/desaparecer)
    const explosionAnimation = {
      scale: [0.5, 1.2, 0],
      opacity: [0, 1, 0],
      rotate: [0, randomInRange(-90, 90), randomInRange(180, 360)],
      transition: {
        duration: randomInRange(0.8, 1.5),
        delay: randomInRange(0, 8),
        repeat: Infinity,
        repeatDelay: randomInRange(3, 8), // Tiempo antes de repetir la explosión
        ease: "easeOut" as const,
      }
    };

    return (
      <motion.span
        key={i}
        className="absolute will-change-transform" // will-change para optimización
        style={{
          left: `${randomInRange(5, 95)}%`,
          top: `${randomInRange(5, 95)}%`,
          fontSize: `${size}px`,
          zIndex: 1, // Detrás del contenido principal
        }}
        animate={isExplosion ? explosionAnimation : floatAnimation}
      >
        {emoji}
      </motion.span>
    );
  });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {emojiElements}
    </div>
  );
};

export default FloatingEmojis; 