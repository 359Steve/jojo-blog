<script lang="ts" setup>
const route = useRoute();
const parentId = computed(() => route.query.parentId);
const id = computed(() => route.query.id);

if (!id.value) {
	throw createError({ statusCode: 500, statusMessage: '出错了！' });
}

const srcList = reactive<string[]>([
	'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
	'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
	'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
	'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg'
]);
</script>

<template>
	<div class="w-full">
		<RecordHeader />
		<Starport :id="`record-image-my-id${parentId}`" :port="`my-id${parentId}`"
			class="relative flex h-[10rem] cursor-pointer items-center justify-center overflow-hidden rounded-base sm:h-[12rem] md:h-[14rem] lg:h-[16rem] xl:h-[16rem] 2xl:h-[16rem]">
			<RecordDetailImage class="duration-1200 transition-all" />
		</Starport>
		<div class="w-full py-4 sm:py-8">
			<AnimationRevealOnScroll animation-class="animate__fadeInDown"
				base-class="mb-4 sm:mb-6 text-center font-extrabold text-lg text-gray-500">
				从Webpack转向Vite，提升开发效率
			</AnimationRevealOnScroll>
			<AnimationRevealOnScroll animation-class="animate__fadeInDown" base-class="text-center text-gray-400">
				A software engineer walks into a job interview. The interviewer says, “We’re looking for someone who can
				handle
				pressure. Can you give me an example of a time you worked under pressure?” The engineer thinks for a
				second and
				says, “Well… once I deployed to production on a Friday… with no backup… during a team meeting… while the
				CTO was
				watching… and the internet went down.” The interviewer, wide-eyed, asks, “What happened next?” The
				engineer
				shrugs, “I updated my LinkedIn.”
			</AnimationRevealOnScroll>
		</div>
		<div class="mt-4 w-full py-8">
			<div class="m-auto flex w-[60%] items-center">
				<div class="h-px flex-grow bg-gray-300"></div>
				<span class="mx-4 text-sm text-gray-500">照片墙</span>
				<div class="h-px flex-grow bg-gray-300"></div>
			</div>
			<div
				class="scroll-wrap mt-4 flex aspect-video grid-cols-4 grid-rows-2 flex-row gap-4 overflow-x-auto sm:mt-8 sm:grid sm:overflow-visible">
				<div v-for="(item, index) in srcList" :key="item"
					class="flex-shrink-0 overflow-hidden sm:row-span-1 sm:w-full" :class="[
						index < 2 ? 'sm:col-span-2' : 'sm:row-start-2',
						index === 1 ? 'sm:col-start-3 sm:row-span-2' : '',
						index === 2 ? 'sm:col-start-1' : '',
						index === 3 ? 'sm:col-start-2' : ''
					]">
					<ElImage :src="item" :zoom-rate="1.2" :max-scale="7" :min-scale="0.2" :preview-src-list="srcList"
						show-progress fit="cover" />
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="postcss" scoped>
:deep(.el-image) {
	@apply h-full w-full rounded-base object-cover;
}

.scroll-wrap::-webkit-scrollbar {
	height: 6px;
}

.scroll-wrap::-webkit-scrollbar-thumb {
	border-radius: 2px;
	background-color: #575656;
}
</style>
