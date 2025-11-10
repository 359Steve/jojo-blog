import { z } from 'zod';

const emailRegex =
	/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const CreateErrorMessageSchema = z.object({
	name: z.string().min(1, '名称不能为空'),
	email: z.string().min(1, '邮箱不能为空').regex(emailRegex, '邮箱格式不正确'),
	content: z.string().min(1, '错误内容不能为空'),
});

export type CreateErrorMessageDto = z.infer<typeof CreateErrorMessageSchema>;
