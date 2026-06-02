import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
// base = '/tarot_app/' để chạy đúng trên GitHub Pages (https://GKGB1212.github.io/tarot_app/)
export default defineConfig({
  base: '/tarot_app/',
  plugins: [react()],
})
