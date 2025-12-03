import { container } from '~/server/core/container';
import type { RecordDetailService } from '~/server/services/RecordDetailService';
import { RECORD_DETAIL_SERVICE } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const query = getQuery<FindPictureRequest>(event);

	try {
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);
		return await recordDetailService.getPublicRecordPictures(query);
	} catch {
		sendErrorWithMessage(event, 500, '照片查询失败');
		return null;
	}
});
