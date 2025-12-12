<script setup lang="ts">
interface Props {
	variant?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'secondary';
	size?: 'sm' | 'md' | 'lg';
	outlined?: boolean;
	rounded?: boolean;
	closable?: boolean;
}

const { variant = 'primary', size = 'md', outlined = false, rounded = false, closable = false } = defineProps<Props>();

const emit = defineEmits(['close']);

const variantStyles = {
	primary: { bg: '#3b82f6', color: '#ffffff', border: '#3b82f6' },
	success: { bg: '#10b981', color: '#ffffff', border: '#10b981' },
	warning: { bg: '#f59e0b', color: '#ffffff', border: '#f59e0b' },
	danger: { bg: '#ef4444', color: '#ffffff', border: '#ef4444' },
	info: { bg: '#06b6d4', color: '#ffffff', border: '#06b6d4' },
	secondary: { bg: '#6b7280', color: '#ffffff', border: '#6b7280' },
};

const sizeStyles = {
	sm: { padding: '4px 8px', fontSize: '12px' },
	md: { padding: '6px 12px', fontSize: '14px' },
	lg: { padding: '8px 16px', fontSize: '16px' },
};

const computedStyle = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: '4px',
	backgroundColor: outlined ? 'transparent' : variantStyles[variant].bg,
	color: outlined ? variantStyles[variant].bg : variantStyles[variant].color,
	border: `1px solid ${variantStyles[variant].border}`,
	borderRadius: rounded ? '50px' : '6px',
	...sizeStyles[size],
	fontWeight: '500',
	lineHeight: '1',
};
</script>

<template>
	<span :style="computedStyle">
		<slot />
		<button v-if="closable" :style="{
			background: 'none',
			border: 'none',
			color: 'inherit',
			cursor: 'pointer',
			padding: '0',
			marginLeft: '4px',
			fontSize: '16px',
		}" @click="emit('close')">
			×
		</button>
	</span>
</template>
