<script setup lang="ts">
</script>

<template>
	<p v-bind="$attrs" class="
			my-3
			leading-7
			text-gray-600
			dark:text-gray-300
		">
		<slot mdc-unwrap="p" />
	</p>
</template>

<style lang="scss" scoped></style>
