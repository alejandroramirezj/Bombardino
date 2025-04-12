import fs from 'fs';
import path from 'path';
import https from 'https';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const baseDir = path.join(__dirname, '../public/Bombardino/images/characters');

// Asegurarse de que el directorio existe
if (!fs.existsSync(baseDir)) {
  fs.mkdirSync(baseDir, { recursive: true });
}

// Lista de personajes con sus URLs de imagen
const characterImages = [
  { 
    name: 'ChimpanziniBananini', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/5/5c/ChimpanziniBananini.jpg/revision/latest/scale-to-width-down/180?cb=20250407155205' 
  },
  { 
    name: 'BombardinoCoccodrillo', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/9/97/Bombardino_coccodrillo.jpg/revision/latest/scale-to-width-down/180?cb=20250407151733' 
  },
  { 
    name: 'VacaSaturnoSaturnita', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/3/38/La_vaca_saturno_saturnita.jpg/revision/latest/scale-to-width-down/180?cb=20250407151925' 
  },
  { 
    name: 'TrialalereoTralala', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/6/61/Tralalero_Tralala.jpg/revision/latest/scale-to-width-down/180?cb=20250407152050' 
  },
  { 
    name: 'TungTungTungSahur', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/a/ac/Tungx3.jpg/revision/latest/scale-to-width-down/180?cb=20250407152244' 
  },
  { 
    name: 'TrippiTroppi', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/e/e3/Trippitropi.jpg/revision/latest/scale-to-width-down/180?cb=20250407152359' 
  },
  { 
    name: 'BombombiniGusini', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/2/23/Bombombini_gusini.jpg/revision/latest/scale-to-width-down/180?cb=20250407152523' 
  },
  { 
    name: 'BrrrBrrrPatapim', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/d/db/Brr_brr_Patapim.jpg/revision/latest/scale-to-width-down/180?cb=20250407152757' 
  },
  { 
    name: 'BobrrittoBandito', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/5/5c/Bobritto_bandito.jpg/revision/latest/scale-to-width-down/180?cb=20250407152926' 
  },
  { 
    name: 'GlorboFruttodrillo', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/e/e2/Glorbo_Fruttodrillo.jpg/revision/latest/scale-to-width-down/180?cb=20250407153054' 
  },
  { 
    name: 'LiriliLarila', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/d/d4/Liril%C3%AC_Laril%C3%A0.jpg/revision/latest/scale-to-width-down/180?cb=20250407153236' 
  },
  { 
    name: 'TrulimeroTrulicina', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/0/08/Trulimero_Trulicina.jpg/revision/latest/scale-to-width-down/180?cb=20250407153441' 
  },
  { 
    name: 'AjolottiniVolantini', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/3/35/Ajolottini_Volantini.jpg/revision/latest/scale-to-width-down/180?cb=20250407153616' 
  },
  { 
    name: 'AkuliniCactusini', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/3/30/Akulini_Cactusini.jpg/revision/latest/scale-to-width-down/180?cb=20250407153759' 
  },
  { 
    name: 'BabyMamaTRex', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/7/7e/Baby_Mama_T-rex.jpg/revision/latest/scale-to-width-down/180?cb=20250407153933' 
  },
  { 
    name: 'BallerinaCapuchina', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/f/fe/Ballerina_Capuchina.jpg/revision/latest/scale-to-width-down/180?cb=20250407154125' 
  },
  { 
    name: 'BaranitoTankito', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/e/e1/Baranito_Tankito.jpg/revision/latest/scale-to-width-down/180?cb=20250407154233' 
  },
  { 
    name: 'BombinariumNerpinarium', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/b/bd/Bombinarium_Nerpinarium.jpg/revision/latest/scale-to-width-down/180?cb=20250407154352' 
  },
  { 
    name: 'BrasiliniBirimbini', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/4/40/Brasilini_Birimbini.jpg/revision/latest/scale-to-width-down/180?cb=20250407154508' 
  },
  { 
    name: 'BriBriBicusDicus', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/d/d9/Bri_Bri_Bicus_Dicus.jpg/revision/latest/scale-to-width-down/180?cb=20250407154625' 
  },
  { 
    name: 'BriBriBriKasoot', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/8/82/Bri_Bri_Bri_Kasoot.jpg/revision/latest/scale-to-width-down/180?cb=20250407154749' 
  },
  { 
    name: 'BurbaloniLuliloli', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/f/f8/Burbaloni_Luliloli.jpg/revision/latest/scale-to-width-down/180?cb=20250407154909' 
  },
  { 
    name: 'CamelrinoTazzino', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/f/f4/Camelrino_Tazzino.jpg/revision/latest/scale-to-width-down/180?cb=20250407155021' 
  },
  { 
    name: 'CapuchinoAssassino', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/2/28/Capuchino_Assassino.jpg/revision/latest/scale-to-width-down/180?cb=20250407155422' 
  },
  { 
    name: 'CoccodriliFaerini', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/d/de/Coccodrilli_Faerini.jpg/revision/latest/scale-to-width-down/180?cb=20250407155545' 
  },
  { 
    name: 'CoccodrilloRobloxino', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/8/8c/Coccodrillo_Robloxino.jpg/revision/latest/scale-to-width-down/180?cb=20250407155651' 
  },
  { 
    name: 'CocosaticBungus', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/c/c9/Cocosatic_Bungus.jpg/revision/latest/scale-to-width-down/180?cb=20250407155750' 
  },
  { 
    name: 'CrocodildoPenisini', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/d/dc/Crocodildo_Penisini.jpg/revision/latest/scale-to-width-down/180?cb=20250407155858' 
  },
  { 
    name: 'DangeritoBearito', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/9/9d/Dangerito_Bearito.jpg/revision/latest/scale-to-width-down/180?cb=20250407155952' 
  },
  { 
    name: 'FrigoCamelo', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/b/b4/Frigo_Camelo.jpg/revision/latest/scale-to-width-down/180?cb=20250407160050' 
  },
  { 
    name: 'FrulliFrulla', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/b/bc/Frulli_Frulla.jpg/revision/latest/scale-to-width-down/180?cb=20250407160142' 
  },
  { 
    name: 'GomariPallkari', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/4/40/Gomari_Pallkari.jpg/revision/latest/scale-to-width-down/180?cb=20250407160235' 
  },
  { 
    name: 'LombraIlluminata', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/0/0d/L%27ombra_Illuminata.jpg/revision/latest/scale-to-width-down/180?cb=20250407160336' 
  },
  { 
    name: 'MalameAmarale', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/c/cb/Malam%C3%A9_Amaral%C3%A9.jpg/revision/latest/scale-to-width-down/180?cb=20250407160429' 
  },
  { 
    name: 'MarkusDerKaktus', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/3/34/Markus_der_Kaktus.jpg/revision/latest/scale-to-width-down/180?cb=20250407160525' 
  },
  { 
    name: 'MeteritoBearito', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/6/68/Meterito_Bearito.jpg/revision/latest/scale-to-width-down/180?cb=20250407160612' 
  },
  { 
    name: 'PiccioneMacchina', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/a/a0/Piccione_Macchina.jpg/revision/latest/scale-to-width-down/180?cb=20250407160714' 
  },
  { 
    name: 'PomederoBombordero', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/1/14/Pomedero_Bombordero.jpg/revision/latest/scale-to-width-down/180?cb=20250407160804' 
  },
  { 
    name: 'PorcospinoStivale', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/0/02/Porcospino_stivale.jpg/revision/latest/scale-to-width-down/180?cb=20250407160848' 
  },
  { 
    name: 'PotHotspot', 
    url: 'https://static.wikia.nocookie.net/brainrotnew/images/e/ec/Pot_Hotspot.jpg/revision/latest/scale-to-width-down/180?cb=20250407160954' 
  }
];

// Función para descargar una imagen
function downloadImage(character) {
  return new Promise((resolve, reject) => {
    const outputPath = path.join(baseDir, `${character.name}.jpg`);
    
    console.log(`Descargando imagen de ${character.name}...`);
    
    // Descargar imagen
    const file = fs.createWriteStream(outputPath);
    https.get(character.url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`✅ ${character.name} descargado correctamente`);
        resolve();
      });
    }).on('error', (error) => {
      fs.unlink(outputPath, () => {}); // Eliminar archivo en caso de error
      console.error(`❌ Error descargando ${character.name}:`, error);
      reject(error);
    });
  });
}

// Procesar todas las imágenes
async function processAllImages() {
  console.log(`Descargando ${characterImages.length} imágenes...`);
  
  for (const character of characterImages) {
    try {
      await downloadImage(character);
    } catch (error) {
      console.error(`Error con ${character.name}:`, error);
    }
  }
  
  console.log('¡Descarga completada!');
}

processAllImages().catch(console.error); 