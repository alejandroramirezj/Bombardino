import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useCharacters } from '@/contexts/CharacterContext';
import { Navigate, Link } from 'react-router-dom';
import { Character } from '@/types';
import CharacterCard from '@/components/characters/CharacterCard';
import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Mail, PlusCircle, Heart, Edit } from 'lucide-react';

const ProfilePage = () => {
  const { user, isAuthenticated } = useAuth();
  const { characters } = useCharacters();
  const [createdCharacters, setCreatedCharacters] = useState<Character[]>([]);
  const [votedCharacters, setVotedCharacters] = useState<Character[]>([]);
  
  useEffect(() => {
    if (!user || !characters.length) return;
    
    // Filtrar personajes creados por el usuario
    if (user.createdCharacters?.length) {
      const created = characters.filter(char => 
        user.createdCharacters?.includes(char.id)
      );
      setCreatedCharacters(created);
    }
    
    // Filtrar personajes votados por el usuario
    if (user.votedCharacters?.length) {
      const voted = characters.filter(char => 
        user.votedCharacters?.includes(char.id)
      );
      setVotedCharacters(voted);
    }
  }, [user, characters]);
  
  // Redirigir a login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <>
      <Helmet>
        <title>Mi Perfil | Universo Bombardino</title>
        <meta name="description" content="Gestiona tu perfil, personajes creados y votados en el universo Bombardino" />
      </Helmet>
      
      <div className="container mx-auto py-12 px-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Mi <span className="text-brainrot-turquoise">Perfil</span>
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Gestiona tu perfil y explora tus personajes creados y votados
          </p>
        </div>
        
        {/* Información del perfil */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card className="col-span-1 bg-brainrot-light border-brainrot-blue">
            <CardHeader>
              <CardTitle>Información Personal</CardTitle>
              <CardDescription>Tu información de cuenta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-center mb-6">
                {user?.picture ? (
                  <img 
                    src={user.picture} 
                    alt={user.name || user.email}
                    className="w-24 h-24 rounded-full"
                  />
                ) : (
                  <div className="w-24 h-24 rounded-full bg-brainrot-blue/20 flex items-center justify-center">
                    <User size={40} className="text-brainrot-blue" />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <User className="text-gray-400" size={16} />
                  <span className="text-white">{user?.name || 'Usuario'}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Mail className="text-gray-400" size={16} />
                  <span className="text-white">{user?.email}</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2 mt-6">
                <Button variant="outline" className="border-brainrot-blue text-brainrot-blue hover:bg-brainrot-blue/20">
                  <Edit size={16} className="mr-2" />
                  Editar perfil
                </Button>
              </div>
            </CardContent>
          </Card>
          
          <Card className="col-span-2 bg-brainrot-light border-gray-800">
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
              <CardDescription>Tu actividad en Bombardino Universe</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-brainrot-darker p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Personajes creados</p>
                  <p className="text-4xl font-bold text-brainrot-blue">{createdCharacters.length}</p>
                </div>
                
                <div className="bg-brainrot-darker p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Personajes votados</p>
                  <p className="text-4xl font-bold text-brainrot-turquoise">{votedCharacters.length}</p>
                </div>
                
                <div className="bg-brainrot-darker p-4 rounded-lg text-center">
                  <p className="text-gray-400 text-sm">Miembro desde</p>
                  <p className="text-xl font-bold text-white">2023</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Tabs para personajes creados y votados */}
        <Tabs defaultValue="created" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="created" className="text-lg">
              Personajes Creados
            </TabsTrigger>
            <TabsTrigger value="voted" className="text-lg">
              Personajes Votados
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="created" className="space-y-8">
            {createdCharacters.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {createdCharacters.map((character, index) => (
                    <CharacterCard 
                      key={character.id} 
                      character={character} 
                      index={index}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-brainrot-darker rounded-lg">
                <PlusCircle size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Aún no has creado personajes</h3>
                <p className="text-gray-400 mb-6">
                  Crea tu primer personaje y forma parte del universo Bombardino
                </p>
                <Button asChild className="bg-brainrot-blue hover:bg-brainrot-blue/90">
                  <Link to="/crear-personaje">
                    Crear mi primer personaje
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="voted" className="space-y-8">
            {votedCharacters.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {votedCharacters.map((character, index) => (
                    <CharacterCard 
                      key={character.id} 
                      character={character} 
                      index={index}
                    />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16 bg-brainrot-darker rounded-lg">
                <Heart size={48} className="mx-auto text-gray-500 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Aún no has votado por personajes</h3>
                <p className="text-gray-400 mb-6">
                  Explora los personajes y vota por tus favoritos
                </p>
                <Button asChild className="bg-brainrot-blue hover:bg-brainrot-blue/90">
                  <Link to="/personajes">
                    Explorar personajes
                  </Link>
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default ProfilePage; 