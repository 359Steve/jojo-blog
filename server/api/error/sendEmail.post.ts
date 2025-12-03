import { container } from '~/server/core/container';
import { CreateErrorMessageSchema, type CreateErrorMessageDto } from '~/server/dto/CreateErrorMessageDto';
import type { ErrorService } from '~/server/services/ErrorService';
import { ERROR_SERVICE } from '~/server/services/ErrorService';

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateErrorMessageDto>(event);

	const result = validateData(CreateErrorMessageSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const errorService = container.get<ErrorService>(ERROR_SERVICE);
		return await errorService.sendErrorEmail(result);
	} catch {
		sendErrorWithMessage(event, 500, '发送失败！');
		return null;
	}
});
