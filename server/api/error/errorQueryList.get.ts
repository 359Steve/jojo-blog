import { container } from '~/server/core/container';
import type { ErrorService } from '~/server/services/ErrorService';
import { ERROR_SERVICE } from '~/server/services/ErrorService';

export default defineEventHandler(async (event) => {
	const query = getQuery<ErrorQueryListParams>(event);

	try {
		const errorService = container.get<ErrorService>(ERROR_SERVICE);

		return await errorService.queryErrorList(query);
	} catch (error) {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
