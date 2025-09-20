import { z } from 'zod';

export const CreateUserSchema = z.object({
	id: z.number().optional(),
	user_name: z.string().min(2, '名字长度在2到10之间').max(10, '名字长度在2到10之间'),
	password: z.string().min(6, '密码长度在6到20之间').max(20, '密码长度在6到20之间'),
	avatar_url: z.string().min(1, '头像不能为空'),
	pet_name: z.string().min(2, '昵称长度在2到10之间').max(10, '昵称长度在2到10之间'),
	sign: z.string().min(2, '签名长度在2到20之间').max(20, '签名长度在2到20之间'),
	describe: z.string().min(2, '描述长度在2到20之间').max(20, '描述长度在2到20之间'),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
