import { container } from '~/server/core/container';
import type { UserService } from '~/server/services/UserService';
import { USER_SERVICE } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	try {
		const userService = container.get<UserService>(USER_SERVICE);
		const files = await readMultipartFormData(event);

		if (!files || files.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await userService.uploadAvatar(files);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
