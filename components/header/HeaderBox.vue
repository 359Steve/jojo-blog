<script lang="ts" setup>
const { drawer } = storeToRefs(useJojoHeader());
const headerEl = ref<HTMLElement | null>(null);

const { selectTheme } = defineProps<{
	selectTheme?: boolean;
}>();

defineEmits<{
	(e: 'changeTheme', value: MouseEvent): void;
}>();

onMounted(() => {
	nextTick(() => {
		const height: number = headerEl.value!.getBoundingClientRect().height;
		useJojoHeader().setHeaderHeight(height);
	});
});
</script>

<template>
	<HeaderDrawerHeader />
	<header ref="headerEl"
		class="bg-background/50 border-border/50 sticky top-0 z-10 flex h-12 w-full items-center justify-between border-x-0 px-4 backdrop-blur-md transition-all duration-300 ease-in-out"
		:class="[useJojoHeader().getScroll() ? '-translate-y-full' : 'translate-y-0']">
		<div class="h-full w-24 cursor-pointer py-2">
			<LogoBasicLogo />
		</div>
		<div class="absolute left-[50%] hidden h-full translate-x-[-50%] items-center justify-center sm:flex">
			<HeaderMenuList />
		</div>
		<div class="flex h-full w-fit items-center justify-between gap-x-2">
			<div class="flex h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB] dark:text-black"
				@click="navigateTo('/photos')">
				<a rel="noopener noreferrer">
					<Icon icon="ri:camera-3-fill" />
				</a>
			</div>
			<div
				class="hidden h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB] dark:text-black sm:flex">
				<a href="https://www.facebook.com/profile.php?id=61565513711985" target="_blank"
					rel="noopener noreferrer">
					<Icon icon="ri:facebook-circle-fill" />
				</a>
			</div>
			<div
				class="hidden h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB] dark:text-black sm:flex">
				<a href="https://github.com/359Steve" target="_blank" rel="noopener noreferrer">
					<Icon icon="ri:github-fill" />
				</a>
			</div>
			<div class="flex items-center justify-between gap-x-2">
				<div class="flex h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB]"
					@click="$emit('changeTheme', $event)">
					<Icon :icon="selectTheme ? 'ri:sun-fill' : 'ri:moon-clear-fill'" class="dark:text-black" />
				</div>
				<NuxtLink
					class="flex h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB]"
					target="_blank" rel="noopener noreferrer" to="/admin">
					<Icon icon="ri:settings-5-fill" class="dark:text-black" />
				</NuxtLink>
				<div class="h-8 w-8 rounded-base bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB] dark:text-black sm:hidden"
					@click="drawer = !drawer">
					<Icon icon="ri:menu-fold-4-fill" />
				</div>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped></style>
