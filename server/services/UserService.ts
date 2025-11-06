import { container } from '../core/container';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
	private userRepo: UserRepository;

	constructor() {
		// 这里手动获取容器中的依赖
		this.userRepo = container.get(UserRepository);
	}

	// 登录
	async loginUser(body: Pick<CreateUserDto, 'user_name' | 'password'>) {
		return await this.userRepo.loginUser(body);
	}

	// 查询用户
	async findUser(user_name: string) {
		return await this.userRepo.findUser(user_name);
	}

	// 查询用户公共信息
	async getPublicUserInfo() {
		return await this.userRepo.getPublicUserInfo();
	}

	// 上传头像
	async uploadAvatar(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		return await this.userRepo.uploadAvatar(files);
	}

	// 更新信息
	async updateUser(body: Partial<CreateUserDto & { tags: number[] }>) {
		return await this.userRepo.updateUser(body);
	}
}
