
import { useState } from 'react';
import { useCharacters } from '@/contexts/CharacterContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { CharacterType } from '@/types';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

const CharacterCreateForm = () => {
  const { addCharacter } = useCharacters();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [type, setType] = useState<CharacterType>('Anfibio');
  const [power, setPower] = useState(50);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [allies, setAllies] = useState('');
  const [rivals, setRivals] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const characterTypes: CharacterType[] = [
    'Anfibio', 'Bagno', 'Tecnologia', 'Ladro', 
    'Sonoro', 'Indonesiano', 'Galattico', 'Musicale', 'Aereo'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Devi accedere per creare un personaggio");
      return;
    }
    
    if (!name || !description || !imageUrl) {
      toast.error("Compila tutti i campi obbligatori");
      return;
    }

    setIsSubmitting(true);

    try {
      addCharacter({
        name,
        type,
        power,
        description,
        image: imageUrl,
        allies: allies.split(',').map(a => a.trim()).filter(Boolean),
        rivals: rivals.split(',').map(r => r.trim()).filter(Boolean),
      });
      
      toast.success("Personaggio creato con successo!");
      navigate('/characters');
    } catch (error) {
      toast.error("Si è verificato un errore durante la creazione del personaggio");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Nome del personaggio *</Label>
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-brainrot-light border-gray-700 text-white"
        />
      </div>
      
      <div>
        <Label htmlFor="type">Tipo *</Label>
        <Select defaultValue={type} onValueChange={(value) => setType(value as CharacterType)}>
          <SelectTrigger className="bg-brainrot-light border-gray-700 text-white">
            <SelectValue placeholder="Seleziona un tipo" />
          </SelectTrigger>
          <SelectContent className="bg-brainrot-light border-gray-700 text-white">
            {characterTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="power">Potenza: {power}</Label>
        <Input
          id="power"
          type="range"
          min="1"
          max="100"
          value={power}
          onChange={(e) => setPower(parseInt(e.target.value))}
          className="bg-brainrot-light border-gray-700"
        />
      </div>
      
      <div>
        <Label htmlFor="image">URL immagine *</Label>
        <Input
          id="image"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          placeholder="https://example.com/immagine.jpg"
          required
          className="bg-brainrot-light border-gray-700 text-white"
        />
        <p className="text-xs text-gray-400 mt-1">
          Inserisci l'URL di un'immagine online o usa un servizio di hosting immagini
        </p>
      </div>
      
      <div>
        <Label htmlFor="description">Descrizione *</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="bg-brainrot-light border-gray-700 text-white"
        />
      </div>
      
      <div>
        <Label htmlFor="allies">Alleati (separati da virgole)</Label>
        <Input
          id="allies"
          value={allies}
          onChange={(e) => setAllies(e.target.value)}
          placeholder="Alleato 1, Alleato 2, ..."
          className="bg-brainrot-light border-gray-700 text-white"
        />
      </div>
      
      <div>
        <Label htmlFor="rivals">Rivali (separati da virgole)</Label>
        <Input
          id="rivals"
          value={rivals}
          onChange={(e) => setRivals(e.target.value)}
          placeholder="Rivale 1, Rivale 2, ..."
          className="bg-brainrot-light border-gray-700 text-white"
        />
      </div>
      
      <Button 
        type="submit" 
        className="w-full bg-brainrot-blue hover:bg-brainrot-blue/80"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Creazione in corso...
          </>
        ) : (
          "Crea personaggio"
        )}
      </Button>
    </form>
  );
};

export default CharacterCreateForm;
