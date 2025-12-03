import { container } from '~/server/core/container';
import type { RecordDetailService } from '~/server/services/RecordDetailService';
import { RECORD_DETAIL_SERVICE } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const { parentId, id } = getQuery<{ parentId: number; id: number }>(event);

	try {
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);
		return await recordDetailService.getPublicRecordDetail(parentId, id);
	} catch {
		sendErrorWithMessage(event, 500, '记录详情查询失败');
		return null;
	}
});
