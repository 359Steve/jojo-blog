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
		<div v-if="isMenu" class="group fixed left-6 top-20 hidden xl:block">
			<div class="group mb-2 cursor-pointer">
				<Icon icon="ri:menu-2-fill"
					class="text-2xl text-gray-300 group-hover:text-gray-500 dark:text-gray-500 dark:group-hover:text-gray-300" />
			</div>
			<ContentMenu :menu-list="page?.body.toc?.links || []" />
		</div>
		<h1 class="text-3xl font-bold">{{ page?.title }}</h1>
		<p class="my-2 text-gray-300 dark:text-gray-500">发布于 {{ getDate }}</p>
		<ProseHr class="border-none" />
		<ContentRenderer v-if="page" :key="page.id" :value="page" />
		<div class="mt-10 flex w-fit items-center gap-1 text-gray-400" @click="useRouter().back()">
			<Icon icon="mdi:chevron-right" class="text-[1.5rem]" />
			<span class="cursor-pointer border-b border-gray-400">cd . .</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
