<script lang="ts" setup>
const { data } = await useAsyncData('indexRecordPictures', () =>
	findRecordPictures<HomePicResponse<RecordDetailImages>[]>({
		pageNumber: 1,
		pageSize: 4,
		random: true,
	}),
);

const pictureList = computed<HomePicResponse<RecordDetailImages>[]>(() => data.value?.data ?? []);
const indexBg = ref<HTMLElement | null>(null);
const rect = ref<DOMRect>();
const theta = ref<number>(0);
const isSm = ref<boolean>(false);
const { getBlogUserInfo } = useBlogUserInfo();
// 定义每个格子的位置
const gridPositions = ref([
	{ colStart: 2, colEnd: 3, rowStart: 1, rowEnd: 3 },
	{ colStart: 1, colEnd: 2, rowStart: 2, rowEnd: 4 },
	{ colStart: 1, colEnd: 2, rowStart: 4, rowEnd: 6 },
	{ colStart: 2, colEnd: 3, rowStart: 3, rowEnd: 5 },
]);

// 默认图片列表
const defaultImages = ref<string[]>([
	'/images/home1.png',
	'/images/home2.png',
	'/images/home3.png',
	'/images/home4.png',
]);

const userInfo = computed(() => {
	return (
		getBlogUserInfo() || {
			user_name: '',
			avatar_url: '',
			pet_name: '',
			sign: '',
			describe: '',
			tags: [],
		}
	);
});

const toRecord = () => {
	navigateTo('/record/home');
};

const toRecordDetail = (item: HomePicResponse<RecordDetailImages>) => {
	if (!item.record_detail_id || !item.group_id) return;
	navigateTo({ path: `/record/detail/${item.group_id}/${item.record_detail_id}` });
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
	<div class="grid w-full grid-cols-1 items-center gap-8 pt-8 md:grid-cols-2 md:pt-0">
		<div>
			<div class="mb-4 block text-xs font-medium text-rose-500 opacity-100 backdrop-blur-0 md:text-sm">
				{{ userInfo.pet_name }}
			</div>
			<div class="text-4xl font-semibold tracking-tight opacity-100 backdrop-blur-0 md:text-[2.4rem]">
				{{ userInfo.sign }}
			</div>
			<div
				class="my-4 line-clamp-5 indent-8 text-base text-slate-700 opacity-100 backdrop-blur-0 dark:text-slate-50 md:my-6 md:text-lg">
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
				<div v-for="(pos, index) in gridPositions" :key="index"
					class="glass relative cursor-pointer overflow-hidden rounded-xl shadow-xl" :style="{
						gridColumnStart: pos.colStart,
						gridColumnEnd: pos.colEnd,
						gridRowStart: pos.rowStart,
						gridRowEnd: pos.rowEnd,
						opacity: 1,
					}" @click="toRecordDetail(pictureList[index])">
					<img :src="pictureList[index]?.url || defaultImages[index]"
						class="size-full object-cover object-center" width="100%" height="100%"
						:alt="pictureList[index]?.url || '首页默认'">
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped></style>
