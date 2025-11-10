import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

// 上传头像
export const uploadAvatar = async (file: FormData) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<FormData, UploadAvatarRep>('/user/userUpload', {
			body: file,
		}),
	);

	return handleApiResponse(res);
};

// 更新信息
export const updataUserInfo = async (body: CreateUserDto & { tags: number[] }) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateUserDto & { tags: number[] }, CreateUserDto>('/user/userUpdate', {
			body,
		}),
	);

	return handleApiResponse(res);
};

// 查询用户信息
export const findUser = async (user_name?: string) => {
	const queryParams = {
		user_name,
	};

	const res = await fetchUseGet<{ user_name?: string }, UserWithTagsRep<CreateUserDto, CreateTagDto, 'tags'>>(
		'/user/userQuery',
		{
			query: queryParams,
		},
	);

	return handleApiResponse(res, false);
};
