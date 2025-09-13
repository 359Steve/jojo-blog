import { container } from '~/server/core/container';
import { UserService } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	const userService = container.get(UserService);

	try {
		return await userService.getPublicUserInfo();
	} catch (error) {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
