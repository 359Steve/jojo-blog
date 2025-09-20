import { container } from '../core/container';
import { BlogRepository } from '../repositories/BlogRepository';

export class BlogService {
	private blogRepo: BlogRepository;
	constructor() {
		// 这里手动获取容器中的依赖
		this.blogRepo = container.get(BlogRepository);
	}
}
