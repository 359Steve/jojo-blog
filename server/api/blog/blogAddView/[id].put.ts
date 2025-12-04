import { container } from '~/server/core/container';
import type { BlogService } from '~/server/services/BlogService';
import { BLOG_SERVICE } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const id = getRouterParam(event, 'id');
	const ipRawHeader = event.node.req.headers['x-forwarded-for'];
	const ipRaw =
		typeof ipRawHeader === 'string'
			? ipRawHeader
			: Array.isArray(ipRawHeader)
				? ipRawHeader.join(',')
				: event.node.req.socket.remoteAddress || '';
	const ip = ipRaw.split(',')[0].trim().replace('::ffff:', '');
	const userAgent = event.node.req.headers['user-agent'] || '';

	if (!id) {
		sendErrorWithMessage(event, 400, '缺少有效的博客ID');
		return null;
	}

	try {
		const blogService = container.get<BlogService>(BLOG_SERVICE);
		return await blogService.addBlogView(Number(id), ip.toString(), userAgent);
	} catch (error) {
		sendErrorWithMessage(event, 500, '博客浏览量增加失败');
		return null;
	}
});
