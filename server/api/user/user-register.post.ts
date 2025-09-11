import { container } from '../../core/container';
import type { CreateUserDto } from '../../dto/CreateUserDto';
import { UserService } from '../../services/UserService';
import { sendErrorWithMessage } from '../../utils/error';

export default defineEventHandler(async event => {
	const userService = container.get(UserService);
	// 读取body参数
	const body = await readBody<CreateUserDto>(event);

	try {
		return await userService.createUser(body);
	} catch {
		sendErrorWithMessage(event, 500, '注册失败！');
		return null;
	}
});
