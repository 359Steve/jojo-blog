import { container } from '../../core/container';
import { type CreateUserDto, CreateUserSchema } from '../../dto/CreateUserDto';
import { UserService } from '../../services/UserService';
import { sendErrorWithMessage } from '../../utils/error';

export default defineEventHandler(async (event) => {
	const userService = container.get(UserService);
	const body = await readBody<CreateUserDto>(event);

	const result = validateData(CreateUserSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		return await userService.createUser(result);
	} catch {
		sendErrorWithMessage(event, 500, '注册失败！');
		return null;
	}
});
