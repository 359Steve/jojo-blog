import { container } from '~/server/core/container';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const query = getQuery<RecordQueryParams>(event);

	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.getPublicRecordDetails(query);
	} catch {
		sendErrorWithMessage(event, 500, '记录详情查询失败');
		return null;
	}
});
