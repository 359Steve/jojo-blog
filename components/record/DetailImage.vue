<script lang="ts" setup>
const { img_url, img_alt } = defineProps<{
	img_url: string;
	img_alt?: string;
}>();
</script>

<template>
	<img class="h-full w-full rounded-base object-cover" :src="img_url" :alt="img_alt" />
</template>

<style lang="scss" scoped></style>
