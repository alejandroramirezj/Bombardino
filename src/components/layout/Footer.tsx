import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brainrot-darker pt-12 pb-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-white">Bombardino</span>
              <span className="text-brainrot-blue">Universe</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              The fascinating universe of Italian Brainrot with the most absurd and funny characters on the internet.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brainrot-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brainrot-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <span className="font-semibold">Explora</span>
            <div className="mt-2 flex flex-col space-y-1">
              <Link to="personajes" className="text-gray-400 hover:text-white transition-colors text-sm">
                Personajes
              </Link>
              <Link to="ranking" className="text-gray-400 hover:text-white transition-colors text-sm">
                Power Ranking
              </Link>
              <Link to="gallery" className="text-gray-400 hover:text-white transition-colors text-sm">
                Galería
              </Link>
            </div>
          </div>
          
          <div>
            <span className="font-semibold">Recursos</span>
            <div className="mt-2 flex flex-col space-y-1">
              <Link to="faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                FAQ
              </Link>
              <Link to="wiki" className="text-gray-400 hover:text-white transition-colors text-sm">
                Wiki
              </Link>
              <Link to="universe-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                Guía del Universo
              </Link>
              <Link to="meme-history" className="text-gray-400 hover:text-white transition-colors text-sm">
                Historia del Meme
              </Link>
            </div>
          </div>
          
          <div>
            <span className="font-semibold">Comunidad</span>
            <div className="mt-2 flex flex-col space-y-1">
              <Link to="discord" className="text-gray-400 hover:text-white transition-colors text-sm">
                Discord
              </Link>
              <Link to="contribute" className="text-gray-400 hover:text-white transition-colors text-sm">
                Contribuir
              </Link>
              <Link to="terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                Términos
              </Link>
              <Link to="privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                Privacidad
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 BombardinoUniverse. All rights reserved.</p>
            <p className="mt-1">All characters are part of the Italian Brainrot meme culture.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
