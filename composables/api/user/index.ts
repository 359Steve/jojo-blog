import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

// 查询用户公共信息
export const findPublicUser = chooseCondition<
	any,
	UserWithTagsRep<Omit<CreateUserDto, 'password'>, CreateTagDto, 'tags'>
>('/user/userPublicQuery');

// 查询照片
export const findRecordPictures = (query: FindPictureRequest) =>
	chooseCondition<FindPictureRequest, Pick<CreateRecordDetailDto, 'id' | 'image_url' | 'image_alt'>[]>(
		'/record/recordPublicPic',
	)(query);
