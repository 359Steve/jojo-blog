import { container } from '~/server/core/container';
import { UserService } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	try {
		const userService = container.get(UserService);
		return await userService.getPublicUserInfo();
	} catch (error) {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
