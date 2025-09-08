import { container } from '../core/container';
import { UserService } from '../services/UserService';
import { sendErrorWithMessage } from '../utils/error';

// 返回值类型
interface FindResponse {
	content: string;
}

export default defineEventHandler(async event => {
	const userService = container.get(UserService);
	// 读取qeruy参数
	const { id } = getQuery<{ id: number }>(event);

	try {
		// 查询用户信息
		return await userService.findUser(id);
	} catch {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
