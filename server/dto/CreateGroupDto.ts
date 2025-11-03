import { z } from 'zod';

export const CreateGroupSchema = z.object({
	id: z.number().optional(),
	time_range: z.string().trim().min(1, '年份不能为空！').max(255),
	title: z.string().trim().min(1, '标题不能为空！').max(100),
	role: z.string().trim().min(1, '简介不能为空！').max(100),
	summary: z.string().trim().min(1, '描述不能为空！').max(100),
	created_at: z.string().trim().optional(),
	updated_at: z.string().trim().optional(),
});

export type CreateGroupDto = z.infer<typeof CreateGroupSchema>;
