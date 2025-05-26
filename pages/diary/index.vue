<script lang="ts" setup>
const id = ref<string>('preview-only');
const scrollElement = ref<HTMLElement | null>(null);
const mdText = ref<string>('');

const res = await useGet<any, { content: string }>('/md');
if (res.code === 200) {
	mdText.value = res.data.content;
}

if (import.meta.client) {
	scrollElement.value = document.documentElement;
}
</script>

<template>
	<div class="block w-full mobile-pad:grid mobile-pad:grid-cols-3 mobile-pad:gap-4">
		<div class="w-full p-4">
			<div class="relative mobile-pad:sticky mobile-pad:top-12">
				<MdCatalog :editorId="id" :scrollElement="scrollElement!" />
			</div>
		</div>

		<div class="w-full p-4 mobile-pad:col-span-2">
			<MdPreview
				:id="id"
				:modelValue="mdText"
				preview-theme="github"
				:theme="useJojoColorMode().getDarkMode().preference"
			/>
		</div>
	</div>
</template>

<style lang="postcss" scoped></style>
