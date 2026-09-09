import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://tobeewitched.ru',
  
  vite: {
    plugins: [tailwindcss()]
  },
  
  integrations: [react(), markdoc(), keystatic(), sitemap()]
});
