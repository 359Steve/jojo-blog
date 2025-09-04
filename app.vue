<script lang="ts" setup>
const scrollY = ref<number>(0);

useHead({
	titleTemplate: (titleChunk) => {
		return titleChunk ? `${titleChunk} %separator %siteName` : '%siteName';
	},
	templateParams: {
		siteName: 'jojo',
		separator: '-'
	}
})

const handleScroll = () => {
	const scrollTop = window.scrollY || document.documentElement.scrollTop;
	useJojoHeader().setScroll(scrollTop > scrollY.value && scrollTop > useJojoHeader().getHeaderHeight());
	scrollY.value = scrollTop;
};

onMounted(() => {
	window.addEventListener('scroll', handleScroll);
});

onBeforeUnmount(() => {
	window.removeEventListener('scroll', handleScroll);
	// 还原数据
	useAdminMenu().reset();
});
</script>

<template>
	<div>
		<NuxtLayout>
			<NuxtPage />
		</NuxtLayout>
	</div>
</template>

<style lang="scss" scoped></style>
