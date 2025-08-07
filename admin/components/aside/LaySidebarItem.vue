<script lang="ts" setup>
const { item, basePath, isCollapse } = defineProps<{
	item: RouteConfigsTable;
	basePath: string;
	isCollapse: boolean;
}>();
</script>

<template>
	<ElMenuItem v-if="!item.children || item.children.length === 0" :index="`${basePath}`"
		class="!text-[#606266] hover:!text-black" @click="useAdminMenu().setDrawerCollapse(false)">
		<div :class="[isCollapse ? 'mr-0' : 'mr-[10px]']" class="item-icon z-10">
			<Icon :icon="item.meta?.icon" class="!h-[20px] !w-[20px]"></Icon>
		</div>
		<template #title>
			<div class="z-10 flex h-[calc(100%-8px)] w-full items-center rounded-[3px]">
				<span>{{ item.meta?.title }}</span>
			</div>
		</template>
	</ElMenuItem>
	<ElSubMenu v-else :index="`${basePath}`" class="border-l">
		<template #title>
			<Icon :icon="item.meta?.icon" class="!h-[20px] !w-[20px]" :class="[isCollapse ? 'mr-0' : 'mr-[10px]']">
			</Icon>
			<span>{{ item.meta?.title }}</span>
		</template>
		<LaySidebarItem v-for="routes in item.children" :key="routes.path" class="active-menu"
			:class="[isCollapse ? '' : '!pl-[45px]']" :item="routes" :base-path="routes.path"
			:is-collapse="isCollapse" />
	</ElSubMenu>
</template>

<style lang="postcss" scoped>
.active-menu {
	@apply transition-colors duration-300;
}

.active-menu .item-icon {
	@apply mr-[10px];
}
</style>
