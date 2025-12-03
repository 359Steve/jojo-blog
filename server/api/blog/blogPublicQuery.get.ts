import { container } from '~/server/core/container';
import type { BlogService } from '~/server/services/BlogService';
import { BLOG_SERVICE } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const query = getQuery<FindBlogParams>(event);

	try {
		const blogService = container.get<BlogService>(BLOG_SERVICE);
		return await blogService.getBlogList(query);
	} catch (error) {
		sendErrorWithMessage(event, 500, '博客列表获取失败');
		return null;
	}
});
