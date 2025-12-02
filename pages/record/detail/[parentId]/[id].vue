<script lang="ts" setup>
useHead({
	title: '记录详情',
});

definePageMeta({
	validate(route) {
		const { parentId, id } = route.params as { parentId?: string; id?: string };
		if (!parentId && !id) {
			throw createError({
				statusCode: 500,
				data: {
					message: '出错了！',
				},
			});
		}
		return true;
	},
});

const route = useRoute();
const { parentId: pid, id: rid } = route.params as { parentId: string; id: string };
const parentId = computed(() => pid);
const id = computed(() => rid);
const previewSrc = ref<string>('');
const isPreviewVisible = ref<boolean>(false);

const { data, error, refresh } = await useAsyncData(
	() => `recordDetailQuery-${parentId.value}-${id.value}`,
	() => recordDetailQuery(Number(parentId.value), Number(id.value)),
);

if (error.value) {
	throw createError({
		statusCode: 404,
		message: '记录不存在',
	});
}

const currentData = ref<ReturnFunction<typeof recordDetailQuery>['data']>(data.value?.data || null);
const mark = ref<number>(4);

// 监听路由变化，更新数据
watch([parentId, id], async () => {
	try {
		await refresh();
		if (data.value?.data) {
			currentData.value = data.value.data;
		}
	} catch (err) {
		console.error('获取数据失败:', err);
	}
});

const srcList = computed(() => {
	if (!currentData.value?.images) return [];
	return currentData.value.images;
});
const srcListAll = computed(() => {
	if (!currentData.value?.imageAll) return [];
	return currentData.value.imageAll.flatMap((item) => item.images).filter(Boolean);
});
const stableSrcList = ref<string[]>([]);
const stableSrcListAll = ref<string[]>([]);

watch(
	srcList,
	(newList) => {
		if (newList.length > 0 && JSON.stringify(newList) !== JSON.stringify(stableSrcList.value)) {
			stableSrcList.value = [...newList];
		}
	},
	{ immediate: true },
);

watch(
	srcListAll,
	(newList) => {
		if (newList.length > 0 && JSON.stringify(newList) !== JSON.stringify(stableSrcListAll.value)) {
			stableSrcListAll.value = [...newList];
		}
	},
	{ immediate: true },
);

const date = computed(() => {
	if (!currentData.value?.created_at) {
		return '';
	}
	const d = new Date(currentData.value.created_at);
	return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
});

// 照片墙切换状态
const photoWallMode = ref<'current' | 'all'>('current');

const count = computed(() => {
	return photoWallMode.value === 'current' ? stableSrcList.value : stableSrcListAll.value;
});

// 当前显示的图片列表
const currentDisplayImages = computed(() => {
	return count.value.slice(0, mark.value);
});

// 查询上下条数据
const getById = async (recordId: number) => {
	navigateTo({ path: `/record/detail/${parentId.value}/${recordId}` }, { replace: true });
};

// 预览图片
const preview = (src: string) => {
	previewSrc.value = src;
	isPreviewVisible.value = true;
};

watch(photoWallMode, () => {
	mark.value = 4;
});
</script>

