import { container } from '~/server/core/container';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const blogService = container.get(BlogService);
	const query = getQuery(event);

	const page = Number(query.page) || 1;
	const limit = Number(query.limit) || 10;
	const keyword = query.keyword as string;

	try {
		return await blogService.getBlogList(page, limit, keyword);
	} catch (error) {
		console.error('获取博客列表失败:', error);
		sendErrorWithMessage(event, 500, '获取失败！');
		return null;
	}
});
