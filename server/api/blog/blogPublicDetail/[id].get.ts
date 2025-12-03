import { container } from '~/server/core/container';
import type { BlogService } from '~/server/services/BlogService';
import { BLOG_SERVICE } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');

	if (!id) {
		sendErrorWithMessage(event, 400, '缺少有效的博客ID');
		return null;
	}

	try {
		const blogService = container.get<BlogService>(BLOG_SERVICE);
		return await blogService.getBlogById(Number(id));
	} catch (error) {
		sendErrorWithMessage(event, 500, '博客获取失败');
		return null;
	}
});
