<script lang="ts" setup>
const { img_url, img_alt } = defineProps<{
	img_url: string;
	img_alt?: string;
}>();
</script>

<template>
	<img v-lazy="img_url" class="h-full w-full rounded-base object-cover" :alt="img_alt">
</template>

<style lang="scss" scoped></style>
