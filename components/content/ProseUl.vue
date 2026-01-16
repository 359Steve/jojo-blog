<script setup lang="ts"></script>

<template>
	<ul v-bind="$attrs" class="my-4 pl-6 space-y-2">
		<slot mdc-unwrap="p" />
	</ul>
</template>

<style scoped lang="postcss">
:deep(.prose-li) {
	@apply list-disc marker:text-black dark:marker:text-white
}
</style>
