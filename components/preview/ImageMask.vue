<script lang="ts" setup>
const { src = '', alt = '' } = defineProps<{
	src: string;
	alt: string;
}>();
const isPreviewVisible = defineModel<boolean>('preview');
</script>

<template>
	<Transition name="fade" appear>
		<div v-if="isPreviewVisible" class="glass fixed bottom-0 left-0 right-0 top-0 z-[500] transition-all"
			@click="isPreviewVisible = false">
			<div class="absolute inset-0 z-[-1] bg-black/50" />
			<img v-lazy="src" :alt="alt"
				class="z-[2] h-full max-h-[100vh] w-full max-w-[100vw] object-contain sm:aspect-square">
		</div>
	</Transition>
</template>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
	transform: scale(0.999);
}

.fade-enter-to,
.fade-leave-from {
	opacity: 1;
	transform: scale(1);
}
</style>
