<script lang="ts" setup>
import type { CSSProperties } from 'vue';

const menuList = getRouterConfig();
const route = useRoute();
const dropCollapse = ref(false);
const tagsViews = reactive<Array<tagsViewsType>>([
	{
		id: 1,
		icon: 'mdi:restore',
		text: '重新加载',
		divided: false,
		disabled: false,
		show: true
	},
	{
		id: 2,
		icon: 'ri:close-line',
		text: '关闭当前标签页',
		divided: false,
		disabled: false,
		show: true
	},
	{
		id: 3,
		icon: 'ri:text-direction-r',
		text: '关闭左侧标签页',
		divided: true,
		disabled: false,
		show: true
	},
	{
		id: 4,
		icon: 'ri:text-direction-l',
		text: '关闭右侧标签页',
		divided: false,
		disabled: false,
		show: true
	},
	{
		id: 5,
		icon: 'ri:text-spacing',
		text: '关闭其他标签页',
		divided: true,
		disabled: false,
		show: true
	},
	{
		id: 6,
		icon: 'ri:align-vertically',
		text: '关闭全部标签页',
		divided: false,
		disabled: false,
		show: true
	},
	{
		id: 7,
		get icon() {
			return useAdminMenu().contentFullscreen ? 'ri:fullscreen-line' : 'ri:fullscreen-exit-line';
		},
		get text() {
			return useAdminMenu().contentFullscreen ? '内容全屏' : '退出全屏';
		},
		divided: true,
		disabled: false,
		show: true
	}
]);
const visible = ref(false);
const contextmenuRef = useTemplateRef('contextmenuRef');
const buttonLeft = ref(0);
const buttonTop = ref(0);
const contextmenuItem = ref<RouteChildrenConfigsTable<'path' | 'name'> | null>(null);

const changeTagsViews = (newPath: string): void => {
	const tagMenuList = useAdminMenu().getTagMenu();
	const currentIndex = tagMenuList.findIndex(item => item.path === newPath);
	tagsViews[1].disabled = currentIndex === 0;
	tagsViews[2].disabled = currentIndex <= 1;
	tagsViews[3].disabled = currentIndex >= tagMenuList.length - 1;
	tagsViews[4].disabled = tagMenuList.length <= 2;
	tagsViews[5].disabled = tagMenuList.length <= 1;
};

const closeTag = (item: RouteChildrenConfigsTable<'path' | 'name'>): void => {
	const tagList = useAdminMenu().getTagMenu();
	const newPath = exceptPath(route.path);
	// 判断当前路由是否等于关闭的tag
	if (newPath === item.path) {
		const currentIndex = tagList.findIndex(demo => demo.path === newPath);
		const currentPath = tagList[currentIndex - 1].path;
		navigateTo({
			path: currentPath
		});
	}
	visible.value = false;

	useAdminMenu().closeTag(item.path);
};

const closeTagsByRange = (start: number, end: number) => {
	useAdminMenu().getTagMenu().slice(start, end).forEach(closeTag);
};

const closeTagOthers = (currentTagIndex: number) => {
	useAdminMenu()
		.getTagMenu()
		.filter((_, index) => index !== 0 && index !== currentTagIndex)
		.forEach(item => closeTag(item));
};

const setCurrentTag = (path: string) => {
	const newPath = exceptPath(path);
	const findPath = (p: string, list: RouteConfigsTable[]) => {
		for (const item of list) {
			if (item.path === p) {
				useAdminMenu().setTagMenu({ name: item.meta?.title, path: item.path });
				return;
			}
			if (item.children?.length) findPath(p, item.children);
		}
	};
	findPath(newPath, menuList);
};

setCurrentTag(route.path);
changeTagsViews(route.path);

const handleVisible = (value: boolean) => {
	dropCollapse.value = value;
};

// 关闭菜单
const closeMenu = () => {
	visible.value = false;
};

// 右键菜单
const openMenu = (item: RouteChildrenConfigsTable<'path' | 'name'>, e: MouseEvent) => {
	changeTagsViews(item.path);
	contextmenuItem.value = item;
	buttonLeft.value = e.clientX - (useAdminMenu().getLeftIsCollapse() ? 54 : 210);
	buttonTop.value = e.clientY - 40;
	visible.value = true;
};

const executeCommand = (id: number, target?: RouteChildrenConfigsTable<'path' | 'name'>) => {
	const tagList = useAdminMenu().getTagMenu();
	const currentTag = target ?? tagList.find(t => normalizePath(t.path) === exceptPath(route.path))!;
	const currentIndex = tagList.findIndex(t => normalizePath(t.path) === normalizePath(currentTag.path));

	switch (id) {
		case 1:
			navigateTo({ path: currentTag.path });
			break;
		case 2:
			closeTag(currentTag);
			break;
		case 3:
			closeTagsByRange(1, currentIndex);
			break;
		case 4:
			closeTagsByRange(currentIndex + 1, tagList.length);
			break;
		case 5:
			closeTagOthers(currentIndex);
			break;
		case 6:
			closeTagsByRange(1, tagList.length);
			break;
		case 7:
			useAdminMenu().setContentFullscreen(!useAdminMenu().contentFullscreen);
			break;
		default:
			break;
	}
};

