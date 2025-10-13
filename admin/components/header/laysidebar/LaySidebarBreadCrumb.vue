<script lang="ts" setup>
type HeaderRouteCrumb = RouteChildrenConfigsTable<'name' | 'path'>;

const route = useRoute();
const menuList = getRouterConfig();

const findRoutePath = (path: string): HeaderRouteCrumb[] => {
	const result: HeaderRouteCrumb[] = [];

	for (const item of menuList) {
		if (item.path === path) {
			result.push({
				name: item.meta?.title,
				path: item.path,
			});
			break;
		}

		if (item.children && item.children.length) {
			for (const child of item.children) {
				if (child.path === path) {
					result.push({
						name: item.meta?.title,
						path: item.path,
					});
					result.push({
						name: child.meta?.title,
						path: child.path,
					});
					break;
				}
			}
		}
	}
	return result;
};
const crumbList = ref<HeaderRouteCrumb[]>(findRoutePath(exceptPath(route.path)));

// 监听路由变化
watch(
	() => route.path,
	() => {
		crumbList.value = findRoutePath(exceptPath(route.path));
	},
);
</script>

<template>
	<ElBreadcrumb class="h-[48px] items-center p-3" separator="/">
		<ElBreadcrumbItem v-for="item in crumbList" :key="item.path" :to="item.path" class="flex items-center">
			{{ item.name }}
		</ElBreadcrumbItem>
	</ElBreadcrumb>
</template>

<style lang="postcss" scoped>
:deep(.is-link:hover) {
	@apply text-admin-menu-title-hover !transition-none;
}
</style>
