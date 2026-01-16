<script lang='ts' setup>

</script>

<template>
	<code v-bind="$attrs"
		class="px-1.5 py-0.5 text-sm font-mono font-medium rounded-md inline-block border border-blog-ui-border-muted bg-blog-ui-bg-muted">
		<slot mdc-unwrap="p"/>
	</code>
</template>

<style lang='scss' scoped></style>
