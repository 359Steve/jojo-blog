import { container } from "../../core/container";
import { CreateTagDto } from "../../dto/CreateTagDto";
import { TagService } from "../../services/TagService";

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
