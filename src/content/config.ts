import { defineCollection, z } from 'astro:content';
import { GUIDES } from '../config/guides';

// Single schema definition (DRY principle)
const guideSchema = z.object({
  title: z.string(),
  section: z.number(),
  description: z.string().optional(),
});

// Dynamically create collections from registry
const collections: Record<string, any> = {};

Object.values(GUIDES).forEach(guide => {
  collections[guide.collection] = defineCollection({
    type: 'content',
    schema: guideSchema,
  });
});

export { collections };
