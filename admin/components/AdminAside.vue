<script lang="ts" setup>
const route = useRoute();
const isCollapse = ref<boolean>(false);
const theme = useJojoColorMode().getDarkMode().preference;
const menuData = ref<RouteConfigsTable[]>(getRouterConfig());
const activeMenu = computed(() => route.path);

const toggleSideBar = () => {
	isCollapse.value = !isCollapse.value;
};
</script>

<template>
	<ElAside
		class="relative h-full !overflow-x-hidden border-r-[1px] border-solid border-r-[#0505050f] bg-white transition-[width_0.3s]"
		:class="[isCollapse ? '!w-[53px]' : '!w-[210px]']">
		<LaySidebarLogo />
		<ElScrollbar class="!h-[calc(100%-48px)] w-full !overflow-x-hidden">
			<ElMenu unique-opened mode="vertical" :router="true" popper-class="pure-scrollbar" :collapse="isCollapse"
				:collapse-transition="false" :popper-effect="theme" :default-active="`${activeMenu}`">
				<LaySidebarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path"
					:is-collapse="isCollapse" />
			</ElMenu>
		</ElScrollbar>
		<LaySidebarLeftCollapse @toggle-side-bar="toggleSideBar" />
	</ElAside>
</template>

<style lang="postcss" scoped>
:deep(.el-menu) {
	@apply border-none;
}

:deep(.el-menu-item) {
	@apply h-[50px] w-[53px] !px-[8px] hover:bg-transparent;
}

:deep(.el-menu-item.is-active)>.active-menu {
	@apply !bg-[#409EFF] !text-white transition-colors duration-300;
}

.active-menu {
	@apply transition-colors duration-300;
}

:deep(.el-sub-menu__title) {
	@apply h-[50px] w-[53px] text-[#606266] transition-colors duration-300 hover:bg-transparent hover:text-black;
}

:deep(.el-sub-menu.is-active) {
	@apply !bg-transparent;
}

:deep(.el-sub-menu.is-active .el-sub-menu__title) {
	@apply !text-black hover:bg-transparent;
}
</style>
