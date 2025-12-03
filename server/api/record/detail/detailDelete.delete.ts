import { container } from '~/server/core/container';
import { RECORD_DETAIL_SERVICE, type RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	try {
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);
		return await recordDetailService.deleteRecordDetail(id);
	} catch {
		sendErrorWithMessage(event, 500, '记录删除失败');
		return null;
	}
});
