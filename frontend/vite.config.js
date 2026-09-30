import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // 👈 Membuka akses agar bisa dibuka via IP WiFi
    port: 5173  // 👈 Port default Vite
  }
})