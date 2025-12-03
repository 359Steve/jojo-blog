import { container } from '~/server/core/container';
import type { BlogService } from '~/server/services/BlogService';
import { BLOG_SERVICE } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	try {
		const blogService = container.get<BlogService>(BLOG_SERVICE);
		const files = await readMultipartFormData(event);

		if (!files || files.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await blogService.uploadfrontCover(files);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
