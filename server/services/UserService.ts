import { container } from '../core/container';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { UserRepository } from '../repositories/UserRepository';

export class UserService {
	private userRepo: UserRepository;

	constructor() {
		// 这里手动获取容器中的依赖
		this.userRepo = container.get(UserRepository);
	}

	// 创建用户
	async createUser<T>(dto: CreateUserDto): Promise<NitroResponse<T>> {
		return await this.userRepo.createUser<T>(dto);
	}

	// 登录
	async loginUser<T>(body: CreateUserDto): Promise<NitroResponse<T>> {
		return await this.userRepo.loginUser<T>(body);
	}

	// 查询用户
	async findUser<T>(id: number): Promise<NitroResponse<T>> {
		return await this.userRepo.findUser<T>(id);
	}
}
