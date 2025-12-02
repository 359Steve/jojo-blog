import { z } from 'zod';

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const CreateErrorMessageSchema = z.object({
	id: z.number().optional(),
	name: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '名称必须为字符串' })
		.min(1, '名称不能为空'),
	email: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '邮箱必须为字符串' })
		.min(1, '邮箱不能为空')
		.regex(emailRegex, '邮箱格式不正确'),
	content: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '错误内容必须为字符串' })
		.min(1, '错误内容不能为空'),
	created_at: z.string().trim().optional(),
});

export type CreateErrorMessageDto = z.infer<typeof CreateErrorMessageSchema>;
