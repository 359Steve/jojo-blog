import { container } from '~/server/core/container';
import type { RecordDetailService } from '~/server/services/RecordDetailService';
import { RECORD_DETAIL_SERVICE } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const query = getQuery<{ pageNumber: string; pageSize: string }>(event);

	try {
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);
		return await recordDetailService.getAllRecordDetails({
			pageNumber: Number(query.pageNumber) || 1,
			pageSize: Number(query.pageSize) || 10,
		});
	} catch {
		sendErrorWithMessage(event, 500, '记录列表查询失败');
		return null;
	}
});
