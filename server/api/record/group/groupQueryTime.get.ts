import { container } from '~/server/core/container';
import type { GroupService } from '~/server/services/GroupService';
import { GROUP_SERVICE } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	try {
		const groupService = container.get<GroupService>(GROUP_SERVICE);
		return await groupService.getGroupTimeRanges();
	} catch {
		sendErrorWithMessage(event, 500, '分组时间范围查询失败');
		return null;
	}
});
