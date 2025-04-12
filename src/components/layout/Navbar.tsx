import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User, PlusCircle } from "lucide-react";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="bg-brainrot-darker py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-white">
            <span className="text-white">Bombardino</span>
            <span className="text-brainrot-blue">Universe</span>
          </span>
        </Link>

        <div className="flex-1 hidden md:flex justify-center">
          <div className="flex space-x-8">
            <Link to="/personajes" className="text-gray-300 hover:text-white transition-colors">
              Personajes
            </Link>
            <Link to="/ranking" className="text-gray-300 hover:text-white transition-colors">
              Ranking
            </Link>
            <Link to="/acerca-de" className="text-gray-300 hover:text-white transition-colors">
              Acerca de
            </Link>
            <Link to="/brainrot" className="text-gray-300 hover:text-white transition-colors">
              Brainrot
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <Link to="/crear-personaje">
                <Button variant="outline" size="sm" className="flex items-center gap-2 bg-brainrot-blue/20 border-brainrot-blue text-white hover:bg-brainrot-blue/30">
                  <PlusCircle size={16} />
                  <span className="hidden sm:inline">Crear personaje</span>
                </Button>
              </Link>
              <span className="text-gray-300 text-sm hidden sm:inline">{user?.email}</span>
              <Button onClick={logout} variant="ghost" size="sm" className="text-gray-300">
                <LogOut size={18} />
                <span className="ml-2 hidden sm:inline">Cerrar sesión</span>
              </Button>
            </>
          ) : (
            <Link to="/login">
              <Button variant="ghost" size="sm" className="text-gray-300">
                <LogIn size={18} />
                <span className="ml-2 hidden sm:inline">Iniciar sesión</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
