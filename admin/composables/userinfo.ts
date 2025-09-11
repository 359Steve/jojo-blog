import type { CreateUserDto } from '~/server/dto/CreateUserDto';

export const useUserinfo = defineStore('userinfo', () => {
	const userinfo = reactive<CreateUserDto>({
		avatar_url: '',
		user_name: '',
		pet_name: '',
		password: '',
		sign: '',
		describe: '',
	});

	const setUserInfo = (value: CreateUserDto) => {
		Object.assign(userinfo, value);
	};

	const getUserInfo = () => {
		return userinfo;
	};

	return {
		userinfo,
		setUserInfo,
		getUserInfo,
	};
});
