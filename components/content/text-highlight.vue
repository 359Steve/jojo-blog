<script setup lang="ts">
interface Props {
	color?: 'yellow' | 'blue' | 'green' | 'red' | 'purple';
	variant?: 'background' | 'underline' | 'border';
}

const { color = 'yellow', variant = 'background' } = defineProps<Props>();

const styles = {
	yellow: {
		background: { backgroundColor: '#fef3c7', color: '#92400e', padding: '2px 6px', borderRadius: '4px' },
		underline: { borderBottom: '2px solid #fbbf24', color: '#92400e' },
		border: { border: '1px solid #fbbf24', color: '#92400e', padding: '1px 4px', borderRadius: '3px' },
	},
	blue: {
		background: { backgroundColor: '#dbeafe', color: '#1e40af', padding: '2px 6px', borderRadius: '4px' },
		underline: { borderBottom: '2px solid #3b82f6', color: '#1e40af' },
		border: { border: '1px solid #3b82f6', color: '#1e40af', padding: '1px 4px', borderRadius: '3px' },
	},
	green: {
		background: { backgroundColor: '#dcfce7', color: '#166534', padding: '2px 6px', borderRadius: '4px' },
		underline: { borderBottom: '2px solid #22c55e', color: '#166534' },
		border: { border: '1px solid #22c55e', color: '#166534', padding: '1px 4px', borderRadius: '3px' },
	},
	red: {
		background: { backgroundColor: '#fee2e2', color: '#991b1b', padding: '2px 6px', borderRadius: '4px' },
		underline: { borderBottom: '2px solid #ef4444', color: '#991b1b' },
		border: { border: '1px solid #ef4444', color: '#991b1b', padding: '1px 4px', borderRadius: '3px' },
	},
	purple: {
		background: { backgroundColor: '#f3e8ff', color: '#7c2d12', padding: '2px 6px', borderRadius: '4px' },
		underline: { borderBottom: '2px solid #a855f7', color: '#7c2d12' },
		border: { border: '1px solid #a855f7', color: '#7c2d12', padding: '1px 4px', borderRadius: '3px' },
	},
};
</script>

<template>
	<span :style="styles[color][variant]">
		<slot />
	</span>
</template>
