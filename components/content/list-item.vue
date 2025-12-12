<script setup lang="ts">
interface Props {
	emoji?: string;
	color?: string;
	completed?: boolean;
	priority?: 'low' | 'medium' | 'high';
}

const { emoji, color, completed = false, priority } = defineProps<Props>();

const priorityColors = {
	low: '#10b981',
	medium: '#f59e0b',
	high: '#ef4444',
};

const itemStyle = {
	display: 'flex',
	alignItems: 'flex-start',
	gap: '8px',
	margin: '8px 0',
	padding: '8px',
	borderRadius: '6px',
	backgroundColor: completed ? '#f0f9ff' : 'transparent',
	textDecoration: completed ? 'line-through' : 'none',
	opacity: completed ? 0.7 : 1,
	borderLeft: priority ? `3px solid ${priorityColors[priority]}` : 'none',
};

const bulletStyle = {
	color: color || (priority ? priorityColors[priority] : '#6b7280'),
	fontWeight: '500',
	fontSize: '16px',
	lineHeight: '1.5',
	minWidth: '20px',
};

const contentStyle = {
	flex: 1,
	lineHeight: '1.6',
};
</script>

<template>
	<div :style="itemStyle">
		<span :style="bulletStyle">
			{{ emoji || (completed ? '✅' : '•') }}
		</span>
		<div :style="contentStyle">
			<slot />
		</div>
	</div>
</template>
