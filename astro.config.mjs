// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

// Google uses a URL's sitemap lastmod as a signal for when to re-check it, so
// stamp each article's URL with its updatedDate (falling back to pubDate) —
// read straight from frontmatter since astro:content isn't available here.
const articlesDir = fileURLToPath(new URL('./src/content/articles', import.meta.url));
const articleLastmod = new Map();
for (const file of readdirSync(articlesDir)) {
  if (!file.endsWith('.md')) continue;
  const raw = readFileSync(join(articlesDir, file), 'utf-8');
  const date = raw.match(/^updatedDate:\s*(\S+)/m)?.[1] ?? raw.match(/^pubDate:\s*(\S+)/m)?.[1];
  if (date) articleLastmod.set(`/articles/${file.replace(/\.md$/, '')}/`, new Date(date));
}

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
    sitemap({
      serialize(item) {
        const lastmod = articleLastmod.get(new URL(item.url).pathname);
        if (lastmod) item.lastmod = lastmod.toISOString();
        return item;
      },
    }),
    mdx(),
  ],
});
