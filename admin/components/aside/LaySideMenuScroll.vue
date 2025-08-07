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

<style lang="scss" scoped></style>
