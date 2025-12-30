<script lang="ts" setup>
const { title } = defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="w-full">
		<slot mdc-unwrap="p" />
		<span>{{ title }}</span>
	</div>
</template>

<style lang="scss" scoped></style>
