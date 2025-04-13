import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Componente para el efecto de partículas
const ParticleEffect = () => {
  const particles = Array.from({ length: 30 }, (_, i) => (
    <div 
      key={i}
      className="absolute rounded-full bg-brainrot-blue/30 animate-float"
      style={{
        top: `${Math.random() * 100}%`,
        left: `${Math.random() * 100}%`,
        width: `${Math.random() * 10 + 5}px`,
        height: `${Math.random() * 10 + 5}px`,
        animationDelay: `${Math.random() * 5}s`,
        animationDuration: `${Math.random() * 10 + 10}s`,
      }}
    />
  ));

  return <div className="absolute inset-0 overflow-hidden z-0">{particles}</div>;
};

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section className="bg-brainrot-dark py-20 md:py-28 px-4 relative overflow-hidden min-h-[80vh] flex items-center">
      {/* Gradiente de fondo mejorado */}
      <div className="absolute inset-0 bg-gradient-radial from-brainrot-blue/10 via-brainrot-dark to-brainrot-darker z-0"></div>
      
      {/* Efecto de partículas */}
      <ParticleEffect />
      
      {/* Decoración visual - líneas */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-brainrot-blue/30 to-transparent"></div>
        <div className="absolute top-0 right-1/4 w-[1px] h-full bg-gradient-to-b from-transparent via-brainrot-blue/30 to-transparent"></div>
        <div className="absolute bottom-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brainrot-blue/30 to-transparent"></div>
      </div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isLoaded ? "visible" : "hidden"}
        >
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-6 text-white tracking-tight"
            variants={itemVariants}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-brainrot-blue">
              UNIVERSO BOMBARDINO
            </span>
          </motion.h1>
          
          <motion.h2 
            className="text-xl md:text-3xl text-brainrot-turquoise mb-8 font-light"
            variants={itemVariants}
          >
            El universo del meme italiano más potente
          </motion.h2>
          
          <motion.p 
            className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg"
            variants={itemVariants}
          >
            Explora el universo de Bombardino coccodrillo y todos los personajes del fenómeno "Italian Brainrot". Vota a tus favoritos y descubre las intrincadas relaciones entre estos iconos de la cultura de internet.
          </motion.p>
          
          <motion.div 
            className="mb-12 relative"
            variants={itemVariants}
          >
            <div className="relative bg-brainrot-darker border-2 border-brainrot-blue/50 p-1 rounded-lg max-w-xl mx-auto overflow-hidden shadow-2xl shadow-brainrot-blue/20 group">
              {/* Efecto de brillo en hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-brainrot-blue/0 via-brainrot-blue/30 to-brainrot-blue/0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 -translate-x-full group-hover:translate-x-full"></div>
              
              <motion.img 
                src="images/Bombardino%20Crocodillo.webp"
                alt="Bombardino coccodrillo"
                className="w-full h-auto object-contain rounded mx-auto"
                style={{ maxHeight: "400px" }}
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8 }}
                whileHover={{ scale: 1.03 }}
              />
            </div>
            
            {/* Aura decorativa alrededor de la imagen */}
            <div className="absolute -inset-1 bg-gradient-to-r from-brainrot-blue/0 via-brainrot-blue/20 to-brainrot-blue/0 blur-xl -z-10"></div>
          </motion.div>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={itemVariants}
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise hover:brightness-110 transform transition-all duration-300 hover:scale-105 shadow-lg shadow-brainrot-blue/20 px-8 py-6 text-lg"
            >
              <Link to="personajes">
                Explorar Personajes
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="border-2 border-brainrot-turquoise text-brainrot-turquoise hover:bg-brainrot-turquoise/20 transform transition-all duration-300 hover:scale-105 px-8 py-6 text-lg"
            >
              <Link to="ranking">
                Ranking de Poder
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Decoración visual - formas geométricas */}
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-brainrot-blue/10 rounded-full blur-3xl z-0"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-brainrot-turquoise/10 rounded-full blur-3xl z-0"></div>
    </section>
  );
};

export default Hero;
