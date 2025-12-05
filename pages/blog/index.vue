<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';

const search = ref('');
const pageNumber = ref(1);
const pageSize = ref(20);

const debouncedSearch = useDebounce(search, 300);

watch(debouncedSearch, () => {
	pageNumber.value = 1;
});
const { data } = await useAsyncData(
	'publicQueryBlogList',
	() =>
		getPublicBlogList({
			pageNumber: pageNumber.value,
			pageSize: pageSize.value,
			keyword: debouncedSearch.value,
		}),
	{
		watch: [pageNumber],
	},
);
const blogList = ref<NonNullable<ReturnFunction<typeof getPublicBlogList>['data']>['records']>(
	data.value?.data?.records || [],
);
const total = ref<number>(data.value?.data?.total || 0);

watch(data, (newData) => {
	if (newData?.data?.records) {
		if (pageNumber.value === 1) {
			blogList.value = newData.data.records;
			total.value = newData.data?.total || 0;
		} else {
			blogList.value = blogList.value.concat(newData.data.records);
		}
	}
});

const toDetail = (blog: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>): void => {
	useBlog().setCurrentBlog(blog);
	navigateTo({ path: '/blog/detail', query: { id: blog.id } });
};

// 滚动加载更多防抖函数
const debouncedLoadMore = useDebounceFn(async () => {
	pageNumber.value += 1;
}, 300);

onMounted(() => {
	nextTick(() => {
		const { y } = useWindowScroll();

		watch(y, () => {
			const scrollTop = y.value;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			if (scrollTop + windowHeight >= documentHeight - 200 && total.value > blogList.value.length) {
				debouncedLoadMore();
			}
		});
	});
});
</script>

<template>
	<div
		class="relative mb-4 flex h-full w-full flex-col items-center justify-start overflow-hidden rounded-[30px] border bg-white/40 shadow-md backdrop-blur-md transition-all dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_10px_rgba(255,255,255,0.08)] sm:mb-8">
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
	<div class="w-full">
		<div v-if="blogList.length > 0" class="grid grid-cols-1 gap-4 lg:grid-cols-2">
			<div v-for="item in blogList" :key="item.id"
				class="group flex cursor-pointer flex-col space-y-4 rounded-base border bg-white/40 p-2 shadow-md backdrop-blur-md transition-all dark:border-white/10 dark:bg-white/5 dark:shadow-[0_0_10px_rgba(255,255,255,0.08)] sm:flex-row sm:space-x-4 sm:space-y-0"
				@click="toDetail(item)">
				<img v-lazy="item.front_cover" alt="thumbnail" loading="lazy" decoding="async" data-nimg="1"
					class="aspect-video max-h-[160px] w-full flex-shrink-0 rounded-base object-cover sm:h-[200px] sm:max-h-none sm:w-[200px]">
				<div class="flex min-h-0 flex-1 flex-col justify-between overflow-hidden">
					<div class="min-h-0 flex-1">
						<h4
							class="from-primary to-secondary mb-2 line-clamp-2 bg-gradient-to-r bg-clip-text text-lg font-black md:text-lg lg:text-lg">
							{{ item.title }}
						</h4>
						<p class="text-secondary line-clamp-3 max-w-xl text-sm font-normal md:text-sm lg:text-sm">
							{{ item.subtitle }}
						</p>
					</div>
					<div class="mt-2 flex flex-wrap gap-2 md:mb-1">
						<span v-for="tag in item.tags" :key="tag.tag.id" :style="{
							color: tag.tag.color,
						}" class="text-secondary flex items-center justify-between gap-1 rounded-base bg-gray-100 px-2 py-1 text-xs shadow-sm dark:bg-gray-100/10 md:text-xs lg:text-xs"
							@click.stop="">
							<a :href="tag.tag.url" target="_blank" rel="noopener noreferrer"
								class="flex items-center gap-1">
								<Icon :icon="tag.tag.icon" width="24" />
								{{ tag.tag.name }}
							</a>
						</span>
					</div>
				</div>
			</div>
		</div>
		<ClientOnly v-else>
			<TRexRunner />
		</ClientOnly>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-input) {
	@apply h-full w-full;
}

:deep(.el-input__wrapper) {
	@apply rounded-base bg-white px-3 py-2 shadow-none dark:bg-gray-100/10;
}

:deep(.el-input__inner) {
	@apply text-[16px];
}
</style>
