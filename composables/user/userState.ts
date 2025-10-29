import { defineStore } from 'pinia';

export const useUserState = defineStore(
	'userState',
	() => {
		const token = ref<string>('');

		// 获取token
		const getToken = () => {
			return token.value;
		};

		// 设置token
		const setToken = (value: string) => {
			token.value = value;
		};

		return {
			token,
			getToken,
			setToken
		};
	},
	{
		persist: true
	}
);
