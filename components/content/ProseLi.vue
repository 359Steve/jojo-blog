<script setup lang="ts"></script>

<template>
	<li v-bind="$attrs" class="leading-7 text-blog-body prose-li">
		<slot mdc-unwrap="p" />
	</li>
</template>

<style scoped lang="postcss"></style>
