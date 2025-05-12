import React, { createContext, useContext, useState, useEffect } from 'react';
import initialCharacters from '../data/characters';
import { toast } from 'sonner';
import { Character, CharacterType } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

// --- Versión de los datos de personajes ---
// Incrementar esto si cambian los datos base en characters.ts
const CHARACTERS_DATA_VERSION = '1.1'; 
// Versión anterior era '1.0' o sin versión.

export interface CharacterContextType {
  characters: Character[];
  loading: boolean;
  error: string | null;
  addCharacter: (character: Character) => void;
  updateCharacter: (character: Character) => void;
  deleteCharacter: (id: string) => void;
  getTopCharacters: (limit: number) => Character[];
  getCharacterById: (id: string) => Character | undefined;
  getRandomCharacters: (limit: number) => Character[];
  voteForCharacter: (characterId: string) => void;
  hasUserVotedFor: (characterId: string, userId: string) => boolean;
}

const CharacterContext = createContext<CharacterContextType | undefined>(undefined);

export const CharacterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Asegurarnos de que los personajes iniciales tengan la estructura correcta
  const normalizedInitialCharacters = initialCharacters.map(char => ({
    ...char,
    votes: Array.isArray(char.votes) ? char.votes : [],
    voteCount: typeof char.voteCount === 'number' ? char.voteCount : 0
  }));

  // Cargar personajes guardados desde localStorage
  const loadSavedCharacters = () => {
    try {
      const savedData = localStorage.getItem('brainrot-characters');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        
        // Verificar versión
        if (parsedData && typeof parsedData === 'object' && parsedData.version === CHARACTERS_DATA_VERSION) {
          console.log(`Cargando personajes desde localStorage (versión ${parsedData.version})`);
          const savedCharacters = parsedData.data as Character[]; // Asumimos que los datos están en 'data'
          
          // --- Lógica de combinación existente (mantener votos, etc.) ---
          const combinedCharacters = [...normalizedInitialCharacters];
          savedCharacters.forEach((savedChar: Character) => {
            const existingIndex = combinedCharacters.findIndex(c => c.id === savedChar.id);
            if (existingIndex >= 0) {
              // Actualizar personaje existente preservando estructura inicial pero manteniendo votos
              combinedCharacters[existingIndex] = {
                  ...normalizedInitialCharacters.find(c => c.id === savedChar.id), // Datos base del archivo
                  ...savedChar, // Sobrescribir con datos guardados (incluye votos/voteCount)
                  // Asegurar que los campos clave siempre vengan del archivo si existen
                  name: normalizedInitialCharacters.find(c => c.id === savedChar.id)?.name || savedChar.name,
                  image: normalizedInitialCharacters.find(c => c.id === savedChar.id)?.image || savedChar.image,
                  type: normalizedInitialCharacters.find(c => c.id === savedChar.id)?.type || savedChar.type,
                  // Asegurar que votes y voteCount sean correctos
                  votes: Array.isArray(savedChar.votes) ? savedChar.votes : [],
                  voteCount: typeof savedChar.voteCount === 'number' ? savedChar.voteCount : 0
              };
            } else {
              // Añadir nuevo personaje (si estaba en localStorage pero no en initial - raro)
               if (!normalizedInitialCharacters.some(c => c.id === savedChar.id)) {
                 // Podríamos optar por no añadirlo si ya no existe en el archivo base
                 // console.log("Personaje guardado no encontrado en datos iniciales, omitiendo:", savedChar.id);
               } 
            }
          });
           // Asegurar que todos los personajes de initialCharacters estén presentes
           normalizedInitialCharacters.forEach(initialChar => {
             if (!combinedCharacters.some(c => c.id === initialChar.id)) {
               combinedCharacters.push(initialChar);
             }
           });
          return combinedCharacters;
          // --- Fin lógica de combinación ---
          
        } else {
          console.warn('Datos de localStorage obsoletos o sin versión. Cargando datos frescos.');
          // No coincide la versión o formato antiguo, ignorar localStorage
        }
      } else {
        console.log('No se encontraron datos en localStorage. Cargando datos iniciales.');
      }
    } catch (error) {
      console.error("Error al cargar o parsear personajes guardados:", error);
    }
    // Si falla, no hay datos, o la versión es obsoleta, cargar desde archivo
    return normalizedInitialCharacters;
  };

  const [characters, setCharacters] = useState<Character[]>(loadSavedCharacters());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const { user, addVotedCharacter, removeVotedCharacter, addCreatedCharacter } = useAuth();

  // Guardar personajes en localStorage cuando cambien
  useEffect(() => {
    if (!loading) {
      try {
        // Guardar con versión
        const dataToSave = {
          version: CHARACTERS_DATA_VERSION,
          data: characters
        };
        localStorage.setItem('brainrot-characters', JSON.stringify(dataToSave));
      } catch (error) {
          console.error("Error al guardar personajes en localStorage:", error);
          // Considerar si mostrar un error al usuario
      }
    }
  }, [characters, loading]);

  useEffect(() => {
    // Eliminamos la carga artificial para respuesta inmediata
    setLoading(false);
  }, []);

  const getCharacterById = (id: string): Character | undefined => {
    return characters.find(character => character.id === id);
  };

  const getCharactersByType = (type: CharacterType | 'all'): Character[] => {
    if (type === 'all') {
      return characters;
    }
    return characters.filter(character => character.type === type);
  };

  const getTopCharacters = (limit: number) => {
    return [...characters]
      .sort((a, b) => b.voteCount - a.voteCount)
      .slice(0, limit);
  };

  const getRandomCharacters = (limit: number) => {
    return [...characters]
      .sort(() => Math.random() - 0.5)
      .slice(0, limit);
  };

  const addCharacter = (character: Omit<Character, 'id' | 'votes' | 'voteCount'> & { id?: string }) => {
    const newCharacter: Character = {
      id: character.id || crypto.randomUUID(),
      name: character.name,
      type: character.type,
      power: character.power,
      description: character.description,
      image: character.image,
      allies: character.allies || [],
      rivals: character.rivals || [],
      votes: [],
      voteCount: 0,
      phrase: character.phrase,
      appearances: character.appearances || [],
      abilities: character.abilities || [],
      biography: character.biography || ''
    };

    setCharacters(prevCharacters => [...prevCharacters, newCharacter]);
    
    // Registrar el personaje creado en el perfil del usuario
    if (user) {
      addCreatedCharacter(newCharacter.id);
    }
    
    toast.success('¡Personaje creado con éxito!');
  };

  const updateCharacter = (character: Character) => {
    // Asegurarnos de que los votos sean siempre un array
    const updatedCharacter = {
      ...character,
      votes: Array.isArray(character.votes) ? character.votes : [],
      voteCount: typeof character.voteCount === 'number' ? character.voteCount : 0
    };

    setCharacters(prevCharacters =>
      prevCharacters.map(char =>
        char.id === character.id ? updatedCharacter : char
      )
    );
    toast.success('¡Personaje actualizado con éxito!');
  };

  const deleteCharacter = (id: string) => {
    setCharacters(prevCharacters => 
      prevCharacters.filter(char => char.id !== id)
    );
    toast.success('Personaje eliminado con éxito');
  };

  const voteForCharacter = async (characterId: string) => {
    try {
      if (!user) {
        toast.error('Debes iniciar sesión para votar');
        return;
      }

      const userId = user.id;
      const characterIndex = characters.findIndex(char => char.id === characterId);
      
      if (characterIndex === -1) {
        toast.error('Personaje no encontrado');
        return;
      }

      const character = characters[characterIndex];
      const votes = Array.isArray(character.votes) ? character.votes : [];
      const hasVoted = votes.includes(userId);

      const updatedCharacters = [...characters];
      if (hasVoted) {
        // Quitar voto
        updatedCharacters[characterIndex] = {
          ...character,
          votes: votes.filter(id => id !== userId),
          voteCount: Math.max(0, character.voteCount - 1)
        };
        
        // Actualizar perfil del usuario
        removeVotedCharacter(characterId);
        
        toast.success('Voto eliminado');
      } else {
        // Añadir voto
        updatedCharacters[characterIndex] = {
          ...character,
          votes: [...votes, userId],
          voteCount: (character.voteCount || 0) + 1
        };
        
        // Actualizar perfil del usuario
        addVotedCharacter(characterId);
        
        toast.success('¡Voto registrado!');
      }
      
      setCharacters(updatedCharacters);
      
    } catch (error) {
      console.error('Error al votar:', error);
      toast.error('Error al procesar el voto');
    }
  };

  const hasUserVotedFor = (characterId: string, userId: string) => {
    const character = characters.find(char => char.id === characterId);
    if (!character) return false;
    const votes = Array.isArray(character.votes) ? character.votes : [];
    return votes.includes(userId);
  };

  return (
    <CharacterContext.Provider
      value={{
        characters,
        loading,
        error,
        addCharacter,
        updateCharacter,
        deleteCharacter,
        getTopCharacters,
        getCharacterById,
        getRandomCharacters,
        voteForCharacter,
        hasUserVotedFor,
      }}
    >
      {children}
    </CharacterContext.Provider>
  );
};

export const useCharacters = () => {
  const context = useContext(CharacterContext);
  if (context === undefined) {
    throw new Error('useCharacters must be used within a CharacterProvider');
  }
  return context;
};
