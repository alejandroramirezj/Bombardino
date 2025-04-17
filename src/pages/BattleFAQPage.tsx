import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sword, Swords, ZapIcon, Flame, Droplets, 
  Mountain, Wind, Skull, Trophy, Share2,
  ChevronDown, Award, History, User, Bell, X,
  MessageCircle, BarChart, Loader2
} from 'lucide-react';
import initialCharacters from '@/data/characters';
import { Input } from '@/components/ui/input';

// Lista de personajes para la simulación
const battleCharacters = initialCharacters.map(character => ({
  id: character.id,
  name: character.name,
  emoji: character.type === "Galattico" ? "🌌" : 
         character.type === "Anfibio" ? "🐊" : 
         character.type === "Gelatto" ? "🦈" : 
         character.type === "Animalico" ? "💥" : 
         character.type === "Criminale" ? "🦫" : 
         character.type === "Fruttoso" ? "🍎" : 
         character.type === "Metallo" ? "🥁" : 
         character.type === "Musico" ? "🎵" : 
         character.type === "Buffonazzo" ? "🐟" : 
         character.type === "Fiabosco" ? "🐱" : 
         character.type === "Tecnologia" ? "🤖" : 
         character.type === "Aereo" ? "🐒" : 
         character.type === "Musicale" ? "🎭" : 
         character.type === "Sonoro" ? "🔊" : 
         character.type === "Bagno" ? "☕" : "⚡",
  image: character.image,
  power: character.power,
  type: character.type.toLowerCase(),
  speciality: character.abilities && character.abilities.length > 0 ? character.abilities[0].toLowerCase() : "ataque",
  wins: 0,
  losses: 0,
  battles: 0
}));

// Lista de escenarios
const battleScenarios = [
  { id: 1, name: "Agua", emoji: "🌊", advantage: "acuático", disadvantage: "desértico" },
  { id: 2, name: "Desierto", emoji: "🏜️", advantage: "desértico", disadvantage: "acuático" },
  { id: 3, name: "Ciudad", emoji: "🏙️", advantage: "ninguno", disadvantage: "ninguno" },
  { id: 4, name: "Espacio", emoji: "🌌", advantage: "cósmico", disadvantage: "acuático" },
  { id: 5, name: "Escenario musical", emoji: "🎭", advantage: "musical", disadvantage: "explosivo" },
  { id: 6, name: "Montañas", emoji: "⛰️", advantage: "constructor", disadvantage: "glacial" }
];

// Función para obtener la ruta correcta de la imagen
const getImagePath = (character) => {
  try {
    // Si es una URL absoluta, la devolvemos tal cual
    if (character.image && character.image.startsWith('http')) {
      return character.image;
    }
    
    // Si la imagen ya comienza con '/' (ruta absoluta desde la raíz), eliminamos el primer caracter
    if (character.image && character.image.startsWith('/')) {
      return character.image.substring(1);
    }
    
    // Para las rutas relativas, aseguramos que sean correctas
    if (character.image) {
      return character.image;
    }
    
    // Si la imagen no está definida, usamos un nombre basado en el personaje con guiones
    const safeFileName = character.name.replace(/\s+/g, '-');
    return `images/${safeFileName}.webp`;
  } catch (error) {
    console.error("Error al procesar ruta de imagen:", error);
    // En caso de error, devolvemos la ruta original o una ruta de respaldo
    return character.image || 'images/placeholder.webp';
  }
};

// Función para guardar batallas en localStorage
const saveBattle = (battle) => {
  try {
    // Obtener batallas existentes
    const savedBattles = localStorage.getItem('savedBattles');
    let battles = savedBattles ? JSON.parse(savedBattles) : [];
    
    // Añadir ID único y fecha a la batalla
    battle.id = Date.now();
    battle.date = new Date().toISOString();
    battle.userType = localStorage.getItem('userId') ? 'registered' : 'anonymous';
    battle.userId = localStorage.getItem('userId') || 'anon-' + Math.random().toString(36).substring(2, 9);
    
    // Añadir la nueva batalla
    battles.push(battle);
    
    // Limitar a 50 batallas para no sobrecargar localStorage
    if (battles.length > 50) {
      battles = battles.slice(battles.length - 50);
    }
    
    // Guardar en localStorage
    localStorage.setItem('savedBattles', JSON.stringify(battles));
    
    // Actualizar estadísticas de personajes
    updateCharacterStats(battle);
    
    return battle.id;
  } catch (error) {
    console.error("Error al guardar la batalla:", error);
    return null;
  }
};

// Función para actualizar estadísticas de personajes
const updateCharacterStats = (battle) => {
  try {
    // Obtener estadísticas existentes
    const savedStats = localStorage.getItem('characterStats');
    const stats = savedStats ? JSON.parse(savedStats) : {};
    
    // Actualizar estadísticas del ganador
    const winnerName = battle.winner;
    if (!stats[winnerName]) {
      stats[winnerName] = { wins: 0, losses: 0, battles: 0 };
    }
    stats[winnerName].wins += 1;
    stats[winnerName].battles += 1;
    
    // Actualizar estadísticas del perdedor
    const loserName = battle.fighter1.name === winnerName ? battle.fighter2.name : battle.fighter1.name;
    if (!stats[loserName]) {
      stats[loserName] = { wins: 0, losses: 0, battles: 0 };
    }
    stats[loserName].losses += 1;
    stats[loserName].battles += 1;
    
    // Guardar en localStorage
    localStorage.setItem('characterStats', JSON.stringify(stats));
  } catch (error) {
    console.error("Error al actualizar estadísticas:", error);
  }
};

// Función para compartir batalla
const shareBattle = (battleId) => {
  try {
    // Crear URL para compartir
    const shareUrl = `${window.location.origin}${window.location.pathname}?battle=${battleId}`;
    
    // Si está disponible la API de compartir, usarla
    if (navigator.share) {
      navigator.share({
        title: 'Batalla Épica en Bombardino Universe',
        text: '¡Mira esta batalla épica entre personajes del universo Bombardino!',
        url: shareUrl
      });
    } else {
      // Alternativa: copiar al portapapeles
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('¡Enlace copiado al portapapeles!');
      });
    }
  } catch (error) {
    console.error("Error al compartir:", error);
    alert('No se pudo compartir. Intenta copiar la URL manualmente.');
  }
};

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
        src={getImagePath(character)} 
        alt={character.name}
        className="h-full w-full object-contain object-center"
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
                    src={getImagePath(fighter1)} 
                    alt={fighter1.name}
                    className="w-full h-full object-contain object-center"
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
                    src={getImagePath(fighter2)} 
                    alt={fighter2.name}
                    className="w-full h-full object-contain object-center"
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

