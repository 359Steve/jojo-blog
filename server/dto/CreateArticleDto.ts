import { z } from 'zod';

const imageSchema = z.object({
	url: z.string().min(1, '图片地址不能为空'),
	is_live: z.boolean(),
	blurhash: z.string().optional(),
});

export const CreateRecordDetailSchema = z.object({
	id: z.number().optional(),
	group_id: z
		.number()
		.min(1, '分组ID不能为空')
		.refine((val) => typeof val === 'number', { message: '分组ID必须为数字' }),
	title: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '标题必须为字符串' })
		.min(1, '标题不能为空'),
	summary: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '摘要必须为字符串' })
		.min(1, '摘要不能为空'),
	time_range: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '时间范围必须为字符串' })
		.min(1, '时间范围不能为空'),
	images: z.array(imageSchema).optional().default([]),
	date_path: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '日期路径必须为字符串' })
		.min(1, '日期路径不能为空'),
	image_alt: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '图片描述必须为字符串' })
		.min(1, '图片描述不能为空'),
	views: z.number().optional(),
	created_at: z.string().trim().optional(),
	updated_at: z.string().trim().optional(),
});

export type CreateRecordDetailDto = z.infer<typeof CreateRecordDetailSchema>;
