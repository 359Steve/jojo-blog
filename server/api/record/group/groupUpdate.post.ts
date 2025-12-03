import { container } from '~/server/core/container';
import { CreateGroupSchema, type CreateGroupDto } from '~/server/dto/CreateGroupDto';
import type { GroupService } from '~/server/services/GroupService';
import { GROUP_SERVICE } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const query = await readBody<Partial<CreateGroupDto>>(event);
	const result = validateData(CreateGroupSchema, query, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const groupService = container.get<GroupService>(GROUP_SERVICE);
		return await groupService.updateGroup(result);
	} catch {
		sendErrorWithMessage(event, 500, '分组更新失败');
		return null;
	}
});
