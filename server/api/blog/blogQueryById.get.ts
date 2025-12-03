import { container } from '~/server/core/container';
import type { BlogService } from '~/server/services/BlogService';
import { BLOG_SERVICE } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	if (!id) {
		sendErrorWithMessage(event, 400, '缺少有效的博客ID');
		return null;
	}

	try {
		const blogService = container.get<BlogService>(BLOG_SERVICE);
		return await blogService.getBlogById(id);
	} catch (error) {
		sendErrorWithMessage(event, 500, '博客获取失败');
		return null;
	}
});
