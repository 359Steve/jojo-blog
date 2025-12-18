<script lang="ts" setup>
useHead({
	title: '照片墙',
});

const pageNumber = ref<number>(1);
const pageSize = ref<number>(-1);
const { data } = await useAsyncData('photosRecordPictures', () =>
	findRecordPictures<string[]>({
		pageNumber: pageNumber.value,
		pageSize: pageSize.value,
	}),
);

const photoList = computed<string[]>(() => data.value?.data ?? []);
const previewSrc = ref<string>('');
const isPreviewVisible = ref<boolean>(false);
const translate = ref<boolean>(false);
const animating = ref(false);

const preview = (src: string) => {
	previewSrc.value = src;
	isPreviewVisible.value = true;
};

const toggleLayout = () => {
	if (animating.value) return;

	animating.value = true;
	requestAnimationFrame(() => {
		translate.value = !translate.value;

		requestAnimationFrame(() => {
			animating.value = false;
		});
	});
};
</script>

<template>
	<div v-if="photoList && photoList.length > 0" class="w-full">
		<PreviewImageMask v-model:preview="isPreviewVisible" :src="previewSrc" alt="照片墙"
			@click="isPreviewVisible = false" />

		<div class="fixed top-14 flex items-center justify-center py-2">
			<Icon :icon="translate ? 'ri-grid-line' : 'ri-layout-masonry-line'" width="26"
				class="cursor-pointer text-gray-300" @click="toggleLayout" />
		</div>
		<div class="grid w-full grid-cols-1 gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<div v-for="(item, index) in photoList" :key="item" class="aspect-square">
				<NuxtImg :src="item" :data-photo-index="index" class="h-full w-full cursor-pointer"
					:fit="translate ? 'cover' : 'contain'" loading="lazy" @click="preview(item)" />
			</div>
		</div>
	</div>
	<TRexRunner v-else />
</template>

<style lang="postcss" scoped></style>
