import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

// Componente de explosión mejorado
const Explosion = ({ x, y }: { x: number; y: number }) => {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ left: x, top: y }}
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
    >
      {/* Destello central */}
      <motion.div
        className="absolute"
        style={{
          left: '-30px',
          top: '-30px',
          width: '60px',
          height: '60px',
          background: '#FF4D4D',
          borderRadius: '50%',
          boxShadow: '0 0 30px #FF0000',
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 4, 1],
          opacity: [1, 0.9, 0],
        }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />

      {/* Onda expansiva roja */}
      <motion.div
        className="absolute"
        style={{
          left: '-75px',
          top: '-75px',
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, #FF6B6B 0%, transparent 70%)',
          transform: 'rotate(45deg)',
        }}
        initial={{ scale: 0, opacity: 1 }}
        animate={{
          scale: [0, 2],
          opacity: [1, 0],
          rotate: [45, 90],
        }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Puntas de la explosión */}
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const distance = 80;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: '0',
              top: '0',
              width: '40px',
              height: '40px',
              background: 'linear-gradient(45deg, #FF4D4D, #FFA500)',
              clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
              transformOrigin: 'center',
            }}
            initial={{ 
              x: 0, 
              y: 0, 
              scale: 0,
              opacity: 1,
              rotate: i * 45,
            }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              scale: [0, 1.5, 0],
              opacity: [1, 1, 0],
              rotate: [i * 45, i * 45 + 90],
            }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        );
      })}

      {/* Partículas de fuego */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const distance = 120;
        return (
          <motion.div
            key={`particle-${i}`}
            className="absolute w-3 h-3 rounded-full"
            style={{
              background: 'radial-gradient(circle, #FFA500, #FF4D4D)',
              boxShadow: '0 0 10px #FF0000, 0 0 20px #FF6B6B',
              left: '0',
              top: '0',
            }}
            initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
            animate={{
              x: Math.cos(angle) * distance,
              y: Math.sin(angle) * distance,
              opacity: 0,
              scale: 0,
            }}
            transition={{ 
              duration: 0.8, 
              ease: "easeOut",
              delay: Math.random() * 0.2,
            }}
          />
        );
      })}
    </motion.div>
  );
};

