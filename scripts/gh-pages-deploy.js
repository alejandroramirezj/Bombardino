const fs = require('fs');
const path = require('path');

// Copiar index.html a 404.html para el manejo de rutas en GitHub Pages
const indexHtml = path.resolve(__dirname, '../dist/index.html');
const errorHtml = path.resolve(__dirname, '../dist/404.html');

// Asegurarse de que el archivo existe
if (fs.existsSync(indexHtml)) {
  fs.copyFileSync(indexHtml, errorHtml);
  console.log('✅ Se ha creado el archivo 404.html para GitHub Pages');
} else {
  console.error('❌ No se encontró el archivo index.html en la carpeta dist');
  process.exit(1);
}

console.log('📦 La aplicación está lista para ser desplegada en GitHub Pages'); 