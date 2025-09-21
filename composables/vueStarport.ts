import { defineStore } from 'pinia';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

export const useVueStarport = defineStore(
	'vueStarport',
	() => {
		const userInfo = reactive<UserInfoDetail<Omit<CreateUserDto, 'password'>, UserTags<CreateTagDto>[]>>({
			user_name: '',
			pet_name: '',
			sign: '',
			describe: '',
			avatar_url: '',
			tags: [],
		});
		const isRound = ref<boolean>(false);

		const getIsRound = (): boolean => {
			return isRound.value;
		};

		const setIsRound = (value: boolean): void => {
			isRound.value = value;
		};

		const getUserInfo = (): UserInfoDetail<Omit<CreateUserDto, 'password'>, UserTags<CreateTagDto>[]> => {
			return userInfo;
		};

		const setUserInfo = (
			value: UserInfoDetail<Omit<CreateUserDto, 'password'>, UserTags<CreateTagDto>[]>,
		): void => {
			Object.assign(userInfo, value);
		};

		return {
			isRound,
			userInfo,
			getUserInfo,
			setUserInfo,
			setIsRound,
			getIsRound,
		};
	},
	{
		persist: true,
	},
);
