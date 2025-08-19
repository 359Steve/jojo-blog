export const useAdminMenu = defineStore(
	'adminMenu',
	() => {
		const leftIsCollapse = ref<boolean>(false);
		const drawerCollapse = ref<boolean>(false);
		const tagMenu = ref<RouteChildrenConfigsTable<'name' | 'path'>[]>([
			{
				name: '首页',
				path: '/admin'
			}
		]);
		const { isFullscreen, toggle } = useFullscreen();
		const contentFullscreen = ref<boolean>(true);

		const setLeftIsCollapse = (value: boolean): void => {
			leftIsCollapse.value = value;
		};

		const setDrawerCollapse = (value: boolean): void => {
			drawerCollapse.value = value;
		};

		const setContentFullscreen = (value: boolean): void => {
			contentFullscreen.value = value;
		};

		const setTagMenu = (value: RouteChildrenConfigsTable<'name' | 'path'>): void => {
			if (
				normalizePath(value.path) !== '/admin/login' &&
				!tagMenu.value.find(item => normalizePath(item.path) === normalizePath(value.path))
			) {
				tagMenu.value.push(value);
			}
		};

		const getLeftIsCollapse = (): boolean => {
			return leftIsCollapse.value;
		};

		const getDrawerCollapse = (): boolean => {
			return drawerCollapse.value;
		};

		const getTagMenu = (): RouteChildrenConfigsTable<'name' | 'path'>[] => {
			return tagMenu.value;
		};

		const getContentFullscreen = (): boolean => {
			return contentFullscreen.value;
		};

		// 关闭tag
		const closeTag = (path: string): void => {
			tagMenu.value = tagMenu.value.filter(item => item.path !== path);
		};

		// 重置数据
		const reset = (): void => {
			leftIsCollapse.value = false;
			drawerCollapse.value = false;
		};

		return {
			leftIsCollapse,
			drawerCollapse,
			tagMenu,
			isFullscreen,
			contentFullscreen,
			setLeftIsCollapse,
			setDrawerCollapse,
			setTagMenu,
			setContentFullscreen,
			getLeftIsCollapse,
			getDrawerCollapse,
			getTagMenu,
			getContentFullscreen,
			reset,
			closeTag,
			toggle
		};
	},
	{
		persist: true
	}
);
