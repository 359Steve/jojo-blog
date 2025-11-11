<template>
	<div ref="cardRef" class="sticky" :class="className" :style="{
		top: `${index * incrementY}px`,
		zIndex: index * incrementZ,
		backfaceVisibility: 'hidden',
		transform: `translateZ(${index * incrementZ}px)`,
		...style,
	}">
		<slot />
	</div>
</template>

<script setup lang="ts">
import type { CSSProperties } from 'vue';

const {
	index,
	incrementY = 10,
	incrementZ = 10,
	className,
	style,
} = defineProps<{
	index: number;
	incrementY?: number;
	incrementZ?: number;
	className?: string;
	style?: CSSProperties;
}>();

const cardRef = templateRef<HTMLDivElement>('cardRef');
defineExpose({ cardRef });
</script>
