export const useUserinfo = defineStore('userinfo', () => {
	const user_name = ref<string>('');

	const setUserInfo = (name: string) => {
		user_name.value = name;
	};

	const getUserInfo = () => {
		return user_name.value;
	};

	return {
		user_name,
		setUserInfo,
		getUserInfo
	};
}, {
	persist: true
});
