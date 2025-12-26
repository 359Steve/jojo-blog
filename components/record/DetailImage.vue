<script lang="ts" setup>
const { img_url, img_alt } = defineProps<{
	img_url: string;
	img_alt?: string;
}>();
</script>

<template>
	<img :src="img_url" class="h-full w-full rounded-base object-cover" :alt="img_alt" loading="lazy"
		decoding="async" />
</template>

<style lang="scss" scoped></style>
