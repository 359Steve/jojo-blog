import type { PrismaClient } from '@prisma/client';
import { prisma } from '../core/prisma';
import type { CreateBlogDto } from '../dto/CreateBlogDto';
import { StatusCode } from '~/types/com-types';

export class BlogRepository {
	constructor(private prismaClient: PrismaClient = prisma) { }

	// 创建博客
	async createBlog(data: CreateBlogDto) {
		const { tags, ...blogData } = data;

		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 创建博客
				const blog = await tx.blog.create({
					data: blogData,
				});

				// 如果有标签，创建博客标签关联
				if (tags && tags.length > 0) {
					await tx.blog_tag.createMany({
						data: tags.map((tagId) => ({
							blog_id: blog.id,
							tag_id: tagId,
						})),
					});
				}

				return blog;
			});

			return res
				? returnData(StatusCode.SUCCESS, '创建成功！', res)
				: returnData(StatusCode.FAIL, '创建失败！', null);
		} catch (error) {
			console.error('创建博客失败:', error);
			return returnData(StatusCode.FAIL, '创建失败！', null);
		}
	}

	// 获取博客列表
	async getBlogList(data: FindBlogParams) {
		try {
			const { pageSize = 10, pageNumber = 1, keyword = '' } = data;
			const skip = (pageNumber - 1) * pageSize;
			const where = keyword
				? {
					OR: [
						{
							title: {
								contains: keyword,
							},
						},
						{
							subtitle: {
								contains: keyword,
							},
						},
					],
				}
				: {};

			const [records, total] = await Promise.all([
				this.prismaClient.blog.findMany({
					where,
					skip: Number(skip),
					take: Number(pageSize),
					orderBy: { created_at: 'desc' },
					include: {
						tags: {
							include: {
								tag: true,
							},
						},
					},
				}),
				this.prismaClient.blog.count({ where }),
			]);

			return returnData(StatusCode.SUCCESS, '获取成功！', {
				records,
				total,
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, '获取失败！', null);
		}
	}

	// 删除博客
	async deleteBlog(id: number) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 先删除博客标签关联
				await tx.blog_tag.deleteMany({
					where: { blog_id: Number(id) },
				});

				// 再删除博客
				return await tx.blog.delete({
					where: { id: Number(id) },
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '删除成功！', res)
				: returnData(StatusCode.FAIL, '删除失败！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '删除失败！', null);
		}
	}

	// 查询单个博客
	async getBlogById(id: number) {
		try {
			const blog = await this.prismaClient.blog.findUnique({
				where: { id: Number(id) },
				include: {
					tags: {
						include: {
							tag: true,
						},
					},
				},
			});

			return blog
				? returnData(StatusCode.SUCCESS, '获取成功！', blog)
				: returnData(StatusCode.FAIL, '博客不存在！', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '获取失败！', null);
		}
	}

	// 更新博客
	async updateBlog(data: CreateBlogDto) {
		const { id, tags, ...blogData } = data;

		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 更新博客基本信息
				await tx.blog.update({
					where: { id: Number(id) },
					data: blogData,
				});

				// 处理标签关联
				if (tags !== undefined) {
					// 先删除所有旧的标签关联
					await tx.blog_tag.deleteMany({
						where: { blog_id: Number(id) },
					});

					// 如果有新标签，创建新的关联
					if (tags.length > 0) {
						await tx.blog_tag.createMany({
							data: tags.map((tagId) => ({
								blog_id: Number(id),
								tag_id: tagId,
							})),
						});
					}
				}

				// 返回包含标签的完整博客信息
				return await tx.blog.findUnique({
					where: { id: Number(id) },
					include: {
						tags: {
							include: {
								tag: true,
							},
						},
					},
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '更新成功！', res)
				: returnData(StatusCode.FAIL, '更新失败！', null);
		} catch (error) {
			console.error('更新博客失败:', error);
			return returnData(StatusCode.FAIL, '更新失败！', null);
		}
	}
}
