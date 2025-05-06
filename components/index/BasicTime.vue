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
        <div v-for="item in timelineData" :key="item.id" class="grid grid-cols-2">
            <div :class="[`relative w-full h-full`, item.id % 2 === 0 ? 'pl-4 col-start-2' : 'pr-4 col-start-1']">
                <div
                    :class="[`absolute size-3 bg-[#E4E7EC] rounded-[50%]`, item.id % 2 === 0 ? 'left-[calc(-0.75rem/2)]' : 'right-[calc(-0.75rem/2)]']">
                </div>
                <div :class="[`absolute w-[4px] h-full bg-[#E4E7EC]`, item.id % 2 === 0 ? 'left-[-2px]' : 'right-[-2px]']">
                </div>
                <div class="w-full h-full">
                    <div
                        :class="[`w-full flex items-center text-gray-400 text-xs`, item.id % 2 === 0 ? 'justify-start' : 'justify-end']">
                        <span>{{ item.timestamp }}</span></div>
                    <div @click="$emit('detailRecord', item)"
                        :class="[`p-2 rounded-base cursor-pointer mt-2 shadow-base transition-all flex items-center`, item.id % 2 === 0 ? 'text-left' : 'text-right']">
                        <img :src="item.url" alt="timestamp" class="size-8 mr-2">
                        <div class="w-[calc(100%-2rem)] h-full break-normal text-center"><span>{{ item.description }}</span></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='scss' scoped></style>