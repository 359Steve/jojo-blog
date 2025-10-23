<script lang="ts" setup>
const tableRefs = useTemplateRef<HTMLDivElement>('tableRefs');
const tableRefsHeight = ref<number>(0);

onMounted(() => {
	nextTick(() => {
		if (tableRefs.value) {
			tableRefsHeight.value = tableRefs.value?.offsetHeight || 0;
		}
	});
});
</script>

<template>
	<div ref="tableRefs" class="w-full flex-1">
		<slot :height="tableRefsHeight" />
	</div>
</template>

<style lang="scss" scoped></style>
