import { container } from '~/server/core/container';
import { GroupService } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	try {
		const groupService = container.get(GroupService);
		return await groupService.getGroupTimeRanges();
	} catch {
		sendErrorWithMessage(event, 500, '分组时间范围查询失败');
		return null;
	}
});
