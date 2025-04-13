const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-6 text-center">SOBRE EL UNIVERSO BOMBARDINO</h1>
        
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-300 mb-8 text-lg text-center">
            El proyecto BombardinoUniverse es una celebración de la estética y la cultura de los memes "Italian Brainrot", un fenómeno de internet caracterizado por imágenes surrealistas y narrativas absurdas.
          </p>
          
          <div className="bg-brainrot-light rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">El Proyecto</h2>
            <p className="text-gray-300">
              BombardinoUniverse nació como un proyecto para catalogar, celebrar y continuar expandiendo el universo de los personajes del Italian Brainrot. Nuestra misión es preservar estos memes como parte de la cultura contemporánea de internet.
            </p>
            <p className="text-gray-300 mt-4">
              Este sitio permite explorar todos los personajes, sus relaciones, habilidades e historias, además de ofrecer a los fans la posibilidad de votar por sus favoritos e incluso contribuir con nuevos personajes.
            </p>
          </div>
          
          <div className="bg-brainrot-light rounded-lg p-6 mb-8">
            <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Tecnología</h2>
            <p className="text-gray-300">
              Este sitio ha sido creado utilizando tecnologías modernas para garantizar una experiencia de usuario fluida y reactiva:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-300 space-y-2">
              <li>React con TypeScript para una interfaz de usuario robusta y tipada</li>
              <li>Tailwind CSS para estilos responsivos y modernos</li>
              <li>Almacenamiento local para mantener los datos de votos y personajes</li>
              <li>Autenticación mediante magic link (simulada en la demo)</li>
              <li>Optimización SEO para máxima visibilidad</li>
            </ul>
          </div>
          
          <div className="bg-brainrot-light rounded-lg p-6">
            <h2 className="text-xl font-bold text-brainrot-turquoise mb-4">Contribuye</h2>
            <p className="text-gray-300">
              BombardinoUniverse es un proyecto en constante evolución y damos la bienvenida a las contribuciones de la comunidad:
            </p>
            <ul className="list-disc list-inside mt-4 text-gray-300 space-y-2">
              <li>Vota por tus personajes favoritos para que suban en el ranking</li>
              <li>Crea y propón nuevos personajes para añadir al universo</li>
              <li>Comparte el sitio en redes sociales para hacer crecer la comunidad</li>
              <li>Sugiere mejoras o nuevas funcionalidades</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
