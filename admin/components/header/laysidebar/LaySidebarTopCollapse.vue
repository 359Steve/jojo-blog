<script lang="ts" setup>
const drawerCollapse = ref(false);
</script>

<template>
	<div>
		<Teleport to="body">
			<LaySideDrawer v-model:drawer-collapse="drawerCollapse" />
		</Teleport>
		<div class="flex h-[48px] w-fit items-center justify-center px-3 leading-[48px]"
			@click.stop="drawerCollapse = !drawerCollapse">
			<Icon :icon="!drawerCollapse ? 'ri:menu-unfold-fill' : 'ri:menu-fold-fill'" width="24" height="24" />
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
