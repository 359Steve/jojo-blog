import type { CreateUserDto } from '~/server/dto/CreateUserDto';
import { StatusCode } from '~/types/com-types';

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
