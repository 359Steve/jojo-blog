import { container } from '~/server/core/container';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	try {
		const recordDetailService = container.get(RecordDetailService);
		const files = await readMultipartFormData(event);

		if (!files || files.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await recordDetailService.uploadRecordDetailImage(files);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
