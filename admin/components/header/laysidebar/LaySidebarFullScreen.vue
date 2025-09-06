<script lang="ts" setup></script>

<template>
	<div class="flex h-[48px] w-[40px] cursor-pointer items-center justify-center hover:bg-admin-header-bg-hover"
		@click="useAdminMenu().toggle()">
		<Icon :icon="useAdminMenu().isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'" width="20"
			height="20"></Icon>
	</div>
</template>

<style lang="scss" scoped></style>
