/** @type {import('vite').UserConfig} */

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePluginFonts } from 'vite-plugin-fonts'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteImagemin from 'vite-plugin-imagemin'

import config from './vite.plugin-config.js'
import postcss from './postcss.config.js'

const { imagemin } = config

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteImagemin(imagemin),
    createHtmlPlugin({
      minify: true,
      entry: 'src/main.tsx'
    }),
    VitePluginFonts({
      // Custom fonts
      custom: {
        families: [
          {
            name: 'PlusJakartaSans',
            src: './src/assets/fonts/*.ttf'
          }
        ],
        display: 'swap',
        preload: true,
        prefetch: false,
        injectTo: 'head-prepend'
      }
    })
  ],
  css: {
    postcss
  },
  resolve: {
    alias: [
      { find: '@/', replacement: '/src' },
      { find: '@/Assets', replacement: '/src/assets' },
      { find: '@/Components', replacement: '/src/components' },
      { find: '@/Contexts', replacement: '/src/contexts' },
      { find: '@/Data', replacement: '/src/data' },
      { find: '@/Types', replacement: '/src/types' },
      { find: '@/Utils', replacement: '/src/utils' }
    ]
  }
})
