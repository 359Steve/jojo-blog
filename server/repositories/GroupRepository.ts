import type { PrismaClient } from '@prisma/client';
import type { CreateGroupDto } from '../dto/CreateGroupDto';
import { prisma } from '../core/prisma';
import { returnData } from '../utils/public';
import { StatusCode } from '~/types/com-types';

export class GroupRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 查询全部分组
	async getAllGroups(query: Omit<FindAllReq, 'name'>) {
		const { pageNumber, pageSize } = query;

		try {
			const [records, total] = await Promise.all([
				this.prismaClient.record_group.findMany({
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
				this.prismaClient.record_group.count(),
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
				const existingGroup = await tx.record_group.findFirst({
					where: { time_range: data.time_range },
				});

				if (existingGroup) {
					returnData(StatusCode.FAIL, '已存在相同年份的分组', null);
				}
				return tx.record_group.create({
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
				const existingGroup = await tx.record_group.findFirst({
					where: { time_range: data.time_range },
				});

				if (existingGroup) {
					returnData(StatusCode.FAIL, '已存在相同年份的分组', null);
				}

				return await this.prismaClient.record_group.update({
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
			const res = await this.prismaClient.record_group.delete({
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
			const records = await this.prismaClient.record_group.findMany({
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
	async getPublicGroups(keyword?: string) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const where = keyword
					? {
						title: {
							contains: keyword,
						},
					}
					: {};

				return tx.record_group.findMany({
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
								image_url: true,
								image_alt: true,
							},
							orderBy: {
								time_range: 'desc',
							},
							take: 5,
						},
					},
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '分组列表查询成功', res)
				: returnData(StatusCode.FAIL, '分组列表查询失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '分组列表查询失败', null);
		}
	}
}
