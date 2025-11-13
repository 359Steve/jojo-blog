<script lang="ts" setup>
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
