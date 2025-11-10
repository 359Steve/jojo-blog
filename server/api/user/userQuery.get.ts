import { container } from '../../core/container';
import { UserService } from '../../services/UserService';
import { sendErrorWithMessage } from '../../utils/error';

export default defineEventHandler(async (event) => {
	// 读取qeruy参数
	const { user_name } = getQuery<{ user_name: string }>(event);

	try {
		const userService = container.get(UserService);
		// 查询用户信息
		return await userService.findUser(user_name);
	} catch {
		sendErrorWithMessage(event, 500, '用户信息查询失败');
		return null;
	}
});
