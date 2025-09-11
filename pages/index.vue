<script lang="ts" setup>
import type { CreateUserDto } from '~/server/dto/CreateUserDto';

const indexBg = ref<HTMLElement | null>(null);
const rect = ref<DOMRect>();
const theta = ref<number>(0);
const directionClass = ref<string>('');
const isSm = ref<boolean>(false);

const timelineData = reactive<Timeline[]>([
	{
		id: '1-1',
		timestamp: '2021年9月',
		title: '入学',
		description: '开始学习前端基础',
		url: await useLoadStaticImage(1),
	},
	{
		id: '1-2',
		timestamp: '2022年3月',
		title: '完成第一个项目',
		description: 'React博客系统',
		url: await useLoadStaticImage(2),
	},
	{
		id: '1-3',
		timestamp: '2022年10月',
		title: '加入开发团队',
		description: '学院官网项目开发',
		url: await useLoadStaticImage(3),
	},
	{
		id: '1-4',
		timestamp: '2023年6月',
		title: '发布MiniMycc',
		description: '使用Electron构建桌面应用',
		url: await useLoadStaticImage(4),
	},
]);

const { data: user } = await useAsyncData('user', () => findUser());
const userInfo = reactive<CreateUserDto>(
	user.value?.data
		? user.value.data
		: {
			user_name: '',
			avatar_url: '',
			pet_name: '',
			sign: '',
			describe: '',
			password: '',
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

const detailRecord = async (_item: Timeline) => {
	navigateTo({ path: '/record/home' });
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
	<div class="flex min-h-[calc(100dvh-5rem)] w-full flex-col gap-6">
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
				<AnimationRevealOnScroll>
					<IndexBasicTime class="block md:hidden lg:block" :timeline-data="timelineData"
						@detail-record="detailRecord" />
					<IndexMdToLgTime class="hidden md:block lg:hidden" :timeline-data="timelineData"
						@detail-record="detailRecord" />
				</AnimationRevealOnScroll>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped></style>
