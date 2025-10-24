import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Alias for Figma assets
      'figma:asset': path.resolve(__dirname, 'src/assets'),
    },
  },
  build: {
    rollupOptions: {
      // Externalize Figma assets to avoid build issues
      external: ['figma:asset/*'],
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // Split vendor code into separate chunk
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500, // raise the warning limit to avoid false warnings
  },
  server: {
    host: true, // listen on all interfaces
    port: 5173,
    strictPort: true,
    allowedHosts: [
      'wassel-cursor-agents.onrender.com', // add Render hostname
    ],
  },
});
