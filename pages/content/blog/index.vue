<script lang="ts" setup>
const { data: posts } = await useAsyncData('blog-posts', () => {
	return queryCollection('content')
		.where('id', 'LIKE', 'content/blog/%')
		.select('id', 'title', 'description', 'meta')
		.all();
});

const toBlogMd = (id: string) => {
	const fileName = id.replace(/^content\/blog\/(.*)\.md$/, '$1');
	navigateTo(`/content/blog/detail/${fileName}`);
};
</script>

<template>
	<div>
		<div v-if="posts && posts.length > 0" class="posts-list">
			<article v-for="post in posts" :key="post.id" class="post-item" @click="toBlogMd(post.id)">
				<h2 class="text-[24px] font-bold">
					{{ post.title }}
				</h2>
				<div class="post-meta">
					<time v-if="post.meta?.date">
						{{ new Date(post.meta.date as string | number).toLocaleDateString('zh-CN') }}
					</time>
				</div>
				<p v-if="post.description" class="post-description">
					{{ post.description }}
				</p>
			</article>
		</div>

		<div v-else>
			<p>没有找到博客文章</p>
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
