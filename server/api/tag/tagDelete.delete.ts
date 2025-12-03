import { container } from '~/server/core/container';
import { TAG_SERVICE, type TagService } from '~/server/services/TagService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	try {
		const tagService = container.get<TagService>(TAG_SERVICE);
		return await tagService.deleteTag(id);
	} catch {
		sendErrorWithMessage(event, 500, '标签删除失败');
		return null;
	}
});