/** 下拉菜单点击 */
const handleCommand = ({ item }: { item: tagsViewsType; key: number }) => {
	executeCommand(item.id);
};

/** 右键菜单点击 */
const contextmenuClose = (id: number) => {
	if (contextmenuItem.value) executeCommand(id, contextmenuItem.value);
};

const getContextMenuStyle = computed((): CSSProperties => {
	return { left: `${buttonLeft.value}px`, top: `${buttonTop.value}px` };
});

watch(
	() => route.path,
	newPath => {
		setCurrentTag(route.path);
		changeTagsViews(newPath);
	}
);

onMounted(() => {
	onClickOutside(
		contextmenuRef,
		() => {
			closeMenu();
			changeTagsViews(route.path);
		},
		{
			detectIframe: true
		}
	);
});
</script>

<template>
	<div
		class="relative flex w-full items-center justify-between border-b border-admin-menu-border border-solid bg-admin-menu-bg">
		<ElScrollbar class="flex h-fit w-[calc(100%-50px)]">
			<div v-for="item in useAdminMenu().getTagMenu()" :key="item.path"
				@contextmenu.prevent="openMenu(item, $event)">
				<ElTag :closable="item.path !== '/admin'" effect="plain"
					class="relative !flex !h-[34px] cursor-pointer !items-center !rounded-none !border-none !px-3 !text-[14px]"
					:class="[exceptPath(route.path) === item.path ? 'is-active' : '']" @close="closeTag(item)"
					@click="navigateTo({ path: item.path === '/admin/userinfo' ? '/admin/userinfo/123123' : item.path })">
					<span>{{ item.name }}</span>
				</ElTag>
			</div>
		</ElScrollbar>

		<ElDropdown trigger="click" placement="bottom-end" @visible-change="handleVisible" @command="handleCommand">
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

		<!-- 右键菜单按钮 -->
		<Transition name="el-zoom-in-top">
			<ul v-show="visible" ref="contextmenuRef" :style="getContextMenuStyle"
				class="absolute z-30 m-0 list-none whitespace-nowrap rounded-[4px] bg-admin-menu-bg py-[5px] text-[13px] font-normal text-admin-menu-text shadow-[0_2px_8px_rgba(0,0,0,0.15)] outline-none">
				<div v-for="(item, key) in tagsViews.slice(0, 6).filter(item => !item.disabled)" :key="key"
					class="flex items-center">
					<li v-if="item.show"
						class="m-0 flex w-full cursor-pointer items-center px-[12px] py-[7px] hover:text-admin-tag-active-text"
						@click="contextmenuClose(item.id)">
						<Icon :icon="item.icon" width="16" height="16" class="mr-2 block" />
						{{ item.text }}
					</li>
				</div>
			</ul>
		</Transition>
	</div>
</template>

<style lang="postcss" scoped>
.is-active {
	@apply relative z-10 text-admin-tag-active-text shadow-[0_0_0.7px_#888];
}

.is-active::after {
	@apply absolute bottom-0 left-0 h-[2px] !w-full bg-admin-tag-active-bg content-[''];
}

:deep(.el-tag) {
	@apply text-admin-tag-text
}

:deep(.el-tag.is-active) {
	@apply text-admin-tag-active-text;
}

:deep(.el-tag:hover) {
	@apply text-admin-tag-active-text;
}

:deep(.el-tag::after) {
	@apply absolute bottom-0 left-0 h-[2px] w-0 bg-admin-tag-active-bg transition-[width_0.3s_ease] content-[''];
}

:deep(.el-tag:hover::after) {
	@apply w-full;
}

:deep(.el-tag__close) {
	@apply opacity-0 transition-opacity duration-200;
}

:deep(.el-tag:hover .el-tag__close) {
	@apply opacity-100 bg-transparent text-admin-tag-active-text;
}

:deep(.is-active .el-tag__close) {
	@apply text-admin-tag-active-text opacity-100;
}

:deep(.is-active .el-tag__close:hover) {
	@apply !bg-transparent;
}

:deep(.el-tag .el-tag__close:hover) {
	@apply bg-transparent text-admin-tag-active-text;
}

:deep(.el-scrollbar__view) {
	@apply flex items-center pr-1;
}

:deep(.el-dropdown-menu__item--divided) {
	@apply !m-0;
}

:deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
	@apply !bg-admin-dropdown-menu-bg !text-admin-tag-active-text;
}

:deep(.el-dropdown-menu__item:not(.is-disabled):hover),
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
	@apply !bg-admin-dropdown-menu-bg !text-admin-tag-active-text;
}
</style>
