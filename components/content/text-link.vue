<script setup lang="ts">
interface Props {
	href?: string;
	color?: string;
	underline?: boolean;
	external?: boolean;
}

const { href, color = '#3b82f6', underline = true, external = false } = defineProps<Props>();

const linkStyle = {
	color,
	textDecoration: underline ? 'underline' : 'none',
	cursor: 'pointer',
	transition: 'opacity 0.2s ease',
};
</script>

<template>
	<NuxtLink v-if="href && !external" :to="href" :style="linkStyle" class="hover:opacity-70">
		<slot />
	</NuxtLink>
	<a v-else-if="href && external" :href="href" target="_blank" rel="noopener noreferrer" :style="linkStyle"
		class="hover:opacity-70">
		<slot />
	</a>
	<span v-else :style="linkStyle" class="hover:opacity-70">
		<slot />
	</span>
</template>
