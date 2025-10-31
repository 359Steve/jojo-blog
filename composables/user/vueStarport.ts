export const useVueStarport = defineStore('vueStarport', () => {
	const isRound = ref<boolean>(false);

	const getIsRound = (): boolean => {
		return isRound.value;
	};

	const setIsRound = (value: boolean): void => {
		isRound.value = value;
	};

	return {
		isRound,
		setIsRound,
		getIsRound,
	};
});
