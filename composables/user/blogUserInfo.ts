import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

export const useBlogUserInfo = defineStore(
	'blogUserInfo',
	() => {
		const userInfo = ref<UserWithTagsRep<Omit<CreateUserDto, 'password'>, CreateTagDto, 'tags'> | null>(null);

		const getBlogUserInfo = () => {
			return userInfo.value;
		};

		const setBlogUserInfo = (info: UserWithTagsRep<Omit<CreateUserDto, 'password'>, CreateTagDto, 'tags'>) => {
			userInfo.value = info;
		};

		return {
			userInfo,
			getBlogUserInfo,
			setBlogUserInfo,
		};
	},
	{
		persist: true,
	},
);
