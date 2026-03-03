import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    // Use the browser-like jsdom environment so React components can render
    environment: 'jsdom',
    // Make Vitest's describe/it/expect globally available (no import needed)
    globals: true,
    // Run this file before every test suite to extend matchers (e.g. toBeInTheDocument)
    setupFiles: './src/test-setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      // Exclude entry points & pure data modules from coverage measurement
      exclude: ['src/main.tsx', 'src/data/**', '**/*.d.ts', 'vite.config.ts'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },

  base: '/',

  build: {
    outDir: 'dist',
    sourcemap: false,  // Disable for production
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          mui: ['@mui/material', '@emotion/react', '@emotion/styled']
        }
      }
    }
  }
})
