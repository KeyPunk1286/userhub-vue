import { defineConfig } from 'eslint/config';
import js from '@eslint/js';
import globals from 'globals';
import pluginVue from 'eslint-plugin-vue';

export default defineConfig([
  js.configs.recommended, // базові правила JS
  pluginVue.configs['flat/recommended'], // Vue 3 правила
  {
    files: ['**/*.{js,mjs,cjs,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        defineNuxtPlugin: 'readonly',
        defineNuxtRouteMiddleware: 'readonly',
        definePageMeta: 'readonly',
        navigateTo: 'readonly',
      },
    },
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'warn',
      'vue/multi-word-component-names': 'off',
    },
  },
]);
