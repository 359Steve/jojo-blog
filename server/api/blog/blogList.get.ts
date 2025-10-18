import { container } from '~/server/core/container';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const blogService = container.get(BlogService);
	const query = getQuery<FindBlogParams>(event);

	try {
		return await blogService.getBlogList(query);
	} catch (error) {
		sendErrorWithMessage(event, 500, '获取失败！');
		return null;
	}
});
