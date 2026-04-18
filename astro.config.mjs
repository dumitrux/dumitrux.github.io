import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://dumitrux.github.io',
  integrations: [tailwind()],
});
