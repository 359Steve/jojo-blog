<script lang='ts' setup>
import type { StaticImage, Timeline } from '~/types/com-types'

const myText = ref<string>('')
const indexBg = ref<HTMLElement | null>(null)
const maskEl = ref<HTMLElement | null>(null)
const indexEl = ref<HTMLElement | null>(null)
const rect = ref<DOMRect>()
const theta = ref<number>(0)
const directionClass = ref<string>('')

const getImage = async (id: number): Promise<string> => {
    const res: StaticImage = await import(`~/assets/image/${id}.png`)
    return res.default
}

const timelineData = reactive<Timeline[]>([
    { id: 1, timestamp: '2021年9月', title: '入学', description: '开始学习前端基础（HTML/CSS/JS）', url: await getImage(1)} ,
    { id: 2, timestamp: '2022年3月', title: '完成第一个项目', description: 'React博客系统', url: await getImage(2) },
    { id: 3, timestamp: '2022年10月', title: '加入开发团队', description: '学院官网项目开发', url: await getImage(3) },
    { id: 4, timestamp: '2023年6月', title: '发布MiniMycc', description: '使用Electron构建桌面应用', url: await getImage(4) },
])

const res = await useGet<any, { content: string }>('/my/my')
if (res.code === 200) {
    myText.value = res.data.content
}

const onMouseenter = (e: MouseEvent): void => {
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

const detailRecord = async (item: Timeline) => {
    const res = await import(`~/assets/image/${item.id}.png`)
    console.log(res)
}

onMounted(() => {
    nextTick(() => {
        if (indexBg.value && maskEl.value && indexEl.value) {
            rect.value = indexBg.value!.getBoundingClientRect()
            theta.value = Math.atan2(rect.value!.height, rect.value!.width)
            const maskHeight = maskEl.value.getBoundingClientRect().height
            // indexEl.value.style.height = `${maskHeight - 32}px`
        }
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
        <div class="w-full mobile-pad:w-[75%] md:w-[90%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 ">
            <div class="w-full">
                <div class="relative w-full h-full py-0 md:py-4 flex items-center">
                    <div ref="maskEl" class="absolute z-[-1] w-[50%] h-full md:h-[calc(100%-2rem)] bg-half-gray"></div>
                    <div ref="indexEl" class="
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
                            <Starport port="my-id" class="w-full h-full">
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
                                @click="navigateTo(`/record/1`)"
                            >
                                <div class="grid grid-cols-1 gap-2 p-4 text-[0.8rem]">
                                    <div>点击查看我的个人履历！</div>
                                    <div>您将了解到我的学习背景、技能特长和经历</div>
                                </div>
                            </div>
                        </div>
                        <!-- <div
                            class="block mobile-pad:hidden relative w-full h-full cursor-pointer overflow-hidden"
                        >
                            <RecordImageBox :port="'my-id2'" class="opacity-100"></RecordImageBox>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="w-full h-full grid grid-cols-1 text-sm justify-center">
                <IndexBasicTime class="block md:hidden lg:block" :timeline-data="timelineData" @detail-record="detailRecord"></IndexBasicTime>
                <IndexMdToLgTime class="hidden md:block lg:hidden" :timeline-data="timelineData" @detail-record="detailRecord"></IndexMdToLgTime>
            </div>
        </div>
    </div>
</template>

<style lang='postcss' scoped>
</style>