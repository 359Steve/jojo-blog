<script lang="ts" setup>
import type { CreateRecordDetailDto } from '~/server/dto/CreateArticleDto';

const { data } = await useAsyncData('indexRecordPictures', () =>
	findRecordPictures({
		pageNumber: 1,
		pageSize: 4,
		random: true,
	}),
);

const pictureList = ref<Pick<CreateRecordDetailDto, 'id' | 'image_url' | 'image_alt'>[]>(data.value?.data || []);
const indexBg = ref<HTMLElement | null>(null);
const rect = ref<DOMRect>();
const theta = ref<number>(0);
const isSm = ref<boolean>(false);
const { getBlogUserInfo } = useBlogUserInfo();

const userInfo = reactive(
	getBlogUserInfo() ?? {
		user_name: '',
		avatar_url: '',
		pet_name: '',
		sign: '',
		describe: '',
		tags: [],
	},
);

const toRecord = () => {
	navigateTo('/record/home');
};

onMounted(() => {
	nextTick(() => {
		// 获取页面宽度
		const el = document.documentElement.getBoundingClientRect();
		isSm.value = el.width <= 640;
		if (indexBg.value) {
			rect.value = indexBg.value!.getBoundingClientRect();
			theta.value = Math.atan2(rect.value!.height, rect.value!.width);
		}
	});
});
</script>

<template>
	<div class="grid w-full grid-cols-1 items-center gap-8 pt-8 sm:pt-12 md:grid-cols-2">
		<div>
			<div class="mb-4 block text-xs font-medium text-rose-500 opacity-100 backdrop-blur-0 md:text-sm">
				{{ userInfo.pet_name }}
			</div>
			<div class="text-4xl font-semibold tracking-tight opacity-100 backdrop-blur-0 md:text-[2.4rem]">
				{{ userInfo.sign }}
			</div>
			<div
				class="my-4 line-clamp-5 indent-10 text-base text-slate-700 opacity-100 backdrop-blur-0 dark:text-slate-50 md:my-6 md:text-lg">
				{{ userInfo.describe }}
			</div>
			<div class="opacity-100 backdrop-blur-0">
				<button
					class="ring-offset-background focus-visible:ring-ring text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md bg-rose-500 px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
					@click="toRecord">
					欢迎浏览
				</button>
			</div>
		</div>

		<div class="relative">
			<div class="grid grid-cols-2 grid-rows-[50px_150px_50px_150px_50px] gap-4">
				<div class="relative col-start-2 col-end-3 row-start-1 row-end-3 overflow-hidden rounded-xl shadow-xl"
					style="opacity: 1">
					<img class="size-full object-cover object-center" width="100%" height="100%"
						:alt="pictureList[0]?.image_alt || ''" :src="pictureList[0]?.image_url ||
							'https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&amp;w=2338&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							" />
				</div>
				<div class="relative col-start-1 col-end-2 row-start-2 row-end-4 overflow-hidden rounded-xl shadow-xl"
					style="opacity: 1">
					<img class="size-full object-cover object-center" width="100%" height="100%"
						:alt="pictureList[1]?.image_alt || ''" :src="pictureList[1]?.image_url ||
							'https://images.unsplash.com/photo-1733680958774-39a0e8a64a54?q=80&amp;w=2487&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							" />
				</div>
				<div class="relative col-start-1 col-end-2 row-start-4 row-end-6 overflow-hidden rounded-xl shadow-xl"
					style="opacity: 1">
					<img class="size-full object-cover object-center" width="100%" height="100%"
						:alt="pictureList[2]?.image_alt || ''" :src="pictureList[2]?.image_url ||
							'https://images.unsplash.com/photo-1548783307-f63adc3f200b?q=80&amp;w=2487&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							" />
				</div>
				<div class="relative col-start-2 col-end-3 row-start-3 row-end-5 overflow-hidden rounded-xl shadow-xl"
					style="opacity: 1">
					<img class="size-full object-cover object-center" width="100%" height="100%"
						:alt="pictureList[3]?.image_alt || ''" :src="pictureList[3]?.image_url ||
							'https://images.unsplash.com/photo-1703622377707-29bc9409aaf2?q=80&amp;w=2400&amp;auto=format&amp;fit=crop&amp;ixlib=rb-4.0.3&amp;ixid=M3wxMJA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
							" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped></style>
