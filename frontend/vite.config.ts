import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: true, // Necesario para Docker
    port: 3000,
    watch: {
      usePolling: true
    }
  }
})