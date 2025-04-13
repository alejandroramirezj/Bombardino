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
  { id: 1, name: "Bombardino coccodrillo", emoji: "🐊", image: "images/Bombardino%20Coccodrillo.webp", power: 85, type: "acuático", speciality: "mordisco" },
  { id: 2, name: "Tralalero Tralala", emoji: "🎵", image: "images/Tralalero%20Tralala.webp", power: 75, type: "musical", speciality: "hipnosis" },
  { id: 3, name: "Bombombini Gusini", emoji: "💥", image: "images/Bombombini%20Gusini.webp", power: 80, type: "explosivo", speciality: "bombas" },
  { id: 4, name: "Tung tung tung sahur", emoji: "🥁", image: "images/Tung%20Tung%20Tung%20Sahur.webp", power: 70, type: "rítmico", speciality: "percusión" },
  { id: 5, name: "La vaca saturno saturnita", emoji: "🐄", image: "images/La%20Vaca%20Saturno%20Saturnita.webp", power: 90, type: "cósmico", speciality: "gravedad" },
  { id: 6, name: "Frigo Camelo", emoji: "❄️", image: "images/Frigo%20Camelo.webp", power: 75, type: "glacial", speciality: "congelación" },
  { id: 7, name: "Akulini Cactusini", emoji: "🌵", image: "images/Akulini%20Cactusini.webp", power: 65, type: "desértico", speciality: "espinas" },
  { id: 8, name: "Bobritto bandito", emoji: "🦫", image: "images/Bobritto%20Bandito.webp", power: 60, type: "constructor", speciality: "presas" }
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
    <div className="relative h-28 bg-brainrot-darker flex items-center justify-center">
      <img 
        src={character.image} 
        alt={character.name}
        className="h-full w-full object-contain object-center"
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
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brainrot-darker rounded-full mb-1 sm:mb-2 overflow-hidden flex items-center justify-center">
                  <img 
                    src={fighter1.image} 
                    alt={fighter1.name}
                    className="w-full h-full object-contain object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "placeholder.svg";
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
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-brainrot-darker rounded-full mb-1 sm:mb-2 overflow-hidden flex items-center justify-center">
                  <img 
                    src={fighter2.image} 
                    alt={fighter2.name}
                    className="w-full h-full object-contain object-center"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "placeholder.svg";
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

