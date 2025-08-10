<script lang="ts" setup></script>

<template>
	<div class="h-fit w-full bg-white">
		<LayNavbar v-if="useAdminMenu().contentFullscreen"></LayNavbar>
		<LayTag></LayTag>
	</div>
</template>

<style lang="postcss" scoped></style>
