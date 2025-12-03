import { container } from '~/server/core/container';
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import { CreateBlogSchema } from '~/server/dto/CreateBlogDto';
import type { BlogService } from '~/server/services/BlogService';
import { BLOG_SERVICE } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateBlogDto>(event);

	const result = validateData(CreateBlogSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const blogService = container.get<BlogService>(BLOG_SERVICE);
		return await blogService.createBlog(result);
	} catch {
		sendErrorWithMessage(event, 500, '博客创建失败');
		return null;
	}
});
