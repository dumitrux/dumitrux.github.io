import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://dumitrux.github.io',
  integrations: [tailwind(), sitemap()],
  server: { host: true },
  vite: {
    server: {
      allowedHosts: 'all',
    },
  },
});
