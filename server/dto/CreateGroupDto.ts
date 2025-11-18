import { z } from 'zod';
import { CreateRecordDetailSchema } from './CreateArticleDto';

export const CreateGroupSchema = z.object({
	id: z.number().optional(),
	time_range: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '年份必须为字符串' })
		.min(1, '年份不能为空！')
		.max(255),
	title: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '标题必须为字符串' })
		.min(1, '标题不能为空！')
		.max(100),
	role: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '简介必须为字符串' })
		.min(1, '简介不能为空！')
		.max(100),
	summary: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '描述必须为字符串' })
		.min(1, '描述不能为空！')
		.max(100),
	created_at: z.string().trim().optional(),
	updated_at: z.string().trim().optional(),
});

export type CreateGroupDto = z.infer<typeof CreateGroupSchema>;