<template>
	<PreviewImageMask v-model:preview="isPreviewVisible" :src="previewSrc" :alt="currentData?.image_alt || ''" />
	<div class="w-full">
		<RecordHeader class="sm:mb-20" />
		<div class="mb-6 flex w-full items-center justify-between">
			<button
				class="hover:text-primary flex items-center gap-1 text-sm text-gray-600 transition-colors duration-200 focus:outline-none"
				@click="navigateTo('/record/home')">
				<Icon icon="ri:arrow-left-s-line" width="24" />
				<span>CD ..</span>
			</button>
			<span class="text-sm text-gray-600">{{ date }}</span>
		</div>
		<Starport :id="`record-image-my-id${id}`" :port="`my-id${id}`"
			class="relative flex h-[10rem] cursor-pointer items-center justify-center overflow-hidden rounded-base sm:h-[12rem] md:h-[14rem] lg:h-[16rem] xl:h-[16rem] 2xl:h-[16rem]">
			<RecordDetailImage :img_url="currentData?.images[0] || ''" :img_alt="currentData?.image_alt"
				class="duration-1200 transition-all" />
		</Starport>
		<div class="w-full py-4 sm:py-8">
			<div class="mb-4 text-center text-lg font-semibold text-black dark:text-white sm:mb-6">
				{{ currentData?.title }}
			</div>
			<div class="text-gray-500">
				<p v-for="(line, index) in currentData?.summary.split('\n')" :key="index" class="mb-2 indent-8">
					{{ line }}
				</p>
			</div>
		</div>
		<div class="mt-4 w-full py-8">
			<div class="m-auto flex items-center gap-2 sm:gap-4">
				<div class="h-px flex-1 flex-grow bg-gray-300" />
				<div class="flex cursor-pointer items-center justify-center rounded-full px-2 py-1 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm"
					:class="[
						photoWallMode === 'current'
							? 'scale-105 transform bg-rose-500 text-white shadow-lg'
							: 'border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md',
					]" @click="photoWallMode = 'current'">
					<Icon :icon="photoWallMode === 'current' ? 'ri:image-fill' : 'ri:image-line'"
						class="mr-1 text-sm sm:mr-2 sm:text-base" />
					<span>当日 ({{ stableSrcList.length }})</span>
				</div>
				<div class="flex cursor-pointer items-center justify-center rounded-full px-2 py-1 text-xs font-medium transition-all duration-200 sm:px-4 sm:py-2 sm:text-sm"
					:class="[
						photoWallMode === 'all'
							? 'scale-105 transform bg-rose-500 text-white shadow-lg'
							: 'border border-gray-300 bg-white text-gray-600 hover:border-gray-400 hover:bg-gray-50 hover:shadow-md',
					]" @click="photoWallMode = 'all'">
					<Icon :icon="photoWallMode === 'all' ? 'ri:gallery-fill' : 'ri:gallery-line'"
						class="mr-1 text-sm sm:mr-2 sm:text-base" />
					<span>全年 ({{ stableSrcListAll.length }})</span>
				</div>
				<div class="h-px flex-1 flex-grow bg-gray-300" />
			</div>

			<ElScrollbar v-if="currentDisplayImages.length > 0">
				<div
					class="scroll-wrap mt-4 flex flex-row gap-2 sm:mt-8 md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
					<div v-for="(item, index) in currentDisplayImages"
						:key="`img-${index}-${parentId}-${photoWallMode}`"
						class="relative aspect-square w-36 flex-shrink-0 overflow-hidden rounded-base sm:w-48 md:w-full">
						<img :src="item" :min-scale="0.2" :alt="currentData?.image_alt" loading="lazy" decoding="async"
							class="aspect-square w-full cursor-pointer object-cover" @click="preview(item)">

						<div v-if="index === 3 && count.length > currentDisplayImages.length"
							class="absolute inset-0 flex h-full w-full cursor-pointer items-center justify-center bg-black bg-opacity-50 text-white"
							@click="mark = count.length">
							<div class="text-center">
								<div class="text-lg font-bold">+{{ count.length - 4 }}</div>
								<div class="text-xs">更多</div>
							</div>
						</div>
					</div>
				</div>
			</ElScrollbar>

			<div v-else class="mt-8 flex min-h-[200px] items-center justify-center">
				<div class="text-center text-gray-500">
					<Icon icon="ri:image-ai-fill" width="64" height="64" />
					<div class="text-sm">暂无照片</div>
				</div>
			</div>
		</div>

		<div v-if="currentData?.prev || currentData?.next" class="flex w-full items-center"
			:class="[currentData?.prev ? (currentData?.next ? 'justify-between' : 'justify-start') : 'justify-end']">
			<ElButton v-if="currentData?.prev" link class="!font-semibold !text-black"
				@click="getById(currentData?.prev.id)">
				<Icon icon="ri:arrow-left-s-line" width="24" height="24" class="k mr-2" />
				<span class="font-semibold text-black">上一篇</span>
			</ElButton>
			<ElButton v-if="currentData?.next" link class="!font-semibold !text-black"
				@click="getById(currentData?.next.id)">
				<span class="font-semibold text-black">下一篇</span>
				<Icon icon="ri:arrow-right-s-line" width="24" height="24" class="ml-2" />
			</ElButton>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-image) {
	@apply h-full w-full rounded-base object-cover;
}

.scroll-wrap::-webkit-scrollbar {
	@apply h-[6px];
}

.scroll-wrap::-webkit-scrollbar-thumb {
	@apply rounded-[2px] bg-[#575656];
}

.scroll-wrap {
	@apply overflow-x-auto sm:overflow-visible;
}

.relative:hover :deep(.el-image) {
	@apply scale-105 transition-transform duration-300;
}
</style>
