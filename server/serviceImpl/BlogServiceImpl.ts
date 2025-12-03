import type { CreateBlogDto } from '../dto/CreateBlogDto';
import type { BlogRepository } from '../repositories/BlogRepository';
import type { BlogService } from '../services/BlogService';

export class BlogServiceImpl implements BlogService {
	private blogRepository: BlogRepository;

	constructor(blogRepository: BlogRepository) {
		this.blogRepository = blogRepository;
	}

	createBlog(data: CreateBlogDto): ReturnType<BlogRepository['createBlog']> {
		return this.blogRepository.createBlog(data);
	}
	getBlogList(data: FindBlogParams): ReturnType<BlogRepository['getBlogList']> {
		return this.blogRepository.getBlogList(data);
	}
	deleteBlog(id: number): ReturnType<BlogRepository['deleteBlog']> {
		return this.blogRepository.deleteBlog(id);
	}
	getBlogById(id: number): ReturnType<BlogRepository['getBlogById']> {
		return this.blogRepository.getBlogById(id);
	}
	updateBlog(data: Partial<CreateBlogDto>): ReturnType<BlogRepository['updateBlog']> {
		return this.blogRepository.updateBlog(data);
	}
	uploadfrontCover(
		files: ReturnFunction<typeof readMultipartFormData>,
	): ReturnType<BlogRepository['uploadfrontCover']> {
		return this.blogRepository.uploadfrontCover(files);
	}
}
