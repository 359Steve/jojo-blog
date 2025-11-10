import { container } from '~/server/core/container';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.getRecordHomeLine();
	} catch {
		sendErrorWithMessage(event, 500, '首页记录线查询失败');
		return null;
	}
});
