import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    // Date the post was published. Written as YYYY-MM-DD in frontmatter.
    date: z.coerce.date(),
    // Short uppercase label shown next to the date (e.g. "Strategy").
    topic: z.string(),
    // One-line summary shown in the blog index.
    summary: z.string(),
    // Italic standfirst shown under the title on the post page.
    standfirst: z.string(),
    // Hide from listings while drafting.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
