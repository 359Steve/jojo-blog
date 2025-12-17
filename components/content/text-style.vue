<script setup lang="ts">
interface Props {
	size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
	weight?: 'light' | 'normal' | 'medium' | 'bold';
	color?: string;
	italic?: boolean;
}

const { size = 'md', weight = 'normal', color, italic = false } = defineProps<Props>();

const sizeMap = {
	xs: '12px',
	sm: '14px',
	md: '16px',
	lg: '18px',
	xl: '20px',
};

const weightMap = {
	light: '300',
	normal: '400',
	medium: '500',
	bold: '700',
};

const textStyle = {
	fontSize: sizeMap[size],
	fontWeight: weightMap[weight],
	fontStyle: italic ? 'italic' : 'normal',
	...(color && { color }),
};
</script>

<template>
	<span class="mb-2 text-lg font-bold">
		<slot />
	</span>
</template>
