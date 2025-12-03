import { container } from '~/server/core/container';
import type { RecordDetailService } from '~/server/services/RecordDetailService';
import { RECORD_DETAIL_SERVICE } from '~/server/services/RecordDetailService';
import type { MultiPartData } from 'h3';

export default defineEventHandler(async (event) => {
	try {
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);
		const files = await readMultipartFormData(event);

		let datePath = '';
		const fileList: MultiPartData[] = [];

		files?.forEach((item) => {
			if (item.name === 'datePath') {
				datePath = item.data.toString();
			} else if (item.name === 'files') {
				fileList.push(item);
			}
		});

		if (!fileList || fileList.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await recordDetailService.uploadRecordDetailImage(fileList, datePath);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
