import React, { Suspense } from 'react';
import Hero from '@/components/home/Hero';
import CharacterMarquee from '@/components/home/CharacterMarquee';
// import CharacterShowcase from '@/components/home/CharacterShowcase'; // Carga normal comentada
// import RankingSection from '@/components/home/RankingSection'; // Carga normal comentada
// import FlipCard from '../components/shop/FlipCard'; // Carga normal comentada
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Character } from '@/types';
import initialCharacters from '@/data/characters';
import { motion } from 'framer-motion';
import { ShieldCheck, Truck, Sparkles, Printer } from 'lucide-react';
import FloatingEmojis from '../components/effects/FloatingEmojis';

// Carga diferida (Lazy loading) de componentes
const CharacterShowcase = React.lazy(() => import('@/components/home/CharacterShowcase'));
const RankingSection = React.lazy(() => import('@/components/home/RankingSection'));
const FlipCard = React.lazy(() => import('../components/shop/FlipCard'));
// Eliminamos la importación del componente inexistente
// const CommunitySection = React.lazy(() => import('@/components/home/CommunitySection'));

// Componente simple de carga para Suspense
const LoadingFallback = () => (
  <div className="flex justify-center items-center h-64">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brainrot-turquoise"></div>
  </div>
);

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const [bombardinoCharacter, setBombardinoCharacter] = useState<Character | null>(null);

  useEffect(() => {
    const bombardino = initialCharacters.find((char: Character) => char.id === "2");
    if (bombardino) setBombardinoCharacter(bombardino);
    else console.error("Bombardino (ID: 2) not found");
  }, []);

  return (
    <div>
      <Helmet>
        <title>Bombardino - Explora el universo épico de Bombardino</title>
        <meta name="description" content="Descubre a los personajes más icónicos del universo Bombardino: héroes, villanos y seres extraordinarios que dan vida a esta saga épica." />
      </Helmet>
      
      <Hero />
      <CharacterMarquee />
      
      {/* Envolver componentes diferidos en Suspense */}
      <Suspense fallback={<LoadingFallback />}>
        <CharacterShowcase />
      </Suspense>
      
      <Suspense fallback={<LoadingFallback />}>
        <RankingSection />
      </Suspense>

      {/* Sección carta destacada también diferida */}
      {bombardinoCharacter && (
        <Suspense fallback={<LoadingFallback />}>
          <motion.section 
            className="relative py-24 bg-gradient-to-br from-brainrot-dark via-brainrot-darker to-black overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <FloatingEmojis count={20} emojis={['💥', '💣']} /> 
            <div className="relative z-10 container mx-auto px-4 text-center"> 
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                Colecciona la Carta <span className="text-brainrot-turquoise">Premium</span>
                <span className="block text-2xl md:text-3xl lg:text-4xl mt-2 font-semibold text-gray-300">
                  Bombardino Coccodrillo - ¡Edición Limitada!
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl mx-auto mb-16">
                Añade a tu colección la pieza física definitiva. Solo 50 unidades disponibles. ¡Gírala para verla!
              </p>
              <div className="flex flex-col lg:flex-row items-center justify-center gap-16"> 
                <div className="flex-shrink-0">
                  <FlipCard character={bombardinoCharacter} />
                </div>
                <div className="text-left max-w-md">
                  <h3 className="text-3xl font-bold text-white mb-8 text-center lg:text-left">¿Qué Recibes?</h3>
                  <div className="grid grid-cols-2 gap-x-6 gap-y-6 text-white mb-10">
                    <div className="flex flex-col items-center text-center">
                      <Sparkles className="w-10 h-10 text-brainrot-turquoise mb-2" />
                      <span className="font-semibold">Calidad Premium</span>
                      <span className="text-xs text-gray-400">Acabado brillante</span> 
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Printer className="w-10 h-10 text-brainrot-turquoise mb-2" />
                      <span className="font-semibold">Diseño Exclusivo</span>
                      <span className="text-xs text-gray-400">Arte original</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <ShieldCheck className="w-10 h-10 text-brainrot-turquoise mb-2" />
                      <span className="font-semibold">Protección Incluida</span>
                      <span className="text-xs text-gray-400">Sobre protector</span>
                    </div>
                    <div className="flex flex-col items-center text-center">
                      <Truck className="w-10 h-10 text-brainrot-turquoise mb-2" />
                      <span className="font-semibold">Envío Seguro</span>
                      <span className="text-xs text-gray-400">Empaquetado</span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                    className="w-full"
                  >
                    <Button asChild className="w-full px-10 py-5 text-xl bg-brainrot-turquoise hover:bg-brainrot-blue text-black font-bold transition-colors duration-300 shadow-lg shadow-brainrot-turquoise/30 rounded-lg">
                      <a href="https://buy.stripe.com/14kdRi0iv0kYfPG4gg" target="_blank" rel="noopener noreferrer">
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
        </Suspense>
      )}
      
      {/* Sección Comunidad (ya no se intenta cargar diferidamente un componente inexistente) */}
      <Suspense fallback={<LoadingFallback />}>
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
                  <Link to="/login" className="px-6 py-3 bg-brainrot-turquoise text-black font-semibold rounded-md hover:bg-brainrot-turquoise/80 transition-colors">
                    Iniciar Sesión
                  </Link>
                  <Link to="/register" className="px-6 py-3 border border-brainrot-turquoise text-brainrot-turquoise font-semibold rounded-md hover:bg-brainrot-turquoise/20 transition-colors">
                    Registrarse
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>
      </Suspense>

    </div>
  );
};

export default HomePage;
