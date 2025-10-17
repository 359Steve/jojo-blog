import { container } from '~/server/core/container';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const blogService = container.get(BlogService);
	const body = await readBody(event);
	const { id } = body;

	if (!id || typeof id !== 'number') {
		sendErrorWithMessage(event, 400, '缺少有效的博客ID');
		return null;
	}

	try {
		return await blogService.deleteBlog(id);
	} catch (error) {
		console.error('删除博客失败:', error);
		sendErrorWithMessage(event, 500, '删除失败！');
		return null;
	}
});
