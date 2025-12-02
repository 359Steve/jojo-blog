<script lang="ts" setup>
useHead({
	title: '照片墙',
});

const pageNumber = ref<number>(1);
const pageSize = ref<number>(-1);
const { data } = await useAsyncData('photosRecordPictures', () =>
	findRecordPictures<RecordsResponse<string>>({
		pageNumber: pageNumber.value,
		pageSize: pageSize.value,
	}),
);

const photoList = ref<string[]>(data.value?.data?.records ?? []);
const total = ref<number>(data.value?.data?.total ?? 0);
const previewSrc = ref<string>('');
const isPreviewVisible = ref<boolean>(false);
const translate = ref<boolean>(false);
const animating = ref(false);

const preview = (src: string) => {
	previewSrc.value = src;
	isPreviewVisible.value = true;
};

const debouncedLoadMore = useDebounceFn(async () => {
	const res = await findRecordPictures<RecordsResponse<string>>({
		pageNumber: pageNumber.value + 1,
		pageSize: pageSize.value,
	});

	if (res.data?.records && res.data.records.length > 0) {
		photoList.value = photoList.value.concat(res.data.records);
		total.value = res.data?.total || 0;
		pageNumber.value += 1;
	}
}, 300);

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

onMounted(() => {
	nextTick(() => {
		const { y } = useWindowScroll();

		watch(y, () => {
			const scrollTop = y.value;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			if (scrollTop + windowHeight >= documentHeight - 200 && total.value > photoList.value.length) {
				debouncedLoadMore();
			}
		});
	});
});
</script>

<template>
	<div v-if="photoList && photoList.length > 0" class="w-full">
		<PreviewImageMask v-model:preview="isPreviewVisible" :src="previewSrc" alt="照片墙"
			@click="isPreviewVisible = false" />

		<div class="fixed top-14 flex items-center justify-center py-2">
			<Icon :icon="translate ? 'ri-grid-line' : 'ri-layout-masonry-line'" width="26"
				class="cursor-pointer text-gray-300" @click="toggleLayout" />
		</div>
		<div class="grid w-full grid-cols-1 gap-4 pt-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
			:class="[translate ? 'is-grid' : 'is-masonry']">
			<div v-for="(item, index) in photoList" :key="item" class="aspect-square">
				<img v-lazy="item" :data-photo-index="index" class="img-style" @click="preview(item)">
			</div>
		</div>
	</div>
	<TRexRunner v-else />
</template>

<style lang="postcss" scoped>
.img-style {
	@apply h-full w-full cursor-pointer transition-all duration-[0.25s] ease-in-out;
}

.is-grid .img-style {
	@apply object-cover;
}

.is-masonry .img-style {
	@apply object-contain;
}
</style>
