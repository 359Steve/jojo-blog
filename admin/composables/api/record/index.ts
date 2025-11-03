import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';

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
