import { PrismaClient } from '@prisma/client';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { StatusCode } from '~/types/com-types';

const returnData = <T>(code: StatusCode, msg: string, data: T | null): NitroResponse<T> => {
	return { code, msg, data };
};

export class UserRepository {
	private prisma: PrismaClient;

	constructor() {
		this.prisma = new PrismaClient();
	}

	async createUser<T>(dto: CreateUserDto): Promise<NitroResponse<T>> {
		const res = await this.prisma.user_info.create({
			data: {
				...dto
			}
		});

		return res ? returnData(StatusCode.SUCCESS, '注册成功！', res as T) : returnData<T>(StatusCode.REGISTER_FAILED, '注册失败！', null);
	}

	async loginUser<T>(body: CreateUserDto): Promise<NitroResponse<T>> {
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

			return returnData(StatusCode.SUCCESS, '登录成功！', { accessToken } as T);
		}

		return returnData<T>(StatusCode.LOGIN_FAILED, '登录失败！', null);
	}

	async findUser<T>(id: number): Promise<NitroResponse<T>> {
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

			return returnData(StatusCode.SUCCESS, '查询成功！', { content } as T);
		}

		return returnData<T>(StatusCode.FAIL, '查询失败！', null);
	}
}
