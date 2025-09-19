import type { CreateUserDto } from '~/server/dto/CreateUserDto';

// 查询用户公共信息
export const findPublicUser = async () => {
	const res = await useGet<any, Omit<CreateUserDto, 'password'>>('/user/userPublicQuery');

	return handleApiResponse(res);
};
