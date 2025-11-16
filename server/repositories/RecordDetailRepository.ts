import type { PrismaClient } from '@prisma/client';
import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import { prisma } from '../core/prisma';
import { returnData } from '../utils/public';
import { StatusCode } from '~/types/com-types';
import { extname, join } from 'path';
import { writeFile } from 'fs/promises';
import { randomUUID } from 'crypto';
import fs from 'fs';

export class RecordDetailRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 查询全部记录详情
	async getAllRecordDetails(query: { pageNumber: number; pageSize: number }) {
		try {
			const { pageNumber, pageSize } = query;
			const offset = (pageNumber - 1) * pageSize;

			const [records, total] = await Promise.all([
				this.prismaClient.record_details.findMany({
					orderBy: { created_at: 'desc' },
					skip: offset,
					take: pageSize,
					include: {
						group: {
							select: {
								time_range: true,
							},
						},
					},
				}),
				this.prismaClient.record_details.count(),
			]);

			if (!records || !total) {
				return returnData(StatusCode.SUCCESS, '记录列表到底了', null);
			}

			return returnData(StatusCode.SUCCESS, '记录列表查询成功', { records, total });
		} catch (error) {
			return returnData(StatusCode.FAIL, '记录列表查询失败', null);
		}
	}

	// 新增记录详情
	async createRecordDetail(data: CreateRecordDetailDto) {
		try {
			const res = await this.prismaClient.record_details.create({
				data: {
					...data,
				},
			});

			return res
				? returnData(StatusCode.SUCCESS, '记录创建成功', res)
				: returnData(StatusCode.FAIL, '记录创建失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '创建失败', null);
		}
	}

	// 更新记录详情
	async updateRecordDetail(data: Partial<CreateRecordDetailDto>) {
		try {
			const { id, ...updateData } = data;
			const res = await this.prismaClient.record_details.update({
				where: { id: Number(id) },
				data: updateData,
			});

			return res
				? returnData(StatusCode.SUCCESS, '记录更新成功', res)
				: returnData(StatusCode.FAIL, '记录更新失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '记录更新失败', null);
		}
	}

	// 删除记录详情
	async deleteRecordDetail(id: number) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const currentDelete = await tx.record_details.delete({
					where: { id: Number(id) },
				});

				// 删除记录详情图片
				const imageUrl = currentDelete.image_url;
				if (imageUrl) {
					const relativePath = imageUrl.startsWith('/') ? imageUrl.substring(1) : imageUrl;
					const imagePath = join(process.cwd(), 'public', relativePath);
					if (fs.existsSync(imagePath)) {
						fs.unlinkSync(imagePath);
					}
				}

				return currentDelete;
			});

			return res
				? returnData(StatusCode.SUCCESS, '记录删除成功', res)
				: returnData(StatusCode.FAIL, '记录删除失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '记录删除失败', null);
		}
	}

	// 上传记录详情图片
	async uploadRecordDetailImage(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		try {
			if (!files || files.length === 0) {
				throw new Error('没有上传文件');
			}

			const file = files[0];

			// 验证文件
			if (!file.data || !file.filename) {
				throw new Error('文件数据无效');
			}

			// 验证文件类型
			const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
			const fileExtension = extname(file.filename).toLowerCase();

			if (!allowedExtensions.includes(fileExtension)) {
				throw new Error('不支持的文件格式，只允许 JPG、PNG、GIF、WebP 格式！');
			}

			// 验证文件大小
			const maxSize = 5 * 1024 * 1024; // 5MB
			if (file.data.length > maxSize) {
				throw new Error('文件大小不能超过 5MB');
			}

			// 生成安全的文件名
			const timestamp = Date.now();
			const uuid = randomUUID().replace(/-/g, '').substring(0, 8);
			const safeFileName = `recorddetail_${timestamp}_${uuid}${fileExtension}`;

			// 确保目录存在
			const uploadDir = join(process.cwd(), 'public/recorddetail');
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const savePath = join(uploadDir, safeFileName);

			// 保存文件
			await writeFile(savePath, file.data);

			// 返回文件访问路径
			return returnData(StatusCode.SUCCESS, '上传成功', { url: `/recorddetail/${safeFileName}` });
		} catch (error) {
			return returnData(StatusCode.FAIL, (error as Error).message, null);
		}
	}

	// 查询单个记录详情
	async getPublicRecordDetail(parentId: number, id: number) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const currentDetail = await tx.record_details.findUnique({
					where: {
						id: Number(id),
					},
				});

				const imageAll = await tx.record_details.findMany({
					select: {
						id: true,
						image_url: true,
						image_alt: true,
					},
					where: {
						group_id: Number(parentId),
					},
					orderBy: {
						time_range: 'desc',
					},
				});

				const prev = await tx.record_details.findFirst({
					where: {
						group_id: Number(parentId),
						id: {
							lt: Number(id),
						},
					},
					orderBy: {
						id: 'desc',
					},
					select: {
						id: true,
					},
				});

				const next = await tx.record_details.findFirst({
					where: {
						group_id: Number(parentId),
						id: {
							gt: Number(id),
						},
					},
					orderBy: {
						id: 'asc',
					},
					select: {
						id: true,
					},
				});

				if (!currentDetail || !imageAll) {
					return null;
				}

				return {
					...currentDetail,
					imageAll,
					prev,
					next,
				};
			});

			return res
				? returnData(StatusCode.SUCCESS, '记录详情查询成功', res)
				: returnData(StatusCode.FAIL, '记录详情不存在', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '记录详情查询失败', null);
		}
	}

	// 查询照片
	async getPublicRecordPictures(query: FindPictureRequest) {
		try {
			const { pageNumber, pageSize, random } = query;
			const offset = (Number(pageNumber) - 1) * Number(pageSize);

			if (random) {
				// 随机查询四张照片
				const records: HomePicResponse<CreateRecordDetailDto>[] = await this.prismaClient
					.$queryRaw`SELECT id, group_id as parent_id, image_url, image_alt FROM record_details WHERE image_url != '' ORDER BY RAND() LIMIT 4`;

				return returnData(StatusCode.SUCCESS, '照片列表查询成功', records);
			} else {
				// 正常查询分页照片
				const records = await this.prismaClient.record_details.findMany({
					where: {
						image_url: {
							not: '',
						},
					},
					skip: offset,
					take: Number(pageSize),
					orderBy: {
						created_at: 'desc',
					},
					select: {
						id: true,
						group_id: true,
						image_url: true,
						image_alt: true,
					},
				});

				return returnData(
					StatusCode.SUCCESS,
					'照片列表查询成功',
					records.map((item) => {
						return {
							...item,
							parent_id: item.group_id,
						};
					}),
				);
			}
		} catch (error) {
			return returnData(StatusCode.FAIL, '照片列表查询失败', null);
		}
	}

	// 分页查询记录详情
	async getPublicRecordDetails(query: RecordQueryParams) {
		try {
			const { pageNumber, pageSize, parentId } = query;
			const offset = (pageNumber - 1) * pageSize;

			const [records, total] = await Promise.all([
				this.prismaClient.record_details.findMany({
					where: {
						group_id: Number(parentId),
					},
					select: {
						id: true,
						title: true,
						time_range: true,
						image_url: true,
						image_alt: true,
					},
					orderBy: {
						time_range: 'desc',
					},
					skip: offset,
					take: Number(pageSize),
				}),
				this.prismaClient.record_details.count({
					where: {
						group_id: Number(parentId),
					},
				}),
			]);

			if (!records || !total) {
				return returnData(StatusCode.SUCCESS, '记录列表到底了', null);
			}

			return returnData(StatusCode.SUCCESS, '记录列表查询成功', { records, total });
		} catch (error) {
			return returnData(StatusCode.FAIL, '记录列表查询失败', null);
		}
	}
}
