import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			// Transform string to Date object
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
		}),
});

const projects = defineCollection({
	loader: glob({
	  base: "./src/content/projects",
	  pattern: "**/*.{md,mdx}",
	}),
	schema: z.object({
	  title: z.string(),
	  client: z.string(),
	  excerpt: z.string(),
	  featuredImage: z.string(),
	  previewImage: z.string().optional(),
	  website: z.string().optional(),
	  github: z.string().optional(),
	  year: z.number(),
	  featured: z.boolean().default(false),
	  categories: z.array(z.string()),
	  services: z.array(z.string()),
	  technologies: z.array(z.string()),
	  gallery: z.array(z.string()).default([])
	})
  });
  
export const collections = {
	blog,
	projects
};
