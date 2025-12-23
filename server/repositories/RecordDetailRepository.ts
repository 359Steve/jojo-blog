import type { PrismaClient } from '@prisma/client';
import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import { prisma } from '../core/prisma';
import { returnData } from '../utils/public';
import { StatusCode } from '~/types/com-types';
import { join } from 'path';
import { writeFile } from 'fs/promises';
import fs from 'fs';
import crypto from 'crypto';
import type Redis from 'ioredis';
import { redis } from '../core/redis';
import { getPublicDir } from '../utils/index';

export class RecordDetailRepository {
	constructor(
		private prismaClient: PrismaClient = prisma,
		private redisClient: Redis = redis,
	) { }

	// 查询全部记录详情
	async getAllRecordDetails(query: { pageNumber: number; pageSize: number }) {
		try {
			const { pageNumber, pageSize } = query;
			const offset = (pageNumber - 1) * pageSize;

			const [records, total] = await this.prismaClient.$transaction([
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
						images: true,
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
					images: {
						create: data.images
							.map((item) => {
								return {
									url: item,
								};
							})
							.filter(Boolean),
					},
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
			const { id, images, ...updateData } = data;

			const res = await this.prismaClient.$transaction(async (tx) => {
				const updatedRecord = await tx.record_details.update({
					where: { id: Number(id) },
					data: updateData,
				});

				if (updatedRecord) {
					// 处理图片更新
					if (images) {
						const dbImages = await tx.record_images.findMany({
							where: { record_detail_id: Number(id) },
							select: { url: true },
						});
						const dbUrls = dbImages.map((item) => item.url).filter(Boolean);

						const toAdd = images.filter((url) => !dbUrls.includes(url));
						const toDelete = dbUrls.filter((url) => !images.includes(url));

						if (toAdd.length > 0) {
							await tx.record_images.createMany({
								data: toAdd
									.map((url) => ({
										record_detail_id: Number(id),
										url,
									}))
									.filter(Boolean),
							});
						}

						if (toDelete.length > 0) {
							await tx.record_images.deleteMany({
								where: {
									record_detail_id: Number(id),
									url: { in: toDelete },
								},
							});
						}

						toDelete.forEach((img) => {
							if (img) {
								const relativePath = img.startsWith('/') ? img.substring(1) : img;
								const publicDir = getPublicDir();
								const imagePath = join(publicDir, relativePath);
								if (fs.existsSync(imagePath)) {
									fs.unlinkSync(imagePath);
								}
							}
						});
					}
				}

				return updatedRecord;
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

				const datePath = currentDelete.date_path;
				const publicDir = getPublicDir();
				const uploadDir = join(publicDir, 'recorddetail', datePath);

				if (fs.existsSync(uploadDir)) {
					fs.rmSync(uploadDir, { recursive: true, force: true });
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
	async uploadRecordDetailImage(files: ReturnFunction<typeof readMultipartFormData>, datePath: string) {
		if (!files || files.length === 0) {
			throw new Error('没有上传文件！');
		}

		try {
			const uploadResults = [];

			// 定义允许的图片类型和扩展名
			const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
			const maxFileSize = 10 * 1024 * 1024; // 10MB

			for (let i = 0; i < files.length; i++) {
				const file = files[i];

				if (!file.data || !file.filename) {
					continue;
				}

				// 验证文件大小
				if (file.data.length > maxFileSize) {
					continue;
				}

				// 验证文件扩展名
				const fileExtension = file.filename.split('.').pop()?.toLowerCase();
				if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
					continue;
				}

				// 验证MIME类型
				if (file.type && !allowedMimeTypes.includes(file.type.toLowerCase())) {
					continue;
				}

				// 生成安全的文件名
				const timestamp = Date.now();
				const randomStr = Math.random().toString(36).substring(2, 8);
				const safeFileName = `recorddetail_${timestamp}_${randomStr}.${fileExtension}`;

				// 确保文件夹存在
				const publicDir = getPublicDir();
				const uploadDir = join(publicDir, 'recorddetail', datePath);
				if (!fs.existsSync(uploadDir)) {
					fs.mkdirSync(uploadDir, { recursive: true });
				}

				const filePath = join(uploadDir, safeFileName);

				// 写入文件
				await writeFile(filePath, file.data);

				// 添加到结果数组
				uploadResults.push({
					originalName: file.filename,
					fileName: safeFileName,
					url: `/recorddetail/${datePath}/${safeFileName}`,
					size: file.data.length,
					type: file.type || `image/${fileExtension}`,
				});
			}

			if (uploadResults.length === 0) {
				throw new Error('没有有效的图片文件上传！请确保文件为图片格式且小于10MB');
			}

			return returnData(StatusCode.SUCCESS, `成功上传 ${uploadResults.length} 个图片文件`, {
				urls: uploadResults.map((item) => item.url).filter(Boolean),
			});
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
					include: {
						images: true,
					},
				});

				const imageAll = await tx.record_details.findMany({
					select: {
						id: true,
						image_alt: true,
						images: true,
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
					images: currentDetail.images.map((item) => item.url).filter(Boolean),
					imageAll: imageAll
						.map((item) => {
							return {
								...item,
								images: item.images.map((img) => img.url).filter(Boolean),
							};
						})
						.filter(Boolean),
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
			const { random } = query;

			if (random) {
				// 随机查询照片
				const randomImages: RecordDetailImages[] = await this.prismaClient
					.$queryRaw`SELECT * FROM record_images WHERE url != '' ORDER BY RAND() LIMIT 4`;

				const randomImagesWithGroup = await Promise.all(
					randomImages
						.map(async (item) => {
							const record = await this.prismaClient.record_details.findUnique({
								select: {
									group_id: true,
								},
								where: { id: item.record_detail_id },
							});

							return {
								...item,
								group_id: record?.group_id || null,
							};
						})
						.filter(Boolean),
				);

				return returnData(StatusCode.SUCCESS, '照片列表查询成功', randomImagesWithGroup);
			} else {
				// 正常查询分页照片
				const records = await this.prismaClient.record_images.findMany({
					where: {
						url: {
							not: '',
						},
					},
					orderBy: {
						id: 'desc',
					},
				});

				return records
					? returnData(
						StatusCode.SUCCESS,
						'照片列表查询成功',
						records.map((item) => item.url).filter(Boolean),
					)
					: returnData(StatusCode.FAIL, '照片列表查询失败', null);
			}
		} catch (error) {
			return returnData(StatusCode.FAIL, '照片列表查询失败', null);
		}
	}

	// 查询记录详情列表
	async getPublicRecordDetails() {
		try {
			const [records, total] = await this.prismaClient.$transaction([
				this.prismaClient.record_details.findMany({
					select: {
						id: true,
						group_id: true,
						title: true,
						time_range: true,
						images: true,
						image_alt: true,
						created_at: true,
						updated_at: true,
					},
					orderBy: {
						time_range: 'desc',
					},
				}),
				this.prismaClient.record_details.count(),
			]);

			if (!records || !total) {
				return returnData(StatusCode.SUCCESS, '记录列表到底了', null);
			}

			return returnData(StatusCode.SUCCESS, '记录列表查询成功', {
				records: records
					.map((item) => {
						return {
							...item,
							images: item.images.map((img) => img.url).filter(Boolean),
						};
					})
					.filter(Boolean),
				total,
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, '记录列表查询失败', null);
		}
	}

	// 增加记录详情浏览量
	async addRecordDetailView(id: number, ip: string, userAgent: string) {
		try {
			const fingerprint = crypto.createHash('md5').update(userAgent).digest('hex');
			const redisKey = `record:view:${id}:${ip}:${fingerprint}`;

			// 检查今天是否已经访问
			const hasViewed = await this.redisClient.get(redisKey);
			if (hasViewed) {
				// 已经访问过，不增加浏览量
				return returnData(StatusCode.SUCCESS, '今日已浏览，浏览量未增加', null);
			}

			const updatedBlog = await this.prismaClient.$transaction(async (tx) => {
				// 增加浏览量
				const updatedBlog = await tx.record_details.update({
					where: { id: Number(id) },
					data: {
						views: {
							increment: 1,
						},
					},
				});

				// 设置Redis键，过期时间为24小时
				await setRedisWithExpire(this.redisClient, redisKey, '1');
				// 存储一条浏览记录
				await this.prismaClient.record_details_views_daily.upsert({
					where: {
						record_detail_id_view_date: {
							record_detail_id: Number(id),
							view_date: getDay('today'),
						},
					},
					update: {
						views: {
							increment: 1,
						},
					},
					create: {
						record_detail_id: Number(id),
						view_date: getDay('today'),
						views: 1,
					},
				});

				return updatedBlog;
			});

			return updatedBlog
				? returnData(StatusCode.SUCCESS, '浏览量增加成功', updatedBlog)
				: returnData(StatusCode.FAIL, '增加浏览量失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '增加浏览量失败', null);
		}
	}
}
