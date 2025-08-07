<script lang="ts" setup>
const { drawerCollapse } = storeToRefs(useAdminMenu());
</script>

<template>
	<ElDrawer v-model="drawerCollapse" direction="ltr" title="jojoadmin" :with-header="false" class="!w-[210px] !p-0">
		<LaySidebarLogo />
		<LaySideMenuScroll :left-is-collapse="false"></LaySideMenuScroll>
	</ElDrawer>
</template>

<style lang="postcss" scoped></style>
