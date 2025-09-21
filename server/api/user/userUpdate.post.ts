import { container } from '~/server/core/container';
import { type CreateUserDto, CreateUserSchema } from '~/server/dto/CreateUserDto';
import { UserService } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	const userService = container.get(UserService);
	const body = await readBody<UserInfoDetail<CreateUserDto, number[]>>(event);

	const result = validateData(CreateUserSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		return await userService.updateUser({ ...result, tags: body.tags });
	} catch {
		sendErrorWithMessage(event, 500, '更新失败');
		return null;
	}
});
