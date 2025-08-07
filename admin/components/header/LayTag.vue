<script lang="ts" setup>
const menuList = getRouterConfig();
const route = useRoute();

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
watch(
	() => route.path,
	() => {
		getPath(route.path, menuList);
	}
);
</script>

<template>
	<div class="flex w-full items-center py-[2px] shadow-sm shadow-[rgba(0,21,41,0.08)]">
		<ElTag v-for="item in useAdminMenu().getTagMenu()" :key="item.path" :closable="item.path !== '/admin'"
			effect="plain" class="!h-[30px] cursor-pointer !border-none !text-[14px]" @close="closeTag(item)"
			@click="navigateTo({ path: item.path })">
			<span>{{ item.name }}</span>
		</ElTag>
	</div>
</template>

<style lang="scss" scoped></style>
