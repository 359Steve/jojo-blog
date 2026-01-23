<script lang="ts" setup>
import * as livephotoskit from 'livephotoskit';
const { augmentElementAsPlayer } = livephotoskit;

const { getPreviewSrc, getPreviewVisible, setPreviewVisible, getIsLive, getAlt } = usePreviewImg();
const livePhotoRef = useTemplateRef<HTMLDivElement>('livePhotoRef');

watch(
	() => getPreviewVisible(),
	(visible) => {
		if (!visible) return;

		nextTick(() => {
			const el = livePhotoRef.value;
			if (!el) return;

			augmentElementAsPlayer(el, {
				photoSrc: getPreviewSrc(),
				videoSrc: getIsLive(),
			});

			document.querySelector('.lpk-badge')?.addEventListener('click', (e) => e.stopImmediatePropagation(), true);
		});
	},
);
</script>

<template>
	<Transition name="fade" appear>
		<div v-if="getPreviewVisible()" class="glass fixed bottom-0 left-0 right-0 top-0 z-[500] transition-all"
			@click="setPreviewVisible(false)">
			<div class="absolute inset-0 z-[-1] bg-black/50" />
			<div v-if="getIsLive()" ref="livePhotoRef" class="h-full w-full" />
			<img v-else :src="getPreviewSrc()" :alt="getAlt()" loading="lazy" decoding="async"
				class="z-[2] h-full max-h-[100vh] w-full max-w-[100vw] object-contain">
		</div>
	</Transition>
</template>

<style lang="postcss" scoped>
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
