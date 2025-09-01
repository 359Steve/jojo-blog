<script lang="ts" setup>
const selectTheme = ref<boolean>(useJojoColorMode().getDarkMode().preference !== 'dark');
const jojoMain = useTemplateRef('jojoMain');
const windWidth = ref<number>(0);

const changeTheme = async (_e: MouseEvent): Promise<boolean> => {
	selectTheme.value = !selectTheme.value;
	// 判断是否支持该api
	const isViewTransitionSupported = 'startViewTransition' in document;

	if (!isViewTransitionSupported) {
		useJojoColorMode().setDarkMode(selectTheme.value ? 'light' : 'dark');
		return true;
	}
	const transition: ViewTransition = document.startViewTransition(() => {
		useJojoColorMode().setDarkMode(selectTheme.value ? 'light' : 'dark');
	});

	transition.ready.then(() => {
		const isDark = useJojoColorMode().getDarkMode().preference === 'dark';
		const clientX = innerWidth / 2;
		const clientY = innerHeight / 2;

		// 计算最大半径
		const radius = Math.hypot(Math.max(clientX, innerWidth - clientX), Math.max(clientY, innerHeight - clientY));

		// 开始动画
		const clipPath = [`circle(0% at ${clientX}px ${clientY}px)`, `circle(${radius}px at ${clientX}px ${clientY}px)`];
		document.documentElement.animate(
			{
				clipPath: isDark ? clipPath.reverse() : clipPath
			},
			// 设置时间，已经目标伪元素
			{
				duration: 500,
				pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)'
			}
		);
	});

	return true;
};

onMounted(() => {
	nextTick(() => {
		if (jojoMain.value) {
			useResizeObserver(jojoMain, entries => {
				const [{ inlineSize: width, blockSize: _height }] = entries[0].borderBoxSize;
				windWidth.value = width;
			});
		}
	});
});
</script>

<template>
	<div ref="jojoMain" class="relative h-full w-full">
		<ClientOnly>
			<RecordBackground v-if="windWidth > 640" class-name="w-full h-[100dvh] fixed inset-0 z-[-1]">
			</RecordBackground>
			<BgcanvasBranchCanvas v-else></BgcanvasBranchCanvas>
		</ClientOnly>
		<ElBacktop :right="50" :bottom="100">
			<i class="ri-arrow-up-line"></i>
		</ElBacktop>
		<div class="h-full w-full">
			<!-- 导航栏 -->
			<HeaderBox :select-theme="selectTheme" @change-theme="changeTheme"></HeaderBox>
			<NuxtLoadingIndicator />
			<NuxtLayout name="mainbox">
				<template #childPage>
					<StarportCarrier>
						<slot name="page" />
					</StarportCarrier>
				</template>
			</NuxtLayout>
			<FooterBox></FooterBox>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-backtop) {
	@apply hidden items-center justify-center text-black dark:text-white sm:flex;
}
</style>
