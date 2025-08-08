<script lang="ts" setup>
const { isFullscreen, toggle } = useFullscreen();
</script>

<template>
	<div class="flex h-[48px] w-[40px] cursor-pointer items-center justify-center hover:bg-[#f1f1f1]" @click="toggle">
		<Icon :icon="isFullscreen ? 'ri:fullscreen-exit-line' : 'ri:fullscreen-line'" width="20" height="20"></Icon>
	</div>
</template>

<style lang="scss" scoped></style>
