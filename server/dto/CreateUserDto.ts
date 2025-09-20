import { z } from 'zod';

export const CreateUserSchema = z.object({
	id: z.number().optional(),
	user_name: z
		.string()
		.refine((val) => typeof val === 'string', { message: '名字必须为字符串' })
		.min(2, '名字长度在2到10之间')
		.max(10, '名字长度在2到10之间'),
	password: z
		.string()
		.refine((val) => typeof val === 'string', { message: '密码必须为字符串' })
		.min(6, '密码长度在6到20之间')
		.max(20, '密码长度在6到20之间'),
	avatar_url: z
		.string()
		.refine((val) => typeof val === 'string', { message: '头像必须为字符串' })
		.min(1, '头像不能为空'),
	pet_name: z
		.string()
		.refine((val) => typeof val === 'string', { message: '昵称必须为字符串' })
		.min(2, '昵称长度在2到10之间')
		.max(20, '昵称长度在2到20之间'),
	sign: z
		.string()
		.refine((val) => typeof val === 'string', { message: '签名必须为字符串' })
		.min(2, '签名长度不能少于2个字符'),
	describe: z
		.string()
		.refine((val) => typeof val === 'string', { message: '描述必须为字符串' })
		.min(2, '描述长度不能少于2个字符'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
