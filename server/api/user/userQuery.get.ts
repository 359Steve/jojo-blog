import { StatusCode } from '~/types/com-types';
import { container } from '../../core/container';
import type { UserService } from '../../services/UserService';
import { USER_SERVICE } from '../../services/UserService';
import { sendErrorWithMessage } from '../../utils/error';

export default defineEventHandler(async (event) => {
	const user_name = event.context.user?.user_name;

	if (!user_name) {
		sendErrorWithMessage(event, StatusCode.UNAUTHORIZED, '用户未登录');
		return null;
	}

	try {
		const userService = container.get<UserService>(USER_SERVICE);
		// 查询用户信息
		return await userService.findUser(user_name);
	} catch {
		sendErrorWithMessage(event, StatusCode.UNAUTHORIZED, '用户信息查询失败');
		return null;
	}
});
