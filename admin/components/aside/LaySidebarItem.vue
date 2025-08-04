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
		<div>
			<Icon :icon="item.meta?.icon" class="mr-[5px] !h-[20px] !w-[20px]"></Icon>
		</div>
		<template #title>
			<div class="active-menu flex h-[calc(100%-8px)] w-full items-center rounded-[3px]">
				<span>{{ item.meta?.title }}</span>
			</div>
		</template>
	</ElMenuItem>
	<ElSubMenu v-else :index="`${basePath}`">
		<template #title>
			<Icon :icon="item.meta?.icon" class="mr-[5px] !h-[20px] !w-[20px]"></Icon>
			<span>{{ item.meta?.title }}</span>
		</template>
		<LaySidebarItem v-for="routes in item.children" :key="routes.path" :item="routes" :base-path="routes.path"
			:is-collapse="isCollapse" />
	</ElSubMenu>
</template>

<style lang="postcss" scoped></style>
