import { Helmet } from 'react-helmet-async';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion } from 'framer-motion';
import { useState } from 'react';

// Componente de marcador de fútbol
const BattleScoreboard = ({ fighter1, fighter2, score1, score2, environment, winner }) => {
  return (
    <div className="my-6 relative overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-800 to-emerald-900 rounded-xl shadow-xl p-1">
        <div className="bg-gradient-to-b from-emerald-700 to-emerald-800 rounded-xl p-4 border border-emerald-500/30">
          {/* Cabecera del marcador */}
          <div className="bg-gradient-to-r from-emerald-900/80 to-emerald-800/80 rounded-t-lg p-2 text-center mb-4 border-b border-emerald-500/30">
            <h3 className="text-white font-mono tracking-widest text-sm">
              {environment && `ESCENARIO: ${environment.toUpperCase()}`}
            </h3>
          </div>
          
          {/* Equipos y marcador */}
          <div className="flex items-center justify-between">
            <div className={`flex-1 text-center p-3 rounded-l-lg ${winner === fighter1 ? 'bg-green-800/40' : 'bg-emerald-900/40'}`}>
              <div className="text-2xl font-bold text-white mb-2">{fighter1}</div>
              <div className="bg-white/10 rounded-full w-10 h-10 mx-auto flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{score1}</span>
              </div>
            </div>
            
            <div className="mx-2 p-2 bg-emerald-900 rounded-lg shadow-inner">
              <span className="text-2xl font-bold text-white">VS</span>
            </div>
            
            <div className={`flex-1 text-center p-3 rounded-r-lg ${winner === fighter2 ? 'bg-green-800/40' : 'bg-emerald-900/40'}`}>
              <div className="text-2xl font-bold text-white mb-2">{fighter2}</div>
              <div className="bg-white/10 rounded-full w-10 h-10 mx-auto flex items-center justify-center">
                <span className="text-3xl font-bold text-white">{score2}</span>
              </div>
            </div>
          </div>
          
          {/* Ganador */}
          <div className="mt-4 text-center bg-emerald-900/60 py-2 rounded-b-lg border-t border-emerald-500/30">
            <div className="text-yellow-300 font-bold">
              GANADOR: {winner}
            </div>
          </div>
        </div>
      </div>
      
      {/* Elementos gráficos decorativos */}
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
      <div className="absolute -top-4 -right-4 w-16 h-16 bg-yellow-500/10 rounded-full blur-xl"></div>
    </div>
  );
};

