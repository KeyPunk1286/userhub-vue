// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'
import primevue   from './primevue.config'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()]
  },

  
  modules: ['@primevue/nuxt-module'],
 // @ts-ignore:
  primevue
})
