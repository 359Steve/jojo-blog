<script lang="ts" setup>
const menuList = getRouterConfig();
const route = useRoute();
const dropCollapse = ref(false);
const tagsViews = reactive<Array<tagsViewsType>>([
	{
		icon: 'mdi:restore',
		text: '重新加载',
		divided: false,
		disabled: false,
		show: true
	},
	{
		icon: 'ri:close-line',
		text: '关闭当前标签页',
		divided: false,
		disabled: false,
		show: true
	},
	{
		icon: 'ri:text-direction-r',
		text: '关闭左侧标签页',
		divided: true,
		disabled: false,
		show: true
	},
	{
		icon: 'ri:text-direction-l',
		text: '关闭右侧标签页',
		divided: false,
		disabled: false,
		show: true
	},
	{
		icon: 'ri:text-spacing',
		text: '关闭其他标签页',
		divided: true,
		disabled: false,
		show: true
	},
	{
		icon: 'ri:align-vertically',
		text: '关闭全部标签页',
		divided: false,
		disabled: false,
		show: true
	},
	{
		icon: 'ri:fullscreen-exit-line',
		text: '内容区全屏',
		divided: true,
		disabled: false,
		show: true
	}
]);

const closeTag = (item: RouteChildrenConfigsTable<'path' | 'name'>): void => {
	// 判断当前路由是否等于关闭的tag
	if (route.path.replace(/\/$/, '') === item.path.replace(/\/$/, '')) {
		const currentIndex = useAdminMenu()
			.getTagMenu()
			.findIndex(demo => demo.path === route.path);
		const currentPath = useAdminMenu().getTagMenu()[currentIndex - 1].path;
		navigateTo({
			path: currentPath
		});
	}

	useAdminMenu().closeTag(item.path);
};

const getPath = (path: string, list: RouteConfigsTable[]) => {
	list.forEach(item => {
		if (item.path === path) {
			useAdminMenu().setTagMenu({
				name: item.meta?.title,
				path: item.path
			});
			return;
		}
		if (item.children && item.children.length) {
			getPath(path, item.children);
		}
	});
};

getPath(route.path, menuList);

const onDropdownVisibleChange = (visible: boolean): void => {
	dropCollapse.value = visible;
};

watch(
	() => route.path,
	() => {
		getPath(route.path, menuList);
	}
);
</script>

<template>
	<div class="relative flex w-full items-center justify-between shadow-sm shadow-[rgba(0,21,41,0.08)]">
		<ElScrollbar class="flex h-fit w-[calc(100%-50px)]">
			<ElTag v-for="item in useAdminMenu().getTagMenu()" :key="item.path" :closable="item.path !== '/admin'"
				effect="plain"
				class="relative !flex !h-[34px] cursor-pointer !items-center !rounded-none !border-none !px-3 !text-[14px]"
				:class="[route.path === item.path ? 'is-active' : '']" @close="closeTag(item)"
				@click="navigateTo({ path: item.path })">
				<span>{{ item.name }}</span>
			</ElTag>
		</ElScrollbar>

		<ElDropdown trigger="click" placement="bottom-end" @visible-change="onDropdownVisibleChange">
			<div class="h-full px-3">
				<Icon :icon="dropCollapse ? 'ri:arrow-up-s-line' : 'ri:arrow-down-s-line'" width="20" height="20">
				</Icon>
			</div>
			<template #dropdown>
				<ElDropdownMenu class="!p-0">
					<ElDropdownItem v-for="(item, key) in tagsViews" :key="key" :command="{ key, item }"
						:divided="item.divided" :disabled="item.disabled">
						<Icon :icon="item.icon" width="16" height="16" class="mr-[5px]" />
						<span class="text-[14px]">{{ item.text }}</span>
					</ElDropdownItem>
				</ElDropdownMenu>
			</template>
		</ElDropdown>
	</div>
</template>

<style lang="postcss" scoped>
.is-active {
	@apply relative z-10 text-[#409EFF] shadow-[0_0_0.7px_#888];
}

.is-active::after {
	@apply absolute bottom-0 left-0 h-[2px] !w-full bg-[#409EFF] content-[''];
}

:deep(.el-tag::after) {
	@apply absolute bottom-0 left-0 h-[2px] w-0 bg-[#409EFF] transition-[width_0.3s_ease] content-[''];
}

:deep(.el-tag:hover::after) {
	@apply w-full;
}

:deep(.el-tag__close) {
	@apply opacity-0 transition-opacity duration-200;
}

:deep(.el-tag:hover .el-tag__close) {
	@apply opacity-100;
}

:deep(.is-active .el-tag__close) {
	@apply text-[#409EFF] opacity-100;
}

:deep(.is-active .el-tag__close:hover) {
	@apply !bg-transparent;
}

:deep(.el-tag .el-tag__close:hover) {
	@apply bg-[#409EFF];
}

:deep(.el-scrollbar__view) {
	@apply flex items-center pr-1;
}

:deep(.el-dropdown-menu__item--divided) {
	@apply !m-0;
}

:deep(.el-dropdown-menu__item:hover) {
	@apply !bg-[#ebf5ff] !text-[#409EFF];
}

:deep(.el-dropdown-menu__item:not(.is-disabled):hover),
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
	@apply !bg-[#ebf5ff] !text-[#409EFF];
}
</style>
