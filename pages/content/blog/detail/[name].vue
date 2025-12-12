<script lang="ts" setup>
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
	return queryCollection('content').path(`/blog/${route.params.name}`).first();
});
</script>

<template>
	<ContentRenderer v-if="page" :value="page" />
</template>

<style lang="scss" scoped></style>
