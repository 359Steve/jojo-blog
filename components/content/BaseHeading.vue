<script setup lang="ts">
const props = defineProps<{
	as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}>()
</script>

<template>
	<component :is="props.as" class="group relative scroll-mt-24">
		<slot />

		<a v-if="$attrs.id" :href="`#${$attrs.id}`" aria-hidden="true"
			class="absolute left-0 -ml-6 opacity-0 transition-opacity text-blog-tertiary xl:group-hover:opacity-100">
			#
		</a>
	</component>
</template>

<style lang="postcss" scoped></style>
