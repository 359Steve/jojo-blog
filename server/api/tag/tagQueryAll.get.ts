import { container } from "~/server/core/container";
import { TagService } from "~/server/services/TagService";

export default defineEventHandler(async (event) => {
	const tagService = container.get(TagService);
	const query = getQuery<FindAllReq>(event)

	try {
		// 查询标签数据
		return await tagService.findAllTag(query);
	} catch {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
})
