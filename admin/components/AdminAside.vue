<script lang="ts" setup>
const leftIsCollapse = defineModel<boolean>('leftIsCollapse');

const toggleSideBar = (): void => {
	leftIsCollapse.value = !leftIsCollapse.value;
};
</script>

<template>
	<ElAside v-bind="$attrs"
		class="relative h-full !overflow-x-hidden border-r-[1px] border-solid border-r-admin-menu-border bg-admin-menu-bg transition-[width_0.5s]"
		:class="[leftIsCollapse ? '!w-[54px]' : '!w-[210px]']">
		<LaySidebarLogo />
		<LaySideMenuScroll :left-is-collapse="leftIsCollapse!" />
		<LaySidebarLeftCollapse :is-collapse="leftIsCollapse!" @toggle-side-bar="toggleSideBar" />
	</ElAside>
</template>

<style lang="postcss" scoped></style>
