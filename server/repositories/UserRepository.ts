import type { PrismaClient } from '@prisma/client';
import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { StatusCode } from '~/types/com-types';
import { returnData } from '../utils/public';
import { prisma } from '../core/prisma';

export class UserRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 用户登录
	async loginUser(body: Pick<CreateUserDto, 'user_name' | 'password'>) {
		const { user_name, password: pwd } = body;
		try {
			const res = await this.prismaClient.user_info.findFirst({
				where: {
					user_name,
					password: pwd,
				},
			});

			if (res?.id) {
				const { password, ...rest } = res;
				return returnData(StatusCode.SUCCESS, '登录成功！', { accessToken: signToken(rest) });
			}

			return returnData(StatusCode.LOGIN_FAILED, '登录失败！', null);
		} catch (error) {
			return returnData(StatusCode.LOGIN_FAILED, '登录失败！', null);
		}
	}

	// 查询用户信息
	async findUser(user_name: string) {
		try {
			const res = await this.prismaClient.user_info.findFirst({
				where: {
					user_name,
				},
				include: {
					tags: {
						include: {
							tag: true, // 查询标签详情
						},
					},
				},
			});

			return res
				? returnData(StatusCode.SUCCESS, '用户信息查询成功', user_name ? res : { ...res, password: '' })
				: returnData(StatusCode.FAIL, '用户信息查询失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '用户信息查询失败', null);
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
				? returnData(StatusCode.SUCCESS, '用户信息查询成功', res)
				: returnData(StatusCode.FAIL, '用户信息查询失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '用户信息查询失败', null);
		}
	}

	// 上传头像
	async uploadAvatar(files: ReturnFunction<typeof readMultipartFormData>) {
		try {
			if (!files || files.length === 0) {
				throw new Error('没有上传文件！');
			}

			const file = files[0];

			// 验证文件大小（最大 10MB）
			const maxFileSize = 10 * 1024 * 1024;
			if (file.data && file.data.length > maxFileSize) {
				throw new Error('文件大小不能超过 10MB');
			}

			// 验证文件类型
			const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
			if (file.type && !allowedTypes.includes(file.type.toLowerCase())) {
				throw new Error('只支持上传图片文件（jpg、png、gif、webp）');
			}

			const fileName = file.filename || 'avatar.png';
			const dirPath = join(process.cwd(), 'file-system', 'avatar');
			const filePath = join(dirPath, fileName);

			// 判断当前文件是否已经存在
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath); // 删除旧文件，准备覆盖
			}

			// 确保目录存在
			if (!fs.existsSync(dirPath)) {
				fs.mkdirSync(dirPath, { recursive: true });
			}

			if (!file.data) {
				throw new Error('文件数据无效');
			}

			await writeFile(filePath, file.data);

			// 返回文件访问路径
			return returnData(StatusCode.SUCCESS, '上传成功', { url: `/avatar/${fileName}` });
		} catch (error) {
			return returnData(StatusCode.FAIL, (error as Error).message, null);
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
					const tagNumbers = tags
						.map((tag_id) => ({
							user_id: Number(userInfo.id),
							tag_id,
						}))
						.filter(Boolean);

					await tx.user_tag.createMany({
						data: tagNumbers,
					});
				}

				return user;
			});

			return res
				? returnData(StatusCode.SUCCESS, '用户信息更新成功', res)
				: returnData(StatusCode.FAIL, '用户信息更新失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '用户信息更新失败', null);
		}
	}
}
