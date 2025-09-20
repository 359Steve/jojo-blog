import { type CreateTagDto, CreateTagSchema } from '../../dto/CreateTagDto';
import { container } from '~/server/core/container';
import { TagService } from '~/server/services/TagService';

export default defineEventHandler(async (event) => {
	const tagService = container.get(TagService);
	const body = await readBody<CreateTagDto>(event);

	const result = CreateTagSchema.safeParse(body);
	if (!result.success) {
		// 获取所有错误信息
		const messages = result.error.issues.map((error) => error.message).join('; ');
		sendErrorWithMessage(event, 400, messages);
		return null;
	}

	const dto = result.data; // 校验通过的数据

	try {
		return await tagService.createTag(dto);
	} catch {
		sendErrorWithMessage(event, 500, '创建失败！');
		return null;
	}
});
