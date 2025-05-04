<script lang='ts' setup>
const { directionClass, port } = defineProps<{
    directionClass?: string,
    port: string
}>()

const goRecord = (): void => {
    navigateTo(`/record/${port}`)
}
</script>

<template>
    <Starport :port="port" class="w-full h-full">
        <RecordImage :class="[`transition-all duration-1000 min-w-32 min-h-32`, useVueStarport().isRound ? 'rounded-[50%]' : 'rounded-none']" />
    </Starport>
    <div
        :class="[`
        absolute
        w-full
        h-full
        top-0 
        opacity-0
        backdrop-blur-sm 
        bg-white/40 
        dark:bg-black/40 
        flex items-end
        `, directionClass]"
        v-bind="$attrs"
        @click="goRecord"
    >
        <div class="grid grid-cols-1 gap-2 p-4 text-[0.8rem]">
            <div>点击查看我的个人履历！</div>
            <div>您将了解到我的学习背景、技能特长和经历</div>
        </div>
    </div>
</template>

<style lang='scss' scoped>

</style>