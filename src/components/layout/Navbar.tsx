import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User } from "lucide-react";

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
            <Link to="/characters" className="text-gray-300 hover:text-white transition-colors">
              Characters
            </Link>
            <Link to="/ranking" className="text-gray-300 hover:text-white transition-colors">
              Ranking
            </Link>
            <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
              About
            </Link>
            <Link to="/brainrot" className="text-gray-300 hover:text-white transition-colors">
              Brainrot
            </Link>
          </div>
        </div>

        <div>
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="hidden md:block text-sm text-gray-300">
                {user?.email}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={logout}
                className="text-white border-brainrot-blue hover:bg-brainrot-blue/20"
              >
                <LogOut className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Logout</span>
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button
                variant="outline"
                size="sm"
                className="text-white border-brainrot-blue hover:bg-brainrot-blue/20"
              >
                <LogIn className="h-4 w-4 mr-2" />
                <span className="hidden md:inline">Login</span>
              </Button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
