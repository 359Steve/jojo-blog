<script lang="ts" setup>
import type { CSSProperties } from 'vue';

const menuList = getRouterConfig();
const route = useRoute();
const router = useRouter();
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
const visible = ref(false);
const contextmenuRef = useTemplateRef('contextmenuRef');
const buttonLeft = ref(0);
const buttonTop = ref(0);
const contextmenuItem = ref<RouteChildrenConfigsTable<'path' | 'name'> | null>(null);

const changeTagsViews = (newPath: string): void => {
	const tagMenuList = useAdminMenu().getTagMenu();
	const currentIndex = useAdminMenu()
		.getTagMenu()
		.findIndex(item => item.path === newPath);
	tagsViews[1].disabled = currentIndex === 0;
	tagsViews[2].disabled = currentIndex <= 1;
	tagsViews[3].disabled = currentIndex >= tagMenuList.length - 1;
	tagsViews[4].disabled = tagMenuList.length <= 2;
	tagsViews[5].disabled = tagMenuList.length <= 1;
};

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

const closeTagLeft = (currentTagIndex: number): void => {
	useAdminMenu()
		.getTagMenu()
		.slice(1, currentTagIndex)
		.forEach(item => {
			closeTag(item);
		});
};

const closeTagRight = (currentTagIndex: number): void => {
	useAdminMenu()
		.getTagMenu()
		.slice(currentTagIndex + 1, useAdminMenu().getTagMenu().length)
		.forEach(item => {
			closeTag(item);
		});
};

const closeTagAll = (currentTagIndex: number): void => {
	useAdminMenu()
		.getTagMenu()
		.filter((_, index) => index !== 0 && index !== currentTagIndex)
		.forEach(item => {
			closeTag(item);
		});
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
changeTagsViews(route.path);

const handleVisible = (value: boolean) => {
	dropCollapse.value = value;
};

// 关闭菜单
const closeMenu = () => {
	visible.value = false;
};

// 打开菜单
const openMenu = (item: RouteChildrenConfigsTable<'path' | 'name'>, e: MouseEvent) => {
	changeTagsViews(item.path);
	contextmenuItem.value = item;
	buttonLeft.value = e.clientX - 54;
	buttonTop.value = e.clientY - 40;
	visible.value = true;
};

// 点击下拉菜单项
const handleCommand = (value: { item: tagsViewsType; key: number }): void => {
	const { key } = value;
	const tagList = useAdminMenu().getTagMenu();
	const currentTag = tagList.find(item => item.path === route.path);
	const currentIndex = tagList.findIndex(item => item.path === route.path);
	switch (key) {
		case 0:
			router.replace({ path: route.fullPath });
			break;
		case 1:
			closeTag(currentTag!);
			break;
		case 2:
			closeTagLeft(currentIndex);
			break;
		case 3:
			closeTagRight(currentIndex);
			break;
		case 4:
			closeTagAll(currentIndex);
			break;
		case 5:
			useAdminMenu()
				.getTagMenu()
				.slice(1, useAdminMenu().getTagMenu().length)
				.forEach(item => {
					closeTag(item);
				});
			break;
		default:
			break;
	}
};

const contextmenuClose = (key: number): void => {
	const tagList = useAdminMenu().getTagMenu();
	const currentIndex = tagList.findIndex(item => item.path === contextmenuItem.value?.path);
	switch (key) {
		case 0:
			router.replace({ path: contextmenuItem.value?.path });
			break;
		case 1:
			closeTag(contextmenuItem.value!);
			break;
		case 2:
			closeTagLeft(currentIndex);
			break;
		case 3:
			closeTagRight(currentIndex);
			break;
		case 4:
			closeTagAll(currentIndex);
			break;
		case 5:
			useAdminMenu()
				.getTagMenu()
				.slice(1, useAdminMenu().getTagMenu().length)
				.forEach(item => {
					closeTag(item);
				});
			break;
		default:
			break;
	}
};

const getContextMenuStyle = computed((): CSSProperties => {
	return { left: `${buttonLeft.value}px`, top: `${buttonTop.value}px` };
});

watch(
	() => route.path,
	newPath => {
		getPath(route.path, menuList);
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
	<div class="relative flex w-full items-center justify-between shadow-sm shadow-[rgba(0,21,41,0.08)]">
		<ElScrollbar class="flex h-fit w-[calc(100%-50px)]">
			<div v-for="item in useAdminMenu().getTagMenu()" :key="item.path"
				@contextmenu.prevent="openMenu(item, $event)">
				<ElTag :closable="item.path !== '/admin'" effect="plain"
					class="relative !flex !h-[34px] cursor-pointer !items-center !rounded-none !border-none !px-3 !text-[14px]"
					:class="[route.path === item.path ? 'is-active' : '']" @close="closeTag(item)"
					@click="navigateTo({ path: item.path })">
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
				class="absolute z-30 m-0 list-none whitespace-nowrap rounded-[4px] bg-white py-[5px] text-[13px] font-normal text-[#303133] shadow-[0_2px_8px_rgba(0,0,0,0.15)] outline-none">
				<div v-for="(item, key) in tagsViews.slice(0, 6).filter(item => !item.disabled)" :key="key"
					class="flex items-center">
					<li v-if="item.show"
						class="m-0 flex w-full cursor-pointer items-center px-[12px] py-[7px] hover:text-[#409EFF]"
						@click="contextmenuClose(key)">
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

:deep(.el-dropdown-menu__item:not(.is-disabled):hover) {
	@apply !bg-[#ebf5ff] !text-[#409EFF];
}

:deep(.el-dropdown-menu__item:not(.is-disabled):hover),
:deep(.el-dropdown-menu__item:not(.is-disabled):focus) {
	@apply !bg-[#ebf5ff] !text-[#409EFF];
}

:deep(.el-dropdown-menu__item.is-disabled) {
	@apply !text-[#c0c4cc];
}
</style>
