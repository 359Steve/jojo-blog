<script lang="ts" setup>
const { leftIsCollapse } = defineProps<{
	leftIsCollapse: boolean;
}>();

const route = useRoute();
const theme = useJojoColorMode().getDarkMode().preference;
const menuData = ref<RouteConfigsTable[]>(getRouterConfig());

const activeMenu = computed(() => route.path);
</script>

<template>
	<ElScrollbar class="!h-[calc(100%-88px)] w-full !min-w-[54px] !overflow-x-hidden">
		<ElMenu :class="[leftIsCollapse ? '!w-[54px]' : '']" unique-opened mode="vertical" :router="true"
			popper-class="pure-scrollbar" :collapse="leftIsCollapse" :collapse-transition="false" :popper-effect="theme"
			:default-active="`${activeMenu}`">
			<LaySidebarItem v-for="routes in menuData" :key="routes.path" :item="routes" :base-path="routes.path"
				:is-collapse="leftIsCollapse!" />
		</ElMenu>
	</ElScrollbar>
</template>

<style lang="postcss" scoped>
:deep(.el-menu) {
	@apply border-none;
}

:deep(.el-tooltip__trigger) {
	@apply flex items-center justify-center !px-0;
}

:deep(.el-menu-item) {
	@apply h-[50px] text-admin-menu-text !transition-none hover:bg-transparent;
}

:deep(.el-menu-item.is-active) {
	@apply relative !bg-transparent !text-white;
}

:deep(.el-menu-item.is-active::before) {
	@apply absolute inset-[4px_8px] z-[1] rounded-[3px] bg-admin-menu-active-before content-[''];
}

:deep(.el-sub-menu__title) {
	@apply !h-[50px] text-admin-menu-text !transition-none hover:bg-transparent hover:text-admin-menu-title-hover;
}

:deep(.el-sub-menu.is-active) {
	@apply !bg-transparent;
}

:deep(.el-sub-menu.is-active .el-sub-menu__title) {
	@apply !text-admin-menu-title-hover;
}

:deep(.el-menu-item:hover),
:deep(.el-sub-menu__title:hover) {
	@apply !bg-transparent !text-admin-menu-title-hover;
}

:deep(.el-menu-item.is-active),
:deep(.el-sub-menu.is-active),
:deep(.el-sub-menu__title.is-active) {
	@apply !bg-transparent !text-white;
}

:deep(.el-sub-menu.is-active .el-sub-menu__title.el-tooltip__trigger::before) {
	@apply absolute inset-y-0 left-[-1px] h-full w-[2px] bg-admin-menu-active-before content-[''];
}
</style>
