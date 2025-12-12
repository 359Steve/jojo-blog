<script setup lang="ts">
interface Props {
	author?: string;
	cite?: string;
	large?: boolean;
}

const { author, cite, large = false } = defineProps<Props>();

const quoteStyle = {
	borderLeft: '4px solid #e5e7eb',
	paddingLeft: '16px',
	margin: '24px 0',
	fontStyle: 'italic',
	fontSize: large ? '1.25rem' : '1rem',
	lineHeight: large ? '1.6' : '1.5',
	color: '#374151',
	position: 'relative',
};

const contentStyle = {
	quotes: '"\\201C""\\201D"',
	fontSize: 'inherit',
	lineHeight: 'inherit',
};

const authorStyle = {
	fontStyle: 'normal',
	fontSize: '0.875rem',
	color: '#6b7280',
	marginTop: '8px',
	textAlign: 'right',
};
</script>

<template>
	<blockquote :style="quoteStyle">
		<div :style="contentStyle">
			<slot />
		</div>
		<footer v-if="author || cite" :style="authorStyle">
			<span v-if="author">— {{ author }}</span>
			<cite v-if="cite">{{ cite }}</cite>
		</footer>
	</blockquote>
</template>
