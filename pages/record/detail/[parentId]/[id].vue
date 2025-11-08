<script lang="ts" setup>
definePageMeta({
	validate(route) {
		if (!route.params.parentId && !route.params.id) {
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
const parentId = computed(() => route.params.parentId);
const id = computed(() => route.params.id);

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

const currentData = ref<Awaited<ReturnType<typeof recordDetailQuery>>['data']>(data.value?.data || null);

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
	if (!currentData.value?.imageAll) return [];
	return currentData.value.imageAll.map((item) => item.image_url).filter(Boolean);
});

const stableSrcList = ref<string[]>([]);

watch(
	srcList,
	(newList) => {
		if (newList.length > 0 && JSON.stringify(newList) !== JSON.stringify(stableSrcList.value)) {
			stableSrcList.value = [...newList];
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

// 查询上下条数据
const getById = async (recordId: number) => {
	navigateTo({ path: `/record/detail/${parentId.value}/${recordId}` }, { replace: true });
};
</script>

<template>
	<div class="w-full">
		<RecordHeader />
		<div class="mb-6 flex w-full items-center justify-between">
			<ElButton link
				class="hover:text-primary flex items-center gap-2 !text-sm text-gray-600 transition-colors duration-200"
				@click="navigateTo('/record/home')">
				<Icon icon="ri:arrow-left-line" />
				返回日记列表
			</ElButton>
			<span class="text-sm text-gray-600">{{ date }}</span>
		</div>
		<Starport :id="`record-image-my-id${parentId}`" :port="`my-id${parentId}`"
			class="relative flex h-[10rem] cursor-pointer items-center justify-center overflow-hidden rounded-base sm:h-[12rem] md:h-[14rem] lg:h-[16rem] xl:h-[16rem] 2xl:h-[16rem]">
			<RecordDetailImage :img_url="currentData?.image_url || ''" :img_alt="currentData?.image_alt"
				class="duration-1200 transition-all" />
		</Starport>
		<div class="w-full py-4 sm:py-8">
			<AnimationRevealOnScroll animation-class="animate__fadeInDown"
				base-class="mb-4 sm:mb-6 text-center font-extrabold text-lg text-gray-500">
				{{ currentData?.title }}
			</AnimationRevealOnScroll>
			<AnimationRevealOnScroll animation-class="animate__fadeInDown" base-class="text-center text-gray-400">
				{{ currentData?.summary }}
			</AnimationRevealOnScroll>
		</div>
		<div class="mt-4 w-full py-8">
			<div class="m-auto flex w-[80%] items-center sm:w-[60%]">
				<div class="h-px flex-1 flex-grow bg-gray-300" />
				<span class="mx-4 text-sm text-gray-500">
					照片墙 ({{ stableSrcList.length }}{{ stableSrcList.length > 4 ? '张，点击查看全部' : '张' }})
				</span>
				<div class="h-px flex-1 flex-grow bg-gray-300" />
			</div>
			<ElScrollbar v-if="stableSrcList.length > 0">
				<div
					class="scroll-wrap mt-4 flex flex-row gap-4 sm:mt-8 sm:grid sm:aspect-video sm:grid-cols-4 sm:grid-rows-2">
					<div v-for="(item, index) in stableSrcList.slice(0, 4)" :key="`img-${index}-${parentId}`"
						class="relative h-48 w-36 flex-shrink-0 overflow-hidden rounded-base sm:row-span-1 sm:h-auto sm:w-full"
						:class="[
							'sm:' + (index < 2 ? 'col-span-2' : 'row-start-2'),
							index === 1 ? 'sm:col-start-3 sm:row-span-2' : '',
							index === 2 ? 'sm:col-start-1' : '',
							index === 3 ? 'sm:col-start-2' : '',
						]">
						<ElImage :src="item" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2"
							:preview-src-list="stableSrcList" show-progress fit="cover" :preview-teleported="true" />

						<div v-if="index === 3 && stableSrcList.length > 4"
							class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white">
							<div class="text-center">
								<div class="text-lg font-bold">+{{ stableSrcList.length - 4 }}</div>
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

.scroll-wrap>div>div {
	@apply min-h-[12rem] min-w-[9rem];
}

.scroll-wrap>div>div {
	@apply sm:min-h-[auto] sm:min-w-[auto];
}

.relative:hover :deep(.el-image) {
	@apply scale-105 transition-transform duration-300;
}

.relative:hover .absolute {
	@apply bg-opacity-70 transition-all duration-200;
}
</style>
