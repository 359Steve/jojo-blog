<script lang="ts" setup>
const drawerCollapse = defineModel<boolean>('drawerCollapse');
</script>

<template>
	<ElDrawer v-model="drawerCollapse" direction="ltr" title="jojoadmin" :with-header="false"
		class="admin-drawer !w-[210px] !p-0">
		<LaySidebarLogo />
		<LaySideMenuScroll :left-is-collapse="false" />
	</ElDrawer>
</template>

<style lang="postcss" scoped></style>
