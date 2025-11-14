import { container } from '~/server/core/container';
import { MdService } from '~/server/services/MdService';

export default defineEventHandler(async (event) => {
	const { datePath, fileNames } = getQuery<{ datePath: string; fileNames: string[] }>(event);

	try {
		const mdService = container.get(MdService);
		return await mdService.deleteMdPicture(datePath, fileNames);
	} catch {
		sendErrorWithMessage(event, 500, '图片删除失败');
		return null;
	}
});
