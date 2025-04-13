import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sword, Swords, ZapIcon, Flame, Droplets, 
  Mountain, Wind, Skull, Trophy, Share2
} from 'lucide-react';

// Lista de personajes para la simulación
const battleCharacters = [
  { id: 1, name: "Bombardino coccodrillo", emoji: "🐊", image: "images/Bombardino%20Crocodillo.webp", power: 85, type: "acuático", speciality: "mordisco" },
  { id: 2, name: "Tralalero Tralala", emoji: "🎵", image: "images/Tralalero%20Tralala.webp", power: 75, type: "musical", speciality: "hipnosis" },
  { id: 3, name: "Bombombini Gusini", emoji: "💥", image: "placeholder.svg", power: 80, type: "explosivo", speciality: "bombas" },
  { id: 4, name: "Tung tung tung sahur", emoji: "🥁", image: "placeholder.svg", power: 70, type: "rítmico", speciality: "percusión" },
  { id: 5, name: "La vaca saturno saturnita", emoji: "🐄", image: "placeholder.svg", power: 90, type: "cósmico", speciality: "gravedad" },
  { id: 6, name: "Frigo Camelo", emoji: "❄️", image: "placeholder.svg", power: 75, type: "glacial", speciality: "congelación" },
  { id: 7, name: "Akulini Cactusini", emoji: "🌵", image: "placeholder.svg", power: 65, type: "desértico", speciality: "espinas" },
  { id: 8, name: "Bobritto bandito", emoji: "🦫", image: "placeholder.svg", power: 60, type: "constructor", speciality: "presas" }
];

// Lista de escenarios
const battleScenarios = [
  { id: 1, name: "Agua", emoji: "🌊", advantage: "acuático", disadvantage: "desértico" },
  { id: 2, name: "Desierto", emoji: "🏜️", advantage: "desértico", disadvantage: "acuático" },
  { id: 3, name: "Ciudad", emoji: "🏙️", advantage: "ninguno", disadvantage: "ninguno" },
  { id: 4, name: "Espacio", emoji: "🌌", advantage: "cósmico", disadvantage: "acuático" },
  { id: 5, name: "Escenario musical", emoji: "🎭", advantage: "musical", disadvantage: "explosivo" },
  { id: 6, name: "Montañas", emoji: "⛰️", advantage: "constructor", disadvantage: "glacial" }
];

// Componente para tarjeta de selección de personaje
const CharacterSelectCard = ({ character, isSelected, onSelect }) => (
  <div 
    className={`relative rounded-lg overflow-hidden cursor-pointer transition-all duration-300 transform ${
      isSelected ? 'ring-4 ring-brainrot-turquoise scale-105' : 'hover:scale-105'
    }`}
    onClick={onSelect}
  >
    <div className="relative h-28 bg-brainrot-darker">
      <img 
        src={character.image} 
        alt={character.name}
        className="h-full w-full object-contain"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = "placeholder.svg";
        }}
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <div className="flex items-center">
          <span className="mr-1">{character.emoji}</span>
          <span className="text-xs font-semibold text-white truncate">{character.name}</span>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute inset-0 bg-brainrot-blue/20 flex items-center justify-center">
          <div className="bg-brainrot-darker/80 rounded-full p-1">
            <Sword className="h-8 w-8 text-brainrot-turquoise" />
          </div>
        </div>
      )}
    </div>
    
    <div className="bg-brainrot-light px-2 py-1">
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-300">Poder: {character.power}</span>
        <span className="text-brainrot-turquoise">{character.type}</span>
      </div>
    </div>
  </div>
);

