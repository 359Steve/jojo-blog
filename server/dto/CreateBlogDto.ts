import { z } from 'zod';

export const CreateBlogSchema = z.object({
	id: z.number().optional(),
	front_cover: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '封面必须为字符串' })
		.min(1, '封面不能为空'),
	title: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '标题必须为字符串' })
		.min(1, '标题不能为空'),
	subtitle: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '副标题必须为字符串' })
		.min(1, '副标题不能为空'),
	content: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '内容必须为字符串' })
		.min(1, '内容不能为空'),
	date_path: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '日期路径必须为字符串' })
		.min(1, '日期路径不能为空'),
	tags: z.array(z.number()).optional().default([]),
	created_at: z.string().trim().optional(),
	updated_at: z.string().trim().optional(),
});

export type CreateBlogDto = z.infer<typeof CreateBlogSchema>;
