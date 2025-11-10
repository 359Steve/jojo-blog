<script lang="ts" setup>
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';

const pageSize = ref<number>(20);
const pageNumber = ref<number>(1);
const { data } = await useAsyncData('publicQueryBlogList', () =>
	getPublicBlogList({
		pageNumber: pageNumber.value,
		pageSize: pageSize.value,
	}),
);

const blogList = ref<BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>[]>(data.value?.data?.records || []);
const search = ref<string>('');
const isLoading = ref<boolean>(false);
const hasMore = ref<boolean>(true);

const toDetail = (blog: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>): void => {
	useBlog().setCurrentBlog(blog);
	navigateTo({ path: '/blog/detail', query: { id: blog.id } });
};

// 搜索防抖函数
const debouncedSearch = useDebounceFn(async (keyword: string) => {
	if (search.value !== keyword || isLoading.value) return;

	isLoading.value = true;
	try {
		const res = await getPublicBlogList({
			pageNumber: 1,
			pageSize: pageSize.value,
			keyword: keyword || undefined,
		});

		if (search.value === keyword) {
			blogList.value = res.data?.records || [];
			pageNumber.value = 1;
			hasMore.value = (res.data?.records || []).length >= pageSize.value;
		}
	} finally {
		isLoading.value = false;
	}
}, 500);

const clearSearch = async () => {
	if (isLoading.value) return;

	isLoading.value = true;
	try {
		const res = await getPublicBlogList({
			pageNumber: 1,
			pageSize: pageSize.value,
		});
		blogList.value = res.data?.records || [];
		pageNumber.value = 1;
		hasMore.value = true;
	} finally {
		isLoading.value = false;
	}
};

// 搜索功能
watch(search, async (newSearch, oldSearch) => {
	if (!newSearch && oldSearch) {
		clearSearch();
	} else if (newSearch) {
		debouncedSearch(newSearch);
	}
});

// 滚动加载更多防抖函数
const debouncedLoadMore = useDebounceFn(async () => {
	if (isLoading.value || !hasMore.value) return;

	isLoading.value = true;
	try {
		const res = await getPublicBlogList({
			pageNumber: pageNumber.value + 1,
			pageSize: pageSize.value,
			keyword: search.value || undefined,
		});

		if (res.data?.records && res.data.records.length > 0) {
			blogList.value = blogList.value.concat(res.data.records);
			pageNumber.value += 1;
			hasMore.value = res.data.records.length >= pageSize.value;
		} else {
			hasMore.value = false;
		}
	} finally {
		isLoading.value = false;
	}
}, 300);

onMounted(() => {
	nextTick(() => {
		const { y } = useWindowScroll();

		watch(y, () => {
			const scrollTop = y.value;
			const windowHeight = window.innerHeight;
			const documentHeight = document.documentElement.scrollHeight;

			if (scrollTop + windowHeight >= documentHeight - 200) {
				debouncedLoadMore();
			}
		});
	});
});
</script>

<template>
	<AnimationRevealOnScroll animation-class="animate__fadeInDown"
		base-class="mb-4 sm:mb-8 overflow-hidden rounded-base">
		<ElInput v-model="search" placeholder="请输入搜索关键字" size="large" />
	</AnimationRevealOnScroll>
	<div class="w-full">
		<div class="grid grid-cols-1 gap-10 lg:grid-cols-2">
			<AnimationRevealOnScroll v-for="item in blogList" :key="item.id" animation-class="'animate__fadeInDown'"
				base-class="`
                    cursor-pointer
                    group
                    flex
                    flex-col
                    sm:flex-row
                    space-y-4
                    sm:space-y-0
                    sm:space-x-4
                    hover:bg-gray-50
                    dark:hover:bg-gray-100/10
                    rounded-base
                    transition
                    duration-200
                    p-2
                    shadow-lg
                    dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)]
                    h-auto
                    max-h-[280px]`" @click="toDetail(item)">
				<img alt="thumbnail" loading="lazy" decoding="async" data-nimg="1"
					class="aspect-square w-full flex-shrink-0 rounded-base object-cover sm:h-[200px] sm:w-[200px]"
					:src="item.front_cover">
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
						}" class="text-secondary flex items-center justify-between gap-1 rounded-base bg-gray-100 px-2 py-1 text-xs shadow-sm dark:bg-gray-100/10 md:text-xs lg:text-xs">
							<Icon :icon="tag.tag.icon" width="24" />
							{{ tag.tag.name }}
						</span>
					</div>
				</div>
			</AnimationRevealOnScroll>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-input) {
	@apply h-full w-full;
}

:deep(.el-input__wrapper) {
	@apply rounded-base bg-white px-3 py-2 shadow-lg dark:bg-gray-100/10 sm:shadow-none;
}

:deep(.el-input__inner) {
	@apply text-[16px];
}
</style>
