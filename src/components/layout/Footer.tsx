import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brainrot-darker pt-12 pb-6 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Bombardino Universe</h3>
            <p className="text-gray-400">
              El universo oficial de Bombardino Crocodrilo y todos sus personajes.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/personajes" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Personajes
                </Link>
              </li>
              <li>
                <Link to="/ranking" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Ranking
                </Link>
              </li>
              <li>
                <Link to="/batallas" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Batallas
                </Link>
              </li>
              <li>
                <Link to="/brainrot" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Acerca de
                </Link>
              </li>
              <li>
                <Link to="/personajes/bombardino-coccodrillo" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Bombardino Crocodrilo
                </Link>
              </li>
              <li>
                <Link to="/personajes/birillo-impazzito" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Birillo Impazzito
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" className="text-gray-400 hover:text-brainrot-turquoise transition-colors">
                  Sitemap
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Síguenos</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brainrot-blue transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-brainrot-blue transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-6 text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Bombardino Universe. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
