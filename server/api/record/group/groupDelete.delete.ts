import { container } from '~/server/core/container';
import { GroupService } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	try {
		const groupService = container.get(GroupService);
		return await groupService.deleteGroup(id);
	} catch {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
