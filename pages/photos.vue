<script lang="ts" setup>
const { data } = await useAsyncData('photosRecordPictures', () =>
	findRecordPictures({
		pageNumber: 1,
		pageSize: 50,
	}),
);

const rawData = data.value?.data ?? [];
const photoList = ref<string[]>(
	isArrayOf<string>(rawData, (item): item is string => typeof item === 'string') ? rawData : [],
);
const translate = ref<boolean>(false);
const previewSrc = ref<string>('');
const isPreviewVisible = ref<boolean>(false);

const preview = (src: string) => {
	previewSrc.value = src;
	isPreviewVisible.value = true;
};
</script>

<template>
	<PreviewImageMask v-model:preview="isPreviewVisible" :src="previewSrc" alt="照片墙" />
	<div class="relative w-full">
		<div class="absolute top-0 flex items-center justify-center py-2">
			<Icon :icon="translate ? 'ri-grid-line' : 'ri-layout-masonry-line'" width="26"
				class="cursor-pointer text-gray-300" @click="translate = !translate" />
		</div>
		<div class="grid w-full grid-cols-1 gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<div v-for="(item, index) in photoList" :key="item">
				<img :src="item" :data-photo-index="index" class="w-full object-contain"
					:class="[translate ? 'aspect-square object-cover' : 'sm:aspect-square']" @click="preview(item)">
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
