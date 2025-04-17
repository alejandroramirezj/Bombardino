import Hero from '@/components/home/Hero';
import CharacterShowcase from '@/components/home/CharacterShowcase';
import CharacterMarquee from '@/components/home/CharacterMarquee';
import RankingSection from '@/components/home/RankingSection';
import FlipCard from '@/components/shop/FlipCard';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Helmet } from 'react-helmet-async';
import { useState, useEffect } from 'react';
import { Character } from '@/types';
import initialCharacters from '@/data/characters';

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
        <section className="py-16 bg-gradient-to-b from-brainrot-dark to-brainrot-darker">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Carta <span className="text-brainrot-turquoise">Destacada</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto mb-10">
              ¡Consigue la carta coleccionable exclusiva de Bombardino Coccodrillo! Haz clic para ver ambos lados.
            </p>
            
            <div className="flex flex-col items-center gap-8">
              <FlipCard character={bombardinoCharacter} />
              
              <Button 
                asChild 
                className="mt-4 px-8 py-4 text-lg bg-brainrot-turquoise hover:bg-brainrot-blue text-black font-bold transition-colors shadow-lg"
              >
                <a 
                  href="https://buy.stripe.com/14kdRi0iv0kYfPG4gg" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  Comprar Carta Ahora - 3,00 €
                </a>
              </Button>
            </div>
          </div>
        </section>
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
