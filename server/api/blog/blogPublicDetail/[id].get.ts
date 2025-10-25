import { container } from '~/server/core/container';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const blogService = container.get(BlogService);
	const id = getRouterParam(event, 'id');

	if (!id) {
		sendErrorWithMessage(event, 400, '缺少有效的博客ID');
		return null;
	}

	try {
		return await blogService.getBlogById(Number(id));
	} catch (error) {
		sendErrorWithMessage(event, 500, '获取失败！');
		return null;
	}
});
