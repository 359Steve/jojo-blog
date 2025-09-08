import { container } from "~/server/core/container";
import { CreateTagDto } from "~/server/dto/CreateTagDto";
import { TagService } from "~/server/services/TagService";

export default defineEventHandler(async (event) => {
	const tagService = container.get(TagService);
	const body = await readBody<CreateTagDto>(event);

	try {
		return await tagService.updateTag(body);
	} catch {
		sendErrorWithMessage(event, 500, '更新失败');
		return null;
	}
});
