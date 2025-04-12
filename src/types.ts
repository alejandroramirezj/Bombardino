
export type CharacterType = 
  | 'Anfibio' 
  | 'Tecnologia' 
  | 'Galattico' 
  | 'Ladro' 
  | 'Sonoro' 
  | 'Indonesiano' 
  | 'Musicale' 
  | 'Aereo' 
  | 'Bagno';

export interface Character {
  id: string;
  name: string;
  image: string;
  type: CharacterType;
  power: number;
  description: string;
  allies: string[];
  rivals: string[];
  votes: number;
  phrase?: string;
  appearances?: string[];
  abilities?: string[];
  biography?: string;
}

export interface User {
  id: string;
  email: string;
  votedFor: string[];
  createdCharacters: string[];
}
