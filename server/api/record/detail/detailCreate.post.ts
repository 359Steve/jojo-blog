import { container } from '~/server/core/container';
import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import { CreateRecordDetailSchema } from '~/server/dto/CreateArticleDto';
import type { RecordDetailService } from '~/server/services/RecordDetailService';
import { RECORD_DETAIL_SERVICE } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateRecordDetailDto>(event);

	const result = validateData(CreateRecordDetailSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const recordDetailService = container.get<RecordDetailService>(RECORD_DETAIL_SERVICE);
		return await recordDetailService.createRecordDetail(result);
	} catch {
		sendErrorWithMessage(event, 500, '记录创建失败');
		return null;
	}
});
