<script lang="ts" setup>
const route = useRoute();

const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('content')
		.path(route.path.replace(/^\/content/, ''))
		.first();
});
</script>

<template>
	<div class="w-full">
		<ContentRenderer v-if="page" :value="page" />
	</div>
</template>

<style lang="scss" scoped></style>
