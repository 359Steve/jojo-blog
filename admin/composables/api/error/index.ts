import type { CreateErrorMessageDto } from '~/server/dto/CreateErrorMessageDto';

// 查询错误信息列表
export const fetchErrorList = async (params: ErrorQueryListParams) => {
	const res = await jojoLoadingIndicator(() =>
		fetchUseGet<ErrorQueryListParams, RecordsResponse<CreateErrorMessageDto>>('/error/errorQueryList', {
			query: params,
		}),
	);

	return handleApiResponse(res, false);
};

// 删除错误信息
export const deleteError = async (id: number) => {
	const res = await jojoLoadingIndicator(() =>
		fetchDeleteApi<{ id: number }, CreateErrorMessageDto>('/error/errorDelete', {
			query: { id },
		}),
	);

	return handleApiResponse(res);
};
