<script lang="ts" setup>
const route = useRoute();
const isCollapse = ref<boolean>(false);
const theme = useJojoColorMode().getDarkMode().preference;
const menuData = ref<RouteConfigsTable[]>(getRouterConfig());
const activeMenu = computed(() => route.path);
</script>

<template>
	<ElAside
		class="h-full !w-[210px] border-r-[1px] border-solid border-r-[#0505050f] bg-white transition-[width_0.3s]">
		<LaySidebarLogo />
		<ElScrollbar class="!h-[calc(100%-48px)] w-full !overflow-x-hidden">
			<ElMenu unique-opened mode="vertical" :router="true" popper-class="pure-scrollbar"
				class="outer-most select-none" :collapse="isCollapse" :collapse-transition="false"
				:popper-effect="theme" :default-active="`${activeMenu}`">
				<LaySidebarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path"
					class="outer-most select-none" />
			</ElMenu>
		</ElScrollbar>
	</ElAside>
</template>

<style lang="postcss" scoped>
:deep(.is-active) {
	@apply !bg-[#409EFF] !text-white;
}

:deep(.el-menu-item) {
	@apply h-[50px] !px-[20px];
}

:deep(.el-sub-menu__title) {
	@apply !h-[50px];
}
</style>
