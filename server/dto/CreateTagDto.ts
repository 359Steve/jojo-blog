import { z } from 'zod';

export const CreateTagSchema = z.object({
	id: z.number().optional(),
	name: z.string().min(2, '名字长度在2到50之间').max(50, '名字长度在2到50之间'),
	icon: z.string().min(10, '图标class长度在10到255之间').max(255, '图标class长度在10到255之间'),
	url: z.string().min(1, '链接不能为空'),
	type: z.enum(['BLOG', 'PERSON'], { message: '类型必须是 BLOG 或 PERSON' }),
});
export type CreateTagDto = z.infer<typeof CreateTagSchema>;
