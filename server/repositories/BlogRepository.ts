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
	async getBlogList(page: number = 1, limit: number = 10, keyword?: string) {
		try {
			const skip = (page - 1) * limit;
			const where = keyword
				? {
					OR: [{ title: { contains: keyword } }, { subtitle: { contains: keyword } }],
				}
				: {};

			const [blogs, total] = await Promise.all([
				this.prismaClient.blog.findMany({
					where,
					skip,
					take: limit,
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
				list: blogs,
				total,
				page,
				limit,
				totalPages: Math.ceil(total / limit),
			});
		} catch (error) {
			console.error('获取博客列表失败:', error);
			return returnData(StatusCode.FAIL, '获取失败！', null);
		}
	}

	// 删除博客
	async deleteBlog(id: number) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 先删除博客标签关联
				await tx.blog_tag.deleteMany({
					where: { blog_id: id },
				});

				// 再删除博客
				return await tx.blog.delete({
					where: { id },
				});
			});

			return res
				? returnData(StatusCode.SUCCESS, '删除成功！', res)
				: returnData(StatusCode.FAIL, '删除失败！', null);
		} catch (error) {
			console.error('删除博客失败:', error);
			return returnData(StatusCode.FAIL, '删除失败！', null);
		}
	}
}
