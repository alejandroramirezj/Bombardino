import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";

// Detectar si estamos en producción y usar una variable de entorno para el dominio
const isCustomDomain = process.env.CUSTOM_DOMAIN === 'true';
const base = isCustomDomain ? '/' : '/Bombardino/';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base,
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
    mode === 'production' && visualizer({
      filename: './stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Genera un archivo 404.html idéntico a index.html para el manejo de rutas en GitHub Pages
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
}));
