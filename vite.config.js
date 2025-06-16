
import { defineConfig } from 'vite'
import laravel from 'laravel-vite-plugin'
import vue from '@vitejs/plugin-vue'
import DefineOptions from 'unplugin-vue-define-options/vite'
export default defineConfig({
  plugins: [
    laravel({
      //input: 'resources/js/app.js',
       input: ['resources/js/app.js','resources/css/app.css', 'resources/scss/admin/main.scss'],
      // for build
      ssr: 'resources/js/ssr.js',
      refresh: true
    }),
    // i18n(),
    vue({
      template: {
        transformAssetUrls: {
          base: null,
          includeAbsolute: false
        }
      }
    }),
    DefineOptions()
  ]
})
