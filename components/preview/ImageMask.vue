<script lang="ts" setup>
const { src = '', alt = '' } = defineProps<{
	src: string;
	alt: string;
}>();

const srcArr = computed(() => {
	return src.includes(',') ? src.split(',') : [src];
});

const currentIndex = ref(0);

const prevImage = () => {
	if (currentIndex.value > 0) {
		currentIndex.value--;
	}
};

const nextImage = () => {
	if (currentIndex.value < srcArr.value.length - 1) {
		currentIndex.value++;
	}
};
</script>

<template>
	<div class="fixed bottom-0 left-0 right-0 top-0 z-[500] backdrop-blur-md">
		<button v-if="currentIndex > 0"
			class="absolute left-1 top-1/2 flex translate-y-[-50%] items-center rounded-md font-semibold"
			@click.stop="prevImage">
			<Icon icon="ri:arrow-left-s-line" width="32" height="32" />
		</button>
		<div class="h-full w-full px-6">
			<img :src="srcArr[currentIndex]" :alt="alt"
				class="z-[2] h-full max-h-[100vh] w-full max-w-[100vw] object-contain sm:aspect-square">
		</div>
		<button v-if="currentIndex < srcArr.length - 1"
			class="absolute right-1 top-1/2 flex translate-y-[-50%] items-center rounded-md font-semibold"
			@click.stop="nextImage">
			<Icon icon="ri:arrow-right-s-line" width="32" height="32" />
		</button>
	</div>
</template>

<style lang="scss" scoped></style>
