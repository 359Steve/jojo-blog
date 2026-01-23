import type { PrismaClient } from '@prisma/client';
import type { CreateRecordDetailDto } from '../dto/CreateArticleDto';
import { prisma } from '../core/prisma';
import { getFileStem, returnData } from '../utils/public';
import { StatusCode } from '~/types/com-types';
import { join } from 'path';
import fs from 'fs/promises';
import process from 'node:process';
import crypto from 'crypto';
import type Redis from 'ioredis';
import { redis } from '../core/redis';
import { getImagesMetadata } from '../utils/image-metadata';
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

			// 收集所有图片 URL
			const allImageUrls = records.flatMap((item) => item.images.map((img) => img.url).filter(Boolean));
			// 批量读取所有图片的元数据
			const imagesMetadata = await getImagesMetadata(allImageUrls);

			// 处理记录，添加 blurhash
			const recordsWithMetadata = records.map((item) => {
				return {
					...item,
					images: item.images.map((img) => {
						const url = img.url;
						const metadata = imagesMetadata[url];
						return {
							...img,
							blurhash: metadata,
						};
					}),
				};
			});

			return returnData(StatusCode.SUCCESS, '记录列表查询成功', { records: recordsWithMetadata, total });
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
						create: data.images,
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

			let dirsToDelete: string[] = [];

			const updatedRecord = await this.prismaClient.$transaction(async (tx) => {
				const record = await tx.record_details.update({
					where: { id: Number(id) },
					data: updateData,
				});

				if (!images) return record;

				const dbImages = await tx.record_images.findMany({
					where: { record_detail_id: Number(id) },
					select: { url: true },
				});

				const dbUrls = dbImages.map((i) => i.url);
				const newUrls = images.map((i) => i.url);

				const toAdd = images.filter((i) => !dbUrls.includes(i.url));
				const toDelete = dbUrls.filter((url) => !newUrls.includes(url));

				if (toAdd.length) {
					await tx.record_images.createMany({
						data: toAdd.map((item) => ({
							record_detail_id: Number(id),
							...item,
						})),
					});
				}

				if (toDelete.length) {
					await tx.record_images.deleteMany({
						where: {
							record_detail_id: Number(id),
							url: { in: toDelete },
						},
					});

					dirsToDelete = collectDirsFromUrls(toDelete);
				}

				return record;
			});

			deleteDirsAsync(dirsToDelete);

			return returnData(StatusCode.SUCCESS, '记录更新成功', updatedRecord);
		} catch (error) {
			console.error(error);
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
				const uploadDir = join(process.cwd(), 'file-system', 'recorddetail', datePath);

				await fs.rm(uploadDir, { recursive: true, force: true });

				return currentDelete;
			});

			return res
				? returnData(StatusCode.SUCCESS, '记录删除成功', res)
				: returnData(StatusCode.FAIL, '记录删除失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '记录删除失败', null);
		}
	}

	// 上传记录详情文件
	async uploadRecordDetailImage(files: ReturnFunction<typeof readMultipartFormData>, datePath: string) {
		if (!files || files.length === 0) {
			throw new Error('没有上传文件！');
		}

		try {
			// 定义允许的图片类型和扩展名
			const allowedMimeTypes = [
				'image/jpeg',
				'image/jpg',
				'image/png',
				'image/gif',
				'image/webp',
				'image/heic',
				'video/quicktime',
			];
			const allowedExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'heic', 'mov'];
			const maxFileSize = 10 * 1024 * 1024; // 10MB
			const maxFiles = 20; // 限制单次上传最大文件数

			// 限制文件数量
			if (files.length > maxFiles) {
				throw new Error(`单次最多上传 ${maxFiles} 个文件，请分批上传`);
			}

			// 确保基础文件夹存在
			const baseUploadDir = join(process.cwd(), 'file-system', 'recorddetail', datePath);
			await fs.mkdir(baseUploadDir, { recursive: true });

			const fileGroups = new Map<string, FileGroup>();

			for (const file of files) {
				if (!file.data || !file.filename) continue;

				// 验证文件大小
				if (file.data.length > maxFileSize) continue;

				// 验证文件扩展名
				const fileExtension = file.filename.split('.').pop()?.toLowerCase();
				if (!fileExtension || !allowedExtensions.includes(fileExtension)) continue;

				// 验证MIME类型
				if (file.type && !allowedMimeTypes.includes(file.type.toLowerCase())) continue;

				const stem = getFileStem(file.filename);
				if (!fileGroups.has(stem)) {
					fileGroups.set(stem, { stem, files: [] });
				}

				fileGroups.get(stem)!.files.push({
					data: Buffer.from(file.data),
					filename: file.filename,
					type: file.type || '',
					extension: fileExtension,
				});
			}

			const processPromises = Array.from(fileGroups.values()).map((group) =>
				limit(() => processGroup(group, baseUploadDir, datePath)),
			);

			// 等待所有文件组处理完成
			const results = await Promise.allSettled(processPromises);
			const uploadResults: LiveImage[] = results
				.filter((r) => r.status === 'fulfilled')
				.flatMap((r) => {
					const value = (r as PromiseFulfilledResult<LiveImage | LiveImage[] | null>).value;
					if (!value) return [];
					return Array.isArray(value) ? value : [value];
				})
				.filter(Boolean);

			if (uploadResults.length === 0) {
				throw new Error('没有有效的图片上传！请确保文件格式正确且小于10MB');
			}

			return returnData(
				StatusCode.SUCCESS,
				`成功上传 ${uploadResults.length} 张图片`,
				uploadResults.filter(Boolean),
			);
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

				// 收集所有图片 URL
				const allImageUrls = [
					...currentDetail.images.map((item) => item.url).filter(Boolean),
					...imageAll.flatMap((item) => item.images.map((img) => img.url).filter(Boolean)),
				];

				// 批量读取所有图片的元数据
				const imagesMetadata = await getImagesMetadata(allImageUrls);

				return {
					...currentDetail,
					images: currentDetail.images
						.map((item) => {
							const url = item.url;
							const metadata = imagesMetadata[url];
							return {
								url,
								blurhash: metadata,
								is_live: item.is_live,
							};
						})
						.filter((item) => item.url),
					imageAll: imageAll
						.map((item) => {
							return {
								...item,
								images: item.images
									.map((img) => {
										const url = img.url;
										const metadata = imagesMetadata[url];
										return {
											url,
											blurhash: metadata,
											is_live: img.is_live,
										};
									})
									.filter((img) => img.url),
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

				// 收集所有图片 URL
				const imageUrls = randomImages.map((item) => item.url).filter(Boolean);
				// 批量读取所有图片的元数据
				const imagesMetadata = await getImagesMetadata(imageUrls);

				const randomImagesWithGroup = await Promise.all(
					randomImages
						.map(async (item) => {
							const record = await this.prismaClient.record_details.findUnique({
								select: {
									group_id: true,
								},
								where: { id: item.record_detail_id },
							});

							const metadata = imagesMetadata[item.url];

							return {
								...item,
								group_id: record?.group_id || null,
								blurhash: metadata,
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

				if (!records) {
					return returnData(StatusCode.FAIL, '照片列表查询失败', null);
				}

				// 收集所有图片 URL
				const imageUrls = records.map((item) => item.url).filter(Boolean);
				// 批量读取所有图片的元数据
				const imagesMetadata = await getImagesMetadata(imageUrls);

				// 返回包含 blurhash 的图片信息
				const imagesWithMetadata = records.map((item) => {
					const metadata = imagesMetadata[item.url];
					return {
						url: item.url,
						is_live: item.is_live,
						blurhash: metadata,
					};
				});

				return returnData(StatusCode.SUCCESS, '照片列表查询成功', imagesWithMetadata);
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

			// 收集所有图片 URL
			const allImageUrls = records.flatMap((item) => item.images.map((img) => img.url).filter(Boolean));
			// 批量读取所有图片的元数据
			const imagesMetadata = await getImagesMetadata(allImageUrls);

			return returnData(StatusCode.SUCCESS, '记录列表查询成功', {
				records: records
					.map((item) => {
						return {
							...item,
							images: item.images
								.map((img) => {
									const url = img.url;
									const is_live = img.is_live;
									const metadata = imagesMetadata[url];
									return {
										url,
										is_live,
										blurhash: metadata,
									};
								})
								.filter((img) => img.url),
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
