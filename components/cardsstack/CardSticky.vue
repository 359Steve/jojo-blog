<template>
	<div ref="cardRef" class="sticky top-[5rem] sm:top-[6rem]" :class="className" :style="{
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
