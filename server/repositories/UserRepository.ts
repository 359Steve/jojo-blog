import type { PrismaClient } from '@prisma/client';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import process from 'node:process';
import fs from 'node:fs';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { StatusCode } from '~/types/com-types';
import { returnData } from '../utils/public';
import { prisma } from '../core/prisma';

export class UserRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 用户登录
	async loginUser(body: Pick<CreateUserDto, 'user_name' | 'password'>) {
		const { user_name, password } = body;
		try {
			const res = await this.prismaClient.user_info.findFirst({
				where: {
					user_name,
					password,
				},
			});

			return res
				? returnData(StatusCode.SUCCESS, '登录成功！', { accessToken: signToken(res) })
				: returnData(StatusCode.LOGIN_FAILED, '登录失败！', null);
		} catch (error) {
			return returnData(StatusCode.LOGIN_FAILED, '登录失败！', null);
		}
	}

	// 查询用户信息
	async findUser(user_name: string) {
		try {
			const res = await this.prismaClient.user_info.findFirst({
				where: user_name ? { user_name } : undefined,
				include: {
					tags: {
						include: {
							tag: true, // 查询标签详情
						},
					},
				},
			});

			return res
				? returnData(StatusCode.SUCCESS, '查询成功！', user_name ? res : { ...res, password: '' })
				: returnData(StatusCode.FAIL, '查询失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '查询失败！', null);
		}
	}

	// 查询用户公共信息
	async getPublicUserInfo() {
		try {
			const res = await this.prismaClient.user_info.findFirst({
				select: {
					id: true,
					user_name: true,
					avatar_url: true,
					pet_name: true,
					sign: true,
					describe: true,
					tags: {
						include: {
							tag: true, // 查询标签详情
						},
					},
				},
			});

			return res
				? returnData(StatusCode.SUCCESS, '查询成功！', res)
				: returnData(StatusCode.FAIL, '查询失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '查询失败！', null);
		}
	}

	// 上传头像
	async uploadAvatar(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		try {
			if (!files || files.length === 0) {
				return returnData(StatusCode.FAIL, '没有上传文件！', null);
			}

			const file = files[0];
			const fileName = file.filename || 'avatar.png';

			// 判断当前文件是否已经存在
			const filePath = join(process.cwd(), 'public/avatar', fileName);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath); // 删除旧文件，准备覆盖
			}

			// 确保目录存在
			const dirPath = join(process.cwd(), 'public/avatar');
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath, { recursive: true });
			}

			const savePath = join(dirPath, fileName);

			if (!file.data) {
				return returnData(StatusCode.FAIL, '上传失败！', null);
			}

			await writeFile(savePath, file.data);

			// 返回文件访问路径
			return returnData(StatusCode.SUCCESS, '上传成功！', { url: `/avatar/${fileName}` });
		} catch (error) {
			return returnData(StatusCode.FAIL, '上传失败！', null);
		}
	}

	// 更新信息
	async updateUser(body: Partial<CreateUserDto> & { tags?: number[] }) {
		const { tags, ...userInfo } = body;

		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 更新用户基本信息
				const user = await tx.user_info.update({
					where: {
						id: Number(userInfo.id),
					},
					data: {
						...userInfo,
					},
				});

				// 删除旧的标签关联
				await tx.user_tag.deleteMany({
					where: {
						user_id: Number(userInfo.id),
					},
				});

				// 创建新的标签关联
				if (tags && tags.length > 0) {
					const tagNumbers = tags.map((tag_id) => ({
						user_id: Number(userInfo.id),
						tag_id,
					}));

					await tx.user_tag.createMany({
						data: tagNumbers,
					});
				}

				return user;
			});

			return res
				? returnData(StatusCode.SUCCESS, '修改成功！', res)
				: returnData(StatusCode.FAIL, '修改失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '修改失败！', null);
		}
	}
}
