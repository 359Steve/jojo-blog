<script lang="ts" setup>
const route = useRoute();
const { data: page, error } = await useAsyncData(route.path, async () => {
	const data = await queryCollection('content')
		.path(route.path.replace(/^\/content/, ''))
		.first();

	if (!data) {
		throw createError({
			statusCode: 404,
			message: '博客不存在',
		});
	}

	return data;
});

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode || 404,
		message: error.value.message || '获取博客失败',
	});
}

useSeoMeta({
	title: page.value?.title || '博客页面',
	description: page.value?.description || '博客页面描述',
});
</script>

<template>
	<div class="w-full">
		<ContentRenderer v-if="page" :value="page" />
	</div>
</template>

<style lang="scss" scoped></style>
