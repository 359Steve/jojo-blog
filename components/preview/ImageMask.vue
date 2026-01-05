<script lang="ts" setup>
const { getPreviewSrc, getPreviewVisible, getAlt, setPreviewVisible } = usePreviewImg();
</script>

<template>
	<Transition name="fade" appear>
		<div v-if="getPreviewVisible()" class="glass fixed bottom-0 left-0 right-0 top-0 z-[500] transition-all"
			@click="setPreviewVisible(false)">
			<div class="absolute inset-0 z-[-1] bg-black/50" />
			<img :src="getPreviewSrc()" :alt="getAlt()" loading="lazy" decoding="async"
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
