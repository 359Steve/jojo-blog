import type { CreateTagDto } from '~/server/dto/CreateTagDto';

enum TagType {
	BLOG = '博客',
	PERSON = '个人',
}

// 查询全部标签
export const queryTagAll = async (query: FindAllReq) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<FindAllReq, RecordsResponse<CreateTagDto>>('/tag/tagQueryAll', {
			query,
		}),
	);

	return handleApiResponse(res, false);
};

// 分类型查询标签
export const queryTagByType = async (type: keyof typeof TagType) => {
	const queryParams = {
		type,
	};

	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<FindReq, CreateTagDto[]>('/tag/tagQuery', {
			query: queryParams,
		}),
	);

	return handleApiResponse(res, false);
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

// 验证iconify图标是否存在
export const validateIconify = async (icon: string) => {
	const [collection, name] = icon.split(':');
	try {
		const { data } = await useFetch<Response>(`https://api.iconify.design/${collection}/${name}.svg`);

		return !!data.value;
	} catch {
		return false;
	}
};
