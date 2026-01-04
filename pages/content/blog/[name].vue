<script lang="ts" setup>
const route = useRoute();
const name = computed(() => (route.params as { name: string }).name);

const { data: page, error } = await useAsyncData(route.path, async () => {
	const data = await queryCollection('blog')
		.path(`/blog/${name.value}`)
		.first();

	if (!data) {
		throw createError({
			statusCode: 404,
			message: '博客不存在',
		});
	}

	return data;
});

const isMenu = computed(() => {
	return page.value?.body.toc?.links && page.value.body.toc.links.length > 0;
});

if (error.value) {
	throw createError({
		statusCode: error.value.statusCode || 404,
		message: error.value.message || '获取博客失败',
	});
}

const getDate = computed(() => {
	if (page.value?.date) {
		const date = new Date(page.value.date);
		return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
	}
	return '';
});

useSeoMeta({
	title: page.value?.title || '博客页面',
	description: page.value?.description || '博客页面描述',
});
</script>

<template>
	<div class="w-full pt-10">
		<div v-if="isMenu" class="hidden xl:block fixed top-20 group left-6">
			<div class="cursor-pointer group mb-2">
				<Icon icon="ri:menu-2-fill"
					class="text-2xl text-gray-300 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-300" />
			</div>
			<ul class="hidden group-hover:block">
				<li v-for="(nav, index) in page?.body.toc?.links || []" :key="index">
					<a :href="`#${nav.id}`"
						class="text-[16px] text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors border-b border-gray-300 dark:border-gray-600 hover:border-gray-500 dark:hover:border-gray-400">
						{{ nav.text }}
					</a>
				</li>
			</ul>
		</div>
		<h1 class="text-3xl font-bold">{{ page?.title }}</h1>
		<p class="text-gray-300 dark:text-gray-500 my-2">
			发布于 {{ getDate }}
		</p>
		<ContentRenderer v-if="page" :value="page" class="prose" />
	</div>
</template>

<style lang="scss" scoped></style>
