// vite.ssr.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: '/client/',
  plugins: [react()],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
  ssr: {
    noExternal: ['react-dropzone'],
    external: ['express', 'leaflet', 'quill', 'react-quill']
  },
  build: {
    ssr: 'src/entry-server.tsx',
    outDir: 'dist/server',
    ssrManifest: true
  }
})
