import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';
import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';

// 查询全部分组
export const queryGroupAll = async (page: number = 1, size: number = 10) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<{ pageNumber: number; pageSize: number }, { records: CreateGroupDto[]; total: number }>(
			'/record/group/groupQueryAll',
			{
				query: { pageNumber: page, pageSize: size },
			},
		),
	);

	return handleApiResponse(res);
};

// 新增分组
export const createGroup = async (data: CreateGroupDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateGroupDto, CreateGroupDto>('/record/group/groupCreate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};

// 修改分组
export const updateGroup = async (data: CreateGroupDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateGroupDto, CreateGroupDto>('/record/group/groupUpdate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};

// 删除分组
export const deleteGroup = async (id: number) => {
	const res = await jojoLoadingIndicator(() =>
		fetchDeleteApi<{ id: number }, CreateGroupDto>('/record/group/groupDelete', {
			query: { id },
		}),
	);

	return handleApiResponse(res);
};

// 查询分组时间范围
export const queryGroupTimeRanges = async () => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<null, { id: number; time_range: string }[]>('/record/group/groupQueryTime'),
	);

	return handleApiResponse(res);
};

// ==== Record Detail APIs ====

// 查询全部记录详情
export const queryRecordDetailAll = async (page: number = 1, size: number = 10, group_id?: number) => {
	const queryParams: { pageNumber: number; pageSize: number; group_id?: number } = {
		pageNumber: page,
		pageSize: size,
	};
	if (group_id) {
		queryParams.group_id = group_id;
	}

	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<
			{ pageNumber: number; pageSize: number; group_id?: number },
			{ records: CreateRecordDetailDto[]; total: number }
		>('/record/detail/detailQueryAll', {
			query: queryParams,
		}),
	);

	return handleApiResponse(res);
};

// 新增记录详情
export const createRecordDetail = async (data: CreateRecordDetailDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateRecordDetailDto, CreateRecordDetailDto>('/record/detail/detailCreate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};

// 修改记录详情
export const updateRecordDetail = async (data: CreateRecordDetailDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateRecordDetailDto, CreateRecordDetailDto>('/record/detail/detailUpdate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};

// 删除记录详情
export const deleteRecordDetail = async (id: number) => {
	const res = await jojoLoadingIndicator(() =>
		fetchDeleteApi<{ id: number }, CreateRecordDetailDto>('/record/detail/detailDelete', {
			query: { id },
		}),
	);

	return handleApiResponse(res);
};

// 根据ID查询记录详情
export const queryRecordDetailById = async (id: number) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<{ id: number }, CreateRecordDetailDto>('/record/detail/detailQueryById', {
			query: { id },
		}),
	);

	return handleApiResponse(res);
};

// 上传记录详情图片
export const uploadRecordDetailImage = async (formData: FormData) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<FormData, { url: string }>('/record/detail/detailUpload', {
			body: formData,
		}),
	);

	return handleApiResponse(res);
};
