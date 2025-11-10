import { container } from '~/server/core/container';
import { GroupService } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const query = getQuery<{ pageNumber: string; pageSize: string }>(event);

	try {
		const groupService = container.get(GroupService);
		return await groupService.getAllGroups({
			pageNumber: Number(query.pageNumber) || 1,
			pageSize: Number(query.pageSize) || 10,
		});
	} catch {
		sendErrorWithMessage(event, 500, '分组列表查询失败');
		return null;
	}
});
