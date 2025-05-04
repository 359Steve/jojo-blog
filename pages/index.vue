<script lang='ts' setup>
interface Timeline {
    id: number
    timestamp: string
    title: string
    description: string
}

const myText = ref<string>('')
const indexBg = ref<HTMLElement | null>(null)
const rect = ref<DOMRect>()
const theta = ref<number>(0)
const directionClass = ref<string>('')

const timelineData = reactive<Timeline[]>([
    { id: 1, timestamp: '2021年9月', title: '入学', description: '开始学习前端基础（HTML/CSS/JS）' },
    { id: 2, timestamp: '2022年3月', title: '完成第一个项目', description: 'React博客系统' },
    { id: 3, timestamp: '2022年10月', title: '加入开发团队', description: '学院官网项目开发' },
    { id: 4, timestamp: '2023年6月', title: '发布MiniMycc', description: '使用Electron构建桌面应用' },
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

onMounted(() => {
    nextTick(() => {
        rect.value = indexBg.value!.getBoundingClientRect()
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
        <div class="w-full mobile-pad:w-[75%] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-4 ">
            <div class="relative w-full">
                <div class="w-[50%] aspect-[4/5] sm:aspect-[6/9] bg-half-gray"></div>
                <div class="
                    absolute 
                    w-[calc(100%-1rem)] 
                    h-[calc(100%-2rem)] 
                    top-4 left-4 p-4 s
                    bg-white
                    shadow-md"
                >
                    <div 
                        ref="indexBg" 
                        class="hidden mobile-pad:block relative w-full h-full cursor-pointer overflow-hidden"
                        @mouseenter="onMouseenter"
                        @mouseleave="onMouseleave"
                    >
                        <RecordImageBox :port="'my-id'" :direction-class="directionClass"></RecordImageBox>
                    </div>
                    <div 
                        class="block mobile-pad:hidden relative w-full h-full cursor-pointer overflow-hidden"
                    >
                        <RecordImageBox :port="'my-id2'" class="opacity-100"></RecordImageBox>
                    </div>
                </div>
            </div>
            <div class="w-full h-full grid grid-cols-1 text-sm justify-center">
                <div v-for="item in timelineData" :key="item.id" class="grid grid-cols-2">
                    <div :class="[`relative w-full h-full`, item.id % 2 === 0 ? 'pl-4 col-start-2' : 'pr-4 col-start-1']">
                        <div :class="[`absolute size-3 bg-[#E4E7EC] rounded-[50%] top-[calc(-0.75rem/2)]`, item.id % 2 === 0 ? 'left-[calc(-0.75rem/2)]' : 'right-[calc(-0.75rem/2)]']"></div>
                        <div :class="[`absolute w-[4px] h-full bg-[#E4E7EC]`, item.id % 2 === 0 ? 'left-[-2px]' : 'right-[-2px]']"></div>
                        <div class="w-full h-full">
                            <div :class="[`w-full flex items-center text-gray-400 text-xs`, item.id % 2 === 0 ? 'justify-start' : 'justify-end']"><span>{{ item.timestamp }}</span></div>
                            <div :class="[`p-2 rounded-base cursor-pointer mt-2 truncate overflow-hidden whitespace-nowrap hover:shadow-base transition-all`, item.id % 2 === 0 ? 'text-left' : 'text-right']"><span>{{ item.description }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang='postcss' scoped>
</style>