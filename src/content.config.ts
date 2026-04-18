import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    permalink: z.string(),
    title: z.string(),
    description: z.string(),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    thumbnail: z.string().optional(),
    lang: z.enum(['en', 'es']).default('en'),
  }),
});

export const collections = { blog };
