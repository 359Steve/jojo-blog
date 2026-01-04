<script setup lang="ts">
</script>

<template>
	<blockquote v-bind="$attrs" class="px-4 py-2 my-4 text-gray-400 dark:text-gray-600 italic">
		<slot mdc-unwrap="p" />
	</blockquote>
</template>

<style lang="postcss" scoped>
blockquote {
	@apply -ml-4 border-gray-300 dark:border-gray-600 border-l-[4px];
}
</style>
