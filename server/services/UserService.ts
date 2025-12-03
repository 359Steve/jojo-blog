import type { CreateUserDto } from '../dto/CreateUserDto';
import type { UserRepository } from '../repositories/UserRepository';

export const USER_SERVICE = Symbol('UserService');
export interface UserService {
	// 登录
	loginUser(body: Pick<CreateUserDto, 'user_name' | 'password'>): ReturnType<UserRepository['loginUser']>;
	// 查询用户
	findUser(user_name: string): ReturnType<UserRepository['findUser']>;
	// 查询用户公共信息
	getPublicUserInfo(): ReturnType<UserRepository['getPublicUserInfo']>;
	// 上传头像
	uploadAvatar(files: ReturnFunction<typeof readMultipartFormData>): ReturnType<UserRepository['uploadAvatar']>;
	// 更新信息
	updateUser(body: Partial<CreateUserDto & { tags: number[] }>): ReturnType<UserRepository['updateUser']>;
}
