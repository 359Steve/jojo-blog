import type { PrismaClient } from '@prisma/client';
import { returnData } from '../utils/public';
import { StatusCode } from '~/types/com-types';
import type { CreateTagDto } from '../dto/CreateTagDto';
import { prisma } from '../core/prisma';

export class TagRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 查询全部标签
	async findAllTag(query: FindAllReq) {
		const { name, pageNumber, pageSize } = query;

		const [records, total] = await Promise.all([
			this.prismaClient.tag.findMany({
				skip: (Number(pageNumber) - 1) * Number(pageSize),
				take: Number(pageSize),
				where: {
					name: {
						contains: name,
					},
				},
			}),
			this.prismaClient.tag.count({
				where: {
					name: {
						contains: name,
					},
				},
			}),
		]);

		return records
			? returnData(StatusCode.SUCCESS, '查询成功！', {
				records,
				total,
			})
			: returnData(StatusCode.FAIL, '查询失败！', null);
	}

	// 分类型查询标签
	async findTag(query: FindReq) {
		const { type } = query;

		const records = await this.prismaClient.tag.findMany({
			where: {
				type,
			},
		});

		return records
			? returnData(StatusCode.SUCCESS, '查询成功！', records)
			: returnData(StatusCode.FAIL, '查询失败！', null);
	}

	// 创建标签
	async createTag(value: CreateTagDto) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const tag = await tx.tag.findFirst({
					where: {
						name: value.name,
						type: value.type,
					},
				});

				if (tag) {
					throw new Error('TAG_EXISTS');
				} else {
					return await tx.tag.create({
						data: {
							...value,
						},
					});
				}
			});

			return res
				? returnData(StatusCode.SUCCESS, '创建成功！', res)
				: returnData(StatusCode.FAIL, '创建失败！', null);
		} catch (error: any) {
			if (error.message === 'TAG_EXISTS') {
				return returnData(StatusCode.FAIL, `标签"${value.name}"已存在！`, null);
			}
			return returnData(StatusCode.FAIL, '创建失败！', null);
		}
	}

	// 修改标签
	async updateTag(body: CreateTagDto) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const existingTag = await tx.tag.findFirst({
					where: {
						name: body.name,
						type: body.type,
						id: {
							not: Number(body.id),
						},
					},
				});

				if (existingTag) {
					throw new Error('TAG_EXISTS');
				}

				return await tx.tag.update({
					where: {
						id: Number(body.id),
					},
					data: {
						name: body.name,
						icon: body.icon,
						url: body.url,
						type: body.type,
					},
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '修改成功！', res)
				: returnData(StatusCode.FAIL, '修改失败！', null);
		} catch (error: any) {
			if (error.message === 'TAG_EXISTS') {
				return returnData(StatusCode.FAIL, `标签"${body.name}"已存在！`, null);
			}
			return returnData(StatusCode.FAIL, '修改失败！', null);
		}
	}

	// 删除标签
	async deleteTag(id: number) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const blogTagCount = await tx.blog_tag.count({
					where: {
						tag_id: Number(id),
					},
				});

				if (blogTagCount > 0) {
					throw new Error('TAG_IN_USE');
				}

				const userTagCount = await tx.user_tag.count({
					where: {
						tag_id: Number(id),
					},
				});

				if (userTagCount > 0) {
					throw new Error('TAG_IN_USE');
				}

				return await tx.tag.delete({
					where: {
						id: Number(id),
					},
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '删除成功！', res)
				: returnData(StatusCode.FAIL, '删除失败！', null);
		} catch (error: any) {
			if (error.message === 'TAG_IN_USE') {
				return returnData(StatusCode.FAIL, '该标签正在被使用，无法删除！', null);
			}
			return returnData(StatusCode.FAIL, '删除失败！', null);
		}
	}
}
