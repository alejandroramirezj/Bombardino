import { Character } from '../types';

const initialCharacters: Character[] = [
  {
    id: "1",
    name: "La vaca saturno saturnita",
    image: "/images/Vaca%20Saturno%20Saturnita.webp",
    type: "Galattico",
    power: 97,
    description: "La mucca cosmica nata 13,8 miliardi di anni fa. Il suo peso di 5,685E26 kg la rende una delle entità più potenti.",
    allies: ["Tung tung tung sahur", "Trulimero Trulicina"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    votes: 23,
    biography: "La vaca saturno saturnita, probabilmente l'essere più antico dell'universo Brainrot, è nata insieme all'universo stesso. Con forma di mucca ma composta di materia stellare ed energia cosmica, questo essere ha il potere di spostare pianeti e creare buchi neri con il suo muggito.",
    phrase: "Muuuuuuniverso...",
    abilities: ["Manipolazione cosmica", "Creazione di buchi neri", "Viaggio intergalattico", "Manipolazione della realtà"],
    appearances: ["L'Origine del Cosmo", "La Battaglia Celeste", "Il Muggito che Creò il Mondo"]
  },
  {
    id: "2",
    name: "Bombardino coccodrillo",
    image: "/images/Bombardino%20Crocodillo.webp",
    type: "Anfibio",
    power: 95,
    description: "Il leggendario coccodrillo italiano con poteri esplosivi. Il suo morso può attraversare il metallo.",
    allies: ["Glorbo Fruttodrillo", "Brr brr Patapim"],
    rivals: ["Bombombini Gusini", "Trippi Troppi"],
    votes: 19,
    biography: "Bombardino Coccodrillo è il protagonista principale dell'universo Italian Brainrot. Questo coccodrillo antropomorfo dagli straordinari poteri esplosivi è riconoscibile per il suo distintivo accento italiano e la sua capacità di trasformare qualsiasi oggetto in un'arma.",
    abilities: ["Morso perforante", "Esplosioni controllate", "Super resistenza", "Accelerazione improvvisa"]
  },
  {
    id: "3",
    name: "Trippi Troppi",
    image: "/images/Trippi%20Troppi.webp",
    type: "Tecnologia",
    power: 91,
    description: "Il vigilante con la testa a forma di fotocamera. Vede tutto e non dimentica mai.",
    allies: ["Bombombini Gusini", "Zhuzhuli Buffo"],
    rivals: ["Brr brr Patapim", "Bobritto bandito"],
    votes: 24,
    abilities: ["Memoria fotografica", "Visione notturna", "Registrazione continua", "Upload mentale"]
  },
  {
    id: "4",
    name: "Bombombini Gusini",
    image: "/images/Bombombini%20Gusini.webp",
    type: "Anfibio",
    power: 90,
    description: "Rivale diretto di Bombardino con abilità esplosive superiori.",
    allies: ["Trippi Troppi", "Capuchino Assassino"],
    rivals: ["Bombardino coccodrillo", "Glorbo Fruttodrillo"],
    votes: 49
  },
  {
    id: "5",
    name: "Bobritto bandito",
    image: "/images/Bobritto%20Bandito.webp",
    type: "Ladro",
    power: 89,
    description: "Il ladro più abile dell'universo Italian Brainrot.",
    allies: ["Glorbo Fruttodrillo", "Lirilì Larilà"],
    rivals: ["Trippi Troppi", "Capuchino Assassino"],
    votes: 17
  },
  {
    id: "6",
    name: "Glorbo Fruttodrillo",
    image: "/images/Glorbo%20Fruttodrillo.webp",
    type: "Anfibio",
    power: 88,
    description: "Cugino di Bombardino. Esperto in tattiche di combattimento e frutti tropicali.",
    allies: ["Bombardino coccodrillo", "Bobritto bandito"],
    rivals: ["Trippi Troppi", "Bombombini Gusini"],
    votes: 18
  },
  {
    id: "7",
    name: "Tung tung tung sahur",
    image: "/images/Tung%20Tung%20Tung.webp",
    type: "Indonesiano",
    power: 88,
    description: "Il misterioso personaggio indonesiano che annuncia il sahur durante il Ramadan. Il suo ritmo penetra nella mente.",
    allies: ["La vaca saturno saturnita", "Bobritto bandito"],
    rivals: ["Bombardino coccodrillo", "Bombombini Gusini"],
    votes: 32
  },
  {
    id: "8",
    name: "Tralalelo Tralala",
    image: "/images/Tralalero%20Tralala.webp",
    type: "Sonoro",
    power: 86,
    description: "Maestro delle arti sonore, può manipolare le onde sonore.",
    allies: ["Brr brr Patapim", "Bombardino coccodrillo"],
    rivals: ["Capuchino Assassino", "Trippi Troppi"],
    votes: 12
  },
  {
    id: "9",
    name: "Pesce umano",
    image: "/images/Trulimero%20Trulicina.webp",
    type: "Anfibio",
    power: 85,
    description: "Metà pesce, metà umano. Una creatura straordinaria che può respirare sia sott'acqua che sulla terraferma.",
    allies: ["Bombardino coccodrillo", "Tralalelo Tralala"],
    rivals: ["Trippi Troppi", "Bobritto bandito"],
    votes: 15,
    abilities: ["Respirazione anfibia", "Nuoto veloce", "Comunicazione con animali marini"]
  },
  {
    id: "10",
    name: "Squalo con scarpe",
    image: "/images/Brr%20Brr%20Patapim.webp",
    type: "Aereo",
    power: 83,
    description: "Uno squalo che indossa scarpe sportive blu. Velocissimo sia in mare che sulla terra.",
    allies: ["Pesce umano", "Bombombini Gusini"],
    rivals: ["La vaca saturno saturnita", "Glorbo Fruttodrillo"],
    votes: 28,
    abilities: ["Corsa supersonica", "Morso potente", "Salto acrobatico"]
  },
  {
    id: "11",
    name: "Gatto Pesce",
    image: "/images/Lirilì%20Larilà.webp",
    type: "Anfibio",
    power: 82,
    description: "Un ibrido tra gatto e pesce. Ama il mare ma odia l'acqua.",
    allies: ["Squalo con scarpe", "Trippi Troppi"],
    rivals: ["Tung tung tung sahur", "Tralalelo Tralala"],
    votes: 20,
    abilities: ["Respirazione anfibia", "Vista notturna", "Fusa ipnotiche"]
  }
];

export default initialCharacters;
