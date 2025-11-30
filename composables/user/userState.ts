import { defineStore } from 'pinia';

export const useUserState = defineStore(
	'userState',
	() => {
		const token = ref<string>('');
		const isUnauthorized = ref<boolean>(false);

		// 获取token
		const getToken = () => {
			return token.value;
		};

		// 获取是否未授权
		const getIsUnauthorized = () => {
			return isUnauthorized.value;
		};

		// 设置token
		const setToken = (value: string) => {
			token.value = value;
		};

		// 设置是否未授权
		const setIsUnauthorized = (value: boolean) => {
			isUnauthorized.value = value;
		};

		return {
			token,
			isUnauthorized,
			getIsUnauthorized,
			setIsUnauthorized,
			getToken,
			setToken,
		};
	},
	{
		persist: true,
	},
);
