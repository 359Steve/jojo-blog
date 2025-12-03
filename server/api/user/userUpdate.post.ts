import { container } from '~/server/core/container';
import { type CreateUserDto, CreateUserSchema } from '~/server/dto/CreateUserDto';
import type { UserService } from '~/server/services/UserService';
import { USER_SERVICE } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	const body = await readBody<Partial<CreateUserDto & { tags: number[] }>>(event);

	const result = validateData(CreateUserSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const userService = container.get<UserService>(USER_SERVICE);
		return await userService.updateUser({ ...result, tags: body.tags });
	} catch {
		sendErrorWithMessage(event, 500, '用户更新失败');
		return null;
	}
});
