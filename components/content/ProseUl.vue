<script setup lang="ts"></script>

<template>
	<ul class="prose-ul">
		<slot />
	</ul>
</template>

<style scoped lang="postcss">
.prose-ul {
	@apply my-4 pl-6 list-disc space-y-2;
}
</style>
