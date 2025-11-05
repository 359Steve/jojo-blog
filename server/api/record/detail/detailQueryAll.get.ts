import { container } from '~/server/core/container';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const query = getQuery<{ pageNumber: string; pageSize: string }>(event);

	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.getAllRecordDetails({
			pageNumber: Number(query.pageNumber) || 1,
			pageSize: Number(query.pageSize) || 10,
		});
	} catch {
		sendErrorWithMessage(event, 500, '查询失败！');
		return null;
	}
});
