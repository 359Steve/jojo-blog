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

// 查询记录详情列表
export const recordDetailsQuery = async () => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<any, RecordsResponse<Omit<CreateRecordDetailDto, 'summary' | 'views' | 'date_path'>>>(
			'/record/recordPublicDetails',
		),
	);

	return handleApiResponse(res, false);
};

// 增加记录详情浏览量
export const addRecordDetailView = (id: number) =>
	chooseCondition<any, CreateRecordDetailDto>(`/record/detail/detailAddView/${id}`, 'PUT')();
