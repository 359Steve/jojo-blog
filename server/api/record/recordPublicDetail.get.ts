import { container } from '~/server/core/container';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const { parentId, id } = getQuery<{ parentId: number; id: number }>(event);

	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.getPublicRecordDetail(parentId, id);
	} catch {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
