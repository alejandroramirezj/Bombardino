
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import CharacterCreateForm from '@/components/characters/CharacterCreateForm';

const CharacterCreatePage = () => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-6">Crea un nuovo personaggio</h1>
        <p className="text-gray-400 mb-8">
          Aggiungi un nuovo personaggio all'universo di Bombardino. I migliori personaggi saranno selezionati e aggiunti ufficialmente al Brainrot Italiano.
        </p>
        
        <div className="bg-brainrot-light p-6 rounded-lg">
          <CharacterCreateForm />
        </div>
      </div>
    </div>
  );
};

export default CharacterCreatePage;
