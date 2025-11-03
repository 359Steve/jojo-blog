import { container } from '~/server/core/container';
import { TagService } from '~/server/services/TagService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	try {
		const tagService = container.get(TagService);
		return await tagService.deleteTag(id);
	} catch {
		sendErrorWithMessage(event, 500, '删除失败');
		return null;
	}
});
