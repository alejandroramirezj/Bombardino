import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn, LogOut, User, PlusCircle, Menu, X, Home, Users, BarChart, Swords, Info, Zap } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  // Controlar el scroll para cambiar la apariencia de la navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Cerrar el menú mobile al cambiar de ruta
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Desactivar scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrollY > 10 ? "bg-brainrot-darker/90 backdrop-blur-md shadow-lg py-2" : "bg-brainrot-darker py-4"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 z-20">
          <motion.span 
            className="text-2xl font-bold text-white"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-white">Bombardino</span>
            <span className="text-brainrot-blue">Universe</span>
          </motion.span>
        </Link>

        {/* Navegación de escritorio */}
        <div className="flex-1 hidden md:flex justify-center">
          <div className="flex space-x-8">
            <NavLink to="personajes" icon={<Users size={16} />}>Personajes</NavLink>
            <NavLink to="ranking" icon={<BarChart size={16} />}>Ranking</NavLink>
            <NavLink to="batallas" icon={<Swords size={16} />}>Batallas</NavLink>
            <NavLink to="acerca-de" icon={<Info size={16} />}>Acerca de</NavLink>
            <NavLink to="brainrot" icon={<Zap size={16} />}>Brainrot</NavLink>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex items-center space-x-4 z-20">
          {isAuthenticated ? (
            <>
              <Link to="crear-personaje" className="hidden sm:block">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="flex items-center gap-2 bg-brainrot-blue/20 border-brainrot-blue text-white hover:bg-brainrot-blue/30 transition-transform hover:scale-105"
                >
                  <PlusCircle size={16} />
                  <span className="hidden sm:inline">Crear personaje</span>
                </Button>
              </Link>
              <Link to="perfil" className="text-gray-300 hover:text-white flex items-center transition-colors">
                {user?.picture ? (
                  <motion.img 
                    src={user.picture} 
                    alt={user.name || user.email}
                    className="w-8 h-8 rounded-full mr-2 border-2 border-transparent hover:border-brainrot-blue"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  />
                ) : (
                  <User size={18} className="mr-2" />
                )}
                <span className="hidden sm:inline">{user?.name || user?.email}</span>
              </Link>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Button 
                  onClick={logout} 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-brainrot-blue/20"
                >
                  <LogOut size={18} />
                  <span className="ml-2 hidden sm:inline">Cerrar sesión</span>
                </Button>
              </motion.div>
            </>
          ) : (
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="login">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-gray-300 hover:text-white hover:bg-brainrot-blue/20"
                >
                  <LogIn size={18} />
                  <span className="ml-2 hidden sm:inline">Iniciar sesión</span>
                </Button>
              </Link>
            </motion.div>
          )}

          {/* Botón del menú móvil */}
          <motion.button
            className="block md:hidden text-white p-2 rounded-full hover:bg-brainrot-blue/20"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </div>

      {/* Menú móvil */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-brainrot-darker z-10 md:hidden flex flex-col pt-20 pb-6 px-6"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col space-y-4 items-center text-center">
              {isAuthenticated && (
                <div className="py-4 mb-4 border-b border-brainrot-blue/20 w-full">
                  <Link 
                    to="perfil" 
                    className="flex flex-col items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {user?.picture ? (
                      <img 
                        src={user.picture} 
                        alt={user.name || user.email}
                        className="w-16 h-16 rounded-full mb-2 border-2 border-brainrot-blue"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-brainrot-blue/20 flex items-center justify-center mb-2">
                        <User size={32} />
                      </div>
                    )}
                    <span className="text-white font-medium">{user?.name || user?.email}</span>
                  </Link>
                </div>
              )}
              
              <MobileNavLink to="/" icon={<Home size={20} />} onClick={() => setIsMenuOpen(false)}>
                Inicio
              </MobileNavLink>
              <MobileNavLink to="personajes" icon={<Users size={20} />} onClick={() => setIsMenuOpen(false)}>
                Personajes
              </MobileNavLink>
              <MobileNavLink to="ranking" icon={<BarChart size={20} />} onClick={() => setIsMenuOpen(false)}>
                Ranking
              </MobileNavLink>
              <MobileNavLink to="batallas" icon={<Swords size={20} />} onClick={() => setIsMenuOpen(false)}>
                Batallas
              </MobileNavLink>
              <MobileNavLink to="acerca-de" icon={<Info size={20} />} onClick={() => setIsMenuOpen(false)}>
                Acerca de
              </MobileNavLink>
              <MobileNavLink to="brainrot" icon={<Zap size={20} />} onClick={() => setIsMenuOpen(false)}>
                Brainrot
              </MobileNavLink>
              
              {isAuthenticated ? (
                <>
                  <MobileNavLink to="crear-personaje" icon={<PlusCircle size={20} />} onClick={() => setIsMenuOpen(false)}>
                    Crear personaje
                  </MobileNavLink>
                  <Button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }} 
                    variant="outline" 
                    className="w-full mt-4 bg-brainrot-blue/10 border-brainrot-blue/30 text-white py-6"
                  >
                    <LogOut size={20} className="mr-2" />
                    Cerrar sesión
                  </Button>
                </>
              ) : (
                <Button 
                  asChild
                  variant="default" 
                  className="w-full mt-4 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise py-6"
                >
                  <Link to="login" onClick={() => setIsMenuOpen(false)}>
                    <LogIn size={20} className="mr-2" />
                    Iniciar sesión
                  </Link>
                </Button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// Componente de enlace de navegación para escritorio
const NavLink = ({ to, children, icon }) => {
  return (
    <Link 
      to={to} 
      className="text-gray-300 hover:text-white transition-colors flex items-center group"
    >
      <span className="flex items-center">
        {icon && <span className="mr-1 opacity-70 group-hover:opacity-100">{icon}</span>}
        {children}
      </span>
      <div className="h-[2px] w-0 group-hover:w-full bg-brainrot-blue mt-1 transition-all duration-300"></div>
    </Link>
  );
};

// Componente de enlace de navegación para móvil
const MobileNavLink = ({ to, children, icon, onClick }) => {
  return (
    <Link 
      to={to} 
      className="flex items-center justify-center w-full py-4 px-6 rounded-lg bg-brainrot-light hover:bg-brainrot-blue/20 transition-colors text-white text-lg"
      onClick={onClick}
    >
      {icon && <span className="mr-3 text-brainrot-turquoise">{icon}</span>}
      {children}
    </Link>
  );
};

export default Navbar;
