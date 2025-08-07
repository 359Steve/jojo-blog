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

		const setLeftIsCollapse = (value: boolean): void => {
			leftIsCollapse.value = value;
		};

		const setDrawerCollapse = (value: boolean): void => {
			drawerCollapse.value = value;
		};

		const setTagMenu = (value: RouteChildrenConfigsTable<'name' | 'path'>): void => {
			if (
				value.path.replace(/\/$/, '') !== '/admin/login' &&
				!tagMenu.value.find(item => item.path.replace(/\/$/, '') === value.path.replace(/\/$/, ''))
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
			setLeftIsCollapse,
			setDrawerCollapse,
			setTagMenu,
			getLeftIsCollapse,
			getDrawerCollapse,
			getTagMenu,
			reset,
			closeTag
		};
	},
	{
		persist: true
	}
);
