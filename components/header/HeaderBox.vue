<script lang="ts" setup>
import darkImg from '~/assets/image/dark.png';
import lightImg from '~/assets/image/light.png';

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
	<HeaderDrawerHeader></HeaderDrawerHeader>
	<header
		ref="headerEl"
		:class="[
			`bg-background/50 border-border/50 sticky top-0 z-10 flex h-12 w-full items-center justify-between border-x-0 px-4 backdrop-blur-md transition-all duration-300 ease-in-out`,
			useJojoHeader().getScroll() ? '-translate-y-full' : 'translate-y-0',
		]"
	>
		<div class="h-full w-24 cursor-pointer py-2">
			<LogoBasicLogo></LogoBasicLogo>
		</div>
		<div class="hidden h-full w-[calc(100%-7rem)] items-center justify-center sm:flex">
			<HeaderMenuList></HeaderMenuList>
		</div>
		<div class="flex h-full w-fit items-center justify-between gap-x-2">
			<div
				class="hidden h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB] sm:flex"
			>
				<a href="https://www.facebook.com/profile.php?id=61565513711985" target="_blank" rel="noopener noreferrer">
					<img class="w-full" src="~/assets/image/facebook.png" alt="facebook" />
				</a>
			</div>
			<div
				class="hidden h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB] sm:flex"
			>
				<a href="https://github.com/359Steve" target="_blank" rel="noopener noreferrer">
					<img class="w-full" src="~/assets/image/github.png" alt="github" />
				</a>
			</div>
			<div class="flex items-center justify-between gap-x-2">
				<div
					class="flex h-8 w-8 items-center justify-center rounded-md bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB]"
					@click="$emit('changeTheme', $event)"
				>
					<img class="w-full" :src="selectTheme ? darkImg : lightImg" alt="" />
				</div>
				<div
					class="h-8 w-8 rounded-base bg-[white] p-2 shadow-md hover:cursor-pointer hover:bg-[#DBDBDB] sm:hidden"
					@click="drawer = !drawer"
				>
					<img class="h-full leading-6" src="~/assets/image/menu.png" alt="" />
				</div>
			</div>
		</div>
	</header>
</template>

<style lang="scss" scoped></style>
