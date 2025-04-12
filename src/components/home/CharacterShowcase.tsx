import { useCharacters } from '@/contexts/CharacterContext';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import CharacterCard from '@/components/characters/CharacterCard';

const CharacterShowcase = () => {
  const { getRandomCharacters } = useCharacters();
  const featuredCharacters = getRandomCharacters(6);

  // Animación para el contenedor
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="py-20 bg-brainrot-dark">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            PERSONAJES <span className="text-brainrot-turquoise">DESTACADOS</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explora los personajes más icónicos del universo Bombardino y descubre 
            sus historias, habilidades y relaciones con otros personajes.
          </p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredCharacters.map((character, index) => (
            <CharacterCard 
              key={character.id} 
              character={character} 
              index={index}
            />
          ))}
        </motion.div>
        
        <div className="text-center">
          <Button asChild variant="outline" size="lg" className="border-brainrot-turquoise text-brainrot-turquoise hover:bg-brainrot-turquoise/20">
            <Link to={`${import.meta.env.BASE_URL}personajes`} className="inline-flex items-center">
              Explorar todos los personajes
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CharacterShowcase;
