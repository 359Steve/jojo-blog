<script lang="ts" setup>
import { StackColor } from '~/types/com-types';

definePageMeta({
	middleware: ['blog'],
});

const { currentBlog } = storeToRefs(useBlog());
const route = useRoute();
const id = computed(() => route.query.id);

const { data, pending, error } = await useAsyncData('publicQueryBlogDetail', async () => {
	if (currentBlog.value) {
		return {
			data: currentBlog.value,
		};
	}
	const response = await getPublicBlogDetail(Number(id.value));
	return {
		data: response.data,
	};
});

const blogItem = ref(data.value?.data || null);

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
		statusMessage: '博客不存在',
	});
}

onBeforeUnmount(() => {
	useBlog().setCurrentBlog(null);
});
</script>

<template>
	<main>
		<!-- 加载状态 -->
		<div v-if="pending" class="flex items-center justify-center py-20">
			<div class="border-primary h-8 w-8 animate-spin rounded-full border-b-2" />
		</div>

		<!-- 博客内容 -->
		<div v-else-if="blogItem">
			<!-- 返回按钮 -->
			<div class="mb-6">
				<button
					class="hover:text-primary flex items-center gap-2 text-sm text-gray-600 transition-colors duration-200"
					@click="goBack">
					<Icon icon="ri:arrow-left-line" />
					返回博客列表
				</button>
			</div>

			<!-- 博客头部 -->
			<AnimationRevealOnScroll ref="animationEl" animation-class="animate__fadeInDown"
				base-class="reactive mb-10">
				<div class="mb-6">
					<img v-if="blogItem.front_cover" :src="blogItem.front_cover" :alt="blogItem.title"
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
			</AnimationRevealOnScroll>

			<!-- 博客内容 -->
			<div class="prose prose-lg dark:prose-invert max-w-none">
				<MdPreview :model-value="blogItem.content" :theme="useJojoColorMode().darkMode.preference"
					preview-theme="github" code-theme="github" />

				<!-- 标签 -->
				<div v-if="blogItem.tags && blogItem.tags.length > 0" class="mt-8 flex flex-wrap gap-2">
					<span v-for="tag in blogItem.tags" :key="tag.tag.id" :style="{
						color: StackColor[tag.tag.name as keyof typeof StackColor] ?? '#409eff',
					}" class="text-secondary flex items-center justify-between gap-1 rounded-base bg-gray-100 px-3 py-1 text-sm shadow-sm dark:bg-gray-100/10">
						<Icon :icon="tag.tag.icon" width="24" />
						{{ tag.tag.name }}
					</span>
				</div>
			</div>
		</div>

		<!-- 错误状态 -->
		<div v-else class="py-20 text-center">
			<Icon icon="ri:error-warning-line" class="mb-4 text-4xl text-gray-400" />
			<p class="text-gray-500">博客不存在或已被删除</p>
			<button class="bg-primary hover:bg-primary/90 mt-4 rounded-base px-4 py-2 text-white transition-colors"
				@click="goBack">
				返回博客列表
			</button>
		</div>
	</main>
</template>

<style lang="postcss" scoped>
:deep(.md-editor) {
	@apply bg-transparent text-black dark:text-white;
}
</style>
