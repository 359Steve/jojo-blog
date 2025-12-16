<script lang="ts" setup></script>

<template>
	<div class="left-0 mt-4 flex h-[400px] gap-4 overflow-x-auto">
		<slot mdc-unwrap="p" />
	</div>
</template>

<style lang="postcss" scoped>
img {
	@apply aspect-square h-full object-cover;
}
</style>
