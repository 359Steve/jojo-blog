<script lang="ts" setup>
const tableRefs = useTemplateRef<HTMLDivElement>('tableRefs');
const tableRefsHeight = ref<number>(0);

const updateHeight = () => {
	if (tableRefs.value) {
		tableRefsHeight.value = tableRefs.value.offsetHeight;
	}
};

onMounted(async () => {
	await nextTick();
	updateHeight();
});
</script>

<template>
	<div ref="tableRefs" class="w-full flex-1">
		<slot :height="tableRefsHeight" />
	</div>
</template>

<style lang="scss" scoped></style>
