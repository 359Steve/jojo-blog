<script setup lang="ts">
interface Props {
	type?: 'info' | 'tip' | 'warning' | 'danger' | 'details';
	title?: string;
	collapsible?: boolean;
}

const { type = 'info', title, collapsible = false } = defineProps<Props>();

const isCollapsed = ref(false);

const typeStyles = {
	info: {
		borderColor: '#3b82f6',
		backgroundColor: '#eff6ff',
		titleColor: '#1e40af',
		icon: 'ℹ️',
	},
	tip: {
		borderColor: '#10b981',
		backgroundColor: '#ecfdf5',
		titleColor: '#065f46',
		icon: '💡',
	},
	warning: {
		borderColor: '#f59e0b',
		backgroundColor: '#fffbeb',
		titleColor: '#92400e',
		icon: '⚠️',
	},
	danger: {
		borderColor: '#ef4444',
		backgroundColor: '#fef2f2',
		titleColor: '#991b1b',
		icon: '🚨',
	},
	details: {
		borderColor: '#6b7280',
		backgroundColor: '#f9fafb',
		titleColor: '#374151',
		icon: '📋',
	},
};

const containerStyle = {
	border: `1px solid ${typeStyles[type].borderColor}`,
	borderLeft: `4px solid ${typeStyles[type].borderColor}`,
	backgroundColor: typeStyles[type].backgroundColor,
	borderRadius: '6px',
	padding: '16px',
	margin: '16px 0',
};

const titleStyle = {
	display: 'flex',
	alignItems: 'center',
	gap: '8px',
	fontWeight: '600',
	color: typeStyles[type].titleColor,
	marginBottom: title ? '8px' : '0',
	cursor: collapsible ? 'pointer' : 'default',
};
</script>

<template>
	<div :style="containerStyle">
		<div v-if="title || type" :style="titleStyle" @click="collapsible && (isCollapsed = !isCollapsed)">
			<span>{{ typeStyles[type].icon }}</span>
			<span>{{ title || type.toUpperCase() }}</span>
			<span v-if="collapsible">{{ isCollapsed ? '▶' : '▼' }}</span>
		</div>
		<div v-show="!isCollapsed">
			<slot />
		</div>
	</div>
</template>