// Añadir función generadora de narrativas de batalla
const generateBattleNarrative = (fighter1, fighter2, scenario, winner) => {
  // Identificar quién ganó y quién perdió
  const winnerFighter = winner === fighter1.name ? fighter1 : fighter2;
  const loserFighter = winner === fighter1.name ? fighter2 : fighter1;
  
  // Ventajas según escenario
  const winnerHasAdvantage = winnerFighter.type === scenario.advantage;
  const loserHasDisadvantage = loserFighter.type === scenario.disadvantage;
  
  // Narrativas específicas según personajes y escenarios
  const narratives = {
    // Bombardino
    "Bombardino coccodrillo": {
      attacks: [
        "un potente coletazo que dejó sin aliento a",
        "una mordida fulminante que sorprendió a",
        "su ataque especial 'Mandíbula Trituracohetes' contra",
        "una embestida desde el agua que derribó a"
      ],
      finishers: [
        `lanzó un gran chorro de agua a presión que dejó fuera de combate a ${loserFighter.name}`,
        `giró en espiral creando un remolino que arrastró a ${loserFighter.name}`,
        `usó su técnica especial "Bombardeo Acuático" que ${loserFighter.name} no pudo esquivar`,
        `nadó en círculos a gran velocidad creando una trampa de la que ${loserFighter.name} no pudo escapar`
      ],
      defeats: [
        `intentó su ataque acuático pero ${winnerFighter.name} fue más rápido`,
        `no pudo mantener su fuerza fuera del agua y ${winnerFighter.name} aprovechó la oportunidad`,
        `resbaló en el terreno desfavorable y ${winnerFighter.name} aprovechó el descuido`
      ]
    },
    // Tralalero
    "Tralalero Tralala": {
      attacks: [
        "una melodía hipnótica que confundió a",
        "un riff de guitarra ensordecedor contra",
        "una lluvia de notas musicales afiladas hacia",
        "su ataque sónico que desestabilizó a"
      ],
      finishers: [
        `tocó su solo de guitarra "Tralalazo Ensordecedor" dejando paralizado a ${loserFighter.name}`,
        `lanzó su micrófono como un proyectil que impactó directamente en ${loserFighter.name}`,
        `creó una onda de sonido tan potente que ${loserFighter.name} salió volando por los aires`,
        `usó sus zapatillas de la suerte para golpear a ${loserFighter.name} en un punto débil`
      ],
      defeats: [
        `intentó hipnotizar con su música pero ${winnerFighter.name} tapó sus oídos a tiempo`,
        `falló su nota musical más poderosa y ${winnerFighter.name} contraatacó implacablemente`,
        `tropezó con sus propios cables mientras actuaba y ${winnerFighter.name} no perdonó el error`
      ]
    },
    // Bombombini
    "Bombombini Gusini": {
      attacks: [
        "una explosión controlada que sorprendió a",
        "una lluvia de pequeñas bombas sobre",
        "un proyectil explosivo que impactó cerca de",
        "su famosa técnica 'Explosión en Cadena' contra"
      ],
      finishers: [
        `desplegó su "Bombazo Supremo" que ${loserFighter.name} no pudo esquivar`,
        `creó una cortina de humo y atacó por sorpresa a ${loserFighter.name}`,
        `calculó perfectamente el tiempo de una explosión retardada que pilló desprevenido a ${loserFighter.name}`,
        `hizo explotar el terreno bajo los pies de ${loserFighter.name} haciéndole perder el equilibrio`
      ],
      defeats: [
        `se le mojó la mecha de su bomba principal y ${winnerFighter.name} aprovechó el momento`,
        `calculó mal el tiempo de explosión y ${winnerFighter.name} esquivó fácilmente el ataque`,
        `se vio afectado por su propia explosión y ${winnerFighter.name} contraatacó`
      ]
    },
    // Tung tung
    "Tung tung tung sahur": {
      attacks: [
        "un ritmo de percusión que mareó a",
        "un golpe de batería que resonó en todo el cuerpo de",
        "una secuencia de golpes rítmicos contra",
        "su técnica especial 'Percusión Paralizante' hacia"
      ],
      finishers: [
        `ejecutó su "Ritmo Demoledor" que ${loserFighter.name} no pudo resistir`,
        `creó vibraciones en el suelo que desequilibraron a ${loserFighter.name}`,
        `aceleró tanto el ritmo de sus tambores que ${loserFighter.name} quedó hipnotizado`,
        `lanzó sus baquetas como proyectiles precisos hacia los puntos débiles de ${loserFighter.name}`
      ],
      defeats: [
        `perdió el ritmo en un momento crucial y ${winnerFighter.name} aprovechó la oportunidad`,
        `rompió su tambor favorito y perdió concentración, momento que ${winnerFighter.name} usó a su favor`,
        `no pudo mantener el tempo adecuado y ${winnerFighter.name} tomó la iniciativa`
      ]
    },
    // La vaca
    "La vaca saturno saturnita": {
      attacks: [
        "un campo gravitacional que aplastó a",
        "un rayo cósmico que impactó cerca de",
        "anillos gravitacionales que atraparon a",
        "su mirada cósmica que desconcertó a"
      ],
      finishers: [
        `alteró la gravedad haciendo flotar y luego caer bruscamente a ${loserFighter.name}`,
        `absorbió la energía espacial y lanzó un "Rayo Galáctico" que ${loserFighter.name} no pudo esquivar`,
        `creó un mini agujero negro que desestabilizó completamente a ${loserFighter.name}`,
        `usó sus anillos cósmicos para atar y derribar a ${loserFighter.name}`
      ],
      defeats: [
        `perdió su conexión cósmica temporalmente y ${winnerFighter.name} lo aprovechó`,
        `se distrajo observando las estrellas y ${winnerFighter.name} atacó por sorpresa`,
        `calculó mal la órbita de su ataque y ${winnerFighter.name} lo esquivó con facilidad`
      ]
    },
    // Frigo Camelo
    "Frigo Camelo": {
      attacks: [
        "una ventisca helada que ralentizó a",
        "proyectiles de hielo afilados contra",
        "una capa de escarcha que dificultó los movimientos de",
        "su técnica 'Aliento Glacial' sobre"
      ],
      finishers: [
        `creó una tormenta de nieve que cegó y desorientó a ${loserFighter.name}`,
        `congeló el suelo haciendo resbalar y caer a ${loserFighter.name}`,
        `formó un bloque de hielo alrededor de las piernas de ${loserFighter.name}, inmovilizándolo`,
        `ejecutó su "Abrazo Polar" que dejó completamente helado a ${loserFighter.name}`
      ],
      defeats: [
        `se derritió parcialmente bajo presión y ${winnerFighter.name} aprovechó su debilidad`,
        `resbaló en su propio hielo y ${winnerFighter.name} atacó decisivamente`,
        `no pudo mantener la temperatura baja y ${winnerFighter.name} ganó ventaja`
      ]
    },
    // Akulini
    "Akulini Cactusini": {
      attacks: [
        "una lluvia de espinas que acribillaron a",
        "arena del desierto en los ojos de",
        "un látigo de cactus que golpeó a",
        "su técnica 'Abrazo Espinoso' contra"
      ],
      finishers: [
        `disparó sus espinas venenosas que paralizaron lentamente a ${loserFighter.name}`,
        `creó una tormenta de arena que desorientó completamente a ${loserFighter.name}`,
        `enterró sus raíces en el suelo y emergió sorpresivamente bajo ${loserFighter.name}`,
        `usó su "Floración Explosiva" liberando polen que adormeció a ${loserFighter.name}`
      ],
      defeats: [
        `no pudo extraer suficiente agua del ambiente y ${winnerFighter.name} notó su debilidad`,
        `perdió varias espinas intentando atacar y ${winnerFighter.name} encontró un punto vulnerable`,
        `se secó temporalmente por el esfuerzo y ${winnerFighter.name} aprovechó el momento`
      ]
    },
    // Bobritto
    "Bobritto bandito": {
      attacks: [
        "una construcción rápida que bloqueó a",
        "un golpe de cola que sorprendió a",
        "una trampa de madera que atrapó a",
        "su técnica 'Mordisco Constructor' sobre"
      ],
      finishers: [
        `construyó una presa en tiempo récord que ahogó el ataque de ${loserFighter.name}`,
        `lanzó troncos afilados como proyectiles que impactaron en ${loserFighter.name}`,
        `creó un laberinto de madera del que ${loserFighter.name} no pudo escapar`,
        `utilizó su "Ingeniería Suprema" para construir una trampa donde cayó ${loserFighter.name}`
      ],
      defeats: [
        `se quedó sin materiales de construcción y ${winnerFighter.name} aprovechó el momento`,
        `su presa se rompió en el peor momento y ${winnerFighter.name} usó esto a su favor`,
        `se distrajo con los detalles de su construcción y ${winnerFighter.name} atacó por sorpresa`
      ]
    }
  };
  
  // Frases específicas por escenario
  const scenarioEffects = {
    "Agua": {
      advantage: "las corrientes de agua amplificaron los movimientos de",
      neutral: "el agua creó condiciones desafiantes para ambos combatientes",
      disadvantage: "el exceso de humedad complicó las acciones de"
    },
    "Desierto": {
      advantage: "la arena y el calor potenciaron las habilidades de",
      neutral: "el calor del desierto afectó a ambos luchadores",
      disadvantage: "la sequedad debilitó considerablemente a"
    },
    "Ciudad": {
      advantage: "el entorno urbano proporcionó ventajas tácticas a",
      neutral: "los edificios y calles crearon un escenario impredecible",
      disadvantage: "la falta de su entorno natural limitó a"
    },
    "Espacio": {
      advantage: "la ausencia de gravedad amplificó los poderes de",
      neutral: "las condiciones espaciales sorprendieron a ambos",
      disadvantage: "la falta de atmósfera complicó la estrategia de"
    },
    "Escenario musical": {
      advantage: "la acústica del lugar potenció las habilidades de",
      neutral: "los instrumentos musicales fueron usados por ambos luchadores",
      disadvantage: "el ruido ambiental interfirió con las técnicas de"
    },
    "Montañas": {
      advantage: "la altura y el terreno escarpado favorecieron a",
      neutral: "el terreno montañoso desafió a ambos combatientes",
      disadvantage: "las pendientes pronunciadas dificultaron los movimientos de"
    }
  };
  
  // Construir la narrativa
  let narrative = "";
  
  // Introducción según el escenario
  narrative += `<div class="text-gray-300 mt-3 mb-5 border-l-4 border-brainrot-turquoise pl-4 py-2 bg-brainrot-darker/30 rounded">`;
  narrative += `<p class="mb-2"><span class="text-brainrot-turquoise font-semibold">Escenario:</span> ${scenario.name}</p>`;
  
  // Efectos del escenario
  if (winnerHasAdvantage) {
    narrative += `<p class="mb-1">${scenarioEffects[scenario.name].advantage} ${winnerFighter.name}.</p>`;
  } else if (loserHasDisadvantage) {
    narrative += `<p class="mb-1">${scenarioEffects[scenario.name].disadvantage} ${loserFighter.name}.</p>`;
  } else {
    narrative += `<p class="mb-1">${scenarioEffects[scenario.name].neutral}.</p>`;
  }
  narrative += `</div>`;
  
  // Desarrollo del combate
  narrative += `<div class="space-y-4 text-gray-200">`;
  
  // Inicio - primeros intercambios
  narrative += `<p>El combate comenzó con ${fighter1.name} y ${fighter2.name} estudiándose mutuamente. 
  <span class="text-brainrot-turquoise">${fighter1.emoji} ${fighter1.name}</span> lanzó ${narratives[fighter1.name].attacks[Math.floor(Math.random() * narratives[fighter1.name].attacks.length)]} 
  <span class="text-red-400">${fighter2.emoji} ${fighter2.name}</span>, quien respondió con ${narratives[fighter2.name].attacks[Math.floor(Math.random() * narratives[fighter2.name].attacks.length)]} 
  su oponente.</p>`;
  
  // Desarrollo - momento crucial
  const momentoDecisivo = Math.random() > 0.5 
    ? `<p>La batalla estuvo reñida hasta que ${scenario.name === "Agua" ? "una ola inesperada" : scenario.name === "Desierto" ? "una tormenta de arena" : scenario.name === "Ciudad" ? "un vehículo pasando cerca" : scenario.name === "Espacio" ? "una lluvia de meteoritos" : scenario.name === "Escenario musical" ? "un cambio de ritmo repentino" : "un derrumbe de rocas"} cambió el curso del combate.</p>`
    : `<p>Ambos intercambiaron golpes, cada uno mostrando sus habilidades especiales. ${fighter1.name} utilizó su especialidad de ${fighter1.speciality} mientras que ${fighter2.name} contraatacó con su ${fighter2.speciality}.</p>`;
  
  narrative += momentoDecisivo;
  
  // Final - resolución
  if (winner === fighter1.name) {
    narrative += `<p class="font-medium">En un movimiento decisivo, <span class="text-white">${fighter1.name}</span> ${narratives[fighter1.name].finishers[Math.floor(Math.random() * narratives[fighter1.name].finishers.length)]}.</p>`;
    narrative += `<p>${fighter2.name} ${narratives[fighter2.name].defeats[Math.floor(Math.random() * narratives[fighter2.name].defeats.length)]}.</p>`;
  } else {
    narrative += `<p class="font-medium">En un movimiento decisivo, <span class="text-white">${fighter2.name}</span> ${narratives[fighter2.name].finishers[Math.floor(Math.random() * narratives[fighter2.name].finishers.length)]}.</p>`;
    narrative += `<p>${fighter1.name} ${narratives[fighter1.name].defeats[Math.floor(Math.random() * narratives[fighter1.name].defeats.length)]}.</p>`;
  }
  
  // Conclusión
  narrative += `<p class="mt-3 text-yellow-300 font-semibold">¡${winner} logró la victoria gracias a su ${winnerFighter.speciality} superior y su increíble adaptación al ${scenario.name.toLowerCase()}!</p>`;
  
  narrative += `</div>`;
  
  return narrative;
};

