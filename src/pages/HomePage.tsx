import Hero from '@/components/home/Hero';
import CharacterShowcase from '@/components/home/CharacterShowcase';
import CharacterMarquee from '@/components/home/CharacterMarquee';
import RankingSection from '@/components/home/RankingSection';
// import FlipCard from '@/components/shop/FlipCard'; // Comentamos la importación con alias
import FlipCard from '../components/shop/FlipCard'; // Usamos ruta relativa
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Character } from '@/types';
import initialCharacters from '@/data/characters';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Sparkles, Printer } from 'lucide-react';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [bombardinoCharacter, setBombardinoCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const bombardino = initialCharacters.find((char: Character) => char.id === "2");
    if (bombardino) {
      setBombardinoCharacter(bombardino);
    } else {
      console.error("Personaje Bombardino coccodrillo (ID: 2) no encontrado en characters.ts");
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Bombardino - Explora el universo épico de Bombardino</title>
        <meta name="description" content="Descubre a los personajes más icónicos del universo Bombardino: héroes, villanos y seres extraordinarios que dan vida a esta saga épica." />
      </Helmet>
      
      <Hero />
      <CharacterMarquee />
      <CharacterShowcase />
      <RankingSection />

      {bombardinoCharacter && (
        <motion.section 
          className="py-24 bg-gradient-to-br from-brainrot-dark via-brainrot-darker to-black overflow-hidden"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6">
              ¡<span className="text-brainrot-turquoise">Exclusiva</span> Física!
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-16">
              ¡Lleva a casa la carta física oficial de Bombardino Coccodrillo! Edición limitada para coleccionistas. ¡Gírala!
            </p>
            
            <div className="flex flex-col lg:flex-row items-center justify-center gap-16">
              <div className="flex-shrink-0">
                <FlipCard character={bombardinoCharacter} />
              </div>

              <div className="text-left max-w-md">
                <h3 className="text-3xl font-bold text-white mb-6">¿Qué Recibes?</h3>
                <ul className="space-y-4 text-gray-300 mb-10">
                  <li className="flex items-start gap-3">
                    <Sparkles className="w-5 h-5 text-brainrot-turquoise mt-1 flex-shrink-0" />
                    <span>**Carta Física Premium:** Impresión de alta calidad con acabado brillante y detalles nítidos.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Printer className="w-5 h-5 text-brainrot-turquoise mt-1 flex-shrink-0" />
                    <span>**Diseño Exclusivo:** Arte original de Italian Brainrot en ambas caras.</span>
                  </li>
                   <li className="flex items-start gap-3">
                    <ShieldCheck className="w-5 h-5 text-brainrot-turquoise mt-1 flex-shrink-0" />
                    <span>**Sobre Protector:** Incluido para mantener tu carta en perfecto estado.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Truck className="w-5 h-5 text-brainrot-turquoise mt-1 flex-shrink-0" />
                    <span>**Envío Seguro:** Empaquetado cuidadosamente para que llegue impecable a tu casa.</span>
                  </li>
                </ul>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-full"
                >
                  <Button 
                    asChild 
                    className="w-full px-10 py-5 text-xl bg-brainrot-turquoise hover:bg-brainrot-blue text-black font-bold transition-colors duration-300 shadow-lg shadow-brainrot-turquoise/30 rounded-lg"
                  >
                    <a 
                      href="https://buy.stripe.com/14kdRi0iv0kYfPG4gg" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      Comprar Carta Física - 3,00 €
                    </a>
                  </Button>
                </motion.div>
                
                <p className="text-gray-500 text-xs mt-4 text-center flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3"/> Pago 100% seguro vía Stripe.
                </p>
              </div>
            </div>
          </div>
        </motion.section>
      )}
      
      <section className="py-16 bg-brainrot-dark">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            ÚNETE A LA <span className="text-brainrot-turquoise">COMUNIDAD</span>
          </h2>
          
          <div className="max-w-3xl mx-auto bg-brainrot-light p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold text-white mb-4">
              {isAuthenticated 
                ? "¡Gracias por ser parte de nuestra comunidad!" 
                : "¡Únete a la comunidad de Bombardino!"}
            </h3>
            
            <p className="text-gray-400 mb-6">
              {isAuthenticated 
                ? "Continúa explorando el universo de Bombardino y no olvides votar por tus personajes favoritos." 
                : "Crea una cuenta gratuita para votar por tus personajes favoritos y contribuir a la comunidad."}
            </p>
            
            {!isAuthenticated && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  to="/login" 
                  className="px-6 py-3 bg-brainrot-turquoise text-black font-semibold rounded-md hover:bg-brainrot-turquoise/80 transition-colors"
                >
                  Iniciar Sesión
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-3 border border-brainrot-turquoise text-brainrot-turquoise font-semibold rounded-md hover:bg-brainrot-turquoise/20 transition-colors"
                >
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
