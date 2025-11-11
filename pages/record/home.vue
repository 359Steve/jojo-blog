<script lang="ts" setup>
import type { CSSProperties } from 'vue';

const { data } = await useAsyncData('recordPublicQuery', () => recordPublicQuery());
const recordText = ref<HTMLDivElement[] | null>();
const summaryList = ref<Awaited<ReturnType<typeof recordPublicQuery>>['data']>(data.value?.data || []);
// 图片高度
const imageHeight = ref<number[]>([]);
const currentImg = reactive({
	id: summaryList.value![0]?.details?.[0]?.id || 0,
	src: summaryList.value![0]?.details?.[0]?.image_url || '',
	alt: summaryList.value![0]?.details?.[0]?.image_alt || '',
});

// 格式化年份显示
const formatYear = (timeRange: string): string => {
	const year = parseInt(timeRange);
	return isNaN(year) ? timeRange : year.toString();
};

const toDetail = (parentId: number, id: number): void => {
	navigateTo({ path: `/record/detail/${parentId}/${id}` });
};

const getItemTime = (index: number): string => {
	const list = summaryList.value;
	if (!list || list.length === 0) {
		return '';
	}

	const currentItem = list[index];
	if (!currentItem?.time_range) {
		return '';
	}

	const currentYear = formatYear(currentItem.time_range);

	if (index === 0) {
		return `${currentYear} - 现在`;
	}

	const prevItem = list[index - 1];
	if (!prevItem?.time_range) {
		return currentYear;
	}

	const prevYear = formatYear(prevItem.time_range);
	return `${currentYear} - ${prevYear}`;
};

const newHeight = (index: number): CSSProperties => {
	const height = imageHeight.value[index];
	return height ? { height: `${height}px` } : { minHeight: '200px' };
};

const hasValidData = computed(() => {
	return summaryList.value && summaryList.value.length > 0;
});

const titleMouseenter = (id: number, imgUrl: string, imgAlt?: string) => {
	currentImg.id = id;
	currentImg.src = imgUrl;
	currentImg.alt = imgAlt || '';
};

onMounted(() => {
	if (import.meta.client && recordText.value) {
		recordText.value.forEach((el: HTMLDivElement, index: number) => {
			imageHeight.value[index] = el.getBoundingClientRect().height;
		});
	}
});
</script>

<template>
	<div class="mx-auto w-full">
		<RecordHeader />
		<main class="mx-auto w-full">
			<div v-if="hasValidData" class="grid w-full grid-cols-1 gap-8 sm:gap-12 md:gap-16">
				<div v-for="(item, index) in summaryList" :key="item.id"
					base-class="flex sm:flex-row flex-col space-x-10 relative">
					<div class="w-full">
						<div class="flex w-full items-center justify-between">
							<h5
								class="from-primary to-secondary bg-gradient-to-r bg-clip-text text-base font-semibold tracking-wider text-rose-500 md:text-lg lg:text-lg">
								{{ item.title }}
							</h5>
							<h5
								class="from-primary to-secondary bg-gradient-to-r bg-clip-text text-base font-semibold tracking-wider text-rose-500 md:text-lg lg:text-lg">
								{{ getItemTime(index) }}
							</h5>
						</div>

						<div class="mb-6 space-y-3">
							<p class="text-lg font-medium leading-relaxed text-gray-800 dark:text-gray-200">
								{{ item.role }}
							</p>
							<p class="leading-relaxed text-gray-600 dark:text-gray-400">
								{{ item.summary }}
							</p>
						</div>
						<div class="grid grid-cols-1 gap-4 sm:grid-cols-2"
							:class="[index % 2 === 0 ? '' : 'sm:flex-row-reverse']">
							<div ref="recordText" class="aaaaa h-fit w-full"
								:class="[index % 2 === 0 ? 'sm:order-1' : 'sm:order-2']">
								<div v-if="item.details && item.details.length > 0">
									<div v-for="demo in item.details" :key="demo.id"
										class="group my-2 flex w-full cursor-pointer grid-cols-1 items-start space-x-2 sm:grid-cols-2"
										@click="toDetail(item.id!, demo.id!)">
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
											viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
											stroke-linecap="round" stroke-linejoin="round"
											class="mt-1 h-4 w-4 flex-shrink-0 text-neutral-300">
											<path
												d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
												fill="currentColor" stroke-width="0" />
										</svg>
										<p class="from-primary text-secondary underline-animate truncate text-sm font-normal tracking-wider sm:text-base"
											@mouseenter="titleMouseenter(demo.id!, demo.image_url, demo.image_alt)">
											{{ demo.title }}
										</p>
									</div>
								</div>
								<div v-else class="flex items-center justify-center py-4">
									<span class="text-gray-500">暂无详情记录</span>
								</div>
							</div>
							<div class="flex h-full w-full cursor-pointer items-center justify-center"
								:class="[index % 2 === 0 ? 'sm:order-2' : 'sm:order-1']">
								<Starport v-if="item.details && item.details.length > 0"
									:id="`record-image-my-id${item.id}`" :port="`my-id${item.id}`" class="w-full"
									:style="newHeight(index)">
									<RecordDetailImage class="duration-1200 transition-all" :img_url="currentImg.src"
										:img_alt="currentImg.alt" @click="toDetail(item.id!, currentImg.id)" />
								</Starport>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
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
