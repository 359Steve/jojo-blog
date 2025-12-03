import { container } from '~/server/core/container';
import type { GroupService } from '~/server/services/GroupService';
import { GROUP_SERVICE } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const query = getQuery<{ id?: number }>(event);

	try {
		const groupService = container.get<GroupService>(GROUP_SERVICE);
		return await groupService.getPublicGroups(query);
	} catch (error) {
		sendErrorWithMessage(event, 500, '分组列表查询失败');
		return null;
	}
});
