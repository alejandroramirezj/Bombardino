import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container mx-auto flex flex-col items-center justify-center py-32 px-4">
      <h1 className="text-8xl font-bold text-brainrot-turquoise mb-4">404</h1>
      <h2 className="text-2xl font-bold text-white mb-6">¡Oops! Página no encontrada</h2>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        La página que estás buscando no existe o ha sido movida a otra ubicación.
      </p>
      <Link 
        to="/"
        className="bg-brainrot-blue text-white py-2 px-6 rounded-md hover:bg-brainrot-blue/80 transition-colors"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound; 