<script lang='ts' setup>
import type { Timeline } from '~/types/com-types';

const { timelineData } = defineProps<{
    timelineData: Timeline[]
}>()

defineEmits<{
    (e: 'detailRecord', value: Timeline): void
}>()
</script>

<template>
    <div class="w-full h-full">
        <div v-for="item in timelineData" :key="item.id" class="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
            <div class="relative w-full h-full">
                <div
                    class="absolute size-3 bg-[#E4E7EC] rounded-[50%] left-[calc(-0.75rem/2)]">
                </div>
                <div class="absolute w-[4px] h-full bg-[#E4E7EC] left-[-2px]"></div>
                <div class="w-full h-full ml-2"> 
                    <div class="w-full flex items-center text-gray-400 text-xs">
                        <span>{{ item.timestamp }}</span></div>
                    <AnimationRevealOnScroll :animation-class="'animate__fadeInRight'">
                        <div @click="$emit('detailRecord', item)" class="p-2 rounded-base cursor-pointer mt-2 shadow-base transition-all flex items-center">
                            <img :src="item.url" alt="timestamp" class="size-8 mr-2">
                            <span>{{ item.description }}</span>
                        </div>
                    </AnimationRevealOnScroll>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>