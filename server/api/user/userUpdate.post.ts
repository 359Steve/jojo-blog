import { container } from "~/server/core/container";
import { CreateUserDto } from "~/server/dto/CreateUserDto";
import { UserService } from "~/server/services/UserService";

export default defineEventHandler(async event => {
	const userService = container.get(UserService);
	const body = await readBody<CreateUserDto>(event);

	try {
		return await userService.updateUser(body);
	} catch {
		sendErrorWithMessage(event, 500, '更新失败');
		return null;
	}
})
