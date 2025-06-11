import { container } from '../core/container';
import type { CreateUserDto } from '../dto/CreateUserDto';
import { UserService } from '../services/UserService';

export default defineEventHandler(async event => {
	const userService = container.get(UserService);
	// 读取body参数
	const body = await readBody<CreateUserDto>(event);

	return await userService.createUser(body);
});
