import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // include uppercase JPG assets so Vite doesn't try to parse them as JS
  assetsInclude: ['**/*.JPG', '**/*.jpg'],
  plugins: [react()],
  server: {
    port: 5174,
    open: true
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Split i18n translations into separate chunk
          if (id.includes('hooks/i18n')) {
            return 'i18n';
          }
          // Split framer-motion into separate chunk
          if (id.includes('node_modules/framer-motion')) {
            return 'framer-motion';
          }
          // Core vendor dependencies
          if (id.includes('node_modules/react') || 
              id.includes('node_modules/react-dom') || 
              id.includes('node_modules/react-router-dom')) {
            return 'vendor';
          }
          // i18next dependencies
          if (id.includes('node_modules/i18next') || 
              id.includes('node_modules/react-i18next')) {
            return 'i18next';
          }
        }
      }
    }
  },
  // Ensure esbuild parses JSX in dependencies during optimization
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
        '.jsx': 'jsx'
      }
    }
  },
  resolve: {
    // prefer .jsx over .js when both exist
    extensions: ['.jsx', '.js', '.ts', '.tsx', '.json'],
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
