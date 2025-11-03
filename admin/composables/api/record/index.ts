import type { CreateGroupDto } from '~/server/dto/CreateGroupDto';

// 新增分组
export const createGroup = async (data: CreateGroupDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateGroupDto, CreateGroupDto>('/record/group/groupCreate', {
			body: data,
		}),
	);

	return handleApiResponse(res);
};
