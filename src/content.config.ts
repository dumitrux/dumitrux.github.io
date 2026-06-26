import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    permalink: z.string(),
    title: z.string(),
    description: z.string().min(1, 'description must not be empty'),
    date: z.date(),
    tags: z.array(z.string()).optional(),
    secondaryTags: z.array(z.string()).optional(),
    thumbnail: z.string(),
    pinned: z.boolean().optional(),
    lang: z.enum(['en', 'es']).default('en'),
  }),
});

export const collections = { blog };
