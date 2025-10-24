import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      // Externalize the Figma assets to avoid issues with the build process
      external: ['figma:asset/*'],
    },
  },
  resolve: {
    alias: {
      // Alias for 'figma:asset' to resolve the asset path locally
      'figma:asset': '/src/assets', // Update this path if your assets are in a different location
    },
  },
});
