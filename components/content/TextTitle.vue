<script setup lang="ts"></script>

<template>
	<div class="w-full">
		<slot />
	</div>
</template>

<style scoped lang="postcss">
:deep(h2),
:deep(h3),
:deep(h4),
:deep(h5),
:deep(h6) {
	@apply relative text-xl font-[600] my-3 leading-[1.6];
}

:deep(h2 > a),
:deep(h3 > a),
:deep(h4 > a) {
	@apply no-underline text-inherit;
}

:deep(h2 > a::before),
:deep(h3 > a::before),
:deep(h4 > a::before) {
	content: "#";
	@apply absolute left-0 -ml-5 opacity-0 transition-opacity font-normal text-gray-400;
}

:deep(h2:hover > a::before),
:deep(h3:hover > a::before),
:deep(h4:hover > a::before) {
	@apply opacity-100
}
</style>
