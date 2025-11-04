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
					skip: (Number(pageNumber) - 1) * Number(pageSize),
					take: Number(pageSize),
				}),
				this.prismaClient.record_group.count(),
			]);

			return records
				? returnData(StatusCode.SUCCESS, '查询成功！', {
					records,
					total,
				})
				: returnData(StatusCode.FAIL, '查询失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '查询失败！', null);
		}
	}

	// 新增分组
	async createGroup(data: CreateGroupDto) {
		try {
			const res = await this.prismaClient.record_group.create({
				data,
			});

			return res
				? returnData(StatusCode.SUCCESS, '创建成功！', res)
				: returnData(StatusCode.FAIL, '创建失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '创建失败！', null);
		}
	}

	// 更新分组
	async updateGroup(data: Partial<CreateGroupDto>) {
		try {
			const { id } = data;
			const res = await this.prismaClient.record_group.update({
				where: { id },
				data,
			});

			return res
				? returnData(StatusCode.SUCCESS, '更新成功！', res)
				: returnData(StatusCode.FAIL, '更新失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '更新失败！', null);
		}
	}

	// 删除分组
	async deleteGroup(id: number) {
		try {
			const res = await this.prismaClient.record_group.delete({
				where: { id: Number(id) },
			});

			return res
				? returnData(StatusCode.SUCCESS, '删除成功！', res)
				: returnData(StatusCode.FAIL, '删除失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '删除失败！', null);
		}
	}
}
