<script lang="ts" setup>
useHead({
	title: '博客详情',
});

definePageMeta({
	validate(route) {
		if (!route.query.id) {
			createError({
				statusCode: 500,
				data: {
					message: '出错了！',
				},
			});
		}
		return true;
	},
});

const { currentBlog } = storeToRefs(useBlog());
const route = useRoute();
const id = computed(() => (route.params as { id?: string }).id);

const { data, error } = await useAsyncData('publicQueryBlogDetail', async () => {
	if (currentBlog.value) {
		return {
			data: currentBlog.value,
		};
	}
	return getPublicBlogDetail(Number(id.value));
});

const blogItem = computed<ReturnFunction<typeof getPublicBlogDetail>['data']>(() => data.value?.data || null);

// 格式化发布时间
const formatDate = (dateString: string) => {
	if (!dateString) return '';
	const date = new Date(dateString);
	return date.toLocaleDateString('zh-CN', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});
};

// 返回博客列表
const goBack = () => {
	navigateTo('/blog');
};

// 错误处理
if (error.value) {
	throw createError({
		statusCode: 404,
		message: '博客不存在',
	});
}

onMounted(() => {
	nextTick(async () => {
		await addBlogView(Number(id.value));
	});
});

onBeforeUnmount(() => {
	useBlog().setCurrentBlog(null);
});
</script>

<template>
	<main>
		<!-- 博客内容 -->
		<div v-if="blogItem">
			<!-- 返回按钮 -->
			<div class="mb-6 flex items-center justify-between">
				<button
					class="hover:text-primary flex items-center gap-1 text-sm text-gray-600 transition-colors duration-200 focus:outline-none"
					@click="goBack">
					<Icon icon="ri:arrow-left-s-line" width="24" />
					<span>CD ..</span>
				</button>
				<span class="text-[16px] text-gray-600">浏览量：{{ blogItem.views }}</span>
			</div>

			<!-- 博客头部 -->
			<div class="reactive mb-10">
				<div class="mb-6">
					<img v-if="blogItem.front_cover" v-lazy="blogItem.front_cover" :alt="blogItem.title"
						class="mb-6 h-64 w-full rounded-base object-cover md:h-80">
				</div>

				<h1 class="mb-4 bg-gradient-to-r bg-clip-text text-xl font-black sm:mb-8 md:text-2xl lg:text-4xl">
					{{ blogItem.title }}
				</h1>

				<h3 class="text-secondary mb-4 text-sm font-normal sm:text-base">
					{{ blogItem.subtitle }}
				</h3>

				<!-- 博客元信息 -->
				<div class="mb-6 flex flex-wrap items-center gap-4 text-sm text-gray-500">
					<span v-if="blogItem.created_at" class="flex items-center gap-1">
						<Icon icon="ri:calendar-line" class="mr-1" />
						{{ formatDate(blogItem.created_at) }}
					</span>
					<span v-if="blogItem.updated_at && blogItem.updated_at !== blogItem.created_at"
						class="flex items-center gap-1">
						<Icon icon="ri:edit-line" class="mr-1" />
						更新于 {{ formatDate(blogItem.updated_at) }}
					</span>
				</div>
			</div>

			<!-- 博客内容 -->
			<div class="prose prose-lg dark:prose-invert max-w-none">
				<MdPreview :model-value="blogItem.content" :theme="useJojoColorMode().darkMode.preference"
					preview-theme="github" code-theme="github" />

				<!-- 标签 -->
				<div v-if="blogItem.tags && blogItem.tags.length > 0" class="mt-8 flex flex-wrap gap-2">
					<span v-for="tag in blogItem.tags" :key="tag.tag.id" :style="{
						color: tag.tag.color,
					}" class="text-secondary flex items-center justify-between gap-1 rounded-base bg-gray-100 px-3 py-1 text-sm shadow-sm dark:bg-gray-100/10">
						<a :href="tag.tag.url" target="_blank" rel="noopener noreferrer"
							class="flex items-center gap-1">
							<Icon :icon="tag.tag.icon" width="24" />
							{{ tag.tag.name }}
						</a>
					</span>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="postcss" scoped>
:deep(.md-editor) {
	@apply bg-transparent text-black dark:text-white;
}
</style>
