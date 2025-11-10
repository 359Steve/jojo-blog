import { container } from '~/server/core/container';
import { CreateRecordDetailSchema, type CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const query = await readBody<Partial<CreateRecordDetailDto>>(event);
	const result = validateData(CreateRecordDetailSchema, query, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.updateRecordDetail(result);
	} catch {
		sendErrorWithMessage(event, 500, '记录更新失败');
		return null;
	}
});
