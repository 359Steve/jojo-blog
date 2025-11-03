import { container } from '~/server/core/container';
import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';
import { GroupService } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const query = await readBody<Partial<CreateGroupDto>>(event);

	try {
		const groupService = container.get(GroupService);
		return await groupService.updateGroup(query);
	} catch {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
