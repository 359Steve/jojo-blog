<script setup lang="ts">
interface Props {
	variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
	size?: 'sm' | 'md' | 'lg';
	rounded?: boolean;
	disabled?: boolean;
	loading?: boolean;
	to?: string;
	external?: boolean;
}

const {
	variant = 'primary',
	size = 'md',
	rounded = false,
	disabled = false,
	loading = false,
	to,
	external = false,
} = defineProps<Props>();

const variantStyles = {
	primary: {
		bg: '#3b82f6',
		color: '#ffffff',
		hoverBg: '#2563eb',
		border: 'transparent',
	},
	secondary: {
		bg: '#f3f4f6',
		color: '#374151',
		hoverBg: '#e5e7eb',
		border: '#d1d5db',
	},
	success: {
		bg: '#10b981',
		color: '#ffffff',
		hoverBg: '#059669',
		border: 'transparent',
	},
	danger: {
		bg: '#ef4444',
		color: '#ffffff',
		hoverBg: '#dc2626',
		border: 'transparent',
	},
	ghost: {
		bg: 'transparent',
		color: '#3b82f6',
		hoverBg: '#f8fafc',
		border: '#3b82f6',
	},
};

const sizeStyles = {
	sm: { padding: '6px 12px', fontSize: '14px' },
	md: { padding: '8px 16px', fontSize: '16px' },
	lg: { padding: '12px 24px', fontSize: '18px' },
};

const buttonStyle = {
	display: 'inline-flex',
	alignItems: 'center',
	gap: '8px',
	backgroundColor: disabled ? '#f3f4f6' : variantStyles[variant].bg,
	color: disabled ? '#9ca3af' : variantStyles[variant].color,
	border: `1px solid ${disabled ? '#d1d5db' : variantStyles[variant].border}`,
	borderRadius: rounded ? '50px' : '6px',
	...sizeStyles[size],
	fontWeight: '500',
	textDecoration: 'none',
	cursor: disabled || loading ? 'not-allowed' : 'pointer',
	transition: 'all 0.2s ease',
	opacity: disabled ? 0.6 : 1,
};
</script>

<template>
	<NuxtLink v-if="to && !external && !disabled" :to="to" :style="buttonStyle"
		class="hover:opacity-90 active:scale-95">
		<span v-if="loading">⏳</span>
		<slot />
	</NuxtLink>

	<a v-else-if="to && external && !disabled" :href="to" target="_blank" rel="noopener noreferrer" :style="buttonStyle"
		class="hover:opacity-90 active:scale-95">
		<span v-if="loading">⏳</span>
		<slot />
		<span>↗</span>
	</a>

	<span v-else :style="buttonStyle" :class="{ 'hover:opacity-90 active:scale-95': !disabled && !loading }">
		<span v-if="loading">⏳</span>
		<slot />
	</span>
</template>
