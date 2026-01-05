<script setup lang="ts">
</script>

<template>
	<div class="relative my-6 w-full overflow-x-auto">
		<table class="
			w-max
			min-w-full
			table-fixed
			border-collapse
			border
			border-gray-300
			dark:border-gray-600
			text-sm
			text-center
		">
			<slot />
		</table>
	</div>

</template>

<style lang="postcss" scoped>
:deep(th),
:deep(td) {
	@apply border border-gray-300 dark:border-gray-600 px-4 py-2;
}

:deep(td:empty) {
	position: relative;
	min-height: 2.5rem;
}

:deep(td:empty)::before {
	content: '';
	position: absolute;
	inset: 0;
	background: linear-gradient(to bottom left,
			transparent 49%,
			rgba(156, 163, 175, 0.6) 50%,
			transparent 51%);
	pointer-events: none;
}
</style>
