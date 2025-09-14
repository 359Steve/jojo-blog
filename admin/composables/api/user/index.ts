import type { CreateUserDto } from '~/server/dto/CreateUserDto';
import { StatusCode } from '~/types/com-types';

// 上传头像
export const uploadAvatar = async (file: FormData) => {
	const res = await fetchPostApi<FormData, UploadAvatarRep>('/user/userUpload', {
		body: file,
	});

	if (res.code === StatusCode.SUCCESS) {
		return {
			data: res.data,
			msg: res.msg,
		};
	}

	return {
		data: null,
		msg: res.msg,
	};
};

// 更新信息
export const updataUserInfo = async (body: CreateUserDto) => {
	const res = await fetchPostApi<CreateUserDto, CreateUserDto>('/user/userUpdate', {
		body,
	});

	if (res.code === StatusCode.SUCCESS) {
		return {
			data: res.data,
			msg: res.msg,
		};
	}

	return {
		data: null,
		msg: res.msg,
	};
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

	if (res?.code === StatusCode.SUCCESS) {
		return {
			data: res.data,
			msg: res.msg,
		};
	}

	return {
		data: null,
		msg: res?.msg,
	};
};

// 查询用户公共信息
export const findPublicUser = async () => {
	const res = await useGet<any, Omit<CreateUserDto, 'password'>>('/user/userPublicQuery');

	if (res.code === StatusCode.SUCCESS) {
		return {
			data: res.data,
			msg: res.msg,
		};
	}

	return {
		data: null,
		msg: res.msg,
	};
};