// Componente de marcador de fútbol
const BattleScoreboard = ({ fighter1, fighter2, score1, score2, environment, winner }) => {
  return (
    <div className="my-4 sm:my-6 relative overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-xl shadow-xl p-1">
        <div className="bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-xl p-3 sm:p-4 border border-emerald-500/30">
          {/* Cabecera del marcador */}
          <div className="bg-gradient-to-r from-emerald-900/80 to-emerald-800/80 rounded-t-lg p-2 text-center mb-3 sm:mb-4 border-b border-emerald-500/30">
            <h3 className="text-white font-mono tracking-widest text-xs sm:text-sm">
              {environment && `ESCENARIO: ${environment.toUpperCase()}`}
            </h3>
          </div>
          
          {/* Equipos y marcador */}
          <div className="flex items-center justify-between">
            <div className={`flex-1 text-center p-2 sm:p-3 rounded-l-lg ${winner === fighter1.name ? 'bg-green-800/40' : 'bg-emerald-900/40'}`}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brainrot-darker rounded-full mb-1 sm:mb-2 overflow-hidden">
                  <img 
                    src={fighter1.image} 
                    alt={fighter1.name}
                    className="w-full h-full object-contain"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg"; 
                    }}
                  />
                </div>
                <div className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-1 px-1">{fighter1.name}</div>
                <div className="bg-white/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 mx-auto flex items-center justify-center">
                  <span className="text-xl sm:text-3xl font-bold text-white">{score1}</span>
                </div>
              </div>
            </div>
            
            <div className="mx-1 sm:mx-2 p-1 sm:p-2 bg-emerald-900 rounded-lg shadow-inner">
              <span className="text-xl sm:text-2xl font-bold text-white">VS</span>
            </div>
            
            <div className={`flex-1 text-center p-2 sm:p-3 rounded-r-lg ${winner === fighter2.name ? 'bg-green-800/40' : 'bg-emerald-900/40'}`}>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brainrot-darker rounded-full mb-1 sm:mb-2 overflow-hidden">
                  <img 
                    src={fighter2.image} 
                    alt={fighter2.name}
                    className="w-full h-full object-contain"
                    onError={(e) => { 
                      const target = e.target as HTMLImageElement;
                      target.src = "/placeholder.svg"; 
                    }}
                  />
                </div>
                <div className="text-sm sm:text-lg font-bold text-white mb-1 sm:mb-2 line-clamp-1 px-1">{fighter2.name}</div>
                <div className="bg-white/10 rounded-full w-8 h-8 sm:w-10 sm:h-10 mx-auto flex items-center justify-center">
                  <span className="text-xl sm:text-3xl font-bold text-white">{score2}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ganador */}
          <div className="mt-3 sm:mt-4 text-center bg-emerald-900/60 py-1 sm:py-2 rounded-b-lg border-t border-emerald-500/30">
            <div className="text-yellow-300 font-bold flex items-center justify-center text-sm sm:text-base">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
              GANADOR: {winner}
            </div>
          </div>
        </div>
      </div>
      
      {/* Elementos gráficos decorativos */}
      <div className="absolute -bottom-4 -left-4 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
      <div className="absolute -top-4 -right-4 w-12 h-12 sm:w-16 sm:h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
    </div>
  );
};

