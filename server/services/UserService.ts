import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
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
		const res = await this.userRepo.createUser(dto);

		const result_ok = {
			code: 200,
			msg: 'ok',
			data: res
		};

		const result_error = {
			code: 500,
			msg: '注册失败',
			data: null
		};

		return res ? result_ok : result_error;
	}

	// 登录
	async loginUser(body: CreateUserDto) {
		const res = await this.userRepo.loginUser(body);

		if (res) {
			// 生成token
			const accessToken = signToken(res);

			return {
				code: 200,
				msg: '登录成功',
				data: {
					accessToken
				}
			};
		}

		return {
			code: 500,
			msg: '登录失败',
			data: null
		};
	}

	// 查询用户
	async findUser(id: number) {
		const res = await this.userRepo.findUser(id);

		if (res) {
			// 读取文件
			const { describe } = res;
			const filePath = join(process.cwd(), 'public/file', `${describe}.txt`);
			const content = await readFile(filePath, 'utf-8');

			return {
				code: 200,
				msg: 'ok',
				data: {
					content
				}
			};
		}
		return {
			code: 500,
			msg: '查询失败',
			data: null
		};
	}
}
