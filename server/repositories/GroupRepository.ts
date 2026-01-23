import type { PrismaClient } from '@prisma/client';
import type { CreateGroupDto } from '../dto/CreateGroupDto';
import { prisma } from '../core/prisma';
import { returnData } from '../utils/public';
import { StatusCode } from '~/types/com-types';
import { join } from 'path';
import fs from 'fs/promises';
import process from 'node:process';

export class GroupRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 查询全部分组
	async getAllGroups(query: Omit<FindAllReq, 'name'>) {
		const { pageNumber, pageSize } = query;

		try {
			const [records, total] = await this.prismaClient.$transaction([
				this.prismaClient.record_groups.findMany({
					include: {
						_count: {
							select: {
								details: true,
							},
						},
					},
					skip: (Number(pageNumber) - 1) * Number(pageSize),
					take: Number(pageSize),
				}),
				this.prismaClient.record_groups.count(),
			]);

			if (!records || !total) {
				return returnData(StatusCode.SUCCESS, '分组列表到底了', null);
			}

			return returnData(StatusCode.SUCCESS, '分组列表查询成功', {
				records,
				total,
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, '分组列表查询失败', null);
		}
	}

	// 新增分组
	async createGroup(data: CreateGroupDto) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 判断当前是否存在同一年份的分组
				const existingGroup = await tx.record_groups.findFirst({
					where: { time_range: data.time_range },
				});

				if (existingGroup) {
					returnData(StatusCode.FAIL, '已存在相同年份的分组', null);
				}
				return await tx.record_groups.create({
					data,
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '分组创建成功', res)
				: returnData(StatusCode.FAIL, '分组创建失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '分组创建失败', null);
		}
	}

	// 更新分组
	async updateGroup(data: Partial<CreateGroupDto>) {
		try {
			const { id } = data;
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 判断当前是否存在同一年份的分组
				const existingGroup = await tx.record_groups.findFirst({
					where: { time_range: data.time_range },
				});

				if (existingGroup) {
					returnData(StatusCode.FAIL, '已存在相同年份的分组', null);
				}

				return await tx.record_groups.update({
					where: { id },
					data,
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '分组更新成功', res)
				: returnData(StatusCode.FAIL, '分组更新失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '分组更新失败', null);
		}
	}

	// 删除分组
	async deleteGroup(id: number) {
		try {
			// 首先删除关联的记录详情所有图片
			const relatedDetails = await this.prismaClient.record_details.findMany({
				where: { group_id: Number(id) },
				select: { date_path: true },
			});

			relatedDetails.forEach(async (currentDelete) => {
				if (currentDelete.date_path) {
					const uploadDir = join(process.cwd(), 'file-system', 'recorddetail', currentDelete.date_path);

					await fs.rm(uploadDir, { recursive: true, force: true });
				}
			});
			const res = await this.prismaClient.record_groups.delete({
				where: { id: Number(id) },
			});

			return res
				? returnData(StatusCode.SUCCESS, '分组删除成功', res)
				: returnData(StatusCode.FAIL, '分组删除失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '分组删除失败', null);
		}
	}

	// 查询分组时间范围
	async getGroupTimeRanges() {
		try {
			const records = await this.prismaClient.record_groups.findMany({
				select: {
					id: true,
					time_range: true,
				},
				orderBy: {
					time_range: 'desc',
				},
			});

			return records
				? returnData(StatusCode.SUCCESS, '分组时间范围查询成功', records)
				: returnData(StatusCode.FAIL, '分组时间范围查询失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '分组时间范围查询失败', null);
		}
	}

	// 查询公共分组数据
	async getPublicGroups(query: { id?: number }) {
		const { id } = query;
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const where = {
					...(id && { id: Number(id) }),
				};

				const currentRecord = await tx.record_groups.findFirst({
					where: {
						...where,
						details: {
							some: {},
						},
					},
					orderBy: {
						time_range: 'desc',
					},
					include: {
						details: {
							select: {
								id: true,
								title: true,
								time_range: true,
								images: {
									select: {
										url: true,
									},
									orderBy: {
										id: 'asc',
									},
									take: 1,
								},
								image_alt: true,
								views: true,
							},
							orderBy: {
								time_range: 'desc',
							},
							take: 5,
						},
						_count: {
							select: {
								details: true,
							},
						},
					},
				});

				if (!currentRecord) {
					return null;
				}

				// 查找上一条有 details 的记录
				const prev = await tx.record_groups.findFirst({
					where: {
						id: {
							lt: Number(currentRecord.id),
						},
						details: {
							some: {},
						},
					},
					orderBy: {
						id: 'desc',
					},
					select: {
						id: true,
					},
				});

				// 查找下一条有 details 的记录
				const next = await tx.record_groups.findFirst({
					where: {
						id: {
							gt: Number(currentRecord.id),
						},
						details: {
							some: {},
						},
					},
					orderBy: {
						id: 'asc',
					},
					select: {
						id: true,
					},
				});

				// 收集所有图片URL
				const allImageUrls = currentRecord.details.flatMap((detail) =>
					detail.images.map((img) => img.url).filter(Boolean),
				);
				// 批量读取所有图片的元数据
				const imagesMetadata = await getImagesMetadata(allImageUrls);
				return {
					...currentRecord,
					details: currentRecord.details
						.map((item) => {
							return {
								...item,
								images: item.images
									.map((img) => {
										const url = img.url;
										const metadata = imagesMetadata[url];
										return {
											...img,
											blurhash: metadata,
										};
									})
									.filter(Boolean),
							};
						})
						.filter(Boolean),
					prev,
					next,
				};
			});

			return returnData(StatusCode.SUCCESS, res ? '分组列表查询成功' : '暂无更多数据', res);
		} catch (error) {
			return returnData(StatusCode.FAIL, '分组列表查询失败', null);
		}
	}
}
