import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, './shared')
    }
  },
  plugins: [solid()],
  build: {
    rollupOptions: {
      input: {
        'app': './index.html',
        'service-worker': './src/service-worker.js'
      },
      output: {
        entryFileNames: assetInfo => {
          return assetInfo.name === 'service-worker' ? '[name].js' : 'assets/[name]-[hash].js'
        }
      }
    }
  }
})
