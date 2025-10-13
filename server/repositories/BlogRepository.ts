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
}
