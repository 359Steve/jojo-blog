<script lang="ts" setup>
const { drawer, isScroll } = storeToRefs(useJojoHeader());
const headerEl = ref<HTMLElement | null>(null);
const selectTheme = ref<boolean>(true);

const changeTheme = async (_e: MouseEvent): Promise<boolean> => {
	selectTheme.value = !selectTheme.value;
	// 判断是否支持该api (检查是否在浏览器环境)
	const isViewTransitionSupported = typeof document !== 'undefined' && 'startViewTransition' in document;

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
		const clipPath = [
			`circle(0% at ${clientX}px ${clientY}px)`,
			`circle(${radius}px at ${clientX}px ${clientY}px)`,
		];
		document.documentElement.animate(
			{
				clipPath: isDark ? clipPath.reverse() : clipPath,
			},
			// 设置时间，已经目标伪元素
			{
				duration: 500,
				pseudoElement: isDark ? '::view-transition-old(root)' : '::view-transition-new(root)',
			},
		);
	});

	return true;
};

onMounted(() => {
	selectTheme.value = useJojoColorMode().getDarkMode().preference !== 'dark';
	nextTick(() => {
		const height: number = headerEl.value!.getBoundingClientRect().height;
		useJojoHeader().setHeaderHeight(height);
	});
});
</script>

<template>
	<ClientOnly>
		<HeaderDrawerHeader />
	</ClientOnly>
	<header ref="headerEl"
		class="glass sticky top-0 z-10 flex h-12 w-full items-center justify-between border-x-0 px-4 transition-all duration-300 ease-in-out"
		:class="[isScroll ? '-translate-y-full' : 'translate-y-0']">
		<div class="h-full w-24 cursor-pointer py-2">
			<LogoBasicLogo />
		</div>
		<div class="absolute left-[50%] hidden h-full translate-x-[-50%] items-center justify-center sm:flex">
			<HeaderMenuList />
		</div>
		<div class="flex h-full w-fit items-center justify-between gap-x-2">
			<div class="dark:text-blog-primary flex h-8 w-8 items-center justify-center rounded-md bg-blog-base-color p-2 shadow-md hover:cursor-pointer"
				@click="navigateTo('/photos')">
				<a rel="noopener noreferrer">
					<Icon icon="ri:camera-3-fill" />
				</a>
			</div>
			<div
				class="dark:text-blog-primary hidden h-8 w-8 items-center justify-center rounded-md bg-blog-base-color p-2 shadow-md hover:cursor-pointer sm:flex">
				<a href="https://www.facebook.com/profile.php?id=61565513711985" target="_blank"
					rel="noopener noreferrer">
					<Icon icon="ri:facebook-circle-fill" />
				</a>
			</div>
			<div
				class="dark:text-blog-primary hidden h-8 w-8 items-center justify-center rounded-md bg-blog-base-color p-2 shadow-md hover:cursor-pointer sm:flex">
				<a href="https://github.com/359Steve" target="_blank" rel="noopener noreferrer">
					<Icon icon="ri:github-fill" />
				</a>
			</div>
			<div class="flex items-center justify-between gap-x-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-md bg-blog-base-color p-2 shadow-md hover:cursor-pointer"
					@click="changeTheme($event)">
					<Icon :icon="selectTheme ? 'ri:sun-fill' : 'ri:moon-clear-fill'" class="dark:text-blog-primary" />
				</div>
				<div class="dark:text-blog-primary h-8 w-8 rounded-base bg-blog-base-color p-2 shadow-md hover:cursor-pointer sm:hidden"
					@click="drawer = !drawer">
					<Icon icon="ri:menu-fold-4-fill" />
				</div>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped></style>
