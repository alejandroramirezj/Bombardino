import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brainrot-darker pt-12 pb-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">
              <span className="text-white">Bombardino</span>
              <span className="text-brainrot-blue">Universe</span>
            </h3>
            <p className="text-gray-400 text-sm mb-4">
              El fascinante universo del Italian Brainrot con los personajes más absurdos y divertidos de internet.
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
                Ranking de Poder
              </Link>
              <Link to="batallas" className="text-gray-400 hover:text-white transition-colors text-sm">
                Batallas Épicas
              </Link>
              <Link to="brainrot" className="text-gray-400 hover:text-white transition-colors text-sm">
                Italian Brainrot
              </Link>
            </div>
          </div>
          
          <div>
            <span className="font-semibold">Comunidad</span>
            <div className="mt-2 flex flex-col space-y-1">
              <Link to="crear-personaje" className="text-gray-400 hover:text-white transition-colors text-sm">
                Crear Personaje
              </Link>
              <Link to="perfil" className="text-gray-400 hover:text-white transition-colors text-sm">
                Mi Perfil
              </Link>
              <a href="https://github.com/alejandroramirezj/Bombardino" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-sm">
                GitHub
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6">
          <div className="text-center text-gray-500 text-sm">
            <p>© 2025 BombardinoUniverse. Todos los derechos reservados.</p>
            <p className="mt-1">Todos los personajes son parte de la cultura de memes Italian Brainrot.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
