<script lang="ts" setup>
const { data } = await useAsyncData('recordPublicQuery', () => recordPublicQuery());
const summaryList = ref<ReturnFunction<typeof recordPublicQuery>['data'] | null>(data.value?.data || null);
const total = ref<number>(data.value?.data?._count.details || 0);
const cardRef = templateRef('cardRef');
const cardCount = computed(() => {
	return summaryList.value ? summaryList.value.details.length : 0;
});
const cardMinHeight = ref<number>(0);
const containerMinHeight = computed(() => {
	return (cardCount.value - 1) * cardMinHeight.value;
});
const pageNumber = ref<number>(2);
const pageSize = ref<number>(5);

// 获取卡片最大高度
const getCardMaxHeight = () => {
	if (cardRef.value) {
		const cardHeights: number[] = cardRef.value.map((item) => item?.$el.offsetHeight).filter(Boolean);
		return Math.max(...cardHeights);
	}

	return 0;
};

// 查询其他记录
const changeRecord = async (id: number) => {
	const res = await recordPublicQuery(id);
	if (res.data?.id) {
		pageNumber.value = 2;
		summaryList.value = res.data;
		total.value = res.data._count.details || 0;
		cardMinHeight.value = getCardMaxHeight();
	}
};

const toDetail = (parentId: number, id: number): void => {
	navigateTo({ path: `/record/detail/${parentId}/${id}` });
};

onMounted(() => {
	nextTick(() => {
		cardMinHeight.value = getCardMaxHeight();

		const { arrivedState } = useWindowScroll();

		watch(arrivedState, async (newValue) => {
			if (newValue.bottom) {
				if (total.value <= (summaryList.value?.details.length || 0)) {
					return;
				}
				const res = await recordDetailsQuery({
					parentId: summaryList.value?.id || 0,
					pageNumber: pageNumber.value,
					pageSize: pageSize.value,
				});

				if (res.data?.records && res.data.records.length > 0) {
					summaryList.value?.details.push(...res.data.records);
					pageNumber.value += 1;

					await nextTick();
					cardMinHeight.value = getCardMaxHeight();
				}
			}
		});
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
						<h5 class="text-sm uppercase tracking-wide">{{ summaryList?.time_range }}</h5>
						<h2 class="mb-6 mt-4 text-xl font-bold tracking-tight">
							{{ summaryList?.title }}
						</h2>
						<p class="max-w-prose indent-7 text-sm sm:indent-0">
							{{ summaryList?.summary }}
						</p>

						<div v-if="summaryList?.prev || summaryList?.next" class="mt-4 flex w-full items-center" :class="[
							summaryList?.prev
								? summaryList?.next
									? 'justify-between'
									: 'justify-start'
								: 'justify-end',
						]">
							<button v-if="summaryList?.prev"
								class="flex items-center rounded-md px-4 py-1 text-[16px] font-semibold text-black transition-colors duration-200 dark:text-white"
								@click="changeRecord(summaryList.prev.id)">
								<Icon icon="ri:arrow-left-s-line" width="24" height="24" />
								<span>上一篇</span>
							</button>

							<button v-if="summaryList?.next"
								class="flex items-center rounded-md px-4 py-1 text-[16px] font-semibold text-black transition-colors duration-200 dark:text-white"
								@click="changeRecord(summaryList.next.id)">
								<span>下一篇</span>
								<Icon icon="ri:arrow-right-s-line" width="24" height="24" />
							</button>
						</div>
					</div>
				</div>

				<CardsstackContainerScroll :class-name="`space-y-8 mt-6`"
					:style="{ minHeight: `calc(100vh + ${containerMinHeight}px)` }">
					<CardsstackCardSticky v-for="(phase, index) in summaryList?.details" ref="cardRef" :key="phase.id"
						:index="index"
						class-name="rounded-2xl border p-4 bg-white/40 shadow-md backdrop-blur-md transition-all dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_10px_rgba(255,255,255,0.08)]"
						@click="toDetail(summaryList?.id!, phase.id!)">
						<div class="mb-4 flex items-center justify-between gap-4">
							<h2 class="flex-1 text-xl font-bold tracking-tighter">{{ phase.time_range }}</h2>
						</div>
						<Starport :id="`record-image-my-id${phase?.id}`" :port="`my-id${phase?.id}`"
							class="relative flex h-[280px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-base object-cover">
							<RecordDetailImage :img_url="phase.images[0] || ''" :img_alt="phase.image_alt || ''"
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
