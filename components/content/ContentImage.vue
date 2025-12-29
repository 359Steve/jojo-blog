<script lang="ts" setup>
const { images } = defineProps<{
	images: string[];
}>();
</script>

<template>
	<div class="left-0 mt-4 flex h-[400px] gap-4 overflow-x-auto">
		<img v-for="(image, index) in images" :key="index" class="aspect-square h-full object-cover" :src="image"
			:alt="`Image ${index + 1}`">
	</div>
</template>

<style lang="scss" scoped></style>
