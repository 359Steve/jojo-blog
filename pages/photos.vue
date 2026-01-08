<script lang="ts" setup>
import { blurhashToGradientCssObject } from '@unpic/placeholder';

useHead({
	title: '照片墙',
});

const pageNumber = ref<number>(1);
const pageSize = ref<number>(-1);
const { data } = await useAsyncData('photosRecordPictures', () =>
	findRecordPictures<
		{
			url: string;
			blurhash: string;
		}[]
	>({
		pageNumber: pageNumber.value,
		pageSize: pageSize.value,
	}),
);

const photoList = computed<
	{
		url: string;
		blurhash: string;
	}[]
>(() => data.value?.data ?? []);

const translate = ref<boolean>(false);
</script>

<template>
	<div v-if="photoList && photoList.length > 0" class="w-full">
		<div class="fixed top-14 flex items-center justify-center py-10">
			<Icon :icon="translate ? 'ri-grid-line' : 'ri-layout-masonry-line'" width="26"
				class="cursor-pointer text-blog-tertiary" @click="translate = !translate" />
		</div>
		<div class="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			<div v-for="(photo, idx) in photoList" :key="idx" class="cursor-pointer">
				<img v-preview-img="{
					src: photo.url,
					alt: '照片墙',
				}" :src="photo.url" alt="照片"
					:style="photo.blurhash && translate ? (blurhashToGradientCssObject(photo.blurhash) as any) : ''"
					:data-photo-index="idx" loading="lazy" w-full
					:class="translate ? 'object-cover sm:aspect-square' : 'aspect-square object-contain'">
			</div>
		</div>
	</div>
	<TRexRunner v-else />
</template>

<style lang="postcss" scoped></style>
