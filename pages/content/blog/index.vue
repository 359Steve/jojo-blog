<script lang="ts" setup>
const { data, error, pending } = await useAsyncData('blog-posts', () => {
	return queryCollection('content')
		.where('id', 'LIKE', 'content/blog/%')
		.select('title', 'id', 'description', 'meta')
		.order('meta', 'DESC')
		.all();
});

const posts = computed(() => data.value || []);

const toBlogMd = (id: string) => {
	const fileName = id.replace(/^content\/blog\/(.*)\.md$/, '$1');
	navigateTo(`/content/blog/${fileName}`);
};
</script>

<template>
	<div v-if="pending" class="flex justify-center py-20">
		<div class="text-gray-500">加载中...</div>
	</div>
	<div v-else-if="error" class="flex justify-center py-20">
		<div class="text-red-500">加载失败: {{ error.message }}</div>
	</div>
	<div v-else-if="posts.length === 0" class="flex justify-center py-20">
		<div class="text-gray-500">暂无文章</div>
	</div>
	<div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		<div v-for="post in posts" :key="post.id" class="card overflow-hidden rounded-md border shadow-sm"
			@click="toBlogMd(post.id)">
			<NuxtImg :src="post.meta.cover as string" loading="lazy" :alt="post.title"
				class="h-40 w-full object-cover" />
			<div class="p-4">
				<h2 class="mb-2 text-lg font-bold">{{ post.title }}</h2>
				<p class="mb-2 text-gray-600">{{ post.description }}</p>
				<div class="flex flex-wrap gap-2">
					<span v-for="tag in post.meta.tags as string[]" :key="tag"
						class="rounded bg-blue-100 px-2 py-1 text-xs text-blue-800">
						{{ tag }}
					</span>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.posts-list {
	margin: 0 auto;
	padding: 20px;
}

.post-item {
	padding: 24px;
	border-bottom: 1px solid #e5e7eb;

	&:last-child {
		border-bottom: none;
	}
}

.post-title {
	color: #1f2937;
	text-decoration: none;
	font-size: 1.5rem;
	font-weight: 600;

	&:hover {
		color: #3b82f6;
	}
}

.post-meta {
	display: flex;
	gap: 16px;
	margin-top: 8px;
	font-size: 0.875rem;
	color: #6b7280;
}

.post-description {
	margin-top: 12px;
	color: #4b5563;
	line-height: 1.6;
}
</style>
