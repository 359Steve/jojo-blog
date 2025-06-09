import { container } from '../core/container';
import { UserService } from '../services/UserService';

export default defineEventHandler(async event => {
	const userInfoService = container.get(UserService);
	// 获取query参数
	const { id } = getQuery<{ id: number }>(event);

	// 查询用户信息
	return await userInfoService.findUser(id);
});
