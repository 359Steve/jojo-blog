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
	async getBlogList(data: FindBlogParams) {
		return this.blogRepo.getBlogList(data);
	}

	// 删除博客
	async deleteBlog(id: number) {
		return this.blogRepo.deleteBlog(id);
	}

	// 查询单个博客
	async getBlogById(id: number) {
		return this.blogRepo.getBlogById(id);
	}

	// 更新博客
	async updateBlog(data: CreateBlogDto) {
		return this.blogRepo.updateBlog(data);
	}
}
