import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  'essays': defineCollection({ loader: glob({ pattern: "**/*.{md,mdoc,mdx}", base: "./src/content/essays" }) }),
  'research': defineCollection({ loader: glob({ pattern: "**/*.{md,mdoc,mdx}", base: "./src/content/research" }) }),
  'stories': defineCollection({ loader: glob({ pattern: "**/*.{md,mdoc,mdx}", base: "./src/content/stories" }) }),
  'about': defineCollection({ loader: glob({ pattern: "**/*.{md,mdoc,mdx}", base: "./src/content/about" }) }),
  'publications': defineCollection({ loader: glob({ pattern: "**/*.json", base: "./src/content/publications" }) }),
  'home': defineCollection({ loader: glob({ pattern: "**/*.json", base: "./src/content/home" }) }),
  'site': defineCollection({ loader: glob({ pattern: "**/*.json", base: "./src/content/site" }) }),
  'test': defineCollection({ loader: glob({ pattern: "**/*.json", base: "./src/content/test" }) }),
};