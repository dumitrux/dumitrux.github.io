import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// Wrap markdown tables in a horizontally scrollable container so that wide
// tables scroll inside their own box instead of forcing page-level horizontal
// overflow on small screens.
function rehypeWrapTables() {
  return (tree) => {
    const walk = (node) => {
      if (!node.children) return;
      node.children = node.children.map((child) => {
        if (child.type === 'element' && child.tagName === 'table') {
          return {
            type: 'element',
            tagName: 'div',
            properties: { style: 'overflow-x:auto;max-width:100%' },
            children: [child],
          };
        }
        walk(child);
        return child;
      });
    };
    walk(tree);
  };
}

export default defineConfig({
  site: 'https://dumitrux.github.io',
  integrations: [tailwind(), sitemap()],
  markdown: {
    rehypePlugins: [rehypeWrapTables],
  },
  server: { host: true },
  vite: {
    server: {
      allowedHosts: 'all',
    },
  },
});
