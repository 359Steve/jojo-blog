import type { CreateUserDto } from '~/server/dto/CreateUserDto';

export const useUserinfo = defineStore('userinfo', () => {
	const userinfo = ref<UserInfoDetail<CreateUserDto, number[]> | null>(null);

	const setUserInfo = (value: UserInfoDetail<CreateUserDto, number[]>) => {
		userinfo.value = value;
	};

	const getUserInfo = () => {
		return userinfo.value;
	};

	return {
		userinfo,
		setUserInfo,
		getUserInfo,
	};
});
