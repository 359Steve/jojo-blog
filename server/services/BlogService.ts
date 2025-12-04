import type { CreateBlogDto } from '../dto/CreateBlogDto';
import type { BlogRepository } from '../repositories/BlogRepository';

export const BLOG_SERVICE = Symbol('BlogService');
export interface BlogService {
	// 创建博客
	createBlog(data: CreateBlogDto): ReturnType<BlogRepository['createBlog']>;
	// 获取博客列表
	getBlogList(data: FindBlogParams): ReturnType<BlogRepository['getBlogList']>;
	// 删除博客
	deleteBlog(id: number): ReturnType<BlogRepository['deleteBlog']>;
	// 查询单个博客
	getBlogById(id: number): ReturnType<BlogRepository['getBlogById']>;
	// 更新博客
	updateBlog(data: Partial<CreateBlogDto>): ReturnType<BlogRepository['updateBlog']>;
	// 上传封面
	uploadfrontCover(
		files: ReturnFunction<typeof readMultipartFormData>,
	): ReturnType<BlogRepository['uploadfrontCover']>;
	// 增加博客浏览量
	addBlogView(id: number, ip: string, userAgent: string): ReturnType<BlogRepository['addBlogView']>;
}
