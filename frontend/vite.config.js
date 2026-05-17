import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // All /api requests → backend (no CORS header needed)
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      // Socket.IO long-polling and upgrade → backend
      '/socket.io': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        ws: true,          // proxy WebSocket upgrades too
      },
    },
  },
});
