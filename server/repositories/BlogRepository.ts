import type { PrismaClient } from '@prisma/client';
import { prisma } from '../core/prisma';
import type { CreateBlogDto } from '../dto/CreateBlogDto';
import { StatusCode } from '~/types/com-types';
import { writeFile } from 'node:fs/promises';
import { join, extname } from 'node:path';
import process from 'node:process';
import { randomUUID } from 'node:crypto';
import fs from 'node:fs';

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
						data: tags
							.map((tagId) => ({
								blog_id: blog.id,
								tag_id: tagId,
							}))
							.filter(Boolean),
					});
				}

				return blog;
			});

			return res
				? returnData(StatusCode.SUCCESS, '博客创建成功', res)
				: returnData(StatusCode.FAIL, '博客创建失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '博客创建失败', null);
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

			const [list, total] = await this.prismaClient.$transaction([
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

			if (!list || !total) {
				return returnData(StatusCode.SUCCESS, '博客列表到底了', null);
			}

			return returnData(StatusCode.SUCCESS, '博客列表获取成功', {
				records: list,
				total,
			});
		} catch (error) {
			return returnData(StatusCode.FAIL, '博客列表获取失败', null);
		}
	}

	// 删除博客
	async deleteBlog(id: number) {
		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				const currentDelete = await tx.blog.delete({
					where: { id: Number(id) },
				});

				// 删除博客封面图片
				const frontcover = currentDelete.front_cover;
				if (frontcover) {
					const relativePath = frontcover.startsWith('/') ? frontcover.substring(1) : frontcover;
					const frontcoverPath = join(process.cwd(), 'public', relativePath);
					if (fs.existsSync(frontcoverPath)) {
						fs.unlinkSync(frontcoverPath);
					}
				}

				// 删除文章里的所有图片
				const datePath = currentDelete.date_path;
				const uploadDir = join(process.cwd(), 'public', 'mdfile', datePath);

				if (fs.existsSync(uploadDir)) {
					fs.rmSync(uploadDir, { recursive: true, force: true });
				}

				return currentDelete;
			});

			return res
				? returnData(StatusCode.SUCCESS, '博客删除成功', res)
				: returnData(StatusCode.FAIL, '博客删除失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '博客删除失败', null);
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
				? returnData(StatusCode.SUCCESS, '博客获取成功', blog)
				: returnData(StatusCode.FAIL, '博客不存在', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '博客获取失败', null);
		}
	}

	// 更新博客
	async updateBlog(data: Partial<CreateBlogDto>) {
		const { id, tags, ...blogData } = data;

		try {
			const res = await this.prismaClient.$transaction(async (tx) => {
				// 如果更新封面，先获取旧封面路径并删除
				if (blogData.front_cover) {
					const oldBlog = await tx.blog.findUnique({
						where: { id: Number(id) },
						select: { front_cover: true },
					});

					if (oldBlog?.front_cover && oldBlog.front_cover !== blogData.front_cover) {
						// 删除旧封面文件
						const relativePath = oldBlog.front_cover.startsWith('/')
							? oldBlog.front_cover.substring(1)
							: oldBlog.front_cover;
						const oldCoverPath = join(process.cwd(), 'public', relativePath);
						if (fs.existsSync(oldCoverPath)) {
							fs.unlinkSync(oldCoverPath);
						}
					}
				}

				// 更新博客基本信息
				await tx.blog.update({
					where: { id: Number(id) },
					data: {
						...blogData,
						updated_at: new Date(),
					},
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
							data: tags
								.map((tagId) => ({
									blog_id: Number(id),
									tag_id: tagId,
								}))
								.filter(Boolean),
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
				? returnData(StatusCode.SUCCESS, '博客更新成功', res)
				: returnData(StatusCode.FAIL, '博客更新失败', null);
		} catch (error) {
			return returnData(StatusCode.FAIL, '博客更新失败', null);
		}
	}

	// 上传封面
	async uploadfrontCover(files: Awaited<ReturnType<typeof readMultipartFormData>>) {
		try {
			if (!files || files.length === 0) {
				throw new Error('没有上传文件！');
			}

			const file = files[0];

			// 验证文件
			if (!file.data || !file.filename) {
				throw new Error('文件数据无效！');
			}

			// 验证文件类型
			const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
			const fileExtension = extname(file.filename).toLowerCase();

			if (!allowedExtensions.includes(fileExtension)) {
				throw new Error('不支持的文件格式，只允许 JPG、PNG、GIF、WebP 格式！');
			}

			// 验证文件大小
			const maxSize = 10 * 1024 * 1024; // 10MB
			if (file.data.length > maxSize) {
				throw new Error('文件大小不能超过 10MB！');
			}

			// 生成安全的文件名
			const timestamp = Date.now();
			const uuid = randomUUID().replace(/-/g, '').substring(0, 8);
			const safeFileName = `frontcover_${timestamp}_${uuid}${fileExtension}`;

			// 确保目录存在
			const uploadDir = join(process.cwd(), 'public/frontcover');
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const savePath = join(uploadDir, safeFileName);

			// 保存文件
			await writeFile(savePath, file.data);

			// 返回文件访问路径
			return returnData(StatusCode.SUCCESS, '上传成功！', { url: `/frontcover/${safeFileName}` });
		} catch (error) {
			return returnData(StatusCode.FAIL, (error as Error).message, null);
		}
	}
}
