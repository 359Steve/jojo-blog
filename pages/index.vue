<script lang='ts' setup>
const myText = ref<string>('')
const indexBg = ref<HTMLElement | null>(null)
const indexBgMove = ref<HTMLElement | null>(null)
const rect = ref<DOMRect>()
const theta = ref<number>(0)
const directionClass = ref<string>('')

const res = await useGet<any, { content: string }>('/my/my')
if (res.code === 200) {
    myText.value = res.data.content
}

const onMouseenter = (e: MouseEvent): void => {
    const w = e.offsetX - rect.value!.width / 2
    const h = rect.value!.height / 2 - e.offsetY
    const currentTheta = Math.atan2(h, w)

    if (currentTheta < theta.value && currentTheta >= -theta.value) {
        directionClass.value = 'translate-x-[100%] opacity-100 animate-[rightEnter_0.3s_ease_both_1]'
    } else if (currentTheta >= theta.value && currentTheta <= Math.PI - theta.value) {
        directionClass.value = 'translate-y-[-100%] opacity-100 animate-[topEnter_0.3s_ease_both_1]'
    } else if (currentTheta <= -theta.value && currentTheta >= -Math.PI + theta.value) {
        directionClass.value = 'translate-y-[100%] opacity-100 animate-[bottomEnter_0.3s_ease_both_1]'
    } else {
        directionClass.value = 'translate-x-[-100%] opacity-100 animate-[leftEnter_0.3s_ease_both_1]'
    }
}

const onMouseleave = (e: MouseEvent): void => {
    const w = e.offsetX - rect.value!.width / 2
    const h = rect.value!.height / 2 - e.offsetY
    const currentTheta = Math.atan2(h, w)

    if (currentTheta < theta.value && currentTheta >= -theta.value) {
        directionClass.value = 'opacity-100 animate-[rightLeave_0.3s_ease_both_1]'
    } else if (currentTheta >= theta.value && currentTheta <= Math.PI - theta.value) {
        directionClass.value = 'opacity-100 animate-[topLeave_0.3s_ease_both_1]'
    } else if (currentTheta <= -theta.value && currentTheta >= -Math.PI + theta.value) {
        directionClass.value = 'opacity-100 animate-[bottomLeave_0.3s_ease_both_1]'
    } else {
        directionClass.value = 'opacity-100 animate-[leftLeave_0.3s_ease_both_1]'
    }
}

onMounted(() => {
    nextTick(() => {
        rect.value = indexBg.value?.getBoundingClientRect()
        theta.value = Math.atan2(rect.value!.height, rect.value!.width)
    })
})
</script>

<template>
    <div class="w-full min-h-[calc(100dvh-5rem)] flex flex-col gap-6">
        <!-- 介绍 -->
        <div class="w-full mobile-pad:w-[75%] mx-auto">
            <div class="w-full h-full pt-8 pb-8">
                <h1 class="font-extralight text-[2.25em] text-center">Josef Joestar</h1>
                <div v-if="myText" class="mt-4 text-center">{{ myText }}</div>
            </div>
        </div>
        <div class="w-full mobile-pad:w-[75%] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="relative w-full">
                <div class="w-[50%] aspect-[4/5] sm:aspect-[6/9] bg-base-color dark:bg-white"></div>
                <div class="
                    absolute 
                    w-[calc(100%-1rem)] 
                    h-[calc(100%-2rem)] 
                    top-4 left-4 p-4 
                    bg-[white] 
                    dark:bg-base-color 
                    shadow-md"
                >
                    <div 
                        ref="indexBg" 
                        class="relative w-full h-full cursor-pointer overflow-hidden"
                        @mouseenter="onMouseenter"
                        @mouseleave="onMouseleave"
                    >
                        <img 
                            src="~/assets/image/index_bg.png" 
                            alt="个人履历" 
                            class="w-full h-full object-cover grayscale-[0.5]"
                        />
                        <div
                            ref="indexBgMove"
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
                        >
                            <div class="grid grid-cols-1 gap-2 p-4 text-[0.8rem]">
                                <div>点击查看我的个人履历！</div>
                                <div>您将了解到我的学习背景、技能特长和经历</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>2</div>
        </div>
    </div>
</template>

<style lang='postcss' scoped>

</style>