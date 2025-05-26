<script lang="ts" setup>
import type { Timeline } from '~/types/com-types';

const { timelineData } = defineProps<{
	timelineData: Timeline[];
}>();

defineEmits<{
	(e: 'detailRecord', value: Timeline): void;
}>();
</script>

<template>
	<div class="h-full w-full">
		<div v-for="item in timelineData" :key="item.id" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
			<div class="relative h-full w-full">
				<div class="absolute left-[calc(-0.75rem/2)] size-3 rounded-[50%] bg-[#E4E7EC]"></div>
				<div class="absolute left-[-2px] h-full w-[4px] bg-[#E4E7EC]"></div>
				<div class="ml-2 h-full w-full">
					<div class="flex w-full items-center text-xs text-gray-400">
						<span>{{ item.timestamp }}</span>
					</div>
					<AnimationRevealOnScroll animation-class="'animate__fadeInRight'">
						<div
							@click="$emit('detailRecord', item)"
							class="mt-2 flex cursor-pointer items-center rounded-base p-2 shadow-lg transition-all hover:bg-gray-50 dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] dark:hover:bg-gray-100/10"
						>
							<img :src="item.url" alt="timestamp" class="mr-2 size-8" />
							<span>{{ item.description }}</span>
						</div>
					</AnimationRevealOnScroll>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
