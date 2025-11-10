import { z } from 'zod';

export const CreateTagSchema = z.object({
	id: z.number().optional(),
	name: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '名字必须为字符串' })
		.min(2, '名字长度在2到50之间')
		.max(50, '名字长度在2到50之间'),
	color: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '颜色必须为字符串' })
		.regex(/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, '颜色格式不正确')
		.min(2, '颜色长度在2到20之间')
		.max(20, '颜色长度在2到20之间'),
	icon: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '图标class必须为字符串' })
		.min(2, '图标class长度在2到255之间')
		.max(255, '图标class长度在2到255之间'),
	url: z
		.string()
		.trim()
		.refine((val) => typeof val === 'string', { message: '链接必须为字符串' })
		.min(1, '链接不能为空'),
	type: z.enum(['BLOG', 'PERSON'], { message: '类型必须是 BLOG 或 PERSON' }),
});
export type CreateTagDto = z.infer<typeof CreateTagSchema>;
