<script setup lang="ts">
interface Props {
	type?: 'inline' | 'block';
	color?: string;
	background?: boolean;
}

const { type = 'inline', color = '#ec4899', background = true } = defineProps<Props>();

const codeStyle = {
	fontFamily: 'Consolas, Monaco, "Courier New", monospace',
	fontSize: '0.9em',
	color,
	...(background && {
		backgroundColor: '#fdf2f8',
		padding: '2px 6px',
		borderRadius: '4px',
		border: '1px solid #f9a8d4',
	}),
};
</script>

<template>
	<component :is="type === 'block' ? 'div' : 'code'" :style="codeStyle">
		<slot />
	</component>
</template>
