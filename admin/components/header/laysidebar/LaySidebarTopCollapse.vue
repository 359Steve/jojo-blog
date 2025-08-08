<script lang="ts" setup>
const { drawerCollapse } = storeToRefs(useAdminMenu());
</script>

<template>
	<div class="flex h-[48px] w-fit items-center justify-center px-3 leading-[48px]"
		@click.stop="drawerCollapse = !drawerCollapse">
		<Icon :icon="!drawerCollapse ? 'ri:menu-unfold-fill' : 'ri:menu-fold-fill'" width="24" height="24" />
	</div>
</template>

<style lang="scss" scoped></style>
