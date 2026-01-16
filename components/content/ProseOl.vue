<script lang='ts' setup>

</script>

<template>
	<ol v-bind="$attrs" class="my-4 pl-6 space-y-2">
		<slot mdc-unwrap="p" />
	</ol>
</template>

<style lang='postcss' scoped>
:deep(.prose-li) {
	@apply list-decimal marker:text-black dark:marker:text-white
}
</style>
