import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

// 查询用户公共信息
export const findPublicUser = async () => {
	const res = await useGet<any, UserWithTagsRep<Omit<CreateUserDto, 'password'>, CreateTagDto, 'tags'>>(
		'/user/userPublicQuery',
	);

	return handleApiResponse(res);
};
