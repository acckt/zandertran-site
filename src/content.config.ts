import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articles' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      // <title> tag override and OG title (full SEO title). Falls back to title.
      seoTitle: z.string().optional(),
      description: z.string(),
      // Listing/card excerpt. Falls back to description.
      excerpt: z.string().optional(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum([
        'Authority Building',
        'AI Strategy',
        'Career Reinvention',
      ]),
      funnelStage: z.enum(['TOFU', 'MOFU', 'BOFU']),
      cluster: z.string().optional(),
      type: z.enum(['article', 'pillar', 'linkable-asset']).default('article'),
      readTime: z.string(),
      featureImage: image(),
      featureImageAlt: z.string(),
      // Alt text used on the article hero (can differ from the card alt). Falls back to featureImageAlt.
      heroImageAlt: z.string().optional(),
      featured: z.boolean().default(false),
      // The lede paragraph rendered above the body (italic, gold rule).
      lede: z.string().optional(),
      // Keywords for Article schema.
      keywords: z.string().optional(),
      // End-of-article CTA box (varies per article: newsletter vs challenge).
      ctaEyebrow: z.string().optional(),
      ctaTitle: z.string().optional(),
      ctaText: z.string().optional(),
      ctaUrl: z.string().optional(),
      ctaButton: z.string().optional(),
      faqs: z
        .array(z.object({ q: z.string(), a: z.string() }))
        .optional(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { articles };
