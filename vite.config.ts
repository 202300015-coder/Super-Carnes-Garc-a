import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Super-Carnes-Garc-a/',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    port: 5173,
    open: true
  }
})
