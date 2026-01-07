<script lang="ts" setup>
const { images } = defineProps<{
	images: string[];
}>();

const containerRef = useTemplateRef<HTMLDivElement>('containerRef')

onMounted(() => {
	if (!containerRef.value) return

	useEventListener(
		containerRef,
		'wheel',
		(event: WheelEvent) => {
			event.preventDefault()
			containerRef.value!.scrollLeft += event.deltaY
		},
		{ passive: false }
	)
})
</script>

<template>
	<div ref="containerRef"
		class="-mx-[var(--prose-margin)] px-[var(--prose-margin)] mt-4 flex py-3 box-border h-[400px] gap-4 overflow-x-auto">
		<img v-for="(src, index) in images" :key="index" v-preview-img="{
			src,
			alt: `Image ${index + 1}`
		}" class="aspect-square h-full object-cover cursor-pointer" :src="src" :alt="`Image ${index + 1}`">
	</div>
</template>

<style lang="scss" scoped></style>
