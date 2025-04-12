import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="bg-brainrot-dark py-16 md:py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-brainrot-dark via-transparent to-brainrot-dark opacity-90 z-0"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white">
            UNIVERSO BOMBARDINO
          </h1>
          
          <h2 className="text-xl md:text-2xl text-brainrot-turquoise mb-8 font-light">
            L'universo del meme italiano più potente
          </h2>
          
          <p className="text-gray-300 mb-10 max-w-2xl mx-auto">
            Esplora l'universo di Bombardino coccodrillo e tutti i personaggi del fenomeno "Italian Brainrot". Vota i tuoi preferiti e scopri le intricate relazioni tra queste icone della cultura di internet.
          </p>
          
          <div className="mb-12">
            <div className="bg-brainrot-darker border border-brainrot-light p-1 rounded-lg max-w-xl mx-auto">
              <img 
                src="images/Bombardino%20Crocodillo.webp"
                alt="Bombardino coccodrillo"
                className="w-full h-auto object-contain rounded mx-auto"
                style={{ maxHeight: "400px" }}
              />
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-brainrot-blue hover:bg-brainrot-blue/90">
              <Link to="personajes">
                Esplora Personaggi
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="border-brainrot-turquoise text-brainrot-turquoise hover:bg-brainrot-turquoise/20">
              <Link to="ranking">
                Power Ranking
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
