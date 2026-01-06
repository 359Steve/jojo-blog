<script setup lang="ts"></script>

<template>
	<li class="prose-li">
		<slot mdc-unwrap="p" />
	</li>
</template>

<style scoped lang="postcss">
.prose-li {
	@apply list-disc leading-7 text-[#555] dark:text-[#bbb];
}
</style>
