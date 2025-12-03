import { container } from '~/server/core/container';
import type { MdService } from '~/server/services/MdService';
import { MD_SERVICE } from '~/server/services/MdService';
import type { MultiPartData } from 'h3';

export default defineEventHandler(async (event) => {
	try {
		const mdService = container.get<MdService>(MD_SERVICE);
		const multipart = await readMultipartFormData(event);

		let datePath = '';
		const fileList: MultiPartData[] = [];

		multipart?.forEach((item) => {
			if (item.name === 'datePath') {
				datePath = item.data.toString();
			} else if (item.name === 'files') {
				fileList.push(item);
			}
		});

		if (!fileList || fileList.length === 0) {
			return sendErrorWithMessage(event, 400, '没有上传文件');
		}

		return await mdService.uploadImage(fileList, datePath);
	} catch (err) {
		return sendErrorWithMessage(event, 500, '上传失败');
	}
});
