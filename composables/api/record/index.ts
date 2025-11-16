import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';

// 查询全部分组
export const recordPublicQuery = (id?: number) =>
	chooseCondition<{ id?: number }, RecordWithDetailsRep<CreateGroupDto, CreateRecordDetailDto>>(
		'/record/recordPublicQuery',
	)({
		id,
	});

// 查询单个记录详情
export const recordDetailQuery = (parentId: number, id: number) =>
	chooseCondition<{ parentId: number; id: number }, RecordDetailRep<CreateRecordDetailDto>>(
		'/record/recordPublicDetail',
	)({
		parentId,
		id,
	});

// 分页查询记录详情
export const recordDetailsQuery = async (query: RecordQueryParams) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<
			RecordQueryParams,
			{
				records: Pick<CreateRecordDetailDto, 'id' | 'title' | 'image_url' | 'image_alt' | 'time_range'>[];
				total: number;
			}
		>('/record/recordPublicDetails', {
			query,
		}),
	);

	return handleApiResponse(res, false);
};
