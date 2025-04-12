import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { motion } from 'framer-motion';

const BattleFAQPage = () => {
  return (
    <>
      <Helmet>
        <title>Batallas Épicas | Bombardino Universe</title>
        <meta name="description" content="Descubre quién ganaría en las batallas más épicas del universo Bombardino. Bombardino Coccodrillo vs Tralalero y muchas más." />
        <meta name="keywords" content="bombardino coccodrillo, tralalero tralala, batallas, peleas, versus, quien ganaría, batallas épicas" />
      </Helmet>

      <div className="container mx-auto py-8 px-4">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-8 text-white"
        >
          Batallas Épicas
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-center mb-12 text-gray-300 max-w-3xl mx-auto"
        >
          Las preguntas más frecuentes sobre quién ganaría en los enfrentamientos entre los personajes más poderosos del universo Bombardino.
        </motion.p>

        <Tabs defaultValue="bombardino-tralalero" className="max-w-4xl mx-auto">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="bombardino-tralalero">Bombardino vs Tralalero</TabsTrigger>
            <TabsTrigger value="otros-clasicos">Otras Batallas Clásicas</TabsTrigger>
            <TabsTrigger value="escenarios">Escenarios de Batalla</TabsTrigger>
          </TabsList>

          <TabsContent value="bombardino-tralalero" className="bg-brainrot-light p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Bombardino Coccodrillo vs Tralalero Tralala</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white text-lg">¿Quién ganaría en un enfrentamiento directo?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>Según los registros históricos y simulaciones de combate, Bombardino Coccodrillo tendría ventaja en un enfrentamiento directo con un 65% de probabilidades de victoria.</p>
                  <p className="mt-3">La ventaja principal de Bombardino radica en su resistencia física y adaptabilidad al combate, mientras que Tralalero cuenta con poderes musicales que pueden afectar psicológicamente, pero requieren tiempo de preparación.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white text-lg">¿Cuántas veces se han enfrentado?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>El registro oficial muestra 7 enfrentamientos históricos:</p>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>La Gran Batalla del Pantano (2018) - Victoria para Bombardino</li>
                    <li>El Duelo Musical (2019) - Victoria para Tralalero</li>
                    <li>El Enfrentamiento en Roma (2020) - Victoria para Bombardino</li>
                    <li>La Fiesta Acuática (2021) - Victoria para Bombardino</li>
                    <li>El Festival de Verano (2022) - Victoria para Tralalero</li>
                    <li>La Batalla del Ritmo (2022) - Empate</li>
                    <li>El Gran Duelo de la Brainrot (2023) - Victoria para Bombardino</li>
                  </ul>
                  <p className="mt-3">Balance: 4 victorias para Bombardino, 2 para Tralalero y 1 empate.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white text-lg">¿Qué pasaría si se enfrentaran en el agua?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>En un entorno acuático, Bombardino Coccodrillo tiene una clara ventaja con un 90% de probabilidades de victoria. Su naturaleza de cocodrilo le proporciona:</p>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>Capacidad para respirar bajo el agua durante largos períodos</li>
                    <li>Movilidad superior en entornos acuáticos</li>
                    <li>Camuflaje natural en agua turbia</li>
                    <li>Mordida más efectiva en ambientes húmedos</li>
                  </ul>
                  <p className="mt-3">Tralalero tendría dificultades para utilizar sus poderes musicales bajo el agua, limitando significativamente su capacidad ofensiva.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white text-lg">¿Qué pasaría si se enfrentaran en un desierto?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>En un entorno desértico, la batalla sería mucho más equilibrada, con Tralalero ganando ventaja con un 55% de probabilidades de victoria.</p>
                  <p className="mt-3">Factores clave:</p>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li>La piel de Bombardino se secaría rápidamente, reduciendo su resistencia</li>
                    <li>El aire seco del desierto amplificaría las ondas sonoras de Tralalero</li>
                    <li>La falta de agua limitaría los movimientos tácticos de Bombardino</li>
                    <li>El eco en los cañones del desierto potenciaría los poderes musicales de Tralalero</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-white text-lg">¿Podrían alguna vez formar una alianza?</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>Aunque tienen una rivalidad histórica, existen registros de dos ocasiones en las que formaron una alianza temporal:</p>
                  <ul className="list-disc pl-5 mt-3 space-y-2">
                    <li><strong>La Crisis de Bombombini (2021)</strong> - Unieron fuerzas para detener el caos causado por Bombombini Gusini</li>
                    <li><strong>El Festival de la Paz (2023)</strong> - Realizaron un espectáculo conjunto que combinaba la fuerza de Bombardino con la música de Tralalero</li>
                  </ul>
                  <p className="mt-3">Los expertos especulan que, a pesar de su rivalidad, existe un respeto mutuo que permite estas colaboraciones ocasionales.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="otros-clasicos" className="bg-brainrot-light p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Otras Batallas Clásicas</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white text-lg">Bombombini Gusini vs Tung tung tung sahur</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>Este enfrentamiento entre el explosivo Bombombini y el rítmico Tung tung tung sahur es uno de los más equilibrados, con un ligero 52% de ventaja para Bombombini.</p>
                  <p className="mt-3">Mientras que los poderes explosivos de Bombombini pueden causar gran daño, los ritmos hipnóticos de Tung tung tung pueden desorientar a su rival, creando un duelo muy parejo que suele decidirse por el entorno y las condiciones de la batalla.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white text-lg">Bobritto bandito vs La vaca saturno saturnita</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>La astucia de Bobritto contra los poderes cósmicos de La vaca saturno saturnita es un clásico de contrastes. La vaca tiene ventaja en espacios abiertos con un 70% de probabilidad de victoria.</p>
                  <p className="mt-3">Sin embargo, en entornos acuáticos o boscosos, Bobritto puede aprovechar el terreno para emboscadas, elevando sus probabilidades al 60%. Han tenido 3 enfrentamientos oficiales, con 2 victorias para La vaca y 1 para Bobritto.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white text-lg">Ballerina Capuchina vs Trippi Troppi</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>El duelo entre la gracia de Ballerina Capuchina y la astucia tecnológica de Trippi Troppi es uno de los más interesantes del universo Bombardino.</p>
                  <p className="mt-3">Ballerina tiene ventaja en combates a corta distancia con un 65% de probabilidad de victoria gracias a su agilidad y danza hipnótica. Trippi, por su parte, gana terreno en batallas a larga distancia donde puede usar sus dispositivos tecnológicos, con un 60% de ventaja.</p>
                  <p className="mt-3">Se han enfrentado oficialmente solo una vez, en el evento "Arte vs Tecnología" (2022), donde Ballerina resultó victoriosa por un pequeño margen.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white text-lg">Glorbo Fruttodrillo vs Frigo Camelo</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>El enfrentamiento entre el jugoso Glorbo y el gélido Frigo representa el clásico duelo de elementos opuestos.</p>
                  <p className="mt-3">Frigo Camelo tiene una clara ventaja con un 75% de probabilidades de victoria en condiciones normales, ya que sus poderes de hielo pueden neutralizar fácilmente las habilidades de Glorbo.</p>
                  <p className="mt-3">Sin embargo, en climas cálidos o tropicales, el balance cambia drásticamente, dando a Glorbo un 80% de probabilidades de victoria al potenciarse sus habilidades frutales mientras que Frigo se debilita bajo el calor.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>

          <TabsContent value="escenarios" className="bg-brainrot-light p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Escenarios de Batalla</h2>
            
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-white text-lg">Batallas Acuáticas</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>En entornos acuáticos, el ranking de poder cambia significativamente:</p>
                  <ol className="list-decimal pl-5 mt-3 space-y-2">
                    <li><strong>Bombardino Coccodrillo</strong> - Dominio natural en el agua</li>
                    <li><strong>Trulimero Trulicina</strong> - Habilidades acuáticas superiores</li>
                    <li><strong>Lirilì Larilà</strong> - Adaptación perfecta al medio acuático</li>
                    <li><strong>Bobritto bandito</strong> - Construcción de presas y control del flujo de agua</li>
                    <li><strong>Brr brr Patapim</strong> - Velocidad excepcional en el agua</li>
                  </ol>
                  <p className="mt-3">Los personajes con poderes eléctricos o musicales como Tralalero o Udin din din dun ven sus habilidades severamente limitadas en este entorno.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-white text-lg">Batallas en el Desierto</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>El ambiente árido del desierto favorece a ciertos personajes:</p>
                  <ol className="list-decimal pl-5 mt-3 space-y-2">
                    <li><strong>Akulini Cactusini</strong> - Adaptación natural al desierto</li>
                    <li><strong>Markus der Kaktus</strong> - Resistencia extrema a la deshidratación</li>
                    <li><strong>Camelrino Tazzino</strong> - Capacidad para almacenar agua y energía</li>
                    <li><strong>Unta tobi tob tob</strong> - Movilidad superior en arena</li>
                    <li><strong>Tralalero Tralala</strong> - Sus ondas sonoras viajan más lejos en el aire seco</li>
                  </ol>
                  <p className="mt-3">Personajes como Bombardino, que dependen de la humedad, o Frigo Camelo, susceptible al calor, se encuentran en clara desventaja en este escenario.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-white text-lg">Batallas Urbanas</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>En entornos urbanos, la adaptabilidad y el ingenio son clave:</p>
                  <ol className="list-decimal pl-5 mt-3 space-y-2">
                    <li><strong>Trippi Troppi</strong> - Uso de tecnología y cámaras de seguridad</li>
                    <li><strong>Serbinyo Carshippinyo</strong> - Movilidad rápida en calles</li>
                    <li><strong>Piccione Macchina</strong> - Vigilancia aérea y conocimiento urbano</li>
                    <li><strong>Crocodildo Penisini</strong> - Infiltración en sistemas de alcantarillado</li>
                    <li><strong>Capuchino Assassino</strong> - Camuflaje en cafeterías y establecimientos</li>
                  </ol>
                  <p className="mt-3">Bombardino y Tralalero se encuentran en un terreno neutro aquí, ninguno con ventaja clara, dependiendo más de la estrategia que de sus habilidades naturales.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-white text-lg">Batallas Espaciales</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>En el vacío del espacio, el poder cambia drásticamente:</p>
                  <ol className="list-decimal pl-5 mt-3 space-y-2">
                    <li><strong>La vaca saturno saturnita</strong> - Control cósmico y gravitacional</li>
                    <li><strong>Meterito Bearito</strong> - Propulsión natural en el vacío</li>
                    <li><strong>Brasilini Birimbini</strong> - Resistencia a condiciones extremas</li>
                    <li><strong>Coccodrilli Faerini</strong> - Magia capaz de crear atmósfera</li>
                    <li><strong>Tracotocutulo</strong> - Tecnología de supervivencia espacial</li>
                  </ol>
                  <p className="mt-3">Tanto Bombardino como Tralalero estarían completamente indefensos en este entorno sin equipo especial, siendo uno de los pocos escenarios donde ambos estarían igualmente desventajados.</p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-white text-lg">Batallas Musicales</AccordionTrigger>
                <AccordionContent className="text-gray-300">
                  <p>En competiciones basadas en habilidades musicales:</p>
                  <ol className="list-decimal pl-5 mt-3 space-y-2">
                    <li><strong>Tralalero Tralala</strong> - Maestría musical incomparable</li>
                    <li><strong>Udin din din dun</strong> - Ritmos electrónicos hipnóticos</li>
                    <li><strong>Tung tung tung sahur</strong> - Percusión ancestral poderosa</li>
                    <li><strong>Ballerina Capuchina</strong> - Fusión perfecta de música y danza</li>
                    <li><strong>Burbaloni Luliloli</strong> - Composiciones circenses únicas</li>
                  </ol>
                  <p className="mt-3">Bombardino, aunque conocido por su rugido característico, no posee habilidades musicales refinadas, quedando en clara desventaja en este tipo de enfrentamientos con solo un 15% de probabilidades de victoria contra Tralalero.</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <div className="mt-12 bg-brainrot-dark p-6 rounded-xl max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-white">Análisis de Expertos</h2>
          <p className="text-gray-300 mb-4">
            Según el profesor Luigi Verducci, máxima autoridad en Brainrotología de la Universidad de Milán:
          </p>
          <blockquote className="border-l-4 border-brainrot-turquoise pl-4 py-2 mb-4 italic text-gray-300">
            "Los enfrentamientos entre Bombardino y Tralalero representan el eterno duelo entre fuerza bruta y habilidad artística. Es un reflejo de la dualidad del universo Bombardino, donde ningún poder es absoluto y el contexto siempre influye en el resultado."
          </blockquote>
          <p className="text-gray-300">
            Esta dualidad se manifiesta en todos los escenarios analizados, demostrando que en el universo Bombardino, el equilibrio entre diferentes tipos de poder es lo que mantiene viva la eterna rivalidad entre sus personajes.
          </p>
        </div>
      </div>
    </>
  );
};

export default BattleFAQPage; 