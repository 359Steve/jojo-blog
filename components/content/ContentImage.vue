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
</script>

<template>
	<div class="w-full">
		<div class="w-full">
			<slot mdc-unwrap="p" />
		</div>
		<div
			class="left-0 mt-4 flex h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] max-h-[400px] gap-4 overflow-x-auto">
			<img v-for="(src, index) in images" :key="index" v-preview-img="{
				src,
				alt: `Image ${index + 1}`
			}" class="aspect-video h-full object-cover" :src="src" :alt="`Image ${index + 1}`">
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
