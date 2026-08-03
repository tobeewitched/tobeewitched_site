import { makeAPIRoute } from '@keystatic/astro/api';
export const prerender = false;
export const all = makeAPIRoute(Astro);
export const { GET, POST } = all;