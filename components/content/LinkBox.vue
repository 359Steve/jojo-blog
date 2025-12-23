<script lang="ts" setup>
const { title } = defineProps<{
	title: string;
}>();
</script>

<template>
	<div class="w-full">
		<h3 :id="title" class="mb-2 font-[600] text-inherit">
			{{ title }}
			<a :href="`#${title}`" aria-hidden="true" />
		</h3>
		<div>
			<span>
				<slot mdc-unwrap="p" />
			</span>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
