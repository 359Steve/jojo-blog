import { container } from '../core/container';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { UserService } from '../services/UserService';
import { sendErrorWithMessage } from '../utils/error';

interface LoginResponse {
	accessToken: string;
}

export default defineEventHandler(async event => {
	const userService = container.get(UserService);
	// 读取body参数
	const body = await readBody<CreateUserDto>(event);

	try {
		return await userService.loginUser(body);
	} catch {
		sendErrorWithMessage(event, 500, '登录失败！');
		return null;
	}
});
