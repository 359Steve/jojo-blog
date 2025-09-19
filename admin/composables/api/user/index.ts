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
export const updataUserInfo = async (body: CreateUserDto) => {
	const res = await jojoLoadingIndicator(() =>
		fetchPostApi<CreateUserDto, CreateUserDto>('/user/userUpdate', {
			body,
		}),
	);

	return handleApiResponse(res);
};

// 查询用户信息
export const findUser = async (user_name?: string) => {
	const isServer = import.meta.server;
	const queryParams = {
		user_name,
	};

	let res;
	if (isServer) {
		res = await useGet<{ user_name?: string }, CreateUserDto>('/user/userQuery', {
			query: queryParams,
		});
	} else {
		res = await fetchUseGet<{ user_name?: string }, CreateUserDto>('/user/userQuery', {
			query: queryParams,
		});
	}

	return handleApiResponse(res);
};
