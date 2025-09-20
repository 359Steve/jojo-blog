import { type CreateTagDto, CreateTagSchema } from '../../dto/CreateTagDto';
import { container } from '~/server/core/container';
import { TagService } from '~/server/services/TagService';

export default defineEventHandler(async (event) => {
	const tagService = container.get(TagService);
	const body = await readBody<CreateTagDto>(event);

	const result = validateData(CreateTagSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		return await tagService.createTag(result);
	} catch {
		sendErrorWithMessage(event, 500, '创建失败！');
		return null;
	}
});
