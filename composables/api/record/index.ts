import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';

// 查询全部分组
export const recordPublicQuery = (id?: number, keyword?: string) =>
	chooseCondition<{ id?: number; keyword?: string }, RecordWithDetailsRep<CreateGroupDto, CreateRecordDetailDto>>(
		'/record/recordPublicQuery',
	)({
		id,
		keyword,
	});

// 查询单个记录详情
export const recordDetailQuery = (parentId: number, id: number) =>
	chooseCondition<{ parentId: number; id: number }, RecordDetailRep<CreateRecordDetailDto>>(
		'/record/recordPublicDetail',
	)({
		parentId,
		id,
	});
