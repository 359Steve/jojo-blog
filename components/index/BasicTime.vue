<script lang="ts" setup>
const { timelineData = [] } = defineProps<{
	timelineData: Timeline[];
}>();

defineEmits<{
	(e: 'detailRecord', value: Timeline): void;
}>();
</script>

<template>
	<div class="h-full w-full">
		<div v-for="(item, index) in timelineData" :key="item.id" class="grid grid-cols-2">
			<div class="relative h-full w-full"
				:class="[(index + 1) % 2 === 0 ? 'col-start-2 pl-4' : 'col-start-1 pr-4']">
				<div class="absolute size-3 rounded-[50%] bg-[#E4E7EC]"
					:class="[(index + 1) % 2 === 0 ? 'left-[calc(-0.75rem/2)]' : 'right-[calc(-0.75rem/2)]']" />
				<div class="absolute h-full w-[4px] bg-[#E4E7EC]"
					:class="[(index + 1) % 2 === 0 ? 'left-[-2px]' : 'right-[-2px]']" />
				<div class="h-full w-full">
					<div class="flex w-full items-center text-xs text-gray-400"
						:class="[(index + 1) % 2 === 0 ? 'justify-start' : 'justify-end']">
						<span>{{ item.timestamp }}</span>
					</div>
					<AnimationRevealOnScroll
						:animation-class="(index + 1) % 2 === 0 ? 'animate__fadeInRight' : 'animate__fadeInLeft'">
						<div class="mt-2 flex cursor-pointer items-center rounded-base p-2 shadow-lg backdrop-blur transition-all hover:bg-gray-50 dark:shadow-[0_4px_20px_rgba(255,255,255,0.05)] dark:hover:bg-gray-100/10"
							:class="[(index + 1) % 2 === 0 ? 'text-left' : 'text-right']"
							@click="$emit('detailRecord', item)">
							<img :src="item.url" alt="timestamp" class="mr-2 size-8">
							<div class="line-clamp-2 h-full w-[calc(100%-2rem)] overflow-hidden text-center">
								<span>{{ item.description }}</span>
							</div>
						</div>
					</AnimationRevealOnScroll>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss" scoped></style>
