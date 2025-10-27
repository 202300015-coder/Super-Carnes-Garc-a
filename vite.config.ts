import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Super-Carnes-Garc-a/', // 👈 usa el nombre exacto del repo
  publicDir: 'public', // 👈 carpeta donde tienes tus assets estáticos
  build: {
    outDir: 'dist', // salida de producción (por defecto)
    emptyOutDir: true
  },
  server: {
    port: 5173, // puedes cambiar el puerto si lo necesitas
    open: true  // abre el navegador al iniciar
  }
})
