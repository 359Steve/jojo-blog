import type { CreateTagDto } from '~/server/dto/CreateTagDto';

// 查询全部标签
export const queryTagAll = async (name: string = '', n: number = 1, s: number = 10) => {
	const isServer = import.meta.server;
	const queryParams = {
		name,
		pageNumber: n,
		pageSize: s,
	};

	let res;
	if (isServer) {
		res = await useGet<FindAllReq, { records: CreateTagDto[]; total: number }>('/tag/tagQueryAll', {
			query: queryParams,
		});
	} else {
		res = await jojoLoadingIndicator(() =>
			fetchUseGet<FindAllReq, { records: CreateTagDto[]; total: number }>('/tag/tagQueryAll', {
				query: queryParams,
			}),
		);
	}

	return handleApiResponse(res);
};

// 创建标签
export const createTags = async (value: CreateTagDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateTagDto, CreateTagDto>('/tag/tagCreate', {
			body: value,
		}),
	);

	return handleApiResponse(res);
};

// 修改标签
export const updateTags = async (value: CreateTagDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateTagDto, CreateTagDto>('/tag/tagUpdate', {
			body: value,
		}),
	);

	return handleApiResponse(res);
};

// 删除标签
export const deleteTags = async (id: number) => {
	const res = await jojoLoadingIndicator(() =>
		fetchDeleteApi<{ id: number }, CreateTagDto>('/tag/tagDelete', {
			query: {
				id,
			},
		}),
	);

	return handleApiResponse(res);
};
