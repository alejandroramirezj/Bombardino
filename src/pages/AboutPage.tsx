
const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">ABOUT BOMBARDINO UNIVERSE</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-8 text-lg text-center">
            Il progetto BombardinoUniverse è una celebrazione dell'estetica e della cultura dei meme "Italian Brainrot", un fenomeno internet caratterizzato da immagini surreali e narrative assurde.
          </p>
          
          <div className="bg-brainrot-light rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Il Progetto</h2>
            <p className="text-gray-300">
              BombardinoUniverse è nato come un progetto per catalogare, celebrare e continuare ad espandere l'universo dei personaggi dell'Italian Brainrot. La nostra missione è preservare questi meme come parte della cultura di internet contemporanea.
            </p>
            <p className="text-gray-300 mt-4">
              Questo sito permette di esplorare tutti i personaggi, le loro relazioni, abilità e storie, oltre a offrire ai fan la possibilità di votare per i loro preferiti e persino contribuire con nuovi personaggi.
            </p>
          </div>
          
          <div className="bg-brainrot-light rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Tecnologia</h2>
            <p className="text-gray-300">
              Questo sito è stato creato utilizzando tecnologie moderne per garantire un'esperienza utente fluida e reattiva:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-300 space-y-2">
              <li>React con TypeScript per un'interfaccia utente robusta e tipizzata</li>
              <li>Tailwind CSS per stili responsive e moderni</li>
              <li>Archiviazione locale per mantenere i dati di voto e personaggi</li>
              <li>Autenticazione tramite magic link (simulata nella demo)</li>
              <li>Ottimizzazione SEO per la massima visibilità</li>
            </ul>
          </div>
          
          <div className="bg-brainrot-light rounded-lg p-6">
            <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Contribuisci</h2>
            <p className="text-gray-300">
              BombardinoUniverse è un progetto in continua evoluzione e accogliamo i contributi della community:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-300 space-y-2">
              <li>Vota per i tuoi personaggi preferiti per farli salire in classifica</li>
              <li>Crea e proponi nuovi personaggi da aggiungere all'universo</li>
              <li>Condividi il sito sui social media per far crescere la community</li>
              <li>Suggerisci miglioramenti o nuove funzionalità</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
