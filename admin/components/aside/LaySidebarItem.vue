<script lang="ts" setup>
const { item, basePath, isCollapse } = defineProps<{
	item: RouteConfigsTable;
	basePath: string;
	isCollapse: boolean;
}>();
</script>

<template>
	<ElMenuItem v-if="!item.children || item.children.length === 0" :index="`${basePath}`"
		class="!text-[#606266] hover:!text-black">
		<Icon v-if="isCollapse" :icon="item.meta?.icon" width="18" height="18" class="mr-[5px]"></Icon>
		<template #title>
			<div class="active-menu flex h-[calc(100%-8px)] w-full items-center rounded-[3px]"
				:class="[item.children ? 'pl-[12px]' : 'pl-[32px]']">
				<Icon v-if="!isCollapse" :icon="item.meta?.icon" width="18" height="18" class="mr-[5px]"></Icon>
				<span>{{ item.meta?.title }}</span>
			</div>
		</template>
	</ElMenuItem>
	<ElSubMenu v-else :index="`${basePath}`">
		<template #title>
			<Icon :icon="item.meta?.icon" width="18" height="18" class="mr-[5px]"></Icon>
			<span>{{ item.meta?.title }}</span>
		</template>
		<LaySidebarItem v-for="routes in item.children" :key="routes.path" :item="routes" :base-path="routes.path"
			:is-collapse="isCollapse" />
	</ElSubMenu>
</template>

<style lang="postcss" scoped></style>
