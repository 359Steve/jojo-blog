import { z } from 'zod';

export const CreateRecordDetailSchema = z.object({
	id: z.number().optional(),
	group_id: z.number().min(1, '分组ID不能为空'),
	title: z.string().min(1, '标题不能为空'),
	summary: z.string().min(1, '摘要不能为空'),
	time_range: z.string().min(1, '时间范围不能为空'),
	image_url: z.string().min(1, '图片URL不能为空'),
	image_alt: z.string().min(1, '图片描述不能为空'),
	created_at: z.string().trim().optional(),
	updated_at: z.string().trim().optional(),
});

export type CreateRecordDetailDto = z.infer<typeof CreateRecordDetailSchema>;
