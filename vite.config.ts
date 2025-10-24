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
    chunkSizeWarningLimit: 1500, // avoid warnings for large chunks
  },
  server: {
    host: '0.0.0.0', // listen on all interfaces (required by Render)
    port: Number(process.env.PORT) || 5173, // use Render-assigned port
    strictPort: true,
    allowedHosts: ['wassel-cursor-agents.onrender.com'],
  },
  preview: {
    host: '0.0.0.0',
    port: Number(process.env.PORT) || 4173, // preview port
  },
});
