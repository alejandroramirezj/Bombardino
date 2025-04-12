import Hero from '@/components/home/Hero';
import CharacterShowcase from '@/components/home/CharacterShowcase';
import CharacterMarquee from '@/components/home/CharacterMarquee';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div>
      <Hero />
      <CharacterMarquee />
      <CharacterShowcase />
      
      <section className="py-16 bg-brainrot-dark">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">BRAINROT ITALIANO</h2>
            <p className="text-gray-300 mb-8">
              L'affascinante fenomeno di internet che ha conquistato i social media
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              <div className="bg-brainrot-light p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brainrot-turquoise mb-4">L'origine del meme</h3>
                <p className="text-sm text-gray-300">
                  Il fenomeno "Italian Brainrot" è iniziato come una parodia della cultura dei meme assurdi e incoerenti che dominano i social media. Bombardino Coccodrillo, un coccodrillo antropomorfo con accento italiano, è rapidamente diventato il personaggio centrale di questa tendenza.
                </p>
                <p className="text-sm text-gray-300 mt-4">
                  Quello che è iniziato come immagini modificate si è evoluto in un universo espanso di personaggi interconnessi, ognuno con le proprie storie, rivalità e alleanze.
                </p>
              </div>
              
              <div className="bg-brainrot-light p-6 rounded-lg">
                <h3 className="text-xl font-bold text-brainrot-turquoise mb-4">Impatto culturale</h3>
                <p className="text-sm text-gray-300">
                  L'Italian Brainrot ha trasceso i confini di internet per diventare un fenomeno culturale. Personaggi come Bombardino Coccodrillo e i suoi alleati sono apparsi in meme, video virali e persino merchandising.
                </p>
                <p className="text-sm text-gray-300 mt-4">
                  La popolarità di questo universo riflette una tendenza verso l'"umorismo post-ironico", dove l'assurdo viene celebrato e la coerenza narrativa è secondaria rispetto all'esperienza caotica ma divertente.
                </p>
              </div>
            </div>
            
            <Button asChild variant="outline" className="border-brainrot-blue text-brainrot-blue hover:bg-brainrot-blue/20">
              <Link to="/brainrot">Scopri di più sul fenomeno Brainrot</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-gradient-to-b from-brainrot-dark to-brainrot-darker">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">UNISCITI AL BRAINROT</h2>
            <p className="text-gray-300 mb-8">
              Ricevi gli ultimi aggiornamenti su Bombardino Coccodrillo e l'universo dell'Italian Brainrot
            </p>
            
            {!isAuthenticated ? (
              <Button asChild size="lg" className="bg-brainrot-blue hover:bg-brainrot-blue/90">
                <Link to="/login">
                  Accedi per votare e contribuire
                </Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="bg-brainrot-blue hover:bg-brainrot-blue/90">
                <Link to="/characters/create">
                  Crea il tuo personaggio
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
