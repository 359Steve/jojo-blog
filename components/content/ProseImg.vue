<script setup lang="ts">
const { src, alt, title } = defineProps<{
	src?: string
	alt?: string
	title?: string
}>()
</script>

<template>
	<figure class="flex flex-col items-center">
		<img v-bind="$attrs" :src="src" :alt="alt" :title="title" loading="lazy" decoding="async" class="
				w-full
				rounded
				aspect-video
				object-cover
				cursor-pointer
			">
	</figure>
</template>
