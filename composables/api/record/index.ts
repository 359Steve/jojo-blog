import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';

// 查询全部分组
export async function recordPublicQuery() {
	return await chooseCondition<{ keyword?: string }, RecordWithDetailsRep<CreateGroupDto, CreateRecordDetailDto>[]>(
		'/record/recordPublicQuery',
	)();
}
