<script lang="ts" setup>
const menuList = getRouterConfig();
const route = useRoute();
const tagRefs = useTemplateRef('tagRefs');
const currentTagWidth = ref(0);
const currentTagLeft = ref(0);

// 计算当前tag的宽度
const getTagWidth = (): void => {
	nextTick(() => {
		currentTagLeft.value = 0;
		if (tagRefs.value?.length) {
			for (const item of tagRefs.value) {
				if (item!.$el.classList.contains('is-active')) {
					currentTagWidth.value = item!.$el.offsetWidth;
					return;
				}
				currentTagLeft.value += item!.$el.offsetWidth;
			}
		}
	});
};

const closeTag = (item: RouteChildrenConfigsTable<'path' | 'name'>, id: number): void => {
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

	// 计算当前tag的宽度
	const currentTagIndex = tagRefs.value?.findIndex(tag => tag?.$el.classList.contains('is-active')) ?? 0;
	const currentActiveTag = tagRefs.value![currentTagIndex];
	const currentTag = tagRefs.value![id];
	if (currentTagIndex === id) {
		// 说明是关闭的是当前tag
		const preTag = tagRefs.value![currentTagIndex - 1];
		currentTagWidth.value = preTag?.$el.offsetWidth;
		currentTagLeft.value -= currentActiveTag?.$el.offsetWidth;
	} else if (currentTagIndex > id) {
		// 说明是关闭的是前面的tag
		setTimeout(() => {
			currentTagLeft.value -= currentTag?.$el.offsetWidth;
		}, 240);
	}
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

watch(
	() => route.path,
	() => {
		getPath(route.path, menuList);
		getTagWidth();
	}
);

onMounted(() => {
	getTagWidth();
});
</script>

<template>
	<div class="relative flex w-full items-center shadow-sm shadow-[rgba(0,21,41,0.08)]">
		<ElTag v-for="(item, index) in useAdminMenu().getTagMenu()" ref="tagRefs" :key="item.path"
			:closable="item.path !== '/admin'" effect="plain"
			class="!flex !h-[34px] cursor-pointer !items-center !rounded-none !border-none !px-3 !text-[14px]"
			:class="[route.path === item.path ? 'is-active' : '']" @close="closeTag(item, index)"
			@click="navigateTo({ path: item.path })">
			<span>{{ item.name }}</span>
		</ElTag>
		<!--
 <div class="absolute bottom-0 h-[2px] bg-[#409EFF] transition-all"
			:style="{ left: `${currentTagLeft}px`, width: `${currentTagWidth}px` }"></div>
-->
	</div>
</template>

<style lang="postcss" scoped>
.is-active {
	@apply relative z-10 text-[#409EFF] shadow-[0_0_0.7px_#888];
}

.is-active::after {
	@apply absolute bottom-0 left-0 h-[2px] w-full bg-[#409EFF] content-[''];
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
</style>
