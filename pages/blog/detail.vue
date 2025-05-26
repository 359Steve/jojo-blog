<script lang="ts" setup>
const route = useRoute();
const id = computed(() => route.query.id);
const content = ref<string>('');

if (!id.value) {
	throw createError({ statusCode: 500, statusMessage: '出错了！' });
}

const res = await useGet<any, { content: string }>('/md');
if (res.code === 200) {
	content.value = res.data.content;
}
</script>

<template>
	<main>
		<AnimationRevealOnScroll ref="animationEl" animation-class="animate__fadeInDown" base-class="reactive mb-10">
			<h1 class="mb-4 bg-gradient-to-r bg-clip-text text-xl font-black sm:mb-8 md:text-2xl lg:text-4xl">
				Tailwind Master Kit
			</h1>
			<h3 class="text-secondary text-sm font-normal sm:text-base">
				A beautiful and comprehensive Tailwind CSS components library for building modern websites and applications.
			</h3>
		</AnimationRevealOnScroll>
		<MdPreview
			:model-value="content"
			:theme="useJojoColorMode().darkMode.preference"
			preview-theme="github"
			code-theme="github"
		></MdPreview>
	</main>
</template>

<style lang="postcss" scoped>
:deep(.md-editor) {
	@apply bg-transparent text-black dark:text-white;
}
</style>