// Componente para el efecto de partículas
const ParticleEffect = () => {
  const particleCount = window.innerWidth < 768 ? 20 : 40;
  
  const particles = Array.from({ length: particleCount }, (_, i) => (
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
      }}
    />
  ));

  return <div className="absolute inset-0 overflow-hidden z-0">{particles}</div>;
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [explosions, setExplosions] = useState<{id: number; x: number; y: number}[]>([]);
  const [explosionCount, setExplosionCount] = useState(0);

  useEffect(() => {
    setIsLoaded(true);
    const interval = setInterval(() => {
      const x = Math.random() * (window.innerWidth - 200) + 100;
      const y = Math.random() * (window.innerHeight - 200) + 100;
      setExplosions(prev => [...prev, { id: explosionCount, x, y }]);
      setExplosionCount(c => c + 1);
      
      // Sonido de explosión
      const audio = new Audio('/sounds/explosion.mp3');
      audio.volume = 0.3;
      audio.play().catch(() => {}); // Ignorar errores si el navegador bloquea el audio
      
      // Limpiar explosiones antiguas
      setTimeout(() => {
        setExplosions(prev => prev.filter(e => e.id !== explosionCount));
      }, 1200);
    }, 2500);

    return () => clearInterval(interval);
  }, [explosionCount]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1, 
      transition: { 
        duration: 0.5, 
        ease: "easeOut" 
      } 
    }
  };

  return (
    <section className="bg-brainrot-dark py-12 md:py-28 px-4 relative overflow-hidden min-h-[90vh] md:min-h-[80vh] flex items-center">
      {/* Gradiente de fondo mejorado */}
      <div className="absolute inset-0 bg-gradient-radial from-brainrot-blue/20 via-brainrot-dark to-brainrot-darker z-0"></div>
      
      {/* Efecto de partículas */}
      <ParticleEffect />
      
      {/* Explosiones */}
      <AnimatePresence>
        {explosions.map(({ id, x, y }) => (
          <Explosion key={id} x={x} y={y} />
        ))}
      </AnimatePresence>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.div
            className="relative inline-block mb-8"
            variants={itemVariants}
          >
            <motion.h1 
              className="text-5xl sm:text-7xl md:text-9xl font-black mb-2 md:mb-4 tracking-tighter"
              style={{
                WebkitTextStroke: '2px rgb(var(--brainrot-blue))',
                color: 'transparent',
                textShadow: '0 0 20px rgba(var(--brainrot-blue), 0.5)',
              }}
            >
              BOMBARDINO
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="flex flex-col items-center gap-2 mb-6"
            >
              <span className="text-xl md:text-2xl font-light text-brainrot-turquoise/90">
                El meme italiano más épico 🇮🇹
              </span>
              <div className="flex items-center gap-2 text-sm md:text-base text-gray-400 font-mono">
                <span className="px-2 py-1 rounded-md bg-brainrot-darker/50 border border-brainrot-blue/20">
                  100+ personajes
                </span>
                <span className="px-2 py-1 rounded-md bg-brainrot-darker/50 border border-brainrot-blue/20">
                  Batallas épicas
                </span>
                <span className="px-2 py-1 rounded-md bg-brainrot-darker/50 border border-brainrot-blue/20">
                  Ranking en vivo
                </span>
              </div>
              <p className="mt-4 text-base md:text-lg text-gray-300 max-w-xl mx-auto px-4">
                Descubre el universo de <span className="text-brainrot-turquoise font-semibold">Bombardino</span> y sus personajes. 
                Vota, crea y participa en la comunidad más explosiva del internet italiano 💥
              </p>
            </motion.div>
            <div className="absolute -inset-4 bg-gradient-to-r from-brainrot-blue/0 via-brainrot-blue/30 to-brainrot-blue/0 blur-3xl -z-10"></div>
          </motion.div>
          
          <motion.div 
            className="mb-12 relative group"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-brainrot-darker/50 backdrop-blur-xl border-2 border-brainrot-blue/50 p-2 rounded-2xl max-w-xl mx-auto overflow-hidden shadow-2xl shadow-brainrot-blue/20">
              <div className="absolute inset-0 bg-gradient-to-r from-brainrot-blue/0 via-brainrot-blue/30 to-brainrot-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full"></div>
              
              <motion.img 
                src="/images/Bombardino-Crocodillo.webp"
                alt="Bombardino coccodrillo"
                className="w-full h-auto object-contain rounded-xl mx-auto transform transition-transform duration-700"
                style={{ maxHeight: "350px", width: "auto" }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.05, rotate: -1 }}
              />

              {/* Añadir efecto de destello en las esquinas */}
              <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-radial from-brainrot-blue/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-radial from-brainrot-turquoise/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
            
            <div className="absolute -inset-4 bg-gradient-to-r from-brainrot-blue/0 via-brainrot-blue/20 to-brainrot-blue/0 blur-2xl -z-10 opacity-75"></div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise hover:brightness-110 transform transition-all duration-300 hover:scale-105 hover:rotate-1 shadow-lg shadow-brainrot-blue/20 px-8 py-6 text-xl font-bold tracking-wide w-full sm:w-auto rounded-xl relative overflow-hidden group"
            >
              <Link to="personajes" className="relative z-10 flex items-center gap-2">
                <span className="group-hover:animate-pulse">EXPLORAR AHORA</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  →
                </motion.span>
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-2 border-brainrot-turquoise text-brainrot-turquoise hover:bg-brainrot-turquoise/20 transform transition-all duration-300 hover:scale-105 hover:-rotate-1 px-8 py-6 text-xl font-bold tracking-wide w-full sm:w-auto rounded-xl group"
            >
              <Link to="ranking" className="flex items-center gap-2">
                <span>VER RANKING</span>
                <motion.span
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  🏆
                </motion.span>
              </Link>
            </Button>
          </motion.div>

          {/* Stats flotantes */}
          <motion.div
            className="absolute top-1/2 -translate-y-1/2 left-0 hidden xl:flex flex-col gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
          >
            <div className="bg-brainrot-darker/80 backdrop-blur-lg px-4 py-2 rounded-r-lg border-l-2 border-brainrot-blue">
              <span className="text-2xl font-bold text-brainrot-turquoise">2.5M+</span>
              <p className="text-sm text-gray-400">Votos</p>
            </div>
            <div className="bg-brainrot-darker/80 backdrop-blur-lg px-4 py-2 rounded-r-lg border-l-2 border-brainrot-blue">
              <span className="text-2xl font-bold text-brainrot-turquoise">50K+</span>
              <p className="text-sm text-gray-400">Usuarios</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decoración visual mejorada */}
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-gradient-radial from-brainrot-blue/30 to-transparent rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-gradient-radial from-brainrot-turquoise/30 to-transparent rounded-full blur-3xl z-0 animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-transparent via-brainrot-blue/5 to-transparent z-0"></div>
    </section>
  );
};

export default Hero;

