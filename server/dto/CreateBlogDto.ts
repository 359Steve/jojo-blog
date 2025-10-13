import { z } from 'zod';

export const CreateBlogSchema = z.object({
	id: z.number().optional(),
	title: z
		.string()
		.refine((val) => typeof val === 'string', { message: '标题必须为字符串' })
		.min(1, '标题不能为空'),
	subtitle: z
		.string()
		.refine((val) => typeof val === 'string', { message: '副标题必须为字符串' })
		.min(1, '副标题不能为空'),
	content: z
		.string()
		.refine((val) => typeof val === 'string', { message: '内容必须为字符串' })
		.min(1, '内容不能为空'),
	tags: z.array(z.number()).optional().default([]),
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
});

export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;
