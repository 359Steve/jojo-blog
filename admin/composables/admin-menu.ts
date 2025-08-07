export const useAdminMenu = defineStore('adminMenu', () => {
	const leftIsCollapse = ref<boolean>(false);
	const drawerCollapse = ref<boolean>(false);

	const setLeftIsCollapse = (value: boolean): void => {
		leftIsCollapse.value = value;
	};

	const setDrawerCollapse = (value: boolean): void => {
		drawerCollapse.value = value;
	};

	const getLeftIsCollapse = (): boolean => {
		return leftIsCollapse.value;
	};

	const getDrawerCollapse = (): boolean => {
		return drawerCollapse.value;
	};

	return {
		leftIsCollapse,
		drawerCollapse,
		setLeftIsCollapse,
		setDrawerCollapse,
		getLeftIsCollapse,
		getDrawerCollapse
	};
});
