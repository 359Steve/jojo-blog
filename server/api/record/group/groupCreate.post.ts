import { container } from '~/server/core/container';
import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';
import { CreateGroupSchema } from '~/server/dto/CreateGroupDto';
import type { GroupService } from '~/server/services/GroupService';
import { GROUP_SERVICE } from '~/server/services/GroupService';

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateGroupDto>(event);

	const result = validateData(CreateGroupSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const groupService = container.get<GroupService>(GROUP_SERVICE);
		return await groupService.createGroup(result);
	} catch {
		sendErrorWithMessage(event, 500, '分组创建失败');
		return null;
	}
});
