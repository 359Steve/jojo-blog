<script lang="ts" setup>
useHead({
	title: 'jojo-admin'
});
</script>

<template>
	<div class="relative h-full w-full">
		<slot name="page"></slot>
	</div>
</template>

<style lang="scss" scoped></style>
