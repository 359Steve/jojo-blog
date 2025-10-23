<script lang="ts" setup>
const mdItem = useTemplateRef<HTMLDivElement>('MdItem');
const mdHeight = computed(() => {
	return mdItem.value ? mdItem.value.offsetHeight : 0;
});
</script>

<template>
	<div ref="MdItem" class="w-full flex-1">
		<slot :height="mdHeight" />
	</div>
</template>

<style lang="scss" scoped></style>
