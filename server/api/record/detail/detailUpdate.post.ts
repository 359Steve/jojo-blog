import { container } from '~/server/core/container';
import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const query = await readBody<Partial<CreateRecordDetailDto>>(event);

	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.updateRecordDetail(query);
	} catch {
		sendErrorWithMessage(event, 500, '更新失败！');
		return null;
	}
});
