
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
            <h4 className="text-brainrot-blue uppercase text-sm font-bold mb-4">EXPLORE</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/characters" className="text-gray-400 hover:text-white transition-colors text-sm">
                  All Characters
                </Link>
              </li>
              <li>
                <Link to="/ranking" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Power Ranking
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-brainrot-blue uppercase text-sm font-bold mb-4">RESOURCES</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/wiki" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Wiki
                </Link>
              </li>
              <li>
                <Link to="/universe-guide" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Universe Guide
                </Link>
              </li>
              <li>
                <Link to="/meme-history" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Meme History
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-brainrot-blue uppercase text-sm font-bold mb-4">COMMUNITY</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/discord" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Discord
                </Link>
              </li>
              <li>
                <Link to="/contribute" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Contribute
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Terms
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors text-sm">
                  Privacy
                </Link>
              </li>
            </ul>
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
