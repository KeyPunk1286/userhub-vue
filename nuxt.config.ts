// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
// import primevue   from './primevue.config'
import Aura from '@primeuix/themes/aura';
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['primeicons/primeicons.css', '@/assets/css/main.css'],
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'jwt-decode',
        'zod',
        '@primevue/forms/form',
        '@primevue/forms/formfield',
        '@primevue/forms/resolvers/zod',
      ],
    },
  },

  modules: ['@primevue/nuxt-module'],
  // @ts-ignore:
  primevue: {
    options: {
      theme: {
        preset: Aura,
      },
    },
  },
});
