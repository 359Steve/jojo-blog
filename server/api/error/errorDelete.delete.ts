import { container } from '~/server/core/container';
import type { ErrorService } from '~/server/services/ErrorService';
import { ERROR_SERVICE } from '~/server/services/ErrorService';
import { StatusCode } from '~/types/com-types';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	try {
		const errorService = container.get<ErrorService>(ERROR_SERVICE);
		return await errorService.deleteError(id);
	} catch (error) {
		return returnData(StatusCode.FAIL, '错误信息删除失败', null);
	}
});
