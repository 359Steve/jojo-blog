import { container } from '../../core/container';
import { type CreateUserDto, CreateUserSchema } from '../../dto/CreateUserDto';
import { UserService } from '../../services/UserService';
import { sendErrorWithMessage } from '../../utils/error';

export default defineEventHandler(async (event) => {
	const body = await readBody<Pick<CreateUserDto, 'user_name' | 'password'>>(event);

	const LoginSchema = CreateUserSchema.pick({ user_name: true, password: true });
	const result = validateData(LoginSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const userService = container.get(UserService);
		return await userService.loginUser(result);
	} catch {
		sendErrorWithMessage(event, 500, '登录失败！');
		return null;
	}
});
