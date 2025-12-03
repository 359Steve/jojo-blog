import { container } from '~/server/core/container';
import { USER_SERVICE, type UserService } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	try {
		const userService = container.get<UserService>(USER_SERVICE);
		return await userService.getPublicUserInfo();
	} catch (error) {
		sendErrorWithMessage(event, 500, '用户信息查询失败');
		return null;
	}
});
