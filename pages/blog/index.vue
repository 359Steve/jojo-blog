<script lang="ts" setup>
import type { AnimationRevealOnScroll, ElInput } from '~/.nuxt/components';
import type { CreateBlogDto } from '~/server/dto/CreateBlogDto';
import type { CreateTagDto } from '~/server/dto/CreateTagDto';
import { StackColor } from '~/types/com-types';

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
const inputShow = ref<boolean>(false);
const inputEl = ref<InstanceType<typeof ElInput> | null>(null);
const animationEl = ref<InstanceType<typeof AnimationRevealOnScroll> | null>(null);
const coincidence = ref<boolean>(true);

let parentBounds: ReturnType<typeof useElementBounding>;
let childBounds: ReturnType<typeof useElementBounding>;

const controlInput = (): void => {
	inputShow.value = !inputShow.value;
};

const toDetail = (blog: BlogWithTagsRep<CreateBlogDto, CreateTagDto, 'tags'>): void => {
	useBlog().setCurrentBlog(blog);
	navigateTo({ path: '/blog/detail', query: { id: blog.id } });
};

const isLeftAligned = computed(() => {
	if (!parentBounds || !childBounds) return false;
	return Math.abs(childBounds.left.value - parentBounds.left.value) < 1;
});

const onTransitionEnd = (event: TransitionEvent) => {
	if (event.propertyName !== 'transform') return;
	coincidence.value = isLeftAligned.value;
};

onMounted(() => {
	nextTick(() => {
		const input_el: HTMLElement = inputEl.value!.$el;
		parentBounds = useElementBounding(animationEl.value!.el);
		childBounds = useElementBounding(inputEl.value!.$el);
		input_el.addEventListener('transitionend', onTransitionEnd);
	});
});

onBeforeUnmount(() => {
	const input_el: HTMLElement = inputEl.value!.$el;
	input_el.removeEventListener('transitionend', onTransitionEnd);
});

watch(coincidence, () => {
	if (!coincidence.value) {
		inputEl.value?.focus();
	}
});
</script>

<template>
	<AnimationRevealOnScroll ref="animationEl" animation-class="animate__fadeInDown"
		base-class="reactive mb-10 flex items-center justify-between overflow-hidden rounded-base">
		<h1 class="bg-gradient-to-r bg-clip-text text-xl font-black md:text-2xl lg:text-4xl">
			What I've been working on
		</h1>
		<ElInput ref="inputEl" v-model="search" placeholder="Search" size="large"
			:class="inputShow ? 'translate-x-0' : 'translate-x-full'" @blur="inputShow = false">
			<template #append>
				<i class="ri-search-eye-line bg-gradient-to-r bg-clip-text text-xl font-black text-black md:text-2xl"
					@mousedown.prevent />
			</template>
		</ElInput>
		<div class="absolute right-0 flex aspect-square h-full cursor-pointer items-center justify-center rounded-base border-none shadow-none transition hover:bg-neutral-100 hover:text-black"
			:class="[
				// 显示隐藏控制
				inputShow && !coincidence ? 'hidden' : 'block',
				// 背景色逻辑
				inputShow || !coincidence ? 'bg-neutral-100 text-black' : '',
			]" @click="controlInput">
			<i class="ri-search-eye-line bg-gradient-to-r bg-clip-text text-xl font-black md:text-2xl" />
		</div>
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
                    dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)]`" @click="toDetail(item.id!)">
				<img alt="thumbnail" loading="lazy" decoding="async" data-nimg="1"
					class="w-full rounded-base object-cover sm:w-[200px]" :src="item.front_cover">
				<div class="flex flex-col justify-between">
					<div>
						<h4
							class="from-primary to-secondary bg-gradient-to-r bg-clip-text text-lg font-black md:text-lg lg:text-lg">
							{{ item.title }}
						</h4>
						<p class="text-secondary mt-2 max-w-xl text-sm font-normal md:text-sm lg:text-sm">
							{{ item.subtitle }}
						</p>
					</div>
					<div class="mt-2 flex space-x-2 md:mb-1 md:mt-0">
						<span v-for="tag in item.tags" :key="tag.tag.id"
							class="text-secondary rounded-base bg-gray-100 px-2 py-1 text-xs dark:bg-gray-100/10 md:text-xs lg:text-xs">
							<Icon :icon="tag.tag.icon" />
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
	@apply absolute left-0 top-0 h-full w-full transition-all delay-100;
}

:deep(.el-input-group__append) {
	@apply aspect-square h-full cursor-pointer rounded-bl-none rounded-br-base rounded-tl-none rounded-tr-base border-none bg-neutral-100 p-0 shadow-none;
}

:deep(.el-input__wrapper) {
	@apply rounded-bl-base rounded-br-none rounded-tl-base rounded-tr-none border-none bg-neutral-100 px-2 py-2 shadow-none ring-0 focus:outline-none focus:ring-0;
}

:deep(.el-input__wrapper:hover),
:deep(.el-input__wrapper.is-focus),
:deep(.el-input__wrapper:focus),
:deep(.el-input__wrapper.is-hover) {
	@apply border-none shadow-none outline-none ring-0;
}

:deep(.el-input__inner) {
	@apply border-none bg-transparent text-sm text-neutral-700 shadow-none ring-0 focus:outline-none focus:ring-0;
}
</style>
