<script lang="ts" setup>
const scrollY = ref<number>(0);

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
});
</script>

<template>
	<NuxtLayout name="jojomain">
		<template #page>
			<NuxtLayout name="mainbox">
				<template #childPage>
					<StarportCarrier>
						<NuxtPage />
					</StarportCarrier>
				</template>
			</NuxtLayout>
		</template>
	</NuxtLayout>
</template>

<style lang="scss" scoped></style>
