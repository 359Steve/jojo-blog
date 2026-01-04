<script lang="ts" setup>
const { images } = defineProps<{
	images: string[];
}>();

const previewSrc = ref<string>('')
const isPreviewVisible = ref<boolean>(false);

const preview = (src: string) => {
	previewSrc.value = src;
	isPreviewVisible.value = true;
};
</script>

<template>
	<PreviewImageMask v-model:preview="isPreviewVisible" :src="previewSrc" alt="预览照片"
		@click="isPreviewVisible = false" />
	<div class="w-full">
		<div class="w-full">
			<slot mdc-unwrap="p" />
		</div>

		<!-- 单图 -->
		<div v-if="images.length === 1" class="mt-4 w-full">
			<img :src="images[0]" alt="Image" class="w-full cursor-pointer aspect-video object-cover rounded"
				@click="preview(images[0])">
		</div>

		<!-- 多图 -->
		<div v-else
			class="left-0 mt-4 flex h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] max-h-[400px] gap-4 overflow-x-auto">
			<img v-for="(image, index) in images" :key="index" :src="image" :alt="`Image ${index + 1}`"
				class="aspect-square cursor-pointer h-full object-cover rounded" @click="preview(image)">
		</div>
	</div>
</template>
