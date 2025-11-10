import { container } from '~/server/core/container';
import { GroupService } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const query = getQuery<{ keyword?: string }>(event);

	try {
		const groupService = container.get(GroupService);
		return await groupService.getPublicGroups(query.keyword);
	} catch (error) {
		sendErrorWithMessage(event, 500, '分组列表查询失败');
		return null;
	}
});