// Componente para mostrar la narrativa del combate
const BattleNarrative = ({ narrative }) => {
  return (
    <div className="bg-brainrot-darker/80 rounded-lg p-4 my-4 shadow-inner border border-brainrot-blue/20">
      <h3 className="text-lg sm:text-xl font-bold mb-3 text-brainrot-turquoise flex items-center">
        <Sword className="w-5 h-5 mr-2" />
        Desarrollo del Combate
      </h3>
      <div dangerouslySetInnerHTML={{ __html: narrative }} />
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

  // Ya no necesitamos esta transformación pues todas las imágenes tienen rutas correctas
  const charactersWithImages = battleCharacters;

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
      
      // Factores aleatorios para hacer las batallas más realistas
      const randomFactor1 = Math.floor(Math.random() * 30) - 10; // Entre -10 y +20
      const randomFactor2 = Math.floor(Math.random() * 30) - 10; // Entre -10 y +20
      fighter1Power += randomFactor1;
      fighter2Power += randomFactor2;
      
      // Asegurarnos que el poder mínimo sea 1
      fighter1Power = Math.max(fighter1Power, 1);
      fighter2Power = Math.max(fighter2Power, 1);
      
      // Porcentajes relativos (para las barras de estadísticas)
      const total = fighter1Power + fighter2Power;
      const f1Percent = Math.round((fighter1Power / total) * 100);
      const f2Percent = Math.round((fighter2Power / total) * 100);
      
      // Calcular puntuaciones - hacer que sean diferentes, más realistas
      let score1 = Math.floor(fighter1Power / 10);
      let score2 = Math.floor(fighter2Power / 10);
      
      // Asegurar que no sean empates si hay diferencia de poder
      if (score1 === score2 && fighter1Power > fighter2Power) {
        score1 += 1;
      } else if (score1 === score2 && fighter2Power > fighter1Power) {
        score2 += 1;
      }
      
      // Agregar pequeñas variaciones aleatorias para puntuaciones más interesantes
      if (Math.random() > 0.7) {
        score1 += fighter1Power > fighter2Power ? 1 : 0;
      }
      if (Math.random() > 0.7) {
        score2 += fighter2Power > fighter1Power ? 1 : 0;
      }
      
      // Determinar el ganador
      const winner = fighter1Power > fighter2Power ? fighter1.name : fighter2.name;
      
      // Generar la narrativa de la batalla
      const battleNarrative = generateBattleNarrative(fighter1, fighter2, scenario, winner);
      
      // Crear resultado y estadísticas
      setBattleResult({
        fighter1: fighter1,
        fighter2: fighter2,
        scenario: scenario,
        score1: score1,
        score2: score2,
        winner: winner,
        narrative: battleNarrative  // Añadir la narrativa al resultado
      });
      
      setBattleStats([
        { label: "Poder base", fighter1Value: fighter1.power, fighter2Value: fighter2.power },
        { label: "Ventaja de escenario", fighter1Value: fighter1.type === scenario.advantage ? 75 : (fighter1.type === scenario.disadvantage ? 25 : 50), 
          fighter2Value: fighter2.type === scenario.advantage ? 75 : (fighter2.type === scenario.disadvantage ? 25 : 50) },
        { label: "Fortaleza", fighter1Value: f1Percent, fighter2Value: f2Percent },
      ]);
      
      setIsSimulating(false);
    }, 1500);
  };

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
                    <div className="h-28 sm:h-36 bg-brainrot-darker flex items-center justify-center p-2">
                      <img 
                        src={character.image} 
                        alt={character.name}
                        className="h-full object-contain filter drop-shadow-lg transform group-hover:scale-110 transition-transform duration-300"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "placeholder.svg";
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
        {battleResult && !isSimulating ? (
          // Resultado de la batalla
          <div className="mb-4">
            <BattleScoreboard 
              fighter1={battleResult.fighter1}
              fighter2={battleResult.fighter2}
              score1={battleResult.score1}
              score2={battleResult.score2}
              environment={battleResult.scenario.name}
              winner={battleResult.winner}
            />
            
            {/* Añadir la narrativa de la batalla */}
            <BattleNarrative narrative={battleResult.narrative} />
            
            {/* Opcionalmente, aún puedes mostrar las estadísticas si lo deseas */}
            <div className="flex mt-6 mb-2 justify-center">
              <Button
                onClick={() => document.getElementById('battle-stats').classList.toggle('hidden')}
                variant="outline"
                className="text-xs sm:text-sm text-gray-400 hover:text-white"
              >
                Ver estadísticas detalladas
              </Button>
            </div>
            
            <div id="battle-stats" className="hidden">
              {battleStats && <BattleStats stats={battleStats} />}
            </div>
            
            <div className="flex justify-center space-x-4 mt-6">
              <Button 
                onClick={resetSimulation} 
                className="bg-brainrot-darker text-brainrot-turquoise border border-brainrot-blue/30 flex items-center"
              >
                Nueva Batalla
              </Button>
              
              <Button 
                className="bg-brainrot-darker text-gray-300 border border-brainrot-blue/30 flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Compartir
              </Button>
            </div>
          </div>
        ) : (
          // Selección de personajes y escenario
          <>
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
                          className="w-full h-full object-contain object-center"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "placeholder.svg";
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
                          className="w-full h-full object-contain object-center"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "placeholder.svg";
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
            <div className="flex justify-center mt-6 sm:mt-8">
              <Button
                onClick={simulateBattle}
                disabled={!fighter1 || !fighter2 || !scenario || isSimulating}
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-6 sm:px-10 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-red-500/20 text-lg sm:text-xl font-bold"
              >
                {isSimulating ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 sm:mr-3 h-5 w-5 sm:h-6 sm:w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Simulando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Swords className="mr-3 h-5 w-5 sm:h-6 sm:w-6" />
                    ¡LUCHAR!
                  </span>
                )}
              </Button>
            </div>
          </>
        )}
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