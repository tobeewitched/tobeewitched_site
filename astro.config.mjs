import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';

export default defineConfig({
  site: 'https://tobeewitched.ru',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()]
  },
  integrations: [react(), markdoc(), keystatic(), sitemap()]
});
