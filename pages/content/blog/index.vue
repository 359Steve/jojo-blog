<script lang="ts" setup>
const { data, error } = await useAsyncData('blog-posts', () => {
	return queryCollection('blog')
		.order('date', 'DESC')
		.all();
});

const posts = computed(() => data.value || []);
const search = ref<string>('');

const toBlogMd = (path: string) => {
	navigateTo(`/content${path}`);
};
</script>

<template>
	<div
		class="glass relative mb-4 flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-[30px] border bg-white/40 shadow-md transition-all dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_10px_rgba(255,255,255,0.08)] sm:mb-8">
		<div class="flex h-10 w-full items-center justify-start gap-2 px-2 md:h-12 md:px-6">
			<div class="opacity-100">
				<Icon icon="ri:search-line" class="text-[24px] md:text-[32px]" />
			</div>

			<div class="relative flex-1 text-[16px] md:text-base">
				<input v-model="search" placeholder="输入搜索内容" class="w-full bg-transparent outline-none ring-0"
					type="text">
			</div>
		</div>
	</div>
	<div v-if="error || !posts || !posts.length" class="flex justify-center py-20">
		<ClientOnly>
			<TRexRunner />
		</ClientOnly>
	</div>
	<div v-else class="grid grid-cols-1 gap-4 lg:grid-cols-2">
		<div v-for="item in posts" :key="item.path"
			class="group glass flex cursor-pointer flex-col space-y-4 rounded-base border bg-white/40 p-2 shadow-md transition-all dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_10px_rgba(255,255,255,0.08)] sm:flex-row sm:space-x-4 sm:space-y-0"
			@click="toBlogMd(item.path)">
			<img :src="item.cover" alt="博客封面" loading="lazy" decoding="async"
				class="aspect-video max-h-[160px] w-full flex-shrink-0 rounded-base object-cover sm:h-[200px] sm:max-h-none sm:w-[200px]">
			<div class="flex min-h-0 flex-1 flex-col justify-between overflow-hidden">
				<div class="min-h-0 flex-1">
					<h4
						class="from-primary to-secondary mb-2 line-clamp-2 bg-gradient-to-r bg-clip-text text-lg font-black md:text-lg lg:text-lg">
						{{ item.title }}
					</h4>
					<p class="text-secondary line-clamp-3 max-w-xl text-sm font-normal md:text-sm lg:text-sm">
						{{ item.description }}
					</p>
				</div>
				<div class="mt-2 flex flex-wrap gap-2 md:mb-1">
					<span v-for="tag in item.tags" :key="tag.name" :style="{
						color: tag.color,
					}" class="text-secondary flex items-center justify-between gap-1 rounded-base bg-gray-100 px-2 py-1 text-xs shadow-sm dark:bg-gray-100/10 md:text-xs lg:text-xs"
						@click.stop="">
						<a :href="tag.url" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1">
							<Icon :icon="tag.icon" width="24" />
							{{ tag.name }}
						</a>
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
