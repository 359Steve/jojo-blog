import { container } from '~/server/core/container';
import { CreateErrorMessageSchema, type CreateErrorMessageDto } from '~/server/dto/CreateErrorMessageDto';
import { ErrorService } from '~/server/services/ErrorService';

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateErrorMessageDto>(event);

	const result = validateData(CreateErrorMessageSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const errorService = container.get(ErrorService);
		return await errorService.sendErrorEmail(result);
	} catch {
		sendErrorWithMessage(event, 500, '发送失败！');
		return null;
	}
});
