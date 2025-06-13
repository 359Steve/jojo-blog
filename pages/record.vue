<script lang="ts" setup>
definePageMeta({
	middleware: ['record']
});

onMounted(() => {
	useVueStarport().setIsRound(true);
});

onBeforeUnmount(() => {
	useVueStarport().setIsRound(false);
});
</script>

<template>
	<div class="w-full pt-4 sm:pt-8">
		<NuxtPage />
	</div>
</template>

<style lang="postcss" scoped></style>
