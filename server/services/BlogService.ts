import { container } from '../core/container';
import type { CreateBlogDto } from '../dto/CreateBlogDto';
import { BlogRepository } from '../repositories/BlogRepository';

export class BlogService {
	private blogRepo: BlogRepository;
	constructor() {
		// 这里手动获取容器中的依赖
		this.blogRepo = container.get(BlogRepository);
	}

	// 创建博客
	async createBlog(data: CreateBlogDto) {
		return this.blogRepo.createBlog(data);
	}

	// 获取博客列表
	async getBlogList(page: number = 1, limit: number = 10, keyword?: string) {
		return this.blogRepo.getBlogList(page, limit, keyword);
	}

	// 删除博客
	async deleteBlog(id: number) {
		return this.blogRepo.deleteBlog(id);
	}
}