// Componente para las estadísticas de batalla
const BattleStats = ({ stats }) => {
  return (
    <div className="bg-brainrot-darker rounded-lg p-4 my-4">
      <h4 className="text-brainrot-turquoise font-semibold mb-3">Estadísticas de batalla</h4>
      <div className="space-y-3">
        {stats.map((stat, index) => (
          <div key={index} className="grid grid-cols-3 items-center gap-2">
            <div className="text-right text-sm text-gray-300">{stat.fighter1Value}%</div>
            <div className="relative h-2 bg-gray-700 rounded-full w-full col-span-1">
              <div 
                className="absolute left-0 top-0 h-2 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise rounded-full"
                style={{ width: `${stat.fighter1Value}%` }}
              ></div>
              <div 
                className="absolute right-0 top-0 h-2 bg-gradient-to-l from-brainrot-blue to-red-500 rounded-full"
                style={{ width: `${stat.fighter2Value}%` }}
              ></div>
            </div>
            <div className="text-left text-sm text-gray-300">{stat.fighter2Value}%</div>
            <div className="text-right text-xs text-gray-400">{stat.label}</div>
            <div className="h-0 col-span-1"></div>
            <div className="text-left text-xs text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BattleFAQPage = () => {
  const [animate, setAnimate] = useState(true);

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
          className="text-4xl md:text-5xl font-bold text-center mb-4 text-white"
        >
          BATALLAS ÉPICAS
        </motion.h1>

        <motion.div 
          className="w-24 h-1 bg-gradient-to-r from-brainrot-blue to-brainrot-turquoise mx-auto mb-8"
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        ></motion.div>

        <div className="text-center mb-8">
          <span className="inline-block px-3 py-1 bg-brainrot-light text-brainrot-turquoise rounded-full text-sm font-semibold">
            ¿QUIÉN GANARÍA?
          </span>
        </div>

        <Tabs defaultValue="bombardino-tralalero" className="max-w-4xl mx-auto">
          <TabsList className="bg-brainrot-dark grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="bombardino-tralalero" className="data-[state=active]:bg-brainrot-blue">Bombardino vs Tralalero</TabsTrigger>
            <TabsTrigger value="otros-clasicos" className="data-[state=active]:bg-brainrot-blue">Otras Batallas</TabsTrigger>
            <TabsTrigger value="escenarios" className="data-[state=active]:bg-brainrot-blue">Escenarios</TabsTrigger>
          </TabsList>

          <TabsContent value="bombardino-tralalero" className="space-y-6">
            {/* Marcador principal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <BattleScoreboard 
                fighter1="Bombardino Coccodrillo" 
                fighter2="Tralalero Tralala"
                score1="4"
                score2="2"
                environment="Batalla General"
                winner="Bombardino Coccodrillo"
              />
            </motion.div>
            
            {/* Estadísticas */}
            <BattleStats 
              stats={[
                { label: "Fuerza", fighter1Value: 75, fighter2Value: 40 },
                { label: "Agilidad", fighter1Value: 60, fighter2Value: 70 },
                { label: "Resistencia", fighter1Value: 80, fighter2Value: 55 },
                { label: "Habilidad especial", fighter1Value: 65, fighter2Value: 85 },
              ]}
            />
            
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              {/* Agua */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-brainrot-turquoise">Batalla en agua</h3>
                <BattleScoreboard 
                  fighter1="Bombardino Coccodrillo" 
                  fighter2="Tralalero Tralala"
                  score1="9"
                  score2="1"
                  environment="Agua"
                  winner="Bombardino Coccodrillo"
                />
                <p className="text-gray-300 mt-2 text-sm px-4">
                  En el agua, Bombardino tiene una ventaja casi total gracias a su naturaleza acuática.
                </p>
              </div>
              
              {/* Desierto */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-brainrot-turquoise">Batalla en desierto</h3>
                <BattleScoreboard 
                  fighter1="Bombardino Coccodrillo" 
                  fighter2="Tralalero Tralala"
                  score1="4"
                  score2="6"
                  environment="Desierto"
                  winner="Tralalero Tralala"
                />
                <p className="text-gray-300 mt-2 text-sm px-4">
                  En el desierto, la piel de Bombardino se seca, dando ventaja a Tralalero.
                </p>
              </div>
            </div>
            
            <div className="bg-brainrot-light p-6 rounded-xl mt-8">
              <h3 className="text-2xl font-bold mb-4 text-white">Historial de Enfrentamientos</h3>
              
              <div className="space-y-4">
                <div className="bg-brainrot-dark p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">La Gran Batalla del Pantano (2018)</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-brainrot-blue font-bold">B</span>
                      <span className="bg-brainrot-blue w-6 h-6 rounded-full flex items-center justify-center text-white">1</span>
                      <span className="text-gray-400">-</span>
                      <span className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-white">0</span>
                      <span className="text-gray-300 font-bold">T</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brainrot-dark p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">El Duelo Musical (2019)</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-gray-300 font-bold">B</span>
                      <span className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-white">0</span>
                      <span className="text-gray-400">-</span>
                      <span className="bg-brainrot-blue w-6 h-6 rounded-full flex items-center justify-center text-white">1</span>
                      <span className="text-brainrot-blue font-bold">T</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brainrot-dark p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">El Enfrentamiento en Roma (2020)</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-brainrot-blue font-bold">B</span>
                      <span className="bg-brainrot-blue w-6 h-6 rounded-full flex items-center justify-center text-white">2</span>
                      <span className="text-gray-400">-</span>
                      <span className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-white">1</span>
                      <span className="text-gray-300 font-bold">T</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-brainrot-dark p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">La Fiesta Acuática (2021)</span>
                    <div className="flex items-center space-x-3">
                      <span className="text-brainrot-blue font-bold">B</span>
                      <span className="bg-brainrot-blue w-6 h-6 rounded-full flex items-center justify-center text-white">3</span>
                      <span className="text-gray-400">-</span>
                      <span className="bg-gray-700 w-6 h-6 rounded-full flex items-center justify-center text-white">0</span>
                      <span className="text-gray-300 font-bold">T</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="otros-clasicos">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Bombombini vs Tung tung */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-brainrot-turquoise">Batalla explosiva</h3>
                <BattleScoreboard 
                  fighter1="Bombombini Gusini" 
                  fighter2="Tung tung tung sahur"
                  score1="5"
                  score2="5"
                  environment="Campo abierto"
                  winner="Empate"
                />
              </div>
              
              {/* Bobritto vs La vaca */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-brainrot-turquoise">Batalla cósmica</h3>
                <BattleScoreboard 
                  fighter1="Bobritto bandito" 
                  fighter2="La vaca saturno"
                  score1="3"
                  score2="7"
                  environment="Espacio"
                  winner="La vaca saturno"
                />
              </div>
              
              {/* Ballerina vs Trippi */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-brainrot-turquoise">Arte vs Tecnología</h3>
                <BattleScoreboard 
                  fighter1="Ballerina Capuchina" 
                  fighter2="Trippi Troppi"
                  score1="6"
                  score2="4"
                  environment="Teatro"
                  winner="Ballerina Capuchina"
                />
              </div>
              
              {/* Glorbo vs Frigo */}
              <div>
                <h3 className="text-xl font-bold mb-4 text-brainrot-turquoise">Calor vs Frío</h3>
                <BattleScoreboard 
                  fighter1="Glorbo Fruttodrillo" 
                  fighter2="Frigo Camelo"
                  score1="2"
                  score2="8"
                  environment="Invierno"
                  winner="Frigo Camelo"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="escenarios">
            <div className="space-y-8">
              {/* Acuático */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-brainrot-turquoise border-b border-brainrot-blue/30 pb-2">
                  Batallas Acuáticas
                </h3>
                <div className="bg-gradient-to-r from-blue-900/50 to-brainrot-dark rounded-lg p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 bg-blue-700/30 text-white rounded text-xs">🏊 Ambiente acuático</span>
                    <span className="inline-block px-2 py-1 bg-blue-700/30 text-white rounded text-xs">💧 Alta humedad</span>
                    <span className="inline-block px-2 py-1 bg-blue-700/30 text-white rounded text-xs">🌊 Corrientes</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-brainrot-darker p-3 rounded-lg">
                      <span className="text-white font-semibold">1. Bombardino Coccodrillo</span>
                      <div className="w-24 h-3 bg-gray-700 rounded-full">
                        <div className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{width: '95%'}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-brainrot-darker p-3 rounded-lg">
                      <span className="text-white font-semibold">2. Trulimero Trulicina</span>
                      <div className="w-24 h-3 bg-gray-700 rounded-full">
                        <div className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-brainrot-darker p-3 rounded-lg">
                      <span className="text-white font-semibold">3. Lirilì Larilà</span>
                      <div className="w-24 h-3 bg-gray-700 rounded-full">
                        <div className="h-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-full" style={{width: '80%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Desierto */}
              <div>
                <h3 className="text-2xl font-bold mb-4 text-brainrot-turquoise border-b border-brainrot-blue/30 pb-2">
                  Batallas en el Desierto
                </h3>
                <div className="bg-gradient-to-r from-yellow-900/50 to-brainrot-dark rounded-lg p-4">
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="inline-block px-2 py-1 bg-yellow-700/30 text-white rounded text-xs">🏜️ Arena</span>
                    <span className="inline-block px-2 py-1 bg-yellow-700/30 text-white rounded text-xs">☀️ Calor extremo</span>
                    <span className="inline-block px-2 py-1 bg-yellow-700/30 text-white rounded text-xs">🌵 Escasez de agua</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center bg-brainrot-darker p-3 rounded-lg">
                      <span className="text-white font-semibold">1. Akulini Cactusini</span>
                      <div className="w-24 h-3 bg-gray-700 rounded-full">
                        <div className="h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full" style={{width: '92%'}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-brainrot-darker p-3 rounded-lg">
                      <span className="text-white font-semibold">2. Markus der Kaktus</span>
                      <div className="w-24 h-3 bg-gray-700 rounded-full">
                        <div className="h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full" style={{width: '85%'}}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center bg-brainrot-darker p-3 rounded-lg">
                      <span className="text-white font-semibold">3. Tralalero Tralala</span>
                      <div className="w-24 h-3 bg-gray-700 rounded-full">
                        <div className="h-3 bg-gradient-to-r from-yellow-500 to-red-500 rounded-full" style={{width: '70%'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="mt-12 bg-brainrot-dark p-6 rounded-xl max-w-4xl mx-auto relative overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-brainrot-blue/10 rounded-full blur-xl -z-0"></div>
          
          <div className="relative z-10">
            <h2 className="text-2xl font-bold mb-4 text-white">Análisis de Expertos</h2>
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 rounded-full bg-brainrot-blue/20 flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🎓</span>
              </div>
              <div>
                <h3 className="text-brainrot-turquoise font-semibold">Profesor Luigi Verducci</h3>
                <p className="text-sm text-gray-400">Universidad de Milán, Departamento de Brainrotología</p>
                <blockquote className="border-l-4 border-brainrot-turquoise pl-4 py-2 mt-2 mb-4 italic text-gray-300">
                  "Los enfrentamientos entre Bombardino y Tralalero representan el eterno duelo entre fuerza bruta y habilidad artística. Es un reflejo de la dualidad del universo Bombardino."
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BattleFAQPage; 