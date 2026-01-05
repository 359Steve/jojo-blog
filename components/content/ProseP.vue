<script setup lang="ts">
</script>

<template>
	<p v-bind="$attrs" class="
			my-3
			leading-7
			text-[#555]
			dark:text-[#bbb]
		">
		<slot mdc-unwrap="p" />
	</p>
</template>

<style lang="scss" scoped></style>
