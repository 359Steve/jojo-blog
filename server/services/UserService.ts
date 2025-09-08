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
	async createUser(dto: CreateUserDto) {
		return await this.userRepo.createUser(dto);
	}

	// 登录
	async loginUser(body: CreateUserDto) {
		return await this.userRepo.loginUser(body);
	}

	// 查询用户
	async findUser(id: number) {
		return await this.userRepo.findUser(id);
	}
}
