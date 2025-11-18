import { container } from '~/server/core/container';
import { RecordDetailService } from '~/server/services/RecordDetailService';
import type { MultiPartData } from 'h3';

export default defineEventHandler(async (event) => {
	try {
		const recordDetailService = container.get(RecordDetailService);
		const files = await readMultipartFormData(event);

		const fileList: MultiPartData[] = [];

		files?.forEach((item) => {
			if (item.name === 'files') {
				fileList.push(item);
			}
		});

		if (!fileList || fileList.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await recordDetailService.uploadRecordDetailImage(fileList);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
