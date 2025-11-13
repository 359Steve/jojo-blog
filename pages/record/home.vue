<script lang="ts" setup>
const { data } = await useAsyncData('recordPublicQuery', () => recordPublicQuery());
const summaryList = ref<Awaited<ReturnType<typeof recordPublicQuery>>['data'] | null>(data.value?.data || null);
const cardRef = templateRef('cardRef');
const cardCount = computed(() => {
	return summaryList.value ? summaryList.value.details.length : 0;
});
const cardMinHeight = ref<number>(0);
const containerMinHeight = computed(() => {
	return (cardCount.value - 1) * cardMinHeight.value;
});

// 获取卡片最大高度
const getCardMaxHeight = () => {
	if (cardRef.value) {
		const cardHeights: number[] = cardRef.value.map((item) => item?.$el.offsetHeight);
		return Math.max(...cardHeights);
	}

	return 0;
};

// 查询其他记录
const changeRecord = async (id: number) => {
	const res = await recordPublicQuery(id);
	if (res.data?.id) {
		summaryList.value = res.data;
		cardMinHeight.value = getCardMaxHeight();
	}
};

const toDetail = (parentId: number, id: number): void => {
	navigateTo({ path: `/record/detail/${parentId}/${id}` });
};

onMounted(() => {
	nextTick(() => {
		cardMinHeight.value = getCardMaxHeight();
	});
});
</script>

<template>
	<div class="mx-auto w-full">
		<div class="min-h-svh w-full">
			<div class="grid md:grid-cols-2 md:gap-8 xl:gap-12">
				<div class="flex items-start">
					<div class="sticky top-[5rem] sm:top-[6rem]">
						<RecordHeader :sm="false" :space="false" />
						<h5 class="text-xs uppercase tracking-wide">{{ summaryList?.time_range }}</h5>
						<h2 class="mb-6 mt-4 text-xl font-bold tracking-tight">
							{{ summaryList?.title }}
						</h2>
						<p class="max-w-prose text-sm">
							{{ summaryList?.summary }}
						</p>

						<div v-if="summaryList?.prev || summaryList?.next" class="mt-4 flex w-full items-center" :class="[
							summaryList?.prev
								? summaryList?.next
									? 'justify-between'
									: 'justify-start'
								: 'justify-end',
						]">
							<ElButton v-if="summaryList?.prev" class="!font-semibold !text-black"
								@click="changeRecord(summaryList.prev.id)">
								<Icon icon="ri:arrow-left-s-line" width="24" height="24" class="k mr-2" />
								<span class="font-semibold text-black">上一篇</span>
							</ElButton>
							<ElButton v-if="summaryList?.next" class="!font-semibold !text-black"
								@click="changeRecord(summaryList.next.id)">
								<span class="font-semibold text-black">下一篇</span>
								<Icon icon="ri:arrow-right-s-line" width="24" height="24" class="ml-2" />
							</ElButton>
						</div>
					</div>
				</div>

				<CardsstackContainerScroll :class-name="`space-y-8 sm:mt-0 mt-8`"
					:style="{ minHeight: `calc(100vh + ${containerMinHeight}px)` }">
					<CardsstackCardSticky v-for="(phase, index) in summaryList?.details" ref="cardRef" :key="phase.id"
						:index="index" class-name="rounded-2xl border p-4 shadow-md backdrop-blur-md"
						@click="toDetail(summaryList?.id!, phase.id!)">
						<div class="mb-4 flex items-center justify-between gap-4">
							<h2 class="flex-1 text-xl font-bold tracking-tighter">{{ phase.time_range }}</h2>
						</div>
						<Starport :id="`record-image-my-id${phase?.id}`" :port="`my-id${phase?.id}`"
							class="relative flex h-[280px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-base object-cover">
							<RecordDetailImage :img_url="phase.image_url || ''" :img_alt="phase.image_alt || ''"
								class="duration-1200 transition-all" />
						</Starport>
					</CardsstackCardSticky>
				</CardsstackContainerScroll>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
.underline-animate {
	position: relative;
	display: inline-block;
}

.underline-animate::after {
	content: '';
	position: absolute;
	left: 0;
	bottom: 0;
	height: 1px;
	width: 100%;
	background-color: currentColor;
	transform: scaleX(0);
	transform-origin: left;
	transition: transform 0.3s ease;
}

.group:hover .underline-animate::after {
	transform: scaleX(1);
	transform-origin: left;
}

.group:not(:hover) .underline-animate::after {
	transform-origin: right;
}
</style>