// Componente para las estadísticas de batalla
const BattleStats = ({ stats }) => {
  return (
    <div className="bg-brainrot-darker rounded-lg p-3 sm:p-4 my-3 sm:my-4">
      <h4 className="text-brainrot-turquoise font-semibold mb-2 sm:mb-3 text-sm sm:text-base">Estadísticas de batalla</h4>
      <div className="space-y-2 sm:space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="grid grid-cols-3 items-center gap-1 sm:gap-2">
            <div className="text-right text-xs sm:text-sm text-gray-300">{stat.fighter1Value}%</div>
            <div className="relative h-2 bg-gray-700 rounded-full w-full col-span-1">
              <div 
                className="absolute left-0 top-0 h-2 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise rounded-full"
                style={{ width: `${stat.fighter1Value}%` }}
              ></div>
              <div 
                className="absolute right-0 top-0 h-2 bg-gradient-to-l from-brainrot-blue to-red-500 rounded-full"
                style={{ width: `${stat.fighter2Value}%` }}
              ></div>
            </div>
            <div className="text-left text-xs sm:text-sm text-gray-300">{stat.fighter2Value}%</div>
            <div className="text-right text-xs text-gray-400 truncate">{stat.label}</div>
            <div className="h-0 col-span-1"></div>
            <div className="text-left text-xs text-gray-400 truncate">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Componente del simulador de batalla
const BattleSimulator = () => {
  const [fighter1, setFighter1] = useState(null);
  const [fighter2, setFighter2] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [battleResult, setBattleResult] = useState(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [battleStats, setBattleStats] = useState(null);
  const [showCharacterSelect, setShowCharacterSelect] = useState(false);
  const [selectingFighter, setSelectingFighter] = useState(null);

  // Asegurar que todas las imágenes de personajes tengan rutas correctas
  const charactersWithImages = battleCharacters.map(char => ({
    ...char,
    image: char.image.includes('placeholder') ? `/images/${char.name.toLowerCase().replace(/\s+/g, '-')}.webp` : char.image
  }));

  // Función para simular una batalla
  const simulateBattle = () => {
    if (!fighter1 || !fighter2 || !scenario) return;
    
    setIsSimulating(true);
    
    // Tiempo para efecto de "calculando resultado"
    setTimeout(() => {
      // Calcular ventajas basadas en escenario
      let fighter1Power = fighter1.power;
      let fighter2Power = fighter2.power;
      
      // Ventajas por tipo
      if (fighter1.type === scenario.advantage) fighter1Power += 15;
      if (fighter1.type === scenario.disadvantage) fighter1Power -= 10;
      if (fighter2.type === scenario.advantage) fighter2Power += 15;
      if (fighter2.type === scenario.disadvantage) fighter2Power -= 10;
      
      // Aleatoriedad para hacerlo más interesante
      fighter1Power += Math.floor(Math.random() * 20);
      fighter2Power += Math.floor(Math.random() * 20);
      
      // Porcentajes relativos (para las barras de estadísticas)
      const total = fighter1Power + fighter2Power;
      const f1Percent = Math.round((fighter1Power / total) * 100);
      const f2Percent = Math.round((fighter2Power / total) * 100);
      
      // Determinar el ganador
      const winner = fighter1Power > fighter2Power ? fighter1.name : fighter2.name;
      
      // Crear resultado y estadísticas
      setBattleResult({
        fighter1: fighter1,
        fighter2: fighter2,
        scenario: scenario,
        score1: Math.floor(fighter1Power / 10),
        score2: Math.floor(fighter2Power / 10),
        winner: winner
      });
      
      setBattleStats([
        { label: "Poder base", fighter1Value: fighter1.power, fighter2Value: fighter2.power },
        { label: "Ventaja de escenario", fighter1Value: fighter1.type === scenario.advantage ? 75 : 25, fighter2Value: fighter2.type === scenario.advantage ? 75 : 25 },
        { label: "Fortaleza", fighter1Value: f1Percent, fighter2Value: f2Percent },
      ]);
      
      setIsSimulating(false);
    }, 1500);
  };

  // Efecto para simular automáticamente cuando se seleccionan todos los elementos
  useEffect(() => {
    if (fighter1 && fighter2 && scenario) {
      simulateBattle();
    }
  }, [fighter1, fighter2, scenario]);

  // Resetear selecciones
  const resetSimulation = () => {
    setFighter1(null);
    setFighter2(null);
    setScenario(null);
    setBattleResult(null);
    setBattleStats(null);
  };

  // Abrir selector de personajes
  const openCharacterSelect = (fighterNumber) => {
    setSelectingFighter(fighterNumber);
    setShowCharacterSelect(true);
  };

  // Seleccionar personaje
  const handleCharacterSelect = (character) => {
    if (selectingFighter === 1) {
      setFighter1(character);
    } else {
      setFighter2(character);
    }
    setShowCharacterSelect(false);
  };

  // Iconos para los tipos de escenarios
  const getScenarioIcon = (scenarioName) => {
    switch (scenarioName.toLowerCase()) {
      case "agua": return <Droplets className="w-5 h-5 mr-1" />;
      case "desierto": return <Flame className="w-5 h-5 mr-1" />;
      case "ciudad": return <Mountain className="w-5 h-5 mr-1" />;
      case "espacio": return <ZapIcon className="w-5 h-5 mr-1" />;
      case "escenario musical": return <Wind className="w-5 h-5 mr-1" />;
      case "montañas": return <Mountain className="w-5 h-5 mr-1" />;
      default: return <ZapIcon className="w-5 h-5 mr-1" />;
    }
  };

  // Componente de selección de personaje al estilo juego de lucha
  const CharacterSelectModal = () => (
    <AnimatePresence>
      {showCharacterSelect && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2"
          onClick={() => setShowCharacterSelect(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-b from-brainrot-dark to-black p-4 sm:p-6 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-brainrot-turquoise">Selecciona un personaje</h3>
              <Button 
                variant="ghost" 
                onClick={() => setShowCharacterSelect(false)}
                className="text-gray-400 hover:text-white"
              >
                Cerrar
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
              {charactersWithImages.map(character => (
                <motion.div
                  key={character.id}
                  className="cursor-pointer group"
                  whileHover={{ scale: 1.05 }}
                  onClick={() => handleCharacterSelect(character)}
                >
                  <div className="bg-gradient-to-b from-brainrot-darker/80 to-brainrot-dark border-2 border-transparent group-hover:border-brainrot-turquoise rounded-lg overflow-hidden transition-all duration-300">
                    <div className="h-28 sm:h-36 bg-gradient-to-b from-brainrot-darker/50 to-transparent flex items-center justify-center p-2">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="h-full object-contain filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/placeholder.svg";
                        }}
                      />
                    </div>
                    <div className="p-2 sm:p-3 text-center bg-gradient-to-t from-black to-transparent">
                      <h4 className="font-bold text-white text-sm sm:text-md mb-1 group-hover:text-brainrot-turquoise transition-colors truncate">{character.name}</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 truncate">{character.emoji} {character.type}</span>
                        <span className="text-brainrot-turquoise whitespace-nowrap">Poder: {character.power}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="bg-brainrot-dark rounded-xl overflow-hidden shadow-xl border border-brainrot-blue/30">
      <CharacterSelectModal />
      
      <div className="bg-gradient-to-r from-brainrot-darker to-brainrot-dark p-4 border-b border-brainrot-blue/30">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
          <Swords className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-brainrot-turquoise" />
          Simulador de Batallas Épicas
        </h2>
        <p className="text-sm sm:text-base text-gray-400 mt-1">¿Quién ganaría en un enfrentamiento directo? ¡Descúbrelo!</p>
      </div>

      <div className="p-3 sm:p-4">
        {/* Versus screen de selección */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center my-4 sm:my-8 gap-4 sm:gap-0">
          {/* Personaje 1 */}
          <motion.div 
            className="w-full sm:flex-1 text-center"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {fighter1 ? (
              <div 
                className="relative mx-auto cursor-pointer transition-transform hover:scale-105"
                onClick={() => openCharacterSelect(1)}
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-gradient-to-b from-brainrot-blue/20 to-transparent rounded-full p-1">
                  <div className="w-full h-full bg-brainrot-darker/40 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={fighter1.image} 
                      alt={fighter1.name}
                      className="h-full object-contain transform hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-2 sm:mt-3 truncate max-w-[150px] mx-auto">{fighter1.name}</h3>
                <div className="bg-brainrot-darker/60 rounded-full px-3 py-1 inline-flex items-center mt-1">
                  <span className="mr-1">{fighter1.emoji}</span>
                  <span className="text-brainrot-turquoise text-sm">{fighter1.type}</span>
                </div>
              </div>
            ) : (
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-brainrot-darker/40 rounded-full flex items-center justify-center cursor-pointer hover:bg-brainrot-darker/60 transition-all border-2 border-dashed border-brainrot-blue/40"
                onClick={() => openCharacterSelect(1)}
              >
                <div className="text-center">
                  <div className="text-brainrot-turquoise text-4xl sm:text-5xl mb-1 sm:mb-2">+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Seleccionar</div>
                </div>
              </div>
            )}
          </motion.div>
          
          {/* VS - En móvil se muestra entre personajes como un divisor */}
          <div className="sm:mx-6 sm:z-10 -my-2 sm:my-0">
            <div className="relative">
              <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-2xl sm:text-3xl font-bold w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center shadow-lg border-4 border-brainrot-darker">
                VS
              </div>
              <div className="absolute -inset-3 bg-red-600/20 rounded-full blur-lg animate-pulse"></div>
            </div>
          </div>
          
          {/* Personaje 2 */}
          <motion.div 
            className="w-full sm:flex-1 text-center"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {fighter2 ? (
              <div 
                className="relative mx-auto cursor-pointer transition-transform hover:scale-105"
                onClick={() => openCharacterSelect(2)}
              >
                <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-gradient-to-b from-red-600/20 to-transparent rounded-full p-1">
                  <div className="w-full h-full bg-brainrot-darker/40 rounded-full flex items-center justify-center overflow-hidden">
                    <img 
                      src={fighter2.image} 
                      alt={fighter2.name}
                      className="h-full object-contain transform hover:scale-110 transition-transform duration-300"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white mt-2 sm:mt-3 truncate max-w-[150px] mx-auto">{fighter2.name}</h3>
                <div className="bg-brainrot-darker/60 rounded-full px-3 py-1 inline-flex items-center mt-1">
                  <span className="mr-1">{fighter2.emoji}</span>
                  <span className="text-red-400 text-sm">{fighter2.type}</span>
                </div>
              </div>
            ) : (
              <div 
                className="w-28 h-28 sm:w-36 sm:h-36 mx-auto bg-brainrot-darker/40 rounded-full flex items-center justify-center cursor-pointer hover:bg-brainrot-darker/60 transition-all border-2 border-dashed border-red-500/40"
                onClick={() => openCharacterSelect(2)}
              >
                <div className="text-center">
                  <div className="text-red-500 text-4xl sm:text-5xl mb-1 sm:mb-2">+</div>
                  <div className="text-gray-400 text-xs sm:text-sm">Seleccionar</div>
                </div>
              </div>
            )}
          </motion.div>
        </div>

        {/* Selección de escenario */}
        <div className="my-6 sm:my-8">
          <h3 className="text-base sm:text-lg font-bold text-brainrot-turquoise mb-3 sm:mb-4 text-center">Escenario de batalla</h3>
          <div className="flex flex-wrap justify-center gap-2">
            {battleScenarios.map((scene) => (
              <motion.div
                key={scene.id}
                whileHover={{ scale: 1.05 }}
                className={`cursor-pointer px-2 py-1 sm:px-3 sm:py-2 rounded-lg flex items-center text-sm sm:text-base ${
                  scenario?.id === scene.id 
                    ? 'bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise text-white' 
                    : 'bg-brainrot-darker text-gray-300 hover:bg-brainrot-darker/80'
                }`}
                onClick={() => setScenario(scene)}
              >
                <span className="text-lg sm:text-xl mr-1 sm:mr-2">{scene.emoji}</span>
                <span>{scene.name}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex justify-center mt-4 sm:mt-6 space-x-3 sm:space-x-4">
          <Button
            onClick={simulateBattle}
            disabled={!fighter1 || !fighter2 || !scenario || isSimulating}
            className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 sm:px-8 py-3 sm:py-6 rounded-xl shadow-lg hover:shadow-red-500/20 text-sm sm:text-base"
          >
            {isSimulating ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Simulando...
              </span>
            ) : (
              <span className="flex items-center">
                <Swords className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                ¡LUCHAR!
              </span>
            )}
          </Button>
          
          <Button
            onClick={resetSimulation}
            variant="outline"
            className="border-gray-600 text-gray-400 hover:text-white text-sm sm:text-base py-3 sm:py-6"
          >
            Reiniciar
          </Button>
        </div>

        {/* Resultados */}
        <AnimatePresence>
          {battleResult && !isSimulating && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="mt-6 sm:mt-8"
            >
              <div className="border-t border-brainrot-blue/30 pt-4 sm:pt-6">
                <h3 className="text-center text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 flex items-center justify-center">
                  <Trophy className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-yellow-500" />
                  Resultado de la Batalla
                </h3>
                
                <BattleScoreboard 
                  fighter1={battleResult.fighter1}
                  fighter2={battleResult.fighter2}
                  score1={battleResult.score1}
                  score2={battleResult.score2}
                  environment={battleResult.scenario.name}
                  winner={battleResult.winner}
                />
                
                {battleStats && <BattleStats stats={battleStats} />}
                
                <div className="mt-4 flex justify-center">
                  <Button 
                    className="bg-brainrot-darker text-brainrot-turquoise border border-brainrot-blue/30 flex items-center text-sm sm:text-base"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Compartir resultado
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const BattleFAQPage = () => {
  return (
    <>
      <Helmet>
        <title>Batallas Épicas | Bombardino Universe</title>
        <meta name="description" content="Descubre quién ganaría en las batallas más épicas del universo Bombardino. Bombardino Coccodrillo vs Tralalero y muchas más." />
        <meta name="keywords" content="bombardino coccodrillo, tralalero tralala, batallas, peleas, versus, quien ganaría, batallas épicas" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
      </Helmet>

      <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-3 sm:mb-4 text-white"
        >
          BATALLAS ÉPICAS
        </motion.h1>

        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise mx-auto mb-6 sm:mb-8"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        ></motion.div>

        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block px-3 py-1 bg-brainrot-light text-brainrot-turquoise rounded-full text-sm font-semibold">
            ¿QUIÉN GANARÍA?
          </span>
        </div>
        
        {/* Simulador de batallas */}
        <div className="mb-8 sm:mb-12">
          <BattleSimulator />
        </div>

        <Tabs defaultValue="bombardino-tralalero" className="max-w-4xl mx-auto">
          <TabsList className="bg-brainrot-dark grid w-full grid-cols-3 mb-6 sm:mb-8 text-xs sm:text-sm">
            <TabsTrigger value="bombardino-tralalero" className="data-[state=active]:bg-brainrot-blue">Bombardino vs Tralalero</TabsTrigger>
            <TabsTrigger value="otros-clasicos" className="data-[state=active]:bg-brainrot-blue">Otras Batallas</TabsTrigger>
            <TabsTrigger value="escenarios" className="data-[state=active]:bg-brainrot-blue">Escenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="bombardino-tralalero" className="space-y-6">
            {/* Estadísticas */}
            <BattleStats 
              stats={[
                { label: "Fuerza", fighter1Value: 75, fighter2Value: 40 },
                { label: "Agilidad", fighter1Value: 60, fighter2Value: 70 },
                { label: "Resistencia", fighter1Value: 80, fighter2Value: 55 },
                { label: "Habilidad especial", fighter1Value: 65, fighter2Value: 85 },
              ]}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
              {/* Agua */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-brainrot-turquoise">Batalla en agua</h3>
                <BattleScoreboard 
                  fighter1={battleCharacters[0]} 
                  fighter2={battleCharacters[1]}
                  score1="9"
                  score2="1"
                  environment="Agua"
                  winner="Bombardino coccodrillo"
                />
                <p className="text-gray-300 mt-2 text-xs sm:text-sm px-2 sm:px-4">
                  En el agua, Bombardino tiene una ventaja casi total gracias a su naturaleza acuática.
                </p>
              </div>
              
              {/* Desierto */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-brainrot-turquoise">Batalla en desierto</h3>
                <BattleScoreboard 
                  fighter1={battleCharacters[0]} 
                  fighter2={battleCharacters[1]}
                  score1="4"
                  score2="6"
                  environment="Desierto"
                  winner="Tralalero Tralala"
                />
                <p className="text-gray-300 mt-2 text-xs sm:text-sm px-2 sm:px-4">
                  En el desierto, la piel de Bombardino se seca, dando ventaja a Tralalero.
                </p>
              </div>
            </div>
            
            <div className="bg-brainrot-light p-4 sm:p-6 rounded-xl mt-6 sm:mt-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">Historial de Enfrentamientos</h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="bg-brainrot-dark p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-gray-300 text-xs sm:text-sm">La Gran Batalla del Pantano (2018)</span>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-brainrot-blue font-bold">B</span>
                      <span className="bg-brainrot-blue w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">1</span>
                      <span className="text-gray-400">-</span>
                      <span className="bg-gray-700 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">0</span>
                      <span className="text-gray-300 font-bold">T</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brainrot-dark p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-gray-300 text-xs sm:text-sm">El Duelo Musical (2019)</span>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-gray-300 font-bold">B</span>
                      <span className="bg-gray-700 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">0</span>
                      <span className="text-gray-400">-</span>
                      <span className="bg-brainrot-blue w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">1</span>
                      <span className="text-brainrot-blue font-bold">T</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brainrot-dark p-3 sm:p-4 rounded-lg">
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-gray-300 text-xs sm:text-sm">El Enfrentamiento en Roma (2020)</span>
                    <div className="flex items-center space-x-2 sm:space-x-3">
                      <span className="text-brainrot-blue font-bold">B</span>
                      <span className="bg-brainrot-blue w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">2</span>
                      <span className="text-gray-400">-</span>
                      <span className="bg-gray-700 w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center text-white text-xs sm:text-sm">1</span>
                      <span className="text-gray-300 font-bold">T</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="otros-clasicos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {/* Bombombini vs Tung tung */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-brainrot-turquoise">Batalla explosiva</h3>
                <BattleScoreboard 
                  fighter1={battleCharacters[2]} 
                  fighter2={battleCharacters[3]}
                  score1="5"
                  score2="5"
                  environment="Campo abierto"
                  winner="Empate"
                />
              </div>
              
              {/* Bobritto vs La vaca */}
              <div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-brainrot-turquoise">Batalla cósmica</h3>
                <BattleScoreboard 
                  fighter1={battleCharacters[7]} 
                  fighter2={battleCharacters[4]}
                  score1="3"
                  score2="7"
                  environment="Espacio"
                  winner="La vaca saturno saturnita"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="escenarios">
            <div className="space-y-6 sm:space-y-8">
              {/* Acuático */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-brainrot-turquoise border-b border-brainrot-blue/30 pb-2">
                  Batallas Acuáticas
                </h3>
                <div className="bg-gradient-to-r from-blue-900/50 to-brainrot-dark rounded-lg p-3 sm:p-4">
                  <div className="flex flex-wrap gap-2 mb-3 sm:mb-4">
                    <span className="inline-block px-2 py-1 bg-blue-700/30 text-white rounded text-xs">🏊 Ambiente acuático</span>
                    <span className="inline-block px-2 py-1 bg-blue-700/30 text-white rounded text-xs">💧 Alta humedad</span>
                    <span className="inline-block px-2 py-1 bg-blue-700/30 text-white rounded text-xs">🌊 Corrientes</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-brainrot-darker p-2 sm:p-3 rounded-lg">
                      <span className="text-white font-semibold text-xs sm:text-sm">1. Bombardino Coccodrillo</span>
                      <div className="w-16 sm:w-24 h-2 sm:h-3 bg-gray-700 rounded-full">
                        <div className="h-2 sm:h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
};

export default BattleFAQPage; 