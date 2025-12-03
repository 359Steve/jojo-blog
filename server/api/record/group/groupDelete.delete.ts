import { container } from '~/server/core/container';
import type { GroupService } from '~/server/services/GroupService';
import { GROUP_SERVICE } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	try {
		const groupService = container.get<GroupService>(GROUP_SERVICE);
		return await groupService.deleteGroup(id);
	} catch {
		sendErrorWithMessage(event, 500, '分组删除失败');
		return null;
	}
});
