import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    open: true,
    port: 3000
  },
  optimizeDeps: {
    include: ['kaiban-board', 'kaibanjs']
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  build: {
    sourcemap: true,
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          kaiban: ['kaiban-board', 'kaibanjs']
        }
      }
    }
  }
})
