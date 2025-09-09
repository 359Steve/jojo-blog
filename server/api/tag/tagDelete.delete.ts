import { container } from "~/server/core/container";
import { TagService } from "~/server/services/TagService";

export default defineEventHandler(async (event) => {
	const tagService = container.get(TagService);
	const { id } = getQuery<{ id: number }>(event);

	try {
		return await tagService.deleteTag(id);
	} catch {
		sendErrorWithMessage(event, 500, '删除失败');
		return null;
	}
})
