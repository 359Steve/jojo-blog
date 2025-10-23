import { container } from '~/server/core/container';
import { BlogService } from '~/server/services/BlogService';

export default defineEventHandler(async (event) => {
	const blogService = container.get(BlogService);

	try {
		const files = await readMultipartFormData(event);

		if (!files || files.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await blogService.uploadfrontCover(files);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
