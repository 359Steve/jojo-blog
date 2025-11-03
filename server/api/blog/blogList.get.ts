import { container } from '~/server/core/container';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const query = getQuery<FindBlogParams>(event);

	try {
		const blogService = container.get(BlogService);
		return await blogService.getBlogList(query);
	} catch (error) {
		sendErrorWithMessage(event, 500, '获取失败！');
		return null;
	}
});
