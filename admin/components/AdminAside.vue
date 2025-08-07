<script lang="ts" setup>
const leftIsCollapse = defineModel<boolean>('leftIsCollapse');

const toggleSideBar = (): void => {
	leftIsCollapse.value = !leftIsCollapse.value;
};
</script>

<template>
	<Teleport to="body">
		<LaySideDrawer></LaySideDrawer>
	</Teleport>
	<ElAside v-bind="$attrs"
		class="relative h-full !overflow-x-hidden border-r-[1px] border-solid border-r-[#0505050f] bg-white transition-[width_0.5s]"
		:class="[leftIsCollapse ? '!w-[54px]' : '!w-[210px]']">
		<LaySidebarLogo />
		<LaySideMenuScroll :left-is-collapse="leftIsCollapse!" />
		<LaySidebarLeftCollapse :is-collapse="leftIsCollapse!" @toggle-side-bar="toggleSideBar" />
	</ElAside>
</template>

<style lang="postcss" scoped>
:deep(.el-menu) {
	@apply border-none;
}

:deep(.el-tooltip__trigger) {
	@apply flex items-center justify-center !px-0;
}

:deep(.el-menu-item) {
	@apply h-[50px] text-[#606266] !transition-none hover:bg-transparent;
}

:deep(.el-menu-item.is-active) {
	@apply relative !bg-transparent !text-white;
}

:deep(.el-menu-item.is-active::before) {
	@apply absolute inset-[4px_8px] z-[1] rounded-[3px] bg-[#409EFF] content-[''];
}

:deep(.el-sub-menu__title) {
	@apply !h-[50px] text-[#606266] transition-colors duration-300 hover:bg-transparent hover:text-black;
}

:deep(.el-sub-menu.is-active) {
	@apply !bg-transparent;
}

:deep(.el-sub-menu.is-active .el-sub-menu__title) {
	@apply !text-black;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
	@apply !bg-transparent !text-black;
}

:deep(.el-menu-item.is-active),
:deep(.el-sub-menu.is-active),
:deep(.el-sub-menu__title.is-active) {
	@apply !bg-transparent !text-white;
}

:deep(.el-sub-menu.is-active .el-sub-menu__title.el-tooltip__trigger::before) {
	@apply absolute inset-y-0 left-[-1px] h-full w-[2px] bg-[#409EFF] content-[''];
}
</style>
