import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import markdoc from '@astrojs/markdoc';
import keystatic from '@keystatic/astro';

// Подключаем официальный генератор карты сайта
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  // УКАЗЫВАЕМ ТВОЙ ДОМЕН (ОБЯЗАТЕЛЬНО ДЛЯ КАРТЫ САЙТА)
  site: 'https://tobeewitched.ru',
  
  vite: {
    plugins: [tailwindcss()]
  },
  
  // Добавили sitemap() в список интеграций
  integrations: [react(), markdoc(), keystatic(), sitemap()]
});
