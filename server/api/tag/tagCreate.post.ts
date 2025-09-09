import { CreateTagDto } from "../../dto/CreateTagDto";
import { container } from "~/server/core/container";
import { TagService } from "~/server/services/TagService";

export default defineEventHandler(async (event) => {
	const tagService = container.get(TagService);
	const body = await readBody<CreateTagDto>(event);

	try {
		return await tagService.createTag(body);
	} catch {
		sendErrorWithMessage(event, 500, '创建失败！');
		return null;
	}
})
