import { container } from '~/server/core/container';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const { id } = getQuery<{ id: number }>(event);

	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.deleteRecordDetail(id);
	} catch {
		sendErrorWithMessage(event, 500, '删除失败！');
		return null;
	}
});
