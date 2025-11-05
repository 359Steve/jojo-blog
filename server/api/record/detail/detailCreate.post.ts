import { container } from '~/server/core/container';
import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import { CreateRecordDetailSchema } from '~/server/dto/CreateArticleDto';
import { RecordDetailService } from '~/server/services/RecordDetailService';

export default defineEventHandler(async (event) => {
	const body = await readBody<CreateRecordDetailDto>(event);

	const result = validateData(CreateRecordDetailSchema, body, (value: string) => {
		sendErrorWithMessage(event, 400, value);
		return null;
	});

	try {
		const recordDetailService = container.get(RecordDetailService);
		return await recordDetailService.createRecordDetail(result);
	} catch {
		sendErrorWithMessage(event, 500, '创建失败！');
		return null;
	}
});
