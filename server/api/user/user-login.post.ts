import { container } from '../../core/container';
import { type CreateUserDto, CreateUserSchema } from '../../dto/CreateUserDto';
import { UserService } from '../../services/UserService';
import { sendErrorWithMessage } from '../../utils/error';

export default defineEventHandler(async (event) => {
	const userService = container.get(UserService);
	const body = await readBody<Pick<CreateUserDto, 'user_name' | 'password'>>(event);

	const LoginSchema = CreateUserSchema.pick({ user_name: true, password: true });
	const result = LoginSchema.safeParse(body);
	if (!result.success) {
		const message = result.error.issues.map((error) => error.message).join(', ');
		sendErrorWithMessage(event, 400, message);
		return null;
	}

	const dto = result.data; // 校验通过的数据
	try {
		return await userService.loginUser(dto);
	} catch {
		sendErrorWithMessage(event, 500, '登录失败！');
		return null;
	}
});