// Componente para las estadísticas de batalla (versión compacta para móvil)
const BattleStats = ({ stats }) => {
  return (
    <div className="bg-brainrot-darker rounded-lg p-2 sm:p-4 my-2 sm:my-4">
      <h4 className="text-brainrot-turquoise font-semibold mb-2 text-xs sm:text-sm">Estadísticas</h4>
      <div className="space-y-1 sm:space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="grid grid-cols-3 items-center gap-1 sm:gap-2">
            <div className="text-right text-xs text-gray-300">{stat.fighter1Value}%</div>
            <div className="relative h-1.5 sm:h-2 bg-gray-700 rounded-full w-full col-span-1">
              <div 
                className="absolute left-0 top-0 h-1.5 sm:h-2 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise rounded-full"
                style={{ width: `${stat.fighter1Value}%` }}
              ></div>
              <div 
                className="absolute right-0 top-0 h-1.5 sm:h-2 bg-gradient-to-l from-brainrot-blue to-red-500 rounded-full"
                style={{ width: `${stat.fighter2Value}%` }}
              ></div>
            </div>
            <div className="text-left text-xs text-gray-300">{stat.fighter2Value}%</div>
            <div className="text-right text-[10px] sm:text-xs text-gray-400 truncate">{stat.label}</div>
            <div className="h-0 col-span-1"></div>
            <div className="text-left text-[10px] sm:text-xs text-gray-400 truncate">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Añadir función generadora de narrativas de batalla
const generateBattleNarrative = (fighter1, fighter2, scenario, winner) => {
  try {
  // Identificar quién ganó y quién perdió
  const winnerFighter = winner === fighter1.name ? fighter1 : fighter2;
  const loserFighter = winner === fighter1.name ? fighter2 : fighter1;
  
  // Ventajas según escenario
  const winnerHasAdvantage = winnerFighter.type === scenario.advantage;
  const loserHasDisadvantage = loserFighter.type === scenario.disadvantage;
  
    // Narrativas específicas con ataques en italiano
  const narratives = {
    // Bombardino
    "Bombardino coccodrillo": {
      attacks: [
          { name: "Coda Potente", description: "un potente coletazo" },
          { name: "Morso Fulminante", description: "una mordida fulminante" },
          { name: "Mascella Tritamissili", description: "su ataque 'Mandíbula Trituracohetes'" },
          { name: "Carica Acquatica", description: "una embestida acuática" }
      ],
      finishers: [
          { name: "Getto d'Acqua Pressurizzata", description: "chorro de agua a presión" },
          { name: "Vortice Devastante", description: "remolino devastador" },
          { name: "Bombardamento Acquatico", description: "Bombardeo Acuático" },
          { name: "Trappola Acquatica", description: "trampa acuática" }
      ],
      defeats: [
          { name: "Attacco Acquatico Fallito", description: "fallido ataque acuático" },
          { name: "Mancanza d'Acqua", description: "falta de agua" },
          { name: "Terreno Sfavorevole", description: "terreno desfavorable" }
      ]
    },
    // Tralalero
    "Tralalero Tralala": {
      attacks: [
          { name: "Melodia Ipnotica", description: "melodía hipnótica" },
          { name: "Riff di Chitarra", description: "riff de guitarra" },
          { name: "Note Musicali Affilate", description: "notas musicales afiladas" },
          { name: "Attacco Sonico", description: "ataque sónico" }
      ],
      finishers: [
          { name: "Assordante Tralalazo", description: "Tralalazo Ensordecedor" },
          { name: "Proiettile di Microfono", description: "proyectil de micrófono" },
          { name: "Onda Sonora", description: "onda de sonido" },
          { name: "Scarpe Magiche", description: "zapatillas mágicas" }
      ],
      defeats: [
          { name: "Ipnosi Fallita", description: "hipnosis fallida" },
          { name: "Nota Musicale Stonata", description: "nota musical desafinada" },
          { name: "Inciampo nei Cavi", description: "tropiezo con cables" }
        ]
      }
      // Otros personajes se añadirían aquí siguiendo el mismo patrón
    };
    
    // Narrativas genéricas para personajes sin narrativas específicas
    const genericNarratives = {
      attacks: [
        { name: "Attacco Sorprendente", description: "ataque sorprendente" },
        { name: "Manovra Rapida", description: "maniobra rápida" },
        { name: "Colpo Diretto", description: "golpe directo" },
        { name: "Tattica Inaspettata", description: "táctica inesperada" }
      ],
      finishers: [
        { name: "Attacco Più Potente", description: "ataque más poderoso" },
        { name: "Combinazione Perfetta", description: "combinación perfecta" },
        { name: "Opportunità Cruciale", description: "oportunidad crucial" },
        { name: "Movimento Devastante", description: "movimiento devastador" }
      ],
      defeats: [
        { name: "Difesa Fallita", description: "defensa fallida" },
        { name: "Schivata Fallita", description: "esquive fallido" },
        { name: "Errore Tattico", description: "error táctico" }
      ]
    };
    
    // Obtener narrativas para cada luchador o usar genéricas
    const fighter1Narratives = narratives[fighter1.name] || genericNarratives;
    const fighter2Narratives = narratives[fighter2.name] || genericNarratives;
    
    // Seleccionar ataques al azar
    const fighter1Attack = fighter1Narratives.attacks[Math.floor(Math.random() * fighter1Narratives.attacks.length)];
    const fighter2Attack = fighter2Narratives.attacks[Math.floor(Math.random() * fighter2Narratives.attacks.length)];
    const winnerFinisher = winner === fighter1.name 
      ? fighter1Narratives.finishers[Math.floor(Math.random() * fighter1Narratives.finishers.length)]
      : fighter2Narratives.finishers[Math.floor(Math.random() * fighter2Narratives.finishers.length)];
    const loserDefeat = winner === fighter1.name
      ? fighter2Narratives.defeats[Math.floor(Math.random() * fighter2Narratives.defeats.length)]
      : fighter1Narratives.defeats[Math.floor(Math.random() * fighter1Narratives.defeats.length)];
    
    // Construir la narrativa con más elementos visuales
  let narrative = "";
  
    // Panel de escenario visual - usando clase de fondo en lugar de imagen de fondo con URL
    narrative += `
    <div class="relative overflow-hidden rounded-lg mb-4 bg-gradient-to-r from-brainrot-darker to-brainrot-dark border border-brainrot-blue/30">
      <div class="absolute top-0 left-0 w-full h-full opacity-10 bg-brainrot-darker"></div>
      
      <div class="relative p-3 flex items-center justify-between z-10">
        <div class="flex items-center">
          <span class="text-lg mr-2">${scenario.emoji}</span>
          <span class="text-brainrot-turquoise font-semibold">${scenario.name}</span>
        </div>
        
        <div class="bg-brainrot-darker/50 px-2 py-1 rounded-full text-xs">
          ${winnerHasAdvantage ? 
            `<span class="text-green-400">Ventaja: ${winnerFighter.name}</span>` : 
            loserHasDisadvantage ? 
            `<span class="text-red-400">Desventaja: ${loserFighter.name}</span>` : 
            `<span class="text-gray-400">Neutral</span>`
          }
        </div>
      </div>
    </div>`;
    
    // Batalla visual con animaciones y ataques en italiano
    narrative += `
    <div class="grid grid-cols-11 gap-1 mb-6">
      <!-- Luchador 1 con ataques -->
      <div class="col-span-5 pr-1">
        <div class="relative">
          <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-brainrot-darker rounded-full p-1 mb-2 overflow-hidden flex items-center justify-center ${winner === fighter1.name ? 'animate-pulse-slow' : ''}">
            <img src="${getImagePath(fighter1)}" alt="${fighter1.name}" class="w-full h-full object-contain ${winner === fighter1.name ? 'scale-110' : 'opacity-85'}" />
          </div>
          
          <div class="text-xs sm:text-sm font-semibold text-center mb-2 ${winner === fighter1.name ? 'text-brainrot-turquoise' : 'text-gray-400'}">${fighter1.emoji} ${fighter1.name}</div>
          
          <!-- Ataques del luchador 1 -->
          <div class="bg-gradient-to-r from-brainrot-darker to-brainrot-dark rounded-lg p-2 border-l-2 border-brainrot-blue/50">
            <div class="text-xs font-bold mb-1 text-brainrot-blue">ATTACCHI:</div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center text-xs">
                <span class="w-4 h-4 rounded-full bg-brainrot-blue/20 flex items-center justify-center text-[9px] mr-1">⚡</span>
                <span class="text-brainrot-turquoise font-semibold">${fighter1Attack.name}</span>
              </div>
              <div class="text-xs italic text-gray-400">${fighter1Attack.description}</div>
            </div>
          </div>
          
          ${winner === fighter1.name ? `
          <!-- Ataque final del ganador -->
          <div class="bg-gradient-to-r from-yellow-800/30 to-brainrot-dark rounded-lg p-2 border-l-2 border-yellow-600/50 mt-2 animate-pulse-slow">
            <div class="text-xs font-bold mb-1 text-yellow-500">COLPO FINALE:</div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center text-xs">
                <span class="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center text-[9px] mr-1">🏆</span>
                <span class="text-yellow-400 font-semibold">${winnerFinisher.name}</span>
              </div>
              <div class="text-xs italic text-gray-400">${winnerFinisher.description}</div>
            </div>
          </div>
          ` : `
          <!-- Derrota -->
          <div class="bg-gradient-to-r from-red-900/30 to-brainrot-dark rounded-lg p-2 border-l-2 border-red-700/50 mt-2">
            <div class="text-xs font-bold mb-1 text-red-500">SCONFITTA:</div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center text-xs">
                <span class="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px] mr-1">❌</span>
                <span class="text-red-400 font-semibold">${winner === fighter2.name ? loserDefeat.name : ''}</span>
              </div>
              <div class="text-xs italic text-gray-400">${winner === fighter2.name ? loserDefeat.description : ''}</div>
            </div>
          </div>
          `}
        </div>
      </div>
      
      <!-- Indicador central -->
      <div class="col-span-1 flex flex-col items-center justify-center">
        <div class="h-full flex flex-col items-center justify-center">
          <div class="w-8 h-8 rounded-full bg-gradient-to-r from-red-600 to-red-800 flex items-center justify-center text-white font-bold text-xs animate-bounce">VS</div>
          <div class="h-24 w-0.5 bg-gradient-to-b from-red-600/50 to-transparent"></div>
          <div class="w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center text-white font-bold text-xs animate-pulse">
            <Trophy className="w-3 h-3" />
          </div>
        </div>
      </div>
      
      <!-- Luchador 2 con ataques -->
      <div class="col-span-5 pl-1">
        <div class="relative">
          <div class="w-20 h-20 sm:w-24 sm:h-24 mx-auto bg-brainrot-darker rounded-full p-1 mb-2 overflow-hidden flex items-center justify-center ${winner === fighter2.name ? 'animate-pulse-slow' : ''}">
            <img src="${getImagePath(fighter2)}" alt="${fighter2.name}" class="w-full h-full object-contain ${winner === fighter2.name ? 'scale-110' : 'opacity-85'}" />
          </div>
          
          <div class="text-xs sm:text-sm font-semibold text-center mb-2 ${winner === fighter2.name ? 'text-brainrot-turquoise' : 'text-gray-400'}">${fighter2.emoji} ${fighter2.name}</div>
          
          <!-- Ataques del luchador 2 -->
          <div class="bg-gradient-to-l from-brainrot-darker to-brainrot-dark rounded-lg p-2 border-r-2 border-red-500/50">
            <div class="text-xs font-bold mb-1 text-red-400 text-right">ATTACCHI:</div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center text-xs justify-end">
                <span class="text-red-400 font-semibold">${fighter2Attack.name}</span>
                <span class="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px] ml-1">⚡</span>
              </div>
              <div class="text-xs italic text-gray-400 text-right">${fighter2Attack.description}</div>
            </div>
          </div>
          
          ${winner === fighter2.name ? `
          <!-- Ataque final del ganador -->
          <div class="bg-gradient-to-l from-yellow-800/30 to-brainrot-dark rounded-lg p-2 border-r-2 border-yellow-600/50 mt-2 animate-pulse-slow">
            <div class="text-xs font-bold mb-1 text-yellow-500 text-right">COLPO FINALE:</div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center text-xs justify-end">
                <span class="text-yellow-400 font-semibold">${winnerFinisher.name}</span>
                <span class="w-4 h-4 rounded-full bg-yellow-500/20 flex items-center justify-center text-[9px] ml-1">🏆</span>
              </div>
              <div class="text-xs italic text-gray-400 text-right">${winnerFinisher.description}</div>
            </div>
          </div>
          ` : `
          <!-- Derrota -->
          <div class="bg-gradient-to-l from-red-900/30 to-brainrot-dark rounded-lg p-2 border-r-2 border-red-700/50 mt-2">
            <div class="text-xs font-bold mb-1 text-red-500 text-right">SCONFITTA:</div>
            <div class="flex flex-col space-y-1">
              <div class="flex items-center text-xs justify-end">
                <span class="text-red-400 font-semibold">${winner === fighter1.name ? loserDefeat.name : ''}</span>
                <span class="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center text-[9px] ml-1">❌</span>
              </div>
              <div class="text-xs italic text-gray-400 text-right">${winner === fighter1.name ? loserDefeat.description : ''}</div>
            </div>
          </div>
          `}
        </div>
      </div>
    </div>`;
    
    // Estadísticas de batalla mejoradas visualmente
    narrative += `
    <div class="bg-brainrot-darker/50 p-3 rounded-lg mb-4">
      <h4 class="text-sm font-semibold text-white mb-3 flex items-center">
        <svg class="w-4 h-4 mr-1 text-brainrot-turquoise" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><line x1="12" y1="18" x2="12" y2="2"/><line x1="8" y1="7" x2="8" y2="2"/><line x1="16" y1="12" x2="16" y2="2"/><line x1="20" y1="7" x2="16" y2="7"/><line x1="20" y1="12" x2="16" y2="12"/><line x1="20" y1="18" x2="16" y2="18"/><line x1="8" y1="18" x2="4" y2="18"/><line x1="4" y1="12" x2="8" y2="12"/><line x1="8" y1="7" x2="4" y2="7"/></svg>
        Estadísticas de Combate
      </h4>
      
      <div class="space-y-3">
        <!-- Poder Base -->
        <div>
          <div class="flex justify-between items-center text-[10px] mb-1">
            <span>${fighter1.name}</span>
            <span class="text-xs font-semibold text-white">Poder Base</span>
            <span>${fighter2.name}</span>
          </div>
          <div class="relative h-2 bg-brainrot-dark rounded-full overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise rounded-l-full" 
              style="width: ${(fighter1.power / (fighter1.power + fighter2.power)) * 100}%"></div>
            <div class="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-red-500 to-red-400 rounded-r-full"
              style="width: ${(fighter2.power / (fighter1.power + fighter2.power)) * 100}%"></div>
          </div>
          <div class="flex justify-between text-[10px] text-gray-500 mt-1">
            <span>${fighter1.power}</span>
            <span>${fighter2.power}</span>
          </div>
        </div>
        
        <!-- Ventaja por escenario -->
        <div>
          <div class="flex justify-between items-center text-[10px] mb-1">
            <span>${fighter1Narratives.attacks[0].name}</span>
            <span class="text-xs font-semibold text-white">Técnica</span>
            <span>${fighter2Narratives.attacks[0].name}</span>
          </div>
          <div class="relative h-2 bg-brainrot-dark rounded-full overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise rounded-l-full"
              style="width: ${fighter1.type === scenario.advantage ? '65%' : (fighter1.type === scenario.disadvantage ? '35%' : '50%')}"></div>
            <div class="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-red-500 to-red-400 rounded-r-full"
              style="width: ${fighter2.type === scenario.advantage ? '65%' : (fighter2.type === scenario.disadvantage ? '35%' : '50%')}"></div>
          </div>
        </div>
        
        <!-- Resultado final -->
        <div>
          <div class="flex justify-between items-center text-[10px] mb-1">
            <span>${winner === fighter1.name ? winnerFinisher.name : ''}</span>
            <span class="text-xs font-semibold text-yellow-400">Golpe Final</span>
            <span>${winner === fighter2.name ? winnerFinisher.name : ''}</span>
          </div>
          <div class="relative h-2 bg-brainrot-dark rounded-full overflow-hidden">
            <div class="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-l-full" 
              style="width: ${winner === fighter1.name ? '70%' : '30%'}"></div>
            <div class="absolute right-0 top-0 bottom-0 bg-gradient-to-l from-yellow-600 to-yellow-400 rounded-r-full"
              style="width: ${winner === fighter2.name ? '70%' : '30%'}"></div>
          </div>
        </div>
      </div>
    </div>`;
    
    // Banner del ganador animado
    narrative += `
    <div class="relative overflow-hidden bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-lg p-3 text-center mb-2 animate-pulse-slow">
      <div class="absolute inset-0 opacity-20 bg-brainrot-dark"></div>
      <div class="relative z-10">
        <div class="flex items-center justify-center mb-1">
          <svg class="w-5 h-5 mr-2 text-yellow-300" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path></svg>
          <span class="font-bold text-white text-sm sm:text-base">¡${winner} es el vencedor!</span>
        </div>
        <div class="text-xs text-yellow-200 mt-2 px-2">
          <span class="inline-block">Victoria con el golpe final:</span>
          <span class="inline-block font-semibold mt-1">${winner === fighter1.name ? winnerFinisher.name : fighter2Narratives.finishers[Math.floor(Math.random() * fighter2Narratives.finishers.length)].name}</span>
        </div>
      </div>
    </div>`;
  
  return narrative;
  } catch (error) {
    console.error("Error al generar narrativa:", error);
    // Narrativa de respaldo simple en caso de error
    return `
      <div class="bg-brainrot-darker/50 p-3 rounded-lg mb-4 text-center">
        <h4 class="text-sm font-semibold text-white mb-2">Battaglia Epica</h4>
        <div class="my-4 flex justify-center items-center gap-4">
          <div class="text-center">
            <div class="w-16 h-16 mx-auto rounded-full overflow-hidden mb-2">
              <img src="${getImagePath(fighter1)}" alt="${fighter1.name}" class="w-full h-full object-contain ${winner === fighter1.name ? '' : 'opacity-50'}" />
            </div>
            <div class="text-xs">${fighter1.name}</div>
          </div>
          
          <div class="text-xl font-bold">VS</div>
          
          <div class="text-center">
            <div class="w-16 h-16 mx-auto rounded-full overflow-hidden mb-2">
              <img src="${getImagePath(fighter2)}" alt="${fighter2.name}" class="w-full h-full object-contain ${winner === fighter2.name ? '' : 'opacity-50'}" />
            </div>
            <div class="text-xs">${fighter2.name}</div>
          </div>
        </div>
        
        <div class="mt-4 bg-yellow-600/20 py-2 rounded-lg">
          <Trophy class="w-5 h-5 mx-auto text-yellow-500 mb-1" />
          <div class="text-yellow-400 font-semibold">¡${winner} ha ganado la batalla!</div>
        </div>
      </div>
    `;
  }
};

// Componente para mostrar la narrativa del combate (versión mejorada para móvil)
const BattleNarrative = ({ narrative }) => {
  return (
    <div className="bg-brainrot-darker/80 rounded-lg p-2 sm:p-4 my-3 shadow-inner border border-brainrot-blue/20">
      <h3 className="text-base sm:text-lg font-bold mb-2 text-brainrot-turquoise flex items-center">
        <Sword className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2" />
        Desarrollo del Combate
      </h3>
      <div className="text-sm" dangerouslySetInnerHTML={{ __html: narrative }} />
    </div>
  );
};

// Componente para mostrar comentarios de expertos sobre la batalla
const BattleExpertCommentary = ({ fighter1, fighter2, winner }) => {
  // Lista de expertos ficticios
  const experts = [
    { name: "Prof. Aldo Macarroni", specialty: "Estudios de Italian Brainrot", avatar: "🧠" },
    { name: "Marco Spaghetti", specialty: "Analista de Batallas Épicas", avatar: "🍝" },
    { name: "Dra. Giulia Ravioli", specialty: "Psicología de Personajes", avatar: "🎭" },
    { name: "Leonardo DiCaprio", specialty: "Actor y Fan de Bombardino", avatar: "🎬" }
  ];

  // Seleccionar un experto al azar
  const expert = experts[Math.floor(Math.random() * experts.length)];
  
  // Generar comentario según el resultado de la batalla
  const generateComment = () => {
    const comments = [
      `"La técnica de ${winner} fue claramente superior. Su posicionamiento y timing fueron impecables. Mamma mia, che spettacolo!"`,
      `"Lo que acabamos de presenciar es un clásico ejemplo de la superioridad táctica en el universo Bombardino. ${winner} ha estudiado a su oponente perfectamente."`,
      `"Bellissimo combattimento! He visto muchos enfrentamientos, pero la forma en que ${winner} utilizó el escenario a su favor fue magistral."`,
      `"Por un momento pensé que ${winner === fighter1.name ? fighter2.name : fighter1.name} tenía ventaja, pero la capacidad de adaptación de ${winner} cambió completamente el rumbo de la batalla."`
    ];
    return comments[Math.floor(Math.random() * comments.length)];
  };
  
  return (
    <div className="bg-gradient-to-r from-brainrot-darker to-black rounded-lg p-3 mb-4 border-l-4 border-yellow-600">
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-yellow-600/20 flex items-center justify-center text-xl mr-3">
          {expert.avatar}
        </div>
        <div>
          <div className="flex items-center mb-1">
            <h4 className="font-bold text-white text-sm">{expert.name}</h4>
            <span className="ml-2 px-2 py-0.5 bg-yellow-600/20 rounded-full text-yellow-400 text-xs">{expert.specialty}</span>
          </div>
          <p className="text-gray-300 text-sm italic">{generateComment()}</p>
        </div>
      </div>
    </div>
  );
};

// Componente para comentarios de usuarios
const BattleComments = ({ battleId, isAuthenticated }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Cargar comentarios guardados al montar el componente
  useEffect(() => {
    if (battleId) {
      // Simulación de carga de comentarios desde localStorage
      const savedComments = localStorage.getItem(`battle_comments_${battleId}`);
      if (savedComments) {
        setComments(JSON.parse(savedComments));
      }
    }
  }, [battleId]);
  
  // Guardar un nuevo comentario
  const saveComment = () => {
    if (!newComment.trim() || !isAuthenticated) return;
    
    setIsLoading(true);
    
    // Simular una llamada a API
    setTimeout(() => {
      const commentObject = {
        id: Date.now(),
        text: newComment,
        author: localStorage.getItem('userName') || 'Usuario',
        avatar: localStorage.getItem('userAvatar') || '👤',
        timestamp: new Date().toISOString()
      };
      
      const updatedComments = [...comments, commentObject];
      setComments(updatedComments);
      setNewComment('');
      
      // Guardar en localStorage
      localStorage.setItem(`battle_comments_${battleId}`, JSON.stringify(updatedComments));
      
      setIsLoading(false);
    }, 500);
  };
  
  return (
    <div className="bg-brainrot-darker rounded-lg p-3 mt-4">
      <h4 className="text-sm font-bold text-brainrot-turquoise mb-3 flex items-center">
        <MessageCircle className="w-4 h-4 mr-2" />
        Comentarios ({comments.length})
      </h4>
      
      {comments.length > 0 ? (
        <div className="space-y-3 mb-4 max-h-48 overflow-y-auto pr-2">
          {comments.map(comment => (
            <div key={comment.id} className="bg-brainrot-dark p-2 rounded-lg">
              <div className="flex items-center mb-1">
                <span className="w-6 h-6 rounded-full bg-brainrot-blue/20 flex items-center justify-center text-sm mr-2">
                  {comment.avatar}
                </span>
                <span className="text-white text-xs font-semibold">{comment.author}</span>
                <span className="ml-auto text-gray-500 text-xs">{new Date(comment.timestamp).toLocaleTimeString()}</span>
              </div>
              <p className="text-gray-300 text-xs sm:text-sm">{comment.text}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-3 mb-4 text-gray-500 text-sm">
          No hay comentarios. ¡Sé el primero!
        </div>
      )}
      
      {isAuthenticated ? (
        <div className="flex gap-2">
          <Input 
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Añade un comentario..."
            className="text-xs bg-brainrot-dark border-brainrot-blue/30"
          />
          <Button 
            onClick={saveComment} 
            className="bg-brainrot-blue text-white text-xs"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-3 h-3 animate-spin" /> : "Enviar"}
          </Button>
        </div>
      ) : (
        <div className="text-center py-2 bg-brainrot-dark rounded-lg text-xs text-gray-400">
          Inicia sesión para comentar
        </div>
      )}
    </div>
  );
};

// Componente para mostrar el historial de batallas
const BattleHistoryModal = ({ isOpen, onClose, battles }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 touch-none"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-b from-brainrot-dark to-black p-3 sm:p-4 rounded-lg w-[95%] sm:w-full max-w-2xl max-h-[75vh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gradient-to-b from-brainrot-dark to-brainrot-dark/90 flex justify-between items-center mb-2 sm:mb-4 pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-brainrot-turquoise flex items-center">
                <History className="w-5 h-5 mr-2" />
                Historial de Batallas
              </h3>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            {battles && battles.length > 0 ? (
              <div className="space-y-3 sm:space-y-4">
                {battles.slice().reverse().map((battle) => (
                  <div key={battle.id} className="bg-brainrot-darker p-2 sm:p-3 rounded-lg hover:bg-brainrot-darker/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400 text-xs">
                        {new Date(battle.date).toLocaleDateString()}
                      </span>
                      <span className="text-brainrot-turquoise text-xs">
                        {battle.scenario.name}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-brainrot-dark rounded-full overflow-hidden">
                          <img 
                            src={getImagePath(battle.fighter1)} 
                            alt={battle.fighter1.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <span className="text-white text-sm truncate max-w-[80px]">{battle.fighter1.name}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-gray-300 text-sm">{battle.score1}</span>
                        <span className="text-gray-500">-</span>
                        <span className="text-gray-300 text-sm">{battle.score2}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm truncate max-w-[80px]">{battle.fighter2.name}</span>
                        <div className="w-8 h-8 bg-brainrot-dark rounded-full overflow-hidden">
                          <img 
                            src={getImagePath(battle.fighter2)} 
                            alt={battle.fighter2.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-yellow-300 text-xs flex items-center">
                        <Trophy className="w-3 h-3 mr-1" />
                        {battle.winner}
                      </span>
                      <Button 
                        onClick={(e) => {
                          e.stopPropagation();
                          shareBattle(battle.id);
                        }}
                        className="bg-brainrot-blue/30 hover:bg-brainrot-blue/50 text-white text-xs py-1 px-2 rounded"
                      >
                        <Share2 className="w-3 h-3 mr-1" />
                        Compartir
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No hay batallas guardadas</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Componente para mostrar estadísticas por personaje
const CharacterStatsModal = ({ isOpen, onClose }) => {
  const [stats, setStats] = useState({});
  const [sortBy, setSortBy] = useState('battles');
  
  useEffect(() => {
    if (isOpen) {
      const savedStats = localStorage.getItem('characterStats');
      setStats(savedStats ? JSON.parse(savedStats) : {});
    }
  }, [isOpen]);
  
  const sortedCharacters = Object.keys(stats).sort((a, b) => {
    if (sortBy === 'winRate') {
      const rateA = stats[a].wins / stats[a].battles || 0;
      const rateB = stats[b].wins / stats[b].battles || 0;
      return rateB - rateA;
    }
    return stats[b][sortBy] - stats[a][sortBy];
  });
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 touch-none"
          onClick={onClose}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-b from-brainrot-dark to-black p-3 sm:p-4 rounded-lg w-[95%] sm:w-full max-w-2xl max-h-[75vh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gradient-to-b from-brainrot-dark to-brainrot-dark/90 flex justify-between items-center mb-2 sm:mb-4 pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-brainrot-turquoise flex items-center">
                <Award className="w-5 h-5 mr-2" />
                Ranking de Personajes
              </h3>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
            
            <div className="mb-4 flex flex-wrap gap-2">
              <button 
                onClick={() => setSortBy('battles')}
                className={`px-2 py-1 text-xs rounded ${sortBy === 'battles' ? 'bg-brainrot-blue text-white' : 'bg-brainrot-darker text-gray-300'}`}
              >
                Total Batallas
              </button>
              <button 
                onClick={() => setSortBy('wins')}
                className={`px-2 py-1 text-xs rounded ${sortBy === 'wins' ? 'bg-brainrot-blue text-white' : 'bg-brainrot-darker text-gray-300'}`}
              >
                Victorias
              </button>
              <button 
                onClick={() => setSortBy('winRate')}
                className={`px-2 py-1 text-xs rounded ${sortBy === 'winRate' ? 'bg-brainrot-blue text-white' : 'bg-brainrot-darker text-gray-300'}`}
              >
                % Victoria
              </button>
            </div>
            
            {sortedCharacters.length > 0 ? (
              <div className="space-y-2">
                {sortedCharacters.map((characterName, index) => {
                  const character = battleCharacters.find(c => c.name === characterName) || { name: characterName, emoji: "❓" };
                  const characterStats = stats[characterName];
                  const winRate = ((characterStats.wins / characterStats.battles) * 100) || 0;
                  
                  return (
                    <div key={characterName} className="bg-brainrot-darker p-2 sm:p-3 rounded-lg flex items-center">
                      <div className="flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 bg-brainrot-dark rounded-full mr-3 overflow-hidden flex items-center justify-center">
                        {character && 'image' in character && character.image ? (
                          <img src={getImagePath(character)} alt={character.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-xl">{character.emoji}</span>
                        )}
                      </div>
                      
                      <div className="flex-grow">
                        <h4 className="text-white text-sm font-semibold truncate">{characterName}</h4>
                        <div className="flex text-xs text-gray-400 gap-3">
                          <span>{characterStats.battles} batallas</span>
                          <span className="text-green-400">{characterStats.wins} victorias</span>
                          <span className="text-red-400">{characterStats.losses} derrotas</span>
                        </div>
                      </div>
                      
                      <div className="ml-2 flex-shrink-0 w-12 h-12 flex items-center justify-center">
                        <div className="relative w-10 h-10">
                          <svg className="w-10 h-10 transform -rotate-90">
                            <circle
                              cx="20"
                              cy="20"
                              r="15"
                              fill="none"
                              stroke="#333"
                              strokeWidth="5"
                            />
                            <circle
                              cx="20"
                              cy="20"
                              r="15"
                              fill="none"
                              stroke={winRate > 50 ? "#10b981" : "#ef4444"}
                              strokeWidth="5"
                              strokeDasharray={`${winRate}, 100`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white">
                            {Math.round(winRate)}%
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-400">No hay estadísticas disponibles</p>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
  const [showBattleHistory, setShowBattleHistory] = useState(false);
  const [showCharacterStats, setShowCharacterStats] = useState(false);
  const [savedBattles, setSavedBattles] = useState([]);
  const [battleId, setBattleId] = useState(null);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(!!localStorage.getItem('userName'));

  // Cargar batallas guardadas
  useEffect(() => {
    const savedData = localStorage.getItem('savedBattles');
    if (savedData) {
      setSavedBattles(JSON.parse(savedData));
    }
    
    // Comprobar si hay una batalla compartida en la URL
    const params = new URLSearchParams(window.location.search);
    const sharedBattleId = params.get('battle');
    if (sharedBattleId) {
      loadSharedBattle(sharedBattleId);
    }
  }, []);

  // Cargar batalla compartida
  const loadSharedBattle = (battleId) => {
    try {
      const savedData = localStorage.getItem('savedBattles');
      if (savedData) {
        const battles = JSON.parse(savedData);
        const battle = battles.find(b => b.id.toString() === battleId);
        if (battle) {
          setBattleResult(battle);
          setBattleStats([
            { label: "Poder base", fighter1Value: battle.fighter1.power, fighter2Value: battle.fighter2.power },
            { label: "Ventaja escenario", fighter1Value: battle.fighter1.type === battle.scenario.advantage ? 75 : (battle.fighter1.type === battle.scenario.disadvantage ? 25 : 50), 
              fighter2Value: battle.fighter2.type === battle.scenario.advantage ? 75 : (battle.fighter2.type === battle.scenario.disadvantage ? 25 : 50) },
          ]);
        }
      }
    } catch (error) {
      console.error("Error al cargar batalla compartida:", error);
    }
  };

  // Asegurar que todos los personajes estén disponibles
  useEffect(() => {
    // Forzar la recarga de imágenes al montar el componente
    battleCharacters.forEach(character => {
      const img = new Image();
      img.src = getImagePath(character);
    });
  }, []);

  // Función para simular una batalla
  const simulateBattle = () => {
    if (!fighter1 || !fighter2 || !scenario) return;
    
    setIsSimulating(true);
    
    // Ejecutar inmediatamente para mejorar la respuesta en móvil
    // Calcular ventajas basadas en escenario
    let fighter1Power = fighter1.power;
    let fighter2Power = fighter2.power;
    
    // Ventajas por tipo
    if (fighter1.type === scenario.advantage) fighter1Power += 15;
    if (fighter1.type === scenario.disadvantage) fighter1Power -= 10;
    if (fighter2.type === scenario.advantage) fighter2Power += 15;
    if (fighter2.type === scenario.disadvantage) fighter2Power -= 10;
    
    // Factores aleatorios simplificados
    const randomFactor1 = Math.floor(Math.random() * 10);
    const randomFactor2 = Math.floor(Math.random() * 10);
    fighter1Power += randomFactor1;
    fighter2Power += randomFactor2;
    
    // Asegurarnos que el poder mínimo sea 1
    fighter1Power = Math.max(fighter1Power, 1);
    fighter2Power = Math.max(fighter2Power, 1);
    
    // Porcentajes relativos (para las barras de estadísticas)
    const total = fighter1Power + fighter2Power;
    const f1Percent = Math.round((fighter1Power / total) * 100);
    const f2Percent = Math.round((fighter2Power / total) * 100);
    
    // Calcular puntuaciones simplificadas
    let score1 = Math.floor(fighter1Power / 10);
    let score2 = Math.floor(fighter2Power / 10);
    
    if (score1 === score2 && fighter1Power > fighter2Power) {
      score1 += 1;
    } else if (score1 === score2 && fighter2Power > fighter1Power) {
      score2 += 1;
    }
    
    // Determinar el ganador
    const winner = fighter1Power > fighter2Power ? fighter1.name : fighter2.name;
    
    try {
    // Generar la narrativa de la batalla
    const battleNarrative = generateBattleNarrative(fighter1, fighter2, scenario, winner);
    
    // Crear resultado y estadísticas
      const result = {
      fighter1: fighter1,
      fighter2: fighter2,
      scenario: scenario,
      score1: score1,
      score2: score2,
      winner: winner,
      narrative: battleNarrative
      };
      
      setBattleResult(result);
    
    setBattleStats([
      { label: "Poder base", fighter1Value: fighter1.power, fighter2Value: fighter2.power },
      { label: "Ventaja escenario", fighter1Value: fighter1.type === scenario.advantage ? 75 : (fighter1.type === scenario.disadvantage ? 25 : 50), 
        fighter2Value: fighter2.type === scenario.advantage ? 75 : (fighter2.type === scenario.disadvantage ? 25 : 50) },
      { label: "Fortaleza", fighter1Value: f1Percent, fighter2Value: f2Percent },
    ]);
      
      // Guardar batalla y obtener ID
      const id = saveBattle(result);
      setBattleId(id);
      
      // Actualizar lista de batallas
      const savedData = localStorage.getItem('savedBattles');
      if (savedData) {
        setSavedBattles(JSON.parse(savedData));
      }
    } catch (error) {
      console.error("Error al simular batalla:", error);
      // En caso de error, mostrar resultado simplificado
      const result = {
        fighter1: fighter1,
        fighter2: fighter2,
        scenario: scenario,
        score1: score1,
        score2: score2,
        winner: winner,
        narrative: `<p>Ha ocurrido un error al generar la narrativa, pero ${winner} ha resultado victorioso.</p>`
      };
      
      setBattleResult(result);
    }
    
    setTimeout(() => {
      setIsSimulating(false);
    }, 300);
  };

  // Resetear selecciones
  const resetSimulation = () => {
    setFighter1(null);
    setFighter2(null);
    setScenario(null);
    setBattleResult(null);
    setBattleStats(null);
    setBattleId(null);
    
    // Eliminar parámetros de URL si hay alguno
    const urlWithoutParams = window.location.pathname + window.location.hash;
    window.history.pushState({}, '', urlWithoutParams);
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

  // Manejar compartir batalla
  const handleShare = () => {
    if (battleId) {
      shareBattle(battleId);
    }
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 touch-none"
          onClick={() => setShowCharacterSelect(false)}
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-gradient-to-b from-brainrot-dark to-black p-3 sm:p-4 rounded-lg w-[95%] sm:w-full max-w-2xl max-h-[75vh] overflow-y-auto overscroll-contain"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 z-10 bg-gradient-to-b from-brainrot-dark to-brainrot-dark/90 flex justify-between items-center mb-2 sm:mb-4 pb-2">
              <h3 className="text-lg sm:text-xl font-bold text-brainrot-turquoise">Selecciona personaje</h3>
              <Button 
                variant="ghost" 
                onClick={() => setShowCharacterSelect(false)}
                className="text-gray-400 hover:text-white h-8 w-8 p-0"
              >
                ✕
              </Button>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3 pb-4">
              {battleCharacters.map(character => (
                <div
                  key={character.id}
                  className="cursor-pointer"
                  onClick={() => handleCharacterSelect(character)}
                >
                  <div className="bg-gradient-to-b from-brainrot-darker/80 to-brainrot-dark border border-transparent hover:border-brainrot-turquoise rounded-lg overflow-hidden transition-all duration-200">
                    <div className="h-20 sm:h-28 bg-brainrot-darker flex items-center justify-center p-1 sm:p-2">
                      <img 
                        src={getImagePath(character)} 
                        alt={character.name}
                        className="h-full object-contain filter drop-shadow-md"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-1 sm:p-2 text-center bg-gradient-to-t from-black to-transparent">
                      <h4 className="font-semibold text-white text-xs sm:text-sm truncate">{character.name}</h4>
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-400 truncate text-xs">{character.emoji}</span>
                        <span className="text-brainrot-turquoise text-xs">P: {character.power}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Mejorar el componente de carga
  const LoadingSpinner = () => (
    <div className="flex items-center justify-center space-x-2">
      <div className="animate-spin h-5 w-5 border-3 border-white rounded-full border-t-transparent"></div>
      <span className="text-white font-semibold">Simulando...</span>
    </div>
  );

  return (
    <div className="bg-brainrot-dark rounded-xl overflow-hidden shadow-xl border border-brainrot-blue/30">
      <CharacterSelectModal />
      <BattleHistoryModal 
        isOpen={showBattleHistory} 
        onClose={() => setShowBattleHistory(false)} 
        battles={savedBattles} 
      />
      <CharacterStatsModal 
        isOpen={showCharacterStats} 
        onClose={() => setShowCharacterStats(false)} 
      />
      
      <div className="bg-gradient-to-r from-brainrot-darker to-brainrot-dark p-4 border-b border-brainrot-blue/30">
        <div className="flex justify-between items-center">
        <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
          <Swords className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-brainrot-turquoise" />
          Simulador de Batallas Épicas
        </h2>
          
          <div className="flex gap-2">
            <Button 
              onClick={() => setShowCharacterStats(true)}
              className="bg-brainrot-darker text-gray-300 border border-brainrot-blue/30 flex items-center text-xs sm:text-sm p-1.5"
              title="Ver ranking de personajes"
            >
              <Award className="w-4 h-4" />
            </Button>
            <Button 
              onClick={() => setShowBattleHistory(true)}
              className="bg-brainrot-darker text-gray-300 border border-brainrot-blue/30 flex items-center text-xs sm:text-sm p-1.5"
              title="Ver historial de batallas"
            >
              <History className="w-4 h-4" />
            </Button>
          </div>
        </div>
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
            
            {/* Añadir comentario de experto */}
            <BattleExpertCommentary 
              fighter1={battleResult.fighter1} 
              fighter2={battleResult.fighter2} 
              winner={battleResult.winner} 
            />
            
            {/* Sistema de comentarios para usuarios */}
            <BattleComments 
              battleId={battleId} 
              isAuthenticated={isUserAuthenticated} 
            />
            
            <div className="flex justify-center space-x-3 sm:space-x-4 mt-4 sm:mt-6">
              <Button 
                onClick={resetSimulation} 
                className="bg-brainrot-darker text-brainrot-turquoise border border-brainrot-blue/30 flex items-center text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
              >
                Nueva Batalla
              </Button>
              
              <Button 
                onClick={handleShare}
                className="bg-brainrot-darker text-gray-300 border border-brainrot-blue/30 flex items-center text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2"
              >
                <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5" />
                Compartir
              </Button>
            </div>
          </div>
        ) : (
          // Selección de personajes y escenario
          <>
            {/* Versus screen de selección */}
            <div className="relative flex flex-col sm:flex-row items-center justify-center my-3 sm:my-6 gap-2 sm:gap-0">
              {/* Personaje 1 */}
              <div className="w-full sm:flex-1 text-center">
                {fighter1 ? (
                  <div 
                    className="relative mx-auto cursor-pointer"
                    onClick={() => openCharacterSelect(1)}
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-b from-brainrot-blue/20 to-transparent rounded-full p-1">
                      <div className="w-full h-full bg-brainrot-darker/40 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={getImagePath(fighter1)} 
                          alt={fighter1.name}
                          className="w-full h-full object-contain object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1 sm:mt-2 truncate max-w-[140px] mx-auto">{fighter1.name}</h3>
                    <div className="bg-brainrot-darker/60 rounded-full px-2 py-0.5 inline-flex items-center mt-1">
                      <span className="mr-1">{fighter1.emoji}</span>
                      <span className="text-brainrot-turquoise text-xs sm:text-sm">{fighter1.type}</span>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-brainrot-darker/40 rounded-full flex items-center justify-center cursor-pointer hover:bg-brainrot-darker/60 transition-all border-2 border-dashed border-brainrot-blue/40"
                    onClick={() => openCharacterSelect(1)}
                  >
                    <div className="text-center">
                      <div className="text-brainrot-turquoise text-3xl sm:text-4xl mb-1">+</div>
                      <div className="text-gray-400 text-xs">Seleccionar</div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* VS - En móvil se muestra entre personajes como un divisor */}
              <div className="sm:mx-5 sm:z-10 my-0">
                <div className="relative">
                  <div className="bg-gradient-to-r from-red-600 to-red-800 text-white text-xl sm:text-2xl font-bold w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center shadow-md border-2 border-brainrot-darker">
                    VS
                  </div>
                  <div className="absolute -inset-2 bg-red-600/20 rounded-full blur-md"></div>
                </div>
              </div>
              
              {/* Personaje 2 */}
              <div className="w-full sm:flex-1 text-center">
                {fighter2 ? (
                  <div 
                    className="relative mx-auto cursor-pointer"
                    onClick={() => openCharacterSelect(2)}
                  >
                    <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-gradient-to-b from-red-600/20 to-transparent rounded-full p-1">
                      <div className="w-full h-full bg-brainrot-darker/40 rounded-full flex items-center justify-center overflow-hidden">
                        <img 
                          src={getImagePath(fighter2)} 
                          alt={fighter2.name}
                          className="w-full h-full object-contain object-center"
                          loading="lazy"
                        />
                      </div>
                    </div>
                    <h3 className="text-base sm:text-lg font-bold text-white mt-1 sm:mt-2 truncate max-w-[140px] mx-auto">{fighter2.name}</h3>
                    <div className="bg-brainrot-darker/60 rounded-full px-2 py-0.5 inline-flex items-center mt-1">
                      <span className="mr-1">{fighter2.emoji}</span>
                      <span className="text-red-400 text-xs sm:text-sm">{fighter2.type}</span>
                    </div>
                  </div>
                ) : (
                  <div 
                    className="w-24 h-24 sm:w-32 sm:h-32 mx-auto bg-brainrot-darker/40 rounded-full flex items-center justify-center cursor-pointer hover:bg-brainrot-darker/60 transition-all border-2 border-dashed border-red-500/40"
                    onClick={() => openCharacterSelect(2)}
                  >
                    <div className="text-center">
                      <div className="text-red-500 text-3xl sm:text-4xl mb-1">+</div>
                      <div className="text-gray-400 text-xs">Seleccionar</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Selección de escenario */}
            <div className="my-4 sm:my-6">
              <h3 className="text-sm sm:text-base font-bold text-brainrot-turquoise mb-2 sm:mb-3 text-center">Escenario de batalla</h3>
              <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
                {battleScenarios.map((scene) => (
                  <div
                    key={scene.id}
                    className={`cursor-pointer px-2 py-1 rounded-md flex items-center text-xs sm:text-sm ${
                      scenario?.id === scene.id 
                        ? 'bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise text-white' 
                        : 'bg-brainrot-darker text-gray-300 hover:bg-brainrot-darker/80'
                    }`}
                    onClick={() => setScenario(scene)}
                  >
                    <span className="text-base sm:text-lg mr-1">{scene.emoji}</span>
                    <span>{scene.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Acciones */}
            <div className="flex justify-center mt-4 sm:mt-6">
              <Button
                onClick={simulateBattle}
                disabled={!fighter1 || !fighter2 || !scenario || isSimulating}
                className="bg-gradient-to-r from-red-600 to-red-800 text-white px-4 sm:px-8 py-2 sm:py-4 rounded-lg shadow-lg hover:shadow-red-500/20 text-base sm:text-lg font-bold"
              >
                {isSimulating ? (
                  <LoadingSpinner />
                ) : (
                  <span className="flex items-center justify-center w-full">
                    <Swords className="mr-1.5 h-4 w-4 sm:h-5 sm:w-5" />
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