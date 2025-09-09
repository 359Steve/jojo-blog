import { PrismaClient } from '@prisma/client';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { StatusCode } from '~/types/com-types';
import { returnData } from '../utils/public';
import { prisma } from '../core/prisma';

export class UserRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	async createUser(dto: CreateUserDto) {
		const res = await this.prismaClient.user_info.create({
			data: {
				...dto
			}
		});

		return res ? returnData(StatusCode.SUCCESS, '注册成功！', res) : returnData(StatusCode.REGISTER_FAILED, '注册失败！', null);
	}

	async loginUser(body: CreateUserDto) {
		const { user_name, password } = body;
		const res = await this.prismaClient.user_info.findFirst({
			where: {
				user_name,
				password
			}
		});

		if (res) {
			// 生成token
			const accessToken = signToken(res);

			return returnData(StatusCode.SUCCESS, '登录成功！', { accessToken });
		}

		return returnData(StatusCode.LOGIN_FAILED, '登录失败！', null);
	}

	async findUser(id: number) {
		const res = await this.prismaClient.user_info.findUnique({
			where: {
				id: Number(id)
			}
		});

		if (res) {
			// 读取文件
			const { describe } = res;
			const filePath = join(process.cwd(), 'public/file', `${describe}.txt`);
			const content = await readFile(filePath, 'utf-8');

			return returnData(StatusCode.SUCCESS, '查询成功！', { content });
		}

		return returnData(StatusCode.FAIL, '查询失败！', null);
	}
}
