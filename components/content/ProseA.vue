<script setup lang="ts">
const props = defineProps<{
	href: string
	title?: string
	target?: string
	rel?: string
}>()

const isExternal = computed(() => {
	if (props.target) return props.target

	return /^(https?:|mailto:|tel:)/.test(props.href)
		? '_blank'
		: undefined
})

const computedRel = computed(() => {
	if (props.rel) return props.rel
	return isExternal.value ? 'noopener noreferrer' : undefined
})
</script>

<template>
	<a :href="props.href" :title="props.title" :target="isExternal" :rel="computedRel" v-bind="$attrs"
		class="font-bold text-[#222] dark:text-[#ddd] border-b border-gray-300 dark:border-gray-500 hover:border-gray-500 dark:hover:border-gray-300 transition-all">
		<slot mdc-unwrap="p" />
	</a>
</template>
