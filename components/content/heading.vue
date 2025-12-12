<script setup lang="ts">
interface Props {
	level?: 1 | 2 | 3 | 4 | 5 | 6;
	gradient?: boolean;
	color?: string;
	align?: 'left' | 'center' | 'right';
}

const { level = 2, gradient = false, color, align = 'left' } = defineProps<Props>();

const headingStyles = {
	1: { fontSize: '2.5rem', fontWeight: '800', lineHeight: '1.2' },
	2: { fontSize: '2rem', fontWeight: '700', lineHeight: '1.3' },
	3: { fontSize: '1.5rem', fontWeight: '600', lineHeight: '1.4' },
	4: { fontSize: '1.25rem', fontWeight: '600', lineHeight: '1.4' },
	5: { fontSize: '1.125rem', fontWeight: '500', lineHeight: '1.5' },
	6: { fontSize: '1rem', fontWeight: '500', lineHeight: '1.5' },
};

const computedStyle = {
	...headingStyles[level],
	textAlign: align,
	margin: '1.5em 0 0.5em 0',
	...(gradient && {
		background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		backgroundClip: 'text',
	}),
	...(color && !gradient && { color }),
};
</script>

<template>
	<component :is="`h${level}`" :style="computedStyle">
		<slot />
	</component>
</template>
