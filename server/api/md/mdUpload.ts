import { container } from '~/server/core/container';
import { MdService } from '~/server/services/MdService';

export default defineEventHandler(async (event) => {
	const mdService = container.get(MdService);

	try {
		const files = await readMultipartFormData(event);

		if (!files || files.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await mdService.uploadImage(files);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
