<script lang='ts' setup>
import type { Timeline } from '~/types/com-types'

const myText = ref<string>('')
const indexBg = ref<HTMLElement | null>(null)
const rect = ref<DOMRect>()
const theta = ref<number>(0)
const directionClass = ref<string>('')
const isSm = ref<boolean>(false)

const timelineData = reactive<Timeline[]>([
    { id: 1, timestamp: '2021年9月', title: '入学', description: '开始学习前端基础（HTML/CSS/JS）', url: await useLoadStaticImage(1)} ,
    { id: 2, timestamp: '2022年3月', title: '完成第一个项目', description: 'React博客系统', url: await useLoadStaticImage(2) },
    { id: 3, timestamp: '2022年10月', title: '加入开发团队', description: '学院官网项目开发', url: await useLoadStaticImage(3) },
    { id: 4, timestamp: '2023年6月', title: '发布MiniMycc', description: '使用Electron构建桌面应用', url: await useLoadStaticImage(4) },
])

const res = await useGet<any, { content: string }>('/my/my')
if (res.code === 200) {
    myText.value = res.data.content
}

const onMouseenter = (e: MouseEvent): void => {
    if (isSm.value) return
    const w = e.offsetX - rect.value!.width / 2
    const h = rect.value!.height / 2 - e.offsetY
    const currentTheta = Math.atan2(h, w)

    if (currentTheta < theta.value && currentTheta >= -theta.value) {
        directionClass.value = 'translate-x-[100%] opacity-100 animate-rightEnter'
    } else if (currentTheta >= theta.value && currentTheta <= Math.PI - theta.value) {
        directionClass.value = 'translate-y-[-100%] opacity-100 animate-topEnter'
    } else if (currentTheta <= -theta.value && currentTheta >= -Math.PI + theta.value) {
        directionClass.value = 'translate-y-[100%] opacity-100 animate-bottomEnter'
    } else {
        directionClass.value = 'translate-x-[-100%] opacity-100 animate-leftEnter'
    }
}

const onMouseleave = (e: MouseEvent): void => {
    if (isSm.value) return
    const w = e.offsetX - rect.value!.width / 2
    const h = rect.value!.height / 2 - e.offsetY
    const currentTheta = Math.atan2(h, w)

    if (currentTheta < theta.value && currentTheta >= -theta.value) {
        directionClass.value = 'opacity-100 animate-rightLeave'
    } else if (currentTheta >= theta.value && currentTheta <= Math.PI - theta.value) {
        directionClass.value = 'opacity-100 animate-topLeave'
    } else if (currentTheta <= -theta.value && currentTheta >= -Math.PI + theta.value) {
        directionClass.value = 'opacity-100 animate-bottomLeave'
    } else {
        directionClass.value = 'opacity-100 animate-leftLeave'
    }
}

const toRecord = () => {
    navigateTo('/record/home')
}

const detailRecord = async (item: Timeline) => {
    navigateTo(`/record/${item.id}`)
}

onMounted(() => {
    nextTick(() => {
        // 获取页面宽度
        const el = document.documentElement.getBoundingClientRect()
        isSm.value = el.width <= 640
        if (indexBg.value) {
            rect.value = indexBg.value!.getBoundingClientRect()
            theta.value = Math.atan2(rect.value!.height, rect.value!.width)
        }
    })
})
</script>

<template>
    <div class="w-full min-h-[calc(100dvh-5rem)] flex flex-col gap-6">
        <!-- 介绍 -->
        <div class="w-full sm:w-[75%] mx-auto">
            <div class="w-full h-full pt-8 pb-8">
                <AnimationRevealOnScroll>
                    <h1 class="font-extralight text-[2.25em] text-center">Josef Joestar</h1>
                </AnimationRevealOnScroll>
                <AnimationRevealOnScroll>
                    <div v-if="myText" class="mt-4 text-center">{{ myText }}</div>
                </AnimationRevealOnScroll>
            </div>
        </div>
        <div class="w-full sm:w-[75%] md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 ">
            <div class="w-full">
                <div class="relative w-full h-full py-0 md:py-4 flex items-center">
                    <div class="absolute z-[-1] w-[50%] h-full md:h-[calc(100%-2rem)] bg-half-gray"></div>
                    <div class="
                        w-[calc(100%-1rem)] 
                        h-[calc(100%-2rem)]
                        ml-4
                        p-4
                        bg-white
                        shadow-md"
                    >
                        <div
                            ref="indexBg" 
                            class="relative w-full h-full cursor-pointer overflow-hidden"
                            @mouseenter="onMouseenter"
                            @mouseleave="onMouseleave"
                        >
                            <Starport port="my-id" class="w-full aspect-[3/2] md:h-full max-h-full">
                                <RecordImage
                                    class="transition-all duration-1000"
                                    :class="[useVueStarport().isRound ? 'rounded-[50%]' : 'rounded-none']"
                                />
                            </Starport>
                            <div
                                :class="[`
                                absolute
                                w-full
                                h-full
                                top-0 
                                backdrop-blur-sm 
                                bg-white/40 
                                dark:bg-black/40 
                                flex items-end
                                `, directionClass, isSm ? 'opacity-100' : 'opacity-0']"
                                @click="toRecord"
                            >
                                <div class="grid grid-cols-1 gap-2 p-4 text-[0.8rem]">
                                    <div>点击查看我的个人履历！</div>
                                    <div>您将了解到我的学习背景、技能特长和经历</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-full h-full grid grid-cols-1 text-sm justify-center">
               <AnimationRevealOnScroll>
                    <IndexBasicTime class="block md:hidden lg:block" :timeline-data="timelineData" @detail-record="detailRecord"></IndexBasicTime>
                    <IndexMdToLgTime class="hidden md:block lg:hidden" :timeline-data="timelineData" @detail-record="detailRecord"></IndexMdToLgTime>
               </AnimationRevealOnScroll>
            </div>
        </div>
    </div>
</template>

<style lang='postcss' scoped>
</style>