<script lang="ts" setup>
useHead({
	titleTemplate(title) {
		return title ? `${title} %separator %siteName` : `%siteName`;
	},
	templateParams: {
		siteName: 'Josef',
		separator: '-',
	},
});
onBeforeUnmount(() => {
	// 还原数据
	useAdminMenu().reset();
	useVueStarport().setIsRound(false);
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
