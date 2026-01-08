<script setup lang="ts">
</script>

<template>
	<div v-bind="$attrs" class="
			my-3
			leading-7
			text-blog-body
		">
		<slot mdc-unwrap="p" />
	</div>
</template>

<style lang="scss" scoped></style>
