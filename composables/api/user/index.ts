import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

// 查询用户公共信息
export const findPublicUser = chooseCondition<
	any,
	UserWithTagsRep<Omit<CreateUserDto, 'password'>, CreateTagDto, 'tags'>
>('/user/userPublicQuery');

// 查询首页推荐的记录详情
export const queryRecordHomeLine = chooseCondition<any, CreateRecordDetailDto[]>('/record/recordHomeLine');
