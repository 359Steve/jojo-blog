import { z } from 'zod';

export const BlogTagSchema = z.object({
	blog_id: z.number().refine((val) => typeof val === 'number', { message: 'blog_id 必须为数字' }),
	tag_id: z.number().refine((val) => typeof val === 'number', { message: 'tag_id 必须为数字' }),
});

export type BlogTagDto = z.infer<typeof BlogTagSchema>;
