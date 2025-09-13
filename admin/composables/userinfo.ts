import type { CreateUserDto } from '~/server/dto/CreateUserDto';

export const useUserinfo = defineStore('userinfo', () => {
	const userinfo = ref<CreateUserDto | null>(null);

	const setUserInfo = (value: CreateUserDto) => {
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
