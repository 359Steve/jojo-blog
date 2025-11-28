import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

// 查询用户公共信息
export const findPublicUser = chooseCondition<
	any,
	UserWithTagsRep<Omit<CreateUserDto, 'password'>, CreateTagDto, 'tags'>
>('/user/userPublicQuery');

// 查询照片
export const findRecordPictures = <T>(query: FindPictureRequest) =>
	chooseCondition<FindPictureRequest, T>('/record/recordPublicPic')(query);
