import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['figma:asset/*'],  // Externalize the Figma assets
    },
  },
  resolve: {
    alias: {
      // Alias for 'figma:asset' if you still want to reference it (not recommended for assets like images)
      // Adjust this if you want a custom resolution method
      'figma:asset': '/src/assets',  // This example assumes you want to resolve assets from a local directory
    },
  },
});
