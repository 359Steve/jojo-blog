import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import { CreateTagSchema } from '~/server/dto/CreateTagDto';
import { container } from '~/server/core/container';
import type { TagService } from '~/server/services/TagService';
import { TAG_SERVICE } from '~/server/services/TagService';

export default defineEventHandler(async (event) => {
	const body = await readBody<Partial<CreateTagDto>>(event);

	const result = validateData(CreateTagSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const tagService = container.get<TagService>(TAG_SERVICE);
		return await tagService.updateTag(result);
	} catch {
		sendErrorWithMessage(event, 500, '更新标签失败');
		return null;
	}
});
