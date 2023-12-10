import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'NPS List',
        short_name: 'NPS List',
        start_url: '.',
        display: 'standalone',
        description: 'NoPayStation web app',
        orientation: 'any',
        theme_color: '#155e75',
        background_color: '#155e75',
        icons: [
          {
            src: './favicon.ico',
            type: 'image/x-icon',
            sizes: '32x32'
          },
          {
            src: './icon-192.png',
            type: 'image/png',
            sizes: '192x192'
          },
          {
            src: './icon-512.png',
            type: 'image/png',
            sizes: '512x512'
          },
          {
            src: './icon-192-maskable.png',
            type: 'image/png',
            sizes: '192x192',
            purpose: 'maskable'
          },
          {
            src: './icon-512-maskable.png',
            type: 'image/png',
            sizes: '512x512',
            purpose: 'maskable'
          }
        ],
        edge_side_panel: {}
      },
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
