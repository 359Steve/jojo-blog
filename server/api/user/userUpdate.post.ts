import { container } from '~/server/core/container';
import { type CreateUserDto, CreateUserSchema } from '~/server/dto/CreateUserDto';
import { UserService } from '~/server/services/UserService';

export default defineEventHandler(async (event) => {
	const userService = container.get(UserService);
	const body = await readBody<CreateUserDto>(event);

	const result = CreateUserSchema.safeParse(body);
	if (!result.success) {
		const message = result.error.issues.map((error) => error.message).join(', ');
		sendErrorWithMessage(event, 400, message);
		return null;
	}

	const dto = result.data; // 校验通过的数据

	try {
		return await userService.updateUser(dto);
	} catch {
		sendErrorWithMessage(event, 500, '更新失败');
		return null;
	}
});
