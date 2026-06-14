import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function GET(context) {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  const items = articles
    .sort((a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime())
    .map((a) => ({
      title: a.data.title,
      pubDate: a.data.pubDate,
      description: a.data.excerpt ?? a.data.description,
      link: `/articles/${a.id}`,
    }));

  return rss({
    title: 'Zander Tran | The Invisible Expert',
    description:
      'Essential reading on authority building, AI strategy, and career reinvention for Gen X professionals with 20+ years of expertise.',
    site: context.site,
    items,
  });
}
