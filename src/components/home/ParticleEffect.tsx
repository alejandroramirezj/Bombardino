import React from 'react';

// Componente para el efecto de partículas
const ParticleEffect = () => {
  // Determinar dinámicamente en el cliente para evitar mismatch SSR/hidratación
  const [particleCount, setParticleCount] = React.useState(40);
  React.useEffect(() => {
    setParticleCount(window.innerWidth < 768 ? 20 : 40);
  }, []);
  
  const particles = React.useMemo(() => 
    Array.from({ length: particleCount }, (_, i) => (
      <div 
        key={i}
        className="absolute rounded-full bg-brainrot-blue/30 animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 8 + 3}px`,
          height: `${Math.random() * 8 + 3}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 10}s`,
          willChange: 'transform, opacity', // Hint para optimización
        }}
      />
  )), [particleCount]);

  return <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">{particles}</div>;
};

export default ParticleEffect; 