import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obtener __dirname equivalente en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Copiar index.html a 404.html para el manejo de rutas en GitHub Pages
const indexHtml = path.resolve(__dirname, '../dist/index.html');
const errorHtml = path.resolve(__dirname, '../dist/404.html');
const cnameFile = path.resolve(__dirname, '../dist/CNAME');

// Asegurarse de que el archivo existe
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, errorHtml);
  console.log('✅ Se ha creado el archivo 404.html para GitHub Pages');
} else {
  console.error('❌ No se encontró el archivo index.html en la carpeta dist');
  process.exit(1);
}

// Asegurarse de que existe el archivo CNAME para dominio personalizado
if (process.env.CUSTOM_DOMAIN === 'true') {
  fs.writeFileSync(cnameFile, 'bombardirocrocodrilo.com');
  console.log('✅ Se ha creado/verificado el archivo CNAME para el dominio personalizado');
}

console.log('📦 La aplicación está lista para ser desplegada en GitHub Pages'); 