<script setup lang="ts">
import Spring from '~/assets/image/spring.png';
import Snowflake from '~/assets/image/snowflake.png';
import Summer from '~/assets/image/summer.png';
import Autumn from '~/assets/image/autumn.png';

const canvas = useTemplateRef<HTMLElement>('canvas');
interface ImageOptions {
	url: string;
	count: number;
	maxSize: number;
}
const { getWeather } = useWeather();
const weather = computed(() => getWeather());
const { power } = weather.value;

const images = ref<ImageOptions[]>([
	{ url: Spring, count: power ? power * 10 : 10, maxSize: 30 },
	{ url: Summer, count: power ? power * 5 : 5, maxSize: 40 },
	{ url: Autumn, count: power ? power * 10 : 10, maxSize: 40 },
	{ url: Snowflake, count: power ? power * 100 : 100, maxSize: 15 },
]);

const currentImageUrl = computed(() => {
	const month = new Date().getMonth() + 1;
	switch (month) {
		case 12:
		case 1:
		case 2:
			return images.value[3];
		case 3:
		case 4:
		case 5:
			return images.value[0];
		case 6:
		case 7:
		case 8:
			return images.value[1];
		case 9:
		case 10:
		case 11:
			return images.value[2];
		default:
			return images.value[0];
	}
});

onMounted(() => {
	nextTick(() => {
		if (canvas.value) {
			createSakuraFall({
				container: canvas.value,
				textureUrls: currentImageUrl.value,
				weather: weather.value,
			});
		}
	});
});
</script>

<template>
	<div ref="canvas" class="pointer-events-none fixed left-0 top-0 h-full w-full" />
</template>

<style lang="scss" scoped></style>
