<script lang="ts" setup>
const { src = '', alt = '' } = defineProps<{
	src: string;
	alt: string;
}>();
const isPreviewVisible = defineModel<boolean>('preview');
</script>

<template>
	<div v-if="isPreviewVisible" class="fixed bottom-0 left-0 right-0 top-0 z-[500] backdrop-blur-md"
		@click="isPreviewVisible = false">
		<div class="h-full w-full">
			<img :src="src" :alt="alt"
				class="z-[2] h-full max-h-[100vh] w-full max-w-[100vw] object-contain sm:aspect-square">
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
