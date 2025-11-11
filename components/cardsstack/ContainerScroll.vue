<template>
	<div ref="containerRef" class="relative w-full" :class="className" :style="{ perspective: '1000px', ...style }">
		<slot />
	</div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

defineProps<{
	className?: string;
	style?: CSSProperties;
}>();

const containerRef = templateRef<HTMLDivElement>('containerRef');
defineExpose({ containerRef });
</script>
