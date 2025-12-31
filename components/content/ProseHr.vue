<script setup lang="ts">
</script>

<template>
	<hr v-bind="useAttrs">
</template>

<style lang="postcss" scoped>
hr {
	@apply w-[50px] my-8 mx-auto border-t border-gray-300 dark:border-gray-600;
}
</style>
