<script lang="ts" setup>
type HeaderRouteCrumb = RouteChildrenConfigsTable<'name' | 'path'>;

const route = useRoute();
const menuList = getRouterConfig();

const findRoutePath = (path: string): HeaderRouteCrumb[] => {
	const result: HeaderRouteCrumb[] = [];

	const dfs = (nodes: RouteConfigsTable[], targetPath: string, currentPath: HeaderRouteCrumb[]): boolean => {
		for (const node of nodes) {
			// 将当前节点加入路径
			currentPath.push({
				name: node.meta?.title,
				path: node.path
			});

			if (node.path === targetPath) {
				// 找到目标路径，构建结果
				for (const item of currentPath) {
					result.push({
						name: item.name,
						path: item.path
					});
				}
				return true;
			}

			if (node.children && node.children.length) {
				const found = dfs(node.children, targetPath, currentPath);
				if (found) return true;
			}

			currentPath.pop();
		}
		return false;
	};

	dfs(menuList, path, []);
	return result;
};
const crumbList = ref<HeaderRouteCrumb[]>(findRoutePath(exceptPath(route.path)));

// 监听路由变化
watch(
	() => route.path,
	() => {
		crumbList.value = findRoutePath(exceptPath(route.path));
	}
);
</script>

<template>
	<ElBreadcrumb class="h-[48px] items-center p-3" separator="/">
		<TransitionGroup name="breadcrumb">
			<ElBreadcrumbItem v-for="item in crumbList" :key="item.path" :to="item.path" class="flex items-center">
				{{ item.name }}
			</ElBreadcrumbItem>
		</TransitionGroup>
	</ElBreadcrumb>
</template>

<style lang="postcss" scoped>
:deep(.is-link:hover) {
	@apply !transition-none text-admin-menu-title-hover
}
</style>
