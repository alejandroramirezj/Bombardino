
import { Character } from '../types';

const initialCharacters: Character[] = [
  {
    id: "1",
    name: "La vaca saturno saturnita",
    image: "/lovable-uploads/a5996f8c-e72b-42b8-857d-df052f44e038.png",
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
    image: "/lovable-uploads/1718c260-9094-4237-9071-bbd817673d82.png",
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
    image: "/lovable-uploads/0f221493-6b0c-4fa8-b63b-21e1b7f5b737.png",
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
    image: "/lovable-uploads/efa6e2e7-7253-4f0f-8b98-1b46466c2f68.png",
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
    image: "/lovable-uploads/8e13794d-3c5d-45cd-b13b-536434cc93c7.png",
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
    image: "/lovable-uploads/433e51aa-7c1f-48bd-8de0-255c889de9f0.png",
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
    image: "/lovable-uploads/2b949e57-854d-41d7-8166-ba5cf6be8dd7.png",
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
    image: "/lovable-uploads/fb03d4b6-b034-46fb-baaa-52ed4004a328.png",
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
    image: "/lovable-uploads/08ab078e-4016-451e-8fb5-4c043e350c40.png",
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
    image: "/lovable-uploads/9d288a40-0f2a-4222-accb-0cd46bd4cb74.png",
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
    image: "/lovable-uploads/120c8794-a721-4a75-a84c-e6816b974bd5.png",
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
