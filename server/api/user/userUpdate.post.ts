import { container } from '~/server/core/container';
import { type CreateUserDto, CreateUserSchema } from '~/server/dto/CreateUserDto';
import { UserService } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateUserDto & { tags: number[] }>(event);

	const result = validateData(CreateUserSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const userService = container.get(UserService);
		return await userService.updateUser({ ...result, tags: body.tags });
	} catch {
		sendErrorWithMessage(event, 500, '更新失败');
		return null;
	}
});
