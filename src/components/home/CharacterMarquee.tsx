import { Link } from 'react-router-dom';

// Lista completa de personajes del Italian Brainrot de la wiki
const brainrotCharacters = [
  { name: "Bombardino coccodrillo", emoji: "🐊" },
  { name: "Tralalero Tralala", emoji: "🎵" },
  { name: "Tung tung tung sahur", emoji: "🥁" },
  { name: "Lirilì Larilà", emoji: "🐠" },
  { name: "Trippi Troppi", emoji: "📷" },
  { name: "Bombombini Gusini", emoji: "💥" },
  { name: "Brr brr Patapim", emoji: "🦈" },
  { name: "Bobritto bandito", emoji: "🦫" },
  { name: "La vaca saturno saturnita", emoji: "🐄" },
  { name: "Glorbo Fruttodrillo", emoji: "🍎" },
  { name: "Trulimero Trulicina", emoji: "🐟" },
  { name: "Ajolottini Volantini", emoji: "🦎" },
  { name: "Akulini Cactusini", emoji: "🌵" },
  { name: "Baby Mama T-rex", emoji: "🦖" },
  { name: "Ballerina Capuchina", emoji: "💃" },
  { name: "Baranito Tankito", emoji: "🚂" },
  { name: "Bombinarium Nerpinarium", emoji: "🧪" },
  { name: "Brasilini Birimbini", emoji: "🇧🇷" },
  { name: "Bri Bri Bicus Dicus", emoji: "🎭" },
  { name: "Bri Bri Bri Kasoot", emoji: "🎮" },
  { name: "Burbaloni Luliloli", emoji: "🎪" },
  { name: "Camelrino Tazzino", emoji: "🐪" },
  { name: "Capuchino Assassino", emoji: "☕" },
  { name: "Chimpanzini Bananini", emoji: "🐒" },
  { name: "Coccodrilli Faerini", emoji: "✨" },
  { name: "Coccodrillo Robloxino", emoji: "🎲" },
  { name: "Cocosatic Bungus", emoji: "🥥" },
  { name: "Crocodildo Penisini", emoji: "🍆" },
  { name: "Dangerito Bearito", emoji: "🐻" },
  { name: "Frigo Camelo", emoji: "❄️" },
  { name: "Frulli Frulla", emoji: "🥤" },
  { name: "Gomari Pallkari", emoji: "🏀" },
  { name: "L'Ombra Illuminata", emoji: "🔦" },
  { name: "Malamé Amaralé", emoji: "🧠" },
  { name: "Markus der Kaktus", emoji: "🌵" },
  { name: "Meterito Bearito", emoji: "☄️" },
  { name: "Piccione Macchina", emoji: "🕊️" },
  { name: "Pomedero Bombordero", emoji: "🍅" },
  { name: "Porcospino stivale", emoji: "🦔" },
  { name: "Pot hotspot", emoji: "🍲" },
  { name: "Rantasanta Chinaranta", emoji: "🎅" },
  { name: "Rugginato LupoGT", emoji: "🐺" },
  { name: "Serbinyo Carshippinyo", emoji: "🚗" },
  { name: "Talpa Di Ferro", emoji: "⛏️" },
  { name: "Tortitilli Mortiri", emoji: "🐢" },
  { name: "Tracotocutulo", emoji: "👾" },
  { name: "Tric Trac baraboom", emoji: "💣" },
  { name: "Udin din din dun", emoji: "🎧" },
  { name: "Unta tobi tob tob", emoji: "🐫" },
  { name: "Verduguini Pelusini", emoji: "🥦" },
  { name: "Zesty Leono", emoji: "🦁" },
  { name: "Zhuzhuli Buffo", emoji: "🦉" },
  { name: "Zucchini Macanini", emoji: "🥒" }
];

const CharacterMarquee = () => {
  return (
    <div className="overflow-hidden bg-brainrot-darker py-2 border-y border-brainrot-blue">
      <div className="flex marquee-animation">
        {/* Duplicamos los caracteres para crear un efecto continuo */}
        {[...brainrotCharacters, ...brainrotCharacters].map((character, index) => (
          <Link
            key={index} 
            to="personajes" 
            className="mx-2 whitespace-nowrap text-brainrot-turquoise hover:text-white flex items-center transition-colors"
          >
            <span className="mr-1">{character.emoji}</span>
            {character.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CharacterMarquee; 