<script lang="ts" setup>
const { data } = await useAsyncData('queryRecordHomeLine', () => queryRecordHomeLine());

const indexBg = ref<HTMLElement | null>(null);
const rect = ref<DOMRect>();
const theta = ref<number>(0);
const directionClass = ref<string>('');
const isSm = ref<boolean>(false);
const { getBlogUserInfo } = useBlogUserInfo();

const timelineData = computed(() => {
	return (
		data.value?.data?.slice().sort((a, b) => {
			const timeA = new Date(a.time_range).getTime();
			const timeB = new Date(b.time_range).getTime();
			return timeB - timeA;
		}) || []
	);
});

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

const onMouseenter = (e: MouseEvent): void => {
	if (isSm.value) return;
	const w = e.offsetX - rect.value!.width / 2;
	const h = rect.value!.height / 2 - e.offsetY;
	const currentTheta = Math.atan2(h, w);

	if (currentTheta < theta.value && currentTheta >= -theta.value) {
		directionClass.value = 'translate-x-[100%] opacity-100 animate-rightEnter';
	} else if (currentTheta >= theta.value && currentTheta <= Math.PI - theta.value) {
		directionClass.value = 'translate-y-[-100%] opacity-100 animate-topEnter';
	} else if (currentTheta <= -theta.value && currentTheta >= -Math.PI + theta.value) {
		directionClass.value = 'translate-y-[100%] opacity-100 animate-bottomEnter';
	} else {
		directionClass.value = 'translate-x-[-100%] opacity-100 animate-leftEnter';
	}
};

const onMouseleave = (e: MouseEvent): void => {
	if (isSm.value) return;
	const w = e.offsetX - rect.value!.width / 2;
	const h = rect.value!.height / 2 - e.offsetY;
	const currentTheta = Math.atan2(h, w);

	if (currentTheta < theta.value && currentTheta >= -theta.value) {
		directionClass.value = 'opacity-100 animate-rightLeave';
	} else if (currentTheta >= theta.value && currentTheta <= Math.PI - theta.value) {
		directionClass.value = 'opacity-100 animate-topLeave';
	} else if (currentTheta <= -theta.value && currentTheta >= -Math.PI + theta.value) {
		directionClass.value = 'opacity-100 animate-bottomLeave';
	} else {
		directionClass.value = 'opacity-100 animate-leftLeave';
	}
};

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
	<div class="flex w-full flex-col gap-6">
		<!-- 介绍 -->
		<div class="mx-auto w-full sm:w-[75%]">
			<div class="h-full w-full pb-4 pt-8 sm:pb-8">
				<AnimationRevealOnScroll>
					<h1 class="text-center text-[2.25em] font-extralight">{{ userInfo.pet_name }}</h1>
				</AnimationRevealOnScroll>
				<AnimationRevealOnScroll>
					<div class="mt-4 text-center">{{ userInfo.describe }}</div>
				</AnimationRevealOnScroll>
			</div>
		</div>
		<div class="mx-auto grid w-full grid-cols-1 gap-8 sm:w-[75%] md:w-[90%] md:grid-cols-2 md:gap-4">
			<div class="w-full">
				<div class="relative flex h-full w-full items-center py-0 md:py-4">
					<div
						class="absolute z-[-1] h-[calc(100%-1rem)] w-[50%] rounded-base bg-half-gray sm:h-full md:h-[calc(100%-2rem)]" />
					<div
						class="ml-4 h-fit w-[calc(100%-1rem)] rounded-base bg-white p-4 shadow-md sm:h-[calc(100%-2rem)]">
						<div ref="indexBg" class="relative h-full w-full cursor-pointer overflow-hidden"
							@mouseenter="onMouseenter" @mouseleave="onMouseleave">
							<Starport id="record-image-my-id" port="my-id"
								class="aspect-[3/2] max-h-full w-full md:h-full">
								<RecordImage class="transition-all duration-1000"
									:class="[useVueStarport().isRound ? 'rounded-[50%]' : 'rounded-none']" />
							</Starport>

							<div class="absolute top-0 flex h-full w-full items-end bg-white/40 backdrop-blur-sm dark:bg-black/40"
								:class="[directionClass, isSm ? 'opacity-100' : 'opacity-0']" @click="toRecord">
								<div class="grid grid-cols-1 gap-2 p-4 text-[0.8rem]">
									<div>点击查看我的个人履历！</div>
									<div>您将了解到我的学习背景、技能特长和经历</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="mb-8 grid h-full w-full grid-cols-1 justify-center text-sm sm:mb-0">
				<IndexBasicTime class="block md:hidden lg:block" :timeline-data="timelineData" />
				<IndexMdToLgTime class="hidden md:block lg:hidden" :timeline-data="timelineData" />
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped></style>
