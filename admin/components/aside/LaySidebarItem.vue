<script lang="ts" setup>
const { item, basePath } = defineProps<{
	item: RouteConfigsTable;
	basePath: string;
}>();
</script>

<template>
	<ElMenuItem v-if="!item.children" :index="`${basePath}`">
		<Icon :icon="item.meta?.icon" width="18" height="18" class="mr-[5px]"></Icon>
		<span>{{ item.meta?.title }}</span>
	</ElMenuItem>
	<ElSubMenu v-else :index="`${basePath}`">
		<template #title>
			<Icon :icon="item.meta?.icon" width="18" height="18" class="mr-[5px]"></Icon>
			<span>{{ item.meta?.title }}</span>
		</template>
		<LaySidebarItem v-for="routes in item.children" :key="routes.path" :item="routes" :base-path="routes.path" />
	</ElSubMenu>
</template>

<style lang="postcss" scoped></style>
