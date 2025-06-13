import { PrismaClient } from '@prisma/client';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import type { CreateUserDto } from '../dto/CreateUserDto';

export class UserRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async createUser<T>(dto: CreateUserDto): Promise<JoJoResponse<T>> {
		const res = await this.prisma.user_info.create({
			data: {
				...dto
			}
		});

		const result_ok = {
			code: 200,
			msg: 'ok',
			data: res as T
		};

		const result_error = {
			code: 500,
			msg: '注册失败',
			data: null
		};

		return res ? result_ok : result_error;
	}

	async loginUser<T>(body: CreateUserDto): Promise<JoJoResponse<T>> {
		const { user_name, password } = body;
		const res = await this.prisma.user_info.findFirst({
			where: {
				user_name,
				password
			}
		});

		if (res) {
			// 生成token
			const accessToken = signToken(res);

			return {
				code: 200,
				msg: '登录成功',
				data: {
					accessToken
				} as T
			};
		}

		return {
			code: 500,
			msg: '登录失败',
			data: null
		};
	}

	async findUser<T>(id: number): Promise<JoJoResponse<T>> {
		const res = await this.prisma.user_info.findUnique({
			where: {
				id: Number(id)
			}
		});

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
				} as T
			};
		}
		return {
			code: 500,
			msg: '查询失败',
			data: null
		};
	}
}
