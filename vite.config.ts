import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      // Your aliases...
    },
  },
  build: {
    target: 'esnext',
    outDir: 'build',
  },
  server: {
    host: '0.0.0.0',  // Bind to all IPs
    port: process.env.PORT || 3000,  // Use Render's PORT environment variable or fallback to 3000
    open: true,
    allowedHosts: [
      'wassel-cursor-agents.onrender.com', // Add the allowed host here
    ],
  },
});
