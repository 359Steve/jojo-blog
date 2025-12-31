<script lang="ts" setup>
const { images } = defineProps<{
	images: string[];
}>();
</script>

<template>
	<div class="w-full">
		<div class="w-full">
			<slot mdc-unwrap="p" />
		</div>
		<div
			class="left-0 mt-4 flex h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] max-h-[400px] gap-4 overflow-x-auto">
			<img v-for="(image, index) in images" :key="index" class="aspect-square h-full object-cover" :src="image"
				:alt="`Image ${index + 1}`">
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
