<script setup lang="ts">
const { images } = defineProps<{
	images: {
		src: string;
		alt: string;
	}[];
}>();
</script>

<template>
	<div class="flex gap-4 overflow-x-auto py-4">
		<img v-for="img in images" :key="img.src" :src="img.src" :alt="img.alt"
			class="h-48 shrink-0 select-none rounded-xl object-cover" draggable="false">
	</div>
</template>
