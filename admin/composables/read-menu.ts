export const useReadMenu = defineStore('readMenu', () => {
	const readMenu = ref<RouteConfigsTable[]>([]);

	const getReadMenu = () => {
		return readMenu.value;
	}

	const setReadMenu = (value: RouteConfigsTable[]) => {
		readMenu.value = value;
	}

	return {
		readMenu,
		getReadMenu,
		setReadMenu
	};
});
