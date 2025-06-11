import { container } from '../core/container';
import { UserService } from '../services/UserService';

export default defineEventHandler(async event => {
	const userService = container.get(UserService);
	// 读取qeruy参数
	const { id } = getQuery<{ id: number }>(event);

	// 查询用户信息
	return await userService.findUser(id);
});
