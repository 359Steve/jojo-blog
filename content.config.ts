import { defineContentConfig, defineCollection } from '@nuxt/content';
import { z } from 'zod';

export default defineContentConfig({
	collections: {
		blog: defineCollection({
			type: 'page',
			source: '**/*.md',
			schema: z.object({
				date: z.date(),
				cover: z.string().optional(),
				tags: z
					.array(
						z.object({
							name: z.string(),
							icon: z.string(),
							color: z.string().optional(),
							url: z.string().url().optional(),
						}),
					)
					.optional(),
			}),
		}),
	},
});
