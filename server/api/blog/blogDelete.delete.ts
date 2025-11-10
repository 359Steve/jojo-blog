import { container } from '~/server/core/container';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	if (!id) {
		sendErrorWithMessage(event, 400, '缺少有效的博客ID');
		return null;
	}

	try {
		const blogService = container.get(BlogService);
		return await blogService.deleteBlog(id);
	} catch (error) {
		sendErrorWithMessage(event, 500, '博客删除失败');
		return null;
	}
});
