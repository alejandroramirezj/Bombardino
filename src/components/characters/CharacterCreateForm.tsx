import { useState, useRef } from 'react';
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
import { Loader2, Upload, Link as LinkIcon } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageTab, setImageTab] = useState<string>("url");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const characterTypes: CharacterType[] = [
    'Anfibio', 'Bagno', 'Tecnologia', 'Ladro', 
    'Sonoro', 'Indonesiano', 'Galattico', 'Musicale', 'Aereo'
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Debes iniciar sesión para crear un personaje");
      return;
    }
    
    if (!name || !description) {
      toast.error("Completa todos los campos obligatorios");
      return;
    }

    if (imageTab === "url" && !imageUrl) {
      toast.error("Proporciona una URL de imagen");
      return;
    }

    if (imageTab === "upload" && !imageFile) {
      toast.error("Sube una imagen para el personaje");
      return;
    }

    setIsSubmitting(true);

    try {
      // Ajustar la ruta para GitHub Pages agregando el prefijo base
      const basePath = import.meta.env.BASE_URL || '/Bombardino/';
      
      // Si estamos subiendo un archivo, primero lo procesaríamos
      // Esta es una simulación, en un entorno real subirías el archivo a un servidor
      const finalImageUrl = imageTab === "url" 
        ? imageUrl 
        : `${basePath.replace(/\/$/, '')}/images/${name.toLowerCase().replace(/\s+/g, '_')}.webp`;
      
      // Simular biografía y otras propiedades adicionales
      const biography = `${name} es un personaje de tipo ${type} con poderes extraordinarios. ${description}`;
      
      addCharacter({
        id: Date.now().toString(),
        name,
        type,
        power,
        description,
        image: finalImageUrl,
        allies: allies.split(',').map(a => a.trim()).filter(Boolean),
        rivals: rivals.split(',').map(r => r.trim()).filter(Boolean),
        biography: biography,
        votes: [],
        voteCount: 0
      });
      
      // En un caso real, aquí subirías el archivo al servidor
      if (imageTab === "upload" && imageFile) {
        // Código de subida de archivos simulado
        console.log(`Subiendo archivo ${imageFile.name} para ${name}`);
        // La imagen se guardaría como /images/nombre_del_personaje.webp
      }
      
      toast.success("¡Personaje creado con éxito!");
      navigate('/characters');
    } catch (error) {
      toast.error("Se produjo un error al crear el personaje");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Nombre del personaje *</Label>
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
            <SelectValue placeholder="Selecciona un tipo" />
          </SelectTrigger>
          <SelectContent className="bg-brainrot-light border-gray-700 text-white">
            {characterTypes.map((type) => (
              <SelectItem key={type} value={type}>{type}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div>
        <Label htmlFor="power">Poder: {power}</Label>
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
        <Label>Imagen *</Label>
        <Tabs defaultValue="url" value={imageTab} onValueChange={setImageTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-brainrot-light">
            <TabsTrigger value="url" className="data-[state=active]:bg-brainrot-blue">
              <LinkIcon className="w-4 h-4 mr-2" />
              URL
            </TabsTrigger>
            <TabsTrigger value="upload" className="data-[state=active]:bg-brainrot-blue">
              <Upload className="w-4 h-4 mr-2" />
              Subir
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="url" className="mt-2">
            <Input
              id="image-url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="bg-brainrot-light border-gray-700 text-white"
            />
            <p className="text-xs text-gray-400 mt-1">
              Introduce la URL de una imagen online o usa un servicio de alojamiento de imágenes
            </p>
          </TabsContent>
          
          <TabsContent value="upload" className="mt-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-brainrot-light hover:bg-brainrot-light/80 border-gray-700 text-white"
                >
                  Elegir archivo
                </Button>
                <span className="text-sm text-gray-400">
                  {imageFile ? imageFile.name : "Ningún archivo seleccionado"}
                </span>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/*"
                className="hidden"
              />
              
              {imagePreview && (
                <div className="mt-2 border border-gray-700 rounded-md p-2">
                  <p className="text-xs text-gray-400 mb-1">Vista previa:</p>
                  <img 
                    src={imagePreview} 
                    alt="Vista previa" 
                    className="max-h-40 rounded-md mx-auto"
                  />
                </div>
              )}
              
              <p className="text-xs text-gray-400">
                Formatos permitidos: JPG, PNG, WebP. Tamaño máximo: 5MB
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div>
        <Label htmlFor="description">Descripción *</Label>
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
        <Label htmlFor="allies">Aliados (separados por comas)</Label>
        <Input
          id="allies"
          value={allies}
          onChange={(e) => setAllies(e.target.value)}
          placeholder="Aliado 1, Aliado 2, ..."
          className="bg-brainrot-light border-gray-700 text-white"
        />
      </div>
      
      <div>
        <Label htmlFor="rivals">Rivales (separados por comas)</Label>
        <Input
          id="rivals"
          value={rivals}
          onChange={(e) => setRivals(e.target.value)}
          placeholder="Rival 1, Rival 2, ..."
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
            Creando personaje...
          </>
        ) : (
          "Crear personaje"
        )}
      </Button>
    </form>
  );
};

export default CharacterCreateForm;
