import { container } from '~/server/core/container';
import type { TagService } from '~/server/services/TagService';
import { TAG_SERVICE } from '~/server/services/TagService';

export default defineEventHandler(async (event) => {
	const query = getQuery<FindAllReq>(event);

	try {
		const tagService = container.get<TagService>(TAG_SERVICE);
		// 查询标签数据
		return await tagService.findAllTag(query);
	} catch {
		sendErrorWithMessage(event, 500, '标签列表查询失败');
		return null;
	}
});
