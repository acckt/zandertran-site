// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://zandertran.com',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  markdown: {
    // Keep straight quotes (matches the hand-coded site + frontmatter copy) and,
    // critically, stop "--"/"---" from becoming en/em dashes (zero em dash brand rule).
    smartypants: false,
  },
  integrations: [
    sitemap(),
    mdx(),
  ],
});
