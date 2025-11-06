<script lang="ts" setup>
const { title } = defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="flex h-full w-full flex-col">
		<h3 class="mb-2 font-bold">
			{{ title }}
		</h3>
		<slot />
	</div>
</template>

<style lang="scss" scoped></style>
